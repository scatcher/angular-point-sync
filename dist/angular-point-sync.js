/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
var ap;
(function (ap) {
    var sync;
    (function (sync) {
        'use strict';
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
                sync.serviceIsInitialized
                    .then(function (initializationParams) {
                    syncPoint.changeNotifier = new Firebase(initializationParams.firebaseUrl + '/changes/' + model.list.title);
                    var query = syncPoint.changeNotifier.limitToLast(syncPoint.eventLogLength);
                    syncPoint.recentEvents = sync.$firebaseArray(query);
                    syncPoint.recentEvents.$loaded()
                        .then(function (eventArray) {
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
                sync.serviceIsInitialized
                    .then(function (initializationParams) {
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
                    sync.$rootScope.$on('$stateChangeStart', function () {
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
    })(sync = ap.sync || (ap.sync = {}));
})(ap || (ap = {}));

/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
var ap;
(function (ap) {
    var sync;
    (function (sync) {
        'use strict';
        function Lock() {
            var deferred = sync.$q.defer();
            var listItem = this;
            /** Only can lock existing records */
            if (listItem.id) {
                var model = listItem.getModel();
                /** Make sure user has rights to edit */
                var userPermMask = listItem.resolvePermissions();
                if (userPermMask.EditListItems) {
                    sync.serviceIsInitialized
                        .then(function (initializationParams) {
                        /** Reference to the firebase lock queue for this record*/
                        var ref = new Firebase(initializationParams.firebaseUrl + 'locks/' + model.list.title + '/' + listItem.id);
                        var lockQueue = sync.$firebaseArray(ref);
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
    })(sync = ap.sync || (ap.sync = {}));
})(ap || (ap = {}));

/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
var ap;
(function (ap) {
    var sync;
    (function (sync) {
        'use strict';
        sync.$q, sync.$firebaseArray, sync.$rootScope, sync.apListItemFactory, sync.deferred, sync.serviceIsInitialized;
        var SyncService = (function () {
            function SyncService(_$firebaseArray_, _$q_, _apListItemFactory_, _$rootScope_) {
                this.Lock = sync.Lock;
                /** Expose to service scope */
                sync.$q = _$q_;
                sync.$firebaseArray = _$firebaseArray_;
                sync.apListItemFactory = _apListItemFactory_;
                sync.$rootScope = _$rootScope_;
                /** Create a deferred object that will allow service to proceed once a userId is provided */
                sync.deferred = sync.$q.defer();
                sync.serviceIsInitialized = sync.deferred.promise;
            }
            SyncService.prototype.createSyncPoint = function (model) {
                return new sync.SyncPoint(model);
            };
            /**
             * @description Service waits for userId to be provided before adding the watch to event array.
             * @param {{userId: userId, firebaseUrl: firebaseUrl}} userId
             */
            /**
             * @description Service waits for userId to be provided before adding the watch to event array.
             * @param {number} userId
             * @param {string} firebaseUrl
             */
            SyncService.prototype.initialize = function (userId, firebaseUrl) {
                sync.deferred.resolve({ userId: userId, firebaseUrl: firebaseUrl });
                sync.apListItemFactory.ListItem.prototype.lock = sync.Lock;
            };
            /** Minification safe - we're using leading and trailing underscores but gulp plugin doesn't treat them correctly */
            SyncService.$inject = ['$firebaseArray', '$q', 'apListItemFactory', '$rootScope'];
            return SyncService;
        })();
        sync.SyncService = SyncService;
    })(sync = ap.sync || (ap.sync = {}));
})(ap || (ap = {}));

/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
var ap;
(function (ap) {
    var sync;
    (function (sync) {
        'use strict';
        var service;
        /**
         * @ngdoc Object
         * @name PresenceService
         * @description
         * Creates a realtime reference to where each user is within the application when logged in, what browser they're using, when
         * the session was started, and if not online when the last time they were online.
         */
        var PresenceService = (function () {
            function PresenceService($q, $rootScope, $firebaseArray, $firebaseObject, $location, apSyncService, toastr) {
                this.$q = $q;
                this.$firebaseArray = $firebaseArray;
                this.$firebaseObject = $firebaseObject;
                this.toastr = toastr;
                this.identifyBrowser = identifyBrowser;
                service = this;
                var deferred = $q.defer();
                service.initializeSession = deferred.promise;
                //Wait for SyncService to be initialized with current users userId and firebaseUrl
                sync.serviceIsInitialized.then(function (initializationParamsObject) {
                    var userId = initializationParamsObject.userId;
                    var firebaseUrl = initializationParamsObject.firebaseUrl;
                    var firebaseRoot = firebaseUrl.replace('offline/', '');
                    service.userConnectionUrl = firebaseUrl + 'users/' + userId + '/';
                    // var usersRef = new Firebase(firebaseUrl + 'users');
                    // service.users = $firebaseObject(usersRef).$loaded; 
                    // since I can connect from multiple devices or browser tabs, we store each connection instance separately
                    // any time that connectionsRef's value is null (i.e. has no children) I am offline
                    var thisConnectionRef = new Firebase(service.userConnectionUrl + 'connections');
                    // stores the timestamp of my last disconnect (the last time I was seen online)
                    var lastOnlineRef = new Firebase(service.userConnectionUrl + 'lastOnline');
                    var connectedRef = new Firebase(firebaseRoot + '.info/connected');
                    connectedRef.on('value', function (snap) {
                        if (snap.val() === true) {
                            // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
                            // add this device to my connections list
                            // this value contains info about the device and connection start timestamp
                            service.sessionConnection = thisConnectionRef.push({
                                browser: identifyBrowser(),
                                connected: Firebase.ServerValue.TIMESTAMP,
                                lastActive: Firebase.ServerValue.TIMESTAMP,
                                path: $location.url(),
                                reload: false
                            });
                            //Update the current path whenever state changes
                            $rootScope.$on('$stateChangeSuccess', function (event, current, previous, rejection) {
                                service.sessionConnection.update({
                                    lastActive: Firebase.ServerValue.TIMESTAMP,
                                    path: $location.url()
                                });
                            });
                            // when I disconnect, remove this device
                            service.sessionConnection.onDisconnect().remove();
                            // when I disconnect, update the last time I was seen online
                            lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
                            var activeSessionObject = service.$firebaseObject(service.sessionConnection);
                            deferred.resolve(activeSessionObject);
                            // watch for events
                            service.watchForReloadEvent(activeSessionObject);
                            service.watchForNotifications(userId, activeSessionObject.$id);
                        }
                    });
                });
            }
            PresenceService.prototype.deleteSessionData = function (userId, sessionKey) {
                return service.getSessionConnectioUrl(userId, sessionKey).then(function (sessionConnectionUrl) {
                    var sessionRef = new Firebase(sessionConnectionUrl);
                    return sessionRef.remove();
                });
            };
            PresenceService.prototype.displayUserNotification = function (notification) {
                service.toastr[notification.toastType](notification.message, notification.title, notification.toastrOptions);
            };
            PresenceService.prototype.getSessionNotificationsArray = function (userId, sessionKey) {
                return service.getSessionConnectioUrl(userId, sessionKey).then(function (sessionConnectionUrl) {
                    var notificationsRef = new Firebase(sessionConnectionUrl + '/notifications');
                    return service.$firebaseArray(notificationsRef).$loaded();
                });
            };
            PresenceService.prototype.getSessionConnectioUrl = function (userId, sessionKey) {
                return sync.serviceIsInitialized.then(function (initializationParamsObject) {
                    return initializationParamsObject.firebaseUrl + 'users/' + userId + '/connections/' + sessionKey;
                });
            };
            PresenceService.prototype.getUserConnectionUrl = function (userId) {
                return sync.serviceIsInitialized.then(function (initializationParamsObject) {
                    return initializationParamsObject.firebaseUrl + 'users/' + userId;
                });
            };
            PresenceService.prototype.getUsers = function () {
                return sync.serviceIsInitialized.then(function (initializationParamsObject) {
                    if (!service.users) {
                        var usersRef = new Firebase(initializationParamsObject.firebaseUrl + 'users');
                        service.users = service.$firebaseObject(usersRef);
                    }
                    return service.users;
                });
            };
            PresenceService.prototype.reloadBrowser = function (userId, sessionKey) {
                service.getSessionConnectioUrl(userId, sessionKey).then(function (sessionConnectionUrl) {
                    var sessionRef = new Firebase(sessionConnectionUrl);
                    var sessionObject = service.$firebaseObject(sessionRef);
                    sessionObject.$loaded()
                        .then(function () {
                        sessionObject.reload = true;
                        sessionObject.$save();
                    });
                });
            };
            PresenceService.prototype.sendUserNotification = function (userId, sessionKey, notification) {
                var deferred = this.$q.defer();
                this.getSessionNotificationsArray(userId, sessionKey)
                    .then(function (sessionNotifications) {
                    deferred.resolve(sessionNotifications.$add(notification));
                });
                return deferred.promise;
            };
            PresenceService.prototype.watchForNotifications = function (userId, sessionKey) {
                this.getSessionNotificationsArray(userId, sessionKey)
                    .then(function (notificationArray) { return notificationArray.$watch(function (eventObject) {
                    //Trigger when a new notification is added to the session notifications array
                    if (eventObject.event === 'child_added') {
                        _.each(notificationArray, function (notification, index) {
                            service.displayUserNotification(notification);
                            notificationArray.$remove(notification);
                        });
                    }
                }); });
            };
            PresenceService.prototype.watchForReloadEvent = function (activeSessionObject) {
                activeSessionObject.$watch(function (eventObject) {
                    if (!!activeSessionObject.reload) {
                        activeSessionObject.reload = false;
                        activeSessionObject.$save();
                        location.reload(true);
                    }
                });
            };
            PresenceService.$inject = ['$q', '$rootScope', '$firebaseArray', '$firebaseObject', '$location', 'apSyncService', 'toastr'];
            return PresenceService;
        })();
        sync.PresenceService = PresenceService;
        function identifyBrowser() {
            var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE ' + (tem[1] || '');
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null)
                    return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null)
                M.splice(1, 1, tem[1]);
            return M.join(' ');
        }
    })(sync = ap.sync || (ap.sync = {}));
})(ap || (ap = {}));

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="sync_point.ts" />
/// <reference path="lock.ts" />
/// <reference path="sync_service.ts" />
/// <reference path="presence_service.ts" />
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
var ap;
(function (ap) {
    var sync;
    (function (sync) {
        'use strict';
        angular.module('apSync', ['angularPoint', 'toastr'])
            .service('apSyncService', sync.SyncService)
            .service('apPresenceService', sync.PresenceService)
            .run(Run);
        //Instantiate immediately
        function Run(apPresenceService) { }
    })(sync = ap.sync || (ap.sync = {}));
})(ap || (ap = {}));

//# sourceMappingURL=angular-point-sync.js.map