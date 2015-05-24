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
 * model.sync = apSyncService.synchronizeData(model);
 *
 * model.sync.subscribeToChanges(function () {
 *    //Do something because a change has occurred
 *
 *  });
 * </pre>
 *
 */
var ap;
(function (ap) {
    var sync;
    (function (sync) {
        'use strict';
        var $q, $firebaseArray, $rootScope, apListItemFactory, deferred, serviceIsInitialized;
        var SyncService = (function () {
            function SyncService(_$firebaseArray_, _$q_, _apListItemFactory_, _$rootScope_) {
                this.Lock = Lock;
                /** Expose to service scope */
                $q = _$q_;
                $firebaseArray = _$firebaseArray_;
                apListItemFactory = _apListItemFactory_;
                $rootScope = _$rootScope_;
                /** Create a deferred object that will allow service to proceed once a userId is provided */
                deferred = $q.defer();
                serviceIsInitialized = deferred.promise;
            }
            SyncService.prototype.createSyncPoint = function (model) {
                return new SyncPoint(model);
            };
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
            /** Minification safe - we're using leading and trailing underscores but gulp plugin doesn't treat them correctly */
            SyncService.$inject = ['$firebaseArray', '$q', 'apListItemFactory', '$rootScope'];
            return SyncService;
        })();
        sync.SyncService = SyncService;
        var SyncPoint = (function () {
            /**
             *
             * @param model
             * @param updateQuery
             */
            function SyncPoint(model) {
                this.model = model;
                this.eventLogLength = 10;
                /** Container to hold all current subscriptions for the model */
                this.subscriptions = [];
                var syncPoint = this;
                serviceIsInitialized.then(function (initializationParams) {
                    syncPoint.changeNotifier = new Firebase(initializationParams.fireBaseUrl + '/changes/' + model.list.title);
                    var query = syncPoint.changeNotifier.limitToLast(syncPoint.eventLogLength);
                    syncPoint.recentEvents = $firebaseArray(query);
                    syncPoint.recentEvents.$loaded().then(function (eventArray) {
                        /** Fired when anyone updates a list item */
                        syncPoint.recentEvents.$watch(function (log) {
                            if (log.event === 'child_added') {
                                var newEvent = syncPoint.recentEvents.$getRecord(log.key);
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
            SyncPoint.prototype.processChanges = function (newEvent, externalTrigger) {
                var syncPoint = this;
                /** Notify subscribers */
                _.each(syncPoint.subscriptions, function (callback) {
                    if (_.isFunction(callback)) {
                        callback(newEvent, externalTrigger);
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
                var syncPoint = this;
                serviceIsInitialized.then(function (initializationParams) {
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
            };
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
            SyncPoint.prototype.subscribeToChanges = function (callback, unsubscribeOnStateChange) {
                var _this = this;
                if (unsubscribeOnStateChange === void 0) { unsubscribeOnStateChange = true; }
                var syncPoint = this;
                if (syncPoint.subscriptions.indexOf(callback) === -1) {
                    /** Only register new subscriptions, ignore if subscription already exists */
                    syncPoint.subscriptions.push(callback);
                }
                var unsubscribe = function () { return _this.unsubscribe(callback); };
                if (unsubscribeOnStateChange) {
                    //var $rootScope = $injector.get('$rootScope');
                    /** Unsubscribe from notifications when we leave this state */
                    $rootScope.$on('$stateChangeStart', function () {
                        unsubscribe();
                    });
                }
                return unsubscribe;
            };
            SyncPoint.prototype.unsubscribe = function (callback) {
                var index = this.subscriptions.indexOf(callback);
                if (index !== -1) {
                    this.subscriptions.splice(index, 1);
                }
            };
            return SyncPoint;
        })();
        sync.SyncPoint = SyncPoint;
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
        sync.Lock = Lock;
        angular.module('angularPoint').service('apSyncService', SyncService);
    })(sync = ap.sync || (ap.sync = {}));
})(ap || (ap = {}));
