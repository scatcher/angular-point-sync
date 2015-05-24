/**
 * @ngdoc service
 * @name ap.sync
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
 * model.sync = apSyncService.createSyncPoint(model);
 *
 * model.sync.subscribeToChanges(function () {
 *    //Do something because a change has occurred
 *
 *  }, true); //Unsubscribe on route change so we don't keep reference in future
 * </pre>
 *
 */

module ap.sync {
    'use strict';

    var $q,
        $firebaseArray,
        $rootScope,
        apListItemFactory,
        deferred: ng.IDeferred<ISyncServiceInitializationParams>,
        serviceIsInitialized: ng.IPromise<ISyncServiceInitializationParams>;


    export interface ISyncServiceInitializationParams {
        userId: number;
        fireBaseUrl: string;
    }

    export interface ISyncServiceChangeEvent {
        changeType: string; // 'add'|'update'|'delete';
        listItemId: number;
        userId: number;
        time: number;
    }

    export interface ISyncService {
        createSyncPoint(model: ap.IModel):ISyncPoint;
        initialize(userId: number, fireBaseUrl: string);
        Lock():ng.IPromise<{reference:IListItemLock[]; unlock(lockReference: IListItemLock)}>;
    }

    export interface IListItemLock {
        userId:number;
        time: string
    }


    export class SyncService implements ISyncService {
        /** Minification safe - we're using leading and trailing underscores but gulp plugin doesn't treat them correctly */
        static $inject = ['$firebaseArray', '$q', 'apListItemFactory', '$rootScope'];

        constructor(_$firebaseArray_, _$q_, _apListItemFactory_, _$rootScope_) {
            /** Expose to service scope */
            $q = _$q_;
            $firebaseArray = _$firebaseArray_;
            apListItemFactory = _apListItemFactory_;
            $rootScope = _$rootScope_;

            /** Create a deferred object that will allow service to proceed once a userId is provided */
            deferred = $q.defer();
            serviceIsInitialized = deferred.promise;
        }

        createSyncPoint(model: ap.IModel): ISyncPoint {
            return new SyncPoint(model);
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
        initialize(userId: number, fireBaseUrl: string) {
            deferred.resolve({userId: userId, fireBaseUrl: fireBaseUrl});
            apListItemFactory.ListItem.prototype.lock = Lock;
        }

        Lock = Lock;
    }

    export interface ISyncPoint {
        eventLogLength:number;
        recentEvents:ISyncServiceChangeEvent[];
        registerChange(changeType: string, listItemId: number);
        subscribeToChanges(callback: Function, unsubscribeOnStateChange = true): Function;
        unsubscribe(callback);
    }


    export class SyncPoint implements ISyncPoint {
        eventLogLength = 10;
        changeNotifier;
        recentEvents;
        /** Container to hold all current subscriptions for the model */
        subscriptions = [];

        /**
         *
         * @param model
         * @param updateQuery
         */
        constructor(private model: ap.IModel) {
            var syncPoint = this;

            serviceIsInitialized
                .then((initializationParams: ISyncServiceInitializationParams) => {

                    syncPoint.changeNotifier = new Firebase(initializationParams.fireBaseUrl + '/changes/' + model.list.title);

                    var query = syncPoint.changeNotifier.limitToLast(syncPoint.eventLogLength);

                    syncPoint.recentEvents = $firebaseArray(query);

                    syncPoint.recentEvents.$loaded()
                        .then((eventArray) => {

                            /** Fired when anyone updates a list item */
                            syncPoint.recentEvents.$watch((log) => {
                                if (log.event === 'child_added') {
                                    var newEvent: ISyncServiceChangeEvent = syncPoint.recentEvents.$getRecord(log.key);
                                    /** Capture if event was caused by current user */
                                    var externalTrigger = newEvent.userId !== initializationParams.userId;
                                    syncPoint.processChanges(newEvent, externalTrigger);
                                }
                            });
                        });


                });


        }

        /**
         *
         * @param {ISyncServiceChangeEvent} newEvent Details of event.
         * @param {boolean} externalTrigger Was the changed caused by another user.
         */
        private processChanges(newEvent: ISyncServiceChangeEvent, externalTrigger: boolean): void {
            var syncPoint = this;
            /** Notify subscribers */
            _.each(syncPoint.subscriptions, (callback) => {
                if (_.isFunction(callback)) {
                    callback(newEvent, externalTrigger);
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
        registerChange(changeType: string, listItemId: number) {
            var syncPoint = this;
            serviceIsInitialized
                .then((initializationParams) => {
                    if (syncPoint.recentEvents.length >= syncPoint.eventLogLength) {
                        /** Trim the log to prevent unnecessary size */
                        syncPoint.recentEvents.$remove(0);
                    }

                    syncPoint.recentEvents.$add({
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
         * Allows subscribers (controllers & services) to be notified when change is made.
         *
         * @param {function} callback Callback to execute after a change is made.
         * @param {boolean} [unsubscribeOnStateChange = true]
         * @returns {function} Function used to unsubscribe.
         */
        subscribeToChanges(callback: Function, unsubscribeOnStateChange: boolean = true): Function {
            var syncPoint = this;
            if (syncPoint.subscriptions.indexOf(callback) === -1) {
                /** Only register new subscriptions, ignore if subscription already exists */
                syncPoint.subscriptions.push(callback);
            }

            var unsubscribe = () => this.unsubscribe(callback);

            if(unsubscribeOnStateChange) {
                //var $rootScope = $injector.get('$rootScope');

                /** Unsubscribe from notifications when we leave this state */
                $rootScope.$on('$stateChangeStart', () => {
                    unsubscribe();
                });

            }

            return unsubscribe;

        }

        unsubscribe(callback) {
            var index = this.subscriptions.indexOf(callback);
            if (index !== -1) {
                this.subscriptions.splice(index, 1);
            }
        }
    }

    export function Lock(): ng.IPromise<{reference:IListItemLock[]; unlock(lockReference: IListItemLock)}> {
        var deferred = $q.defer();

        var listItem = <ap.IListItem>this;

        /** Only can lock existing records */
        if (listItem.id) {
            var model = listItem.getModel();
            /** Make sure user has rights to edit */
            var userPermMask = listItem.resolvePermissions();
            if (userPermMask.EditListItems) {

                serviceIsInitialized
                    .then((initializationParams) => {

                        /** Reference to the firebase lock queue for this record*/
                        var ref = new Firebase(initializationParams.fireBaseUrl + 'locks/' + model.list.title + '/' + listItem.id);
                        var lockQueue = $firebaseArray(ref);

                        /** Reference to the lock record I created */
                        var myLock = lockQueue.$add({
                            userId: initializationParams.userId,
                            time: Firebase.ServerValue.TIMESTAMP
                        });

                        /** Passed as a reference so we can remove the lock when the modal form is closed*/
                        var unlock = () => myLock.then((lockReference) => lockReference.remove());

                        /** Remove the lock in the event the user looses connection, changes page, or closes browser*/
                        myLock.then((lockReference) => {
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

    angular.module('angularPoint')
        .service('apSyncService', SyncService);


}