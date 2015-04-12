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
var ap;
(function (ap) {
    var sync;
    (function (_sync) {
        'use strict';
        var $q, $firebaseArray, apListItemFactory, deferred, serviceIsInitialized;
        var SyncService = (function () {
            function SyncService(_$firebaseArray_, _$q_, _apListItemFactory_) {
                this.Lock = Lock;
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
            SyncService.prototype.initialize = function (userId, fireBaseUrl) {
                deferred.resolve({ userId: userId, fireBaseUrl: fireBaseUrl });
                apListItemFactory.ListItem.prototype.lock = Lock;
            };
            /**
             *
             * @param {Model} model
             * @param Function updateQuery Callback used when change event occurs.
             * @returns {angularPoint.SyncPoint}
             */
            SyncService.prototype.synchronizeData = function (model, updateQuery) {
                return new SyncPoint(model, updateQuery);
            };
            /** Minification safe - we're using leading and trailing underscores but gulp plugin doesn't treat them correctly */
            SyncService.$inject = ['$firebaseArray', '$q', 'apListItemFactory'];
            return SyncService;
        })();
        _sync.SyncService = SyncService;
        var SyncPoint = (function () {
            function SyncPoint(model, updateQuery) {
                this.model = model;
                this.updateQuery = updateQuery;
                this.eventLogLength = 10;
                /** Container to hold all current subscriptions for the model */
                this.subscriptions = [];
                var sync = this;
                serviceIsInitialized.then(function (initializationParams) {
                    sync.changeNotifier = new Firebase(initializationParams.fireBaseUrl + '/changes/' + model.list.title);
                    var query = sync.changeNotifier.limitToLast(sync.eventLogLength);
                    sync.recentEvents = $firebaseArray(query);
                    sync.recentEvents.$loaded().then(function (eventArray) {
                        /** Fired when anyone updates a list item */
                        sync.recentEvents.$watch(function (log) {
                            if (log.event === 'child_added') {
                                var newEvent = sync.recentEvents.$getRecord(log.key);
                                if (newEvent.userId !== initializationParams.userId) {
                                    sync.processChanges(newEvent);
                                }
                            }
                        });
                    });
                });
            }
            SyncPoint.prototype.processChanges = function (newEvent) {
                var sync = this;
                /** Notify subscribers */
                _.each(sync.subscriptions, function (callback) {
                    if (_.isFunction(callback)) {
                        callback(newEvent);
                    }
                });
            };
            /**
             * @ngdoc function
             * @name SyncPoint.registerChange
             * @methodOf SyncPoint
             * @description
             * Notify all other users listening to this model that a change has been made.
             */
            SyncPoint.prototype.registerChange = function (changeType, listItemId) {
                var sync = this;
                serviceIsInitialized.then(function (initializationParams) {
                    if (sync.recentEvents.length >= sync.eventLogLength) {
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
            };
            /**
             * @ngdoc function
             * @name SyncPoint.subscribeToChanges
             * @methodOf SyncPoint
             * @description
             * Allows subscribers (controllers) to be notified when change is made
             *
             * @param {function} callback Callback to execute after a change is made.
             */
            SyncPoint.prototype.subscribeToChanges = function (callback) {
                var sync = this;
                if (sync.subscriptions.indexOf(callback) === -1) {
                    /** Only register new subscriptions, ignore if subscription already exists */
                    sync.subscriptions.push(callback);
                }
            };
            return SyncPoint;
        })();
        function Lock() {
            var deferred = $q.defer();
            var listItem = this;
            /** Only can lock existing records */
            if (listItem.id) {
                var model = listItem.getModel();
                /** Make sure user has rights to edit */
                var userPermMask = listItem.resolvePermissions();
                if (userPermMask.EditListItems) {
                    serviceIsInitialized.then(function (initializationParams) {
                        /** Reference to the firebase lock queue for this record*/
                        var ref = new Firebase(initializationParams.fireBaseUrl + 'locks/' + model.list.title + '/' + listItem.id);
                        var lockQueue = $firebaseArray(ref);
                        /** Reference to the lock record I created */
                        var myLock = lockQueue.$add({
                            userId: initializationParams.userId,
                            time: Firebase.ServerValue.TIMESTAMP
                        });
                        /** Passed as a reference so we can remove the lock when the modal form is closed*/
                        var unlock = function () { return myLock.then(function (lockReference) { return lockReference.remove(); }); };
                        /** Remove the lock in the event the user looses connection, changes page, or closes browser*/
                        myLock.then(function (lockReference) {
                            lockReference.onDisconnect().remove();
                            deferred.resolve({ reference: lockQueue, unlock: unlock });
                        });
                    });
                }
                else {
                    /** User doesn't have edit rights */
                    deferred.resolve({});
                }
            }
            else {
                /** New record so can't lock */
                deferred.resolve({});
            }
            return deferred.promise;
        }
        _sync.Lock = Lock;
        angular.module('angularPoint').service('apSyncService', SyncService);
    })(sync = ap.sync || (ap.sync = {}));
})(ap || (ap = {}));
