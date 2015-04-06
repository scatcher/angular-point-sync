/// <reference path="../.tmp/typings/tsd.d.ts" />
/// <reference path="../angular-point.d.ts" />

/**
 * @ngdoc service
 * @name angularPoint.syncService
 * @description
 * Supports 3-way data binding if you decide to incorporate firebase (any change by any user
 * to a list item is mirrored across users). The data isn't saved to firebase but the change
 * event is so all subscribers are notified to request an update from SharePoint.
 *
 * In order to get this service to work, you need to have angularFire installed and have your
 * firebase url set at apConfig.firebaseURL.
 *
 * This will create a change point at: apConfig.firebaseURL + '/changes/' + model.list.title
 * The point contains Firebase.ServerValue.TIMESTAMP to determine the time of the most recent change.
 *
 * @example
 * <h3>Example of how to set the firebase url</h3>
 * <pre>
 * .run(function (apConfig) {
 *   //Set the folder where offline XML is stored
 *   apConfig.firebaseURL = 'My Firebase URL';
 *
 * });
 * </pre>
 *
 * <h3>Example of how to register from the model</h3>
 * <pre>
 * //Add a subscription service that will automatically keep data in sync with all other active users
 * model.sync = apSyncService.synchronizeData(model, function () {
 *    //Do something because a change has occurred
 *
 *  });
 * </pre>
 *
 * @requires angularPoint.apConfig
 */

module angularPoint {
    'use strict';

    interface InitializationParams {
        userId:number;
        fireBaseUrl:string;
    }

    interface ChangeEvent {
        changeType:string; // 'add'|'update'|'delete';
        listItemId: number;
        userId: number;
        time: number;
    }

    var eventLogLength = 10;

    var $q,
        $firebaseArray,
        apListItemFactory,
        deferred:ng.IDeferred<InitializationParams>,
        serviceIsInitialized:ng.IPromise<InitializationParams>;

    export class apSyncService {
        /** Minification safe - we're using leading and trailing underscores but gulp plugin doesn't treat them correctly */
        static $inject = ['$firebaseArray', '$q', 'apListItemFactory'];
        constructor(_$firebaseArray_, _$q_, _apListItemFactory_) {
            /** Expose to service scope */
            $q = _$q_;
            $firebaseArray = _$firebaseArray_;
            apListItemFactory = _apListItemFactory_;

            /** Create a deferred object that will allow service to proceed once a userId is provided */
            deferred = $q.defer();
            serviceIsInitialized = deferred.promise;
      }

        /**
         * @description Service waits for userId to be provided before adding the watch to event array.
         * @param {{userId: userId, fireBaseUrl: fireBaseUrl}} userId
         */
        /**
         * @description Service waits for userId to be provided before adding the watch to event array.
         * @param {number} userId
         * @param {string} fireBaseUrl
         */
        initialize(userId:number, fireBaseUrl:string) {
            var self = this;
            deferred.resolve({userId: userId, fireBaseUrl: fireBaseUrl});

            apListItemFactory.ListItem.prototype.lock = Lock;
        }

        Lock = Lock;

        /**
         *
         * @param {Model} model
         * @param Function updateQuery Callback used when change event occurs.
         * @returns {angularPoint.SyncPoint}
         */
        synchronizeData(model:Model, updateQuery:Function) {
            return new SyncPoint(model, updateQuery);
        }


    }


    class SyncPoint {
        changeNotifier;
        recentEvents;
        /** Container to hold all current subscriptions for the model */
        subscriptions = [];

        constructor(private model, private updateQuery) {
            var sync = this;

            serviceIsInitialized
                .then(function (initializationParams:InitializationParams) {

                    sync.changeNotifier = new Firebase(initializationParams.fireBaseUrl + '/changes/' + model.list.title);

                    var query = sync.changeNotifier.limitToLast(eventLogLength);

                    sync.recentEvents = $firebaseArray(query);

                    sync.recentEvents.$loaded()
                        .then(function (eventArray) {

                            /** Fired when anyone updates a list item */
                            sync.recentEvents.$watch(function (log) {
                                if (log.event === 'child_added') {
                                    var newEvent:ChangeEvent = sync.recentEvents.$getRecord(log.key);
                                    if (newEvent.userId !== initializationParams.userId) {
                                        sync.processChanges(newEvent);
                                    }
                                }
                            });
                        });


                });



        }

        processChanges(newEvent:ChangeEvent) {
            var sync = this;
            /** Notify subscribers */
            _.each(sync.subscriptions, function (callback) {
                if (_.isFunction(callback)) {
                    callback(newEvent);
                }
            });
        }

        /**
         * @ngdoc function
         * @name SyncPoint.registerChange
         * @methodOf SyncPoint
         * @description
         * Notify all other users listening to this model that a change has been made.
         */
        registerChange(changeType:string, listItemId:number) {
            var sync = this;
            serviceIsInitialized
                .then(function (initializationParams) {
                    if (sync.recentEvents.length >= eventLogLength) {
                        /** Trim the log to prevent unnecessary size */
                        sync.recentEvents.$remove(0);
                    }

                    sync.recentEvents.$add({
                        changeType: changeType,
                        listItemId: listItemId,
                        userId: initializationParams.userId,
                        time: Firebase.ServerValue.TIMESTAMP
                    });
                });

        }

        /**
         * @ngdoc function
         * @name SyncPoint.subscribeToChanges
         * @methodOf SyncPoint
         * @description
         * Allows subscribers (controllers) to be notified when change is made
         *
         * @param {function} callback Callback to execute after a change is made.
         */
        subscribeToChanges(callback:Function) {
            var sync = this;
            if (sync.subscriptions.indexOf(callback) === -1) {
                /** Only register new subscriptions, ignore if subscription already exists */
                sync.subscriptions.push(callback);
            }
        }
    }

    class Lock{
        constructor() {
            var deferred = $q.defer();

            var listItem:ListItem = this;

            /** Only can lock existing records */
            if (listItem.id) {
                var model = listItem.getModel();
                /** Make sure user has rights to edit */
                var userPermMask = listItem.resolvePermissions();
                if (userPermMask.EditListItems) {

                    serviceIsInitialized
                        .then(function (initializationParams) {

                            /** Reference to the firebase lock queue for this record*/
                            var ref = new Firebase(initializationParams.fireBaseUrl + 'locks/' + model.list.title + '/' + listItem.id);
                            var lockQueue = $firebaseArray(ref);

                                /** Reference to the lock record I created */
                                var myLock = lockQueue.$add({userId: initializationParams.userId, time: Firebase.ServerValue.TIMESTAMP});

                                /** Passed as a reference so we can remove the lock when the modal form is closed*/
                                var unlock = function () {
                                    myLock.then(function (lockReference) {
                                        lockReference.remove();
                                    });
                                };

                                /** Remove the lock in the event the user looses connection, changes page, or closes browser*/
                                myLock.then(function (lockReference) {
                                    lockReference.onDisconnect().remove();
                                    deferred.resolve({reference: lockQueue, unlock: unlock});
                                });

                        });

                } else {
                    /** User doesn't have edit rights */
                    deferred.resolve({});
                }
            } else {
                /** New record so can't lock */
                deferred.resolve({});
            }
            return deferred.promise;

        }
    }

    angular.module('angularPoint')
        .service('apSyncService', apSyncService);

}