(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular-point"), require("lodash"), require("moment"), require("toastr"));
	else if(typeof define === 'function' && define.amd)
		define(["angular-point", "lodash", "moment", "toastr"], factory);
	else if(typeof exports === 'object')
		exports["angular-point-sync"] = factory(require("angular-point"), require("lodash"), require("moment"), require("toastr"));
	else
		root["angular-point-sync"] = factory(root["angular-point"], root["lodash"], root["moment"], root["toastr"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sync_point_factory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lock_factory__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return serviceIsInitialized; });
/* harmony export (binding) */ __webpack_require__.d(exports, "f", function() { return deferred; });
/* harmony export (binding) */ __webpack_require__.d(exports, "g", function() { return apListItemFactory; });
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return $rootScope; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return $firebaseArray; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return $q; });
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return SyncService; });


var $q, $firebaseArray, $rootScope, apListItemFactory, deferred, serviceIsInitialized;
var SyncService = (function () {
    function SyncService(_$firebaseArray_, _$q_, _apListItemFactory_, _$rootScope_) {
        this.Lock = __WEBPACK_IMPORTED_MODULE_1__lock_factory__["a" /* Lock */];
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
        return new __WEBPACK_IMPORTED_MODULE_0__sync_point_factory__["a" /* SyncPoint */](model);
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
        deferred.resolve({ userId: userId, firebaseUrl: firebaseUrl });
        apListItemFactory.ListItem.prototype.lock = __WEBPACK_IMPORTED_MODULE_1__lock_factory__["a" /* Lock */];
    };
    return SyncService;
}());

/** Minification safe - we're using leading and trailing underscores but gulp plugin doesn't treat them correctly */
SyncService.$inject = ['$firebaseArray', '$q', 'apListItemFactory', '$rootScope'];


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_toastr__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sync_service__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PresenceService; });



var service;
/**
 * @ngdoc Object
 * @name PresenceService
 * @description
 * Creates a realtime reference to where each user is within the application when logged in, what browser they're using, when
 * the session was started, and if not online when the last time they were online.
 */
var PresenceService = (function () {
    function PresenceService($q, $rootScope, $firebaseArray, $firebaseObject, $location, apSyncService) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.identifyBrowser = identifyBrowser;
        service = this;
        var deferred = $q.defer();
        service.initializeSession = deferred.promise;
        //Wait for SyncService to be initialized with current users userId and firebaseUrl
        __WEBPACK_IMPORTED_MODULE_2__sync_service__["a" /* serviceIsInitialized */].then(function (initializationParamsObject) {
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
        return service.getSessionConnectioUrl(userId, sessionKey)
            .then(function (sessionConnectionUrl) {
            var sessionRef = new Firebase(sessionConnectionUrl);
            sessionRef.remove();
        });
    };
    PresenceService.prototype.displayUserNotification = function (notification) {
        if (__WEBPACK_IMPORTED_MODULE_0_toastr__) {
            __WEBPACK_IMPORTED_MODULE_0_toastr__[notification.toastType](notification.message, notification.title, notification.toastrOptions);
        }
        else {
            console[notification.toastType](notification.title, notification.message);
        }
    };
    PresenceService.prototype.getSessionNotificationsArray = function (userId, sessionKey) {
        return service.getSessionConnectioUrl(userId, sessionKey).then(function (sessionConnectionUrl) {
            var notificationsRef = new Firebase(sessionConnectionUrl + '/notifications');
            return service.$firebaseArray(notificationsRef).$loaded();
        });
    };
    PresenceService.prototype.getSessionConnectioUrl = function (userId, sessionKey) {
        return __WEBPACK_IMPORTED_MODULE_2__sync_service__["a" /* serviceIsInitialized */].then(function (initializationParamsObject) {
            return initializationParamsObject.firebaseUrl + 'users/' + userId + '/connections/' + sessionKey;
        });
    };
    PresenceService.prototype.getUserConnectionUrl = function (userId) {
        return __WEBPACK_IMPORTED_MODULE_2__sync_service__["a" /* serviceIsInitialized */].then(function (initializationParamsObject) {
            return initializationParamsObject.firebaseUrl + 'users/' + userId;
        });
    };
    PresenceService.prototype.getUsers = function () {
        return __WEBPACK_IMPORTED_MODULE_2__sync_service__["a" /* serviceIsInitialized */].then(function (initializationParamsObject) {
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
                __WEBPACK_IMPORTED_MODULE_1_lodash__["each"](notificationArray, function (notification, index) {
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
    return PresenceService;
}());

PresenceService.$inject = ['$q', '$rootScope', '$firebaseArray', '$firebaseObject', '$location', 'apSyncService'];
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


/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("lodash");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sync_service__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = Lock;



function Lock() {
    var deferred = __WEBPACK_IMPORTED_MODULE_2__sync_service__["b" /* $q */].defer();
    var listItem = this;
    /** Only can lock existing records */
    if (listItem.id) {
        var model_1 = listItem.getModel();
        /** Make sure user has rights to edit */
        var userPermMask = listItem.resolvePermissions();
        if (userPermMask.EditListItems) {
            __WEBPACK_IMPORTED_MODULE_2__sync_service__["a" /* serviceIsInitialized */]
                .then(function (initializationParams) {
                /** Reference to the firebase lock queue for this record*/
                var listItemLockRef = new Firebase(initializationParams.firebaseUrl + 'locks/' + model_1.list.title + '/' + listItem.id);
                var lockQueue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__sync_service__["c" /* $firebaseArray */])(listItemLockRef);
                /** Reference to the lock record I created */
                var myLockRef = lockQueue.$add({
                    userId: initializationParams.userId,
                    time: Firebase.ServerValue.TIMESTAMP
                });
                /** Passed as a reference so we can remove the lock when the modal form is closed*/
                var unlock = function () { return myLockRef.then(function (myLock) { return myLock.remove(); }); };
                //Automatically remove any list item locks older than 4 hours
                lockQueue.$loaded(function () { return __WEBPACK_IMPORTED_MODULE_1_lodash__["each"](lockQueue, function (listItemLock) {
                    if (__WEBPACK_IMPORTED_MODULE_0_moment__().diff(lockQueue, 'hours') > 4) {
                        console.log('Purging expired list item lock.', listItemLock);
                        lockQueue.$remove(listItemLock);
                    }
                }); });
                var lockReference = { lockQueue: lockQueue, myLockRef: myLockRef, unlock: unlock };
                myLockRef.then(function (lockRef) {
                    /** Remove the lock in the event the user looses connection, changes page, or closes browser*/
                    lockRef.onDisconnect().remove();
                    // var key = lockRef.key();
                    // var index = lockQueue.$indexFor(key); // returns location in the array
                    // deferredLock.resolve(lockQueue[index]);
                });
                // Include a referece to the lock in the queue
                deferred.resolve(lockReference);
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sync_service__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SyncPoint; });

// import {Model} from '../angular-point/factories/apModelFactory';

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
        __WEBPACK_IMPORTED_MODULE_1__sync_service__["a" /* serviceIsInitialized */]
            .then(function (initializationParams) {
            syncPoint.changeNotifier = new Firebase(initializationParams.firebaseUrl + '/changes/' + model.list.title);
            var query = syncPoint.changeNotifier.limitToLast(syncPoint.eventLogLength);
            syncPoint.recentEvents = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__sync_service__["c" /* $firebaseArray */])(query);
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
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](syncPoint.subscriptions, function (callback) {
            if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isFunction"](callback)) {
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
        __WEBPACK_IMPORTED_MODULE_1__sync_service__["a" /* serviceIsInitialized */]
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
            __WEBPACK_IMPORTED_MODULE_1__sync_service__["d" /* $rootScope */].$on('$stateChangeStart', function () {
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
}());



/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("angular-point");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("moment");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("toastr");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sync_service__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__presence_service__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_point__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_point___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular_point__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lock_factory__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sync_point_factory__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "Lock", function() { return __WEBPACK_IMPORTED_MODULE_3__lock_factory__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "PresenceService", function() { return __WEBPACK_IMPORTED_MODULE_1__presence_service__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "SyncPoint", function() { return __WEBPACK_IMPORTED_MODULE_4__sync_point_factory__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "serviceIsInitialized", function() { return __WEBPACK_IMPORTED_MODULE_0__sync_service__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "deferred", function() { return __WEBPACK_IMPORTED_MODULE_0__sync_service__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "apListItemFactory", function() { return __WEBPACK_IMPORTED_MODULE_0__sync_service__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "$rootScope", function() { return __WEBPACK_IMPORTED_MODULE_0__sync_service__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "$firebaseArray", function() { return __WEBPACK_IMPORTED_MODULE_0__sync_service__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "$q", function() { return __WEBPACK_IMPORTED_MODULE_0__sync_service__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "SyncService", function() { return __WEBPACK_IMPORTED_MODULE_0__sync_service__["e"]; });



/**
 * @ngdoc service
 * @name sync
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
__WEBPACK_IMPORTED_MODULE_2_angular_point__["AngularPointModule"]
    .service('apSyncService', __WEBPACK_IMPORTED_MODULE_0__sync_service__["e" /* SyncService */])
    .service('apPresenceService', __WEBPACK_IMPORTED_MODULE_1__presence_service__["a" /* PresenceService */])
    .run(['apPresenceService', function (apPresenceService) {
    }]);






/***/ }
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyMWRhODM5YmI5MDA3MmRhNGNhOCIsIndlYnBhY2s6Ly8vLi9zcmMvc3luYy5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW5jZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy8uL3NyYy9sb2NrLmZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N5bmMtcG9pbnQuZmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyLXBvaW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG9hc3RyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdENkY7QUFDekM7QUFDN0MsSUFBSSxFQUFFLEVBQ1QsY0FB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LENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFFdkIsQ0FBQztJQUVELCtCQUFXLEdBQVgsVUFBWSxRQUFRO1FBQ2hCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNMLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUM7Ozs7Ozs7O0FDdkpELDBDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQTJDO0FBQ1E7QUFDRjtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFHSCxpRUFBa0I7S0FDYixPQUFPLENBQUMsZUFBZSxFQUFFLGtFQUFXLENBQUM7S0FDckMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLDBFQUFlLENBQUM7S0FFN0MsR0FBRyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxpQkFBaUI7SUFDN0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUd1QjtBQUNJO0FBQ0U7QUFDTiIsImZpbGUiOiJhbmd1bGFyLXBvaW50LXN5bmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyLXBvaW50XCIpLCByZXF1aXJlKFwibG9kYXNoXCIpLCByZXF1aXJlKFwibW9tZW50XCIpLCByZXF1aXJlKFwidG9hc3RyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImFuZ3VsYXItcG9pbnRcIiwgXCJsb2Rhc2hcIiwgXCJtb21lbnRcIiwgXCJ0b2FzdHJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYW5ndWxhci1wb2ludC1zeW5jXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhci1wb2ludFwiKSwgcmVxdWlyZShcImxvZGFzaFwiKSwgcmVxdWlyZShcIm1vbWVudFwiKSwgcmVxdWlyZShcInRvYXN0clwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYW5ndWxhci1wb2ludC1zeW5jXCJdID0gZmFjdG9yeShyb290W1wiYW5ndWxhci1wb2ludFwiXSwgcm9vdFtcImxvZGFzaFwiXSwgcm9vdFtcIm1vbWVudFwiXSwgcm9vdFtcInRvYXN0clwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9yeSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb3J5IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHR9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDIxZGE4MzliYjkwMDcyZGE0Y2E4IiwiaW1wb3J0IHtNb2RlbH0gZnJvbSAnYW5ndWxhci1wb2ludCc7XG5pbXBvcnQge0lTeW5jU2VydmljZUluaXRpYWxpemF0aW9uUGFyYW1zLCBJU3luY1BvaW50LCBTeW5jUG9pbnR9IGZyb20gJy4vc3luYy1wb2ludC5mYWN0b3J5JztcbmltcG9ydCB7SUxvY2tSZWZlcmVuY2UsIExvY2t9IGZyb20gJy4vbG9jay5mYWN0b3J5JztcbmV4cG9ydCB2YXIgJHEsXG4gICAgJGZpcmViYXNlQXJyYXksXG4gICAgJHJvb3RTY29wZSxcbiAgICBhcExpc3RJdGVtRmFjdG9yeSxcbiAgICBkZWZlcnJlZDogbmcuSURlZmVycmVkPElTeW5jU2VydmljZUluaXRpYWxpemF0aW9uUGFyYW1zPixcbiAgICBzZXJ2aWNlSXNJbml0aWFsaXplZDogbmcuSVByb21pc2U8SVN5bmNTZXJ2aWNlSW5pdGlhbGl6YXRpb25QYXJhbXM+O1xuXG5leHBvcnQgaW50ZXJmYWNlIElTeW5jU2VydmljZSB7XG4gICAgY3JlYXRlU3luY1BvaW50KG1vZGVsOiBNb2RlbCk6IElTeW5jUG9pbnQ7XG4gICAgaW5pdGlhbGl6ZSh1c2VySWQ6IG51bWJlciwgZmlyZWJhc2VVcmw6IHN0cmluZyk6IHZvaWQ7XG4gICAgTG9jazogKCkgPT4gbmcuSVByb21pc2U8SUxvY2tSZWZlcmVuY2U+O1xufVxuXG5leHBvcnQgY2xhc3MgU3luY1NlcnZpY2UgaW1wbGVtZW50cyBJU3luY1NlcnZpY2Uge1xuICAgIC8qKiBNaW5pZmljYXRpb24gc2FmZSAtIHdlJ3JlIHVzaW5nIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHVuZGVyc2NvcmVzIGJ1dCBndWxwIHBsdWdpbiBkb2Vzbid0IHRyZWF0IHRoZW0gY29ycmVjdGx5ICovXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRmaXJlYmFzZUFycmF5JywgJyRxJywgJ2FwTGlzdEl0ZW1GYWN0b3J5JywgJyRyb290U2NvcGUnXTtcblxuICAgIGNvbnN0cnVjdG9yKF8kZmlyZWJhc2VBcnJheV8sIF8kcV8sIF9hcExpc3RJdGVtRmFjdG9yeV8sIF8kcm9vdFNjb3BlXykge1xuICAgICAgICAvKiogRXhwb3NlIHRvIHNlcnZpY2Ugc2NvcGUgKi9cbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAkZmlyZWJhc2VBcnJheSA9IF8kZmlyZWJhc2VBcnJheV87XG4gICAgICAgIGFwTGlzdEl0ZW1GYWN0b3J5ID0gX2FwTGlzdEl0ZW1GYWN0b3J5XztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcblxuICAgICAgICAvKiogQ3JlYXRlIGEgZGVmZXJyZWQgb2JqZWN0IHRoYXQgd2lsbCBhbGxvdyBzZXJ2aWNlIHRvIHByb2NlZWQgb25jZSBhIHVzZXJJZCBpcyBwcm92aWRlZCAqL1xuICAgICAgICBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgIHNlcnZpY2VJc0luaXRpYWxpemVkID0gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG5cbiAgICBjcmVhdGVTeW5jUG9pbnQobW9kZWw6IE1vZGVsKTogSVN5bmNQb2ludCB7XG4gICAgICAgIHJldHVybiBuZXcgU3luY1BvaW50KG1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gU2VydmljZSB3YWl0cyBmb3IgdXNlcklkIHRvIGJlIHByb3ZpZGVkIGJlZm9yZSBhZGRpbmcgdGhlIHdhdGNoIHRvIGV2ZW50IGFycmF5LlxuICAgICAqIEBwYXJhbSB7e3VzZXJJZDogdXNlcklkLCBmaXJlYmFzZVVybDogZmlyZWJhc2VVcmx9fSB1c2VySWRcbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gU2VydmljZSB3YWl0cyBmb3IgdXNlcklkIHRvIGJlIHByb3ZpZGVkIGJlZm9yZSBhZGRpbmcgdGhlIHdhdGNoIHRvIGV2ZW50IGFycmF5LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB1c2VySWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlyZWJhc2VVcmxcbiAgICAgKi9cbiAgICBpbml0aWFsaXplKHVzZXJJZDogbnVtYmVyLCBmaXJlYmFzZVVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoe3VzZXJJZDogdXNlcklkLCBmaXJlYmFzZVVybDogZmlyZWJhc2VVcmx9KTtcbiAgICAgICAgYXBMaXN0SXRlbUZhY3RvcnkuTGlzdEl0ZW0ucHJvdG90eXBlLmxvY2sgPSBMb2NrO1xuICAgIH1cblxuICAgIExvY2sgPSBMb2NrO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL3N5bmMuc2VydmljZS50cyIsImltcG9ydCAqIGFzIHRvYXN0ciBmcm9tICd0b2FzdHInO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtTeW5jU2VydmljZSwgc2VydmljZUlzSW5pdGlhbGl6ZWR9IGZyb20gJy4vc3luYy5zZXJ2aWNlJztcbmltcG9ydCB7SVN5bmNTZXJ2aWNlSW5pdGlhbGl6YXRpb25QYXJhbXN9IGZyb20gJy4vc3luYy1wb2ludC5mYWN0b3J5JztcbnZhciBzZXJ2aWNlOiBQcmVzZW5jZVNlcnZpY2U7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZpcmViYXNlU2Vzc2lvbk9iamVjdCBleHRlbmRzIEFuZ3VsYXJGaXJlT2JqZWN0IHtcbiAgICBicm93c2VyOiBzdHJpbmc7XG4gICAgY29ubmVjdGVkOiBudW1iZXI7XG4gICAgbGFzdEFjdGl2ZTogbnVtYmVyO1xuICAgIG5vdGlmaWNhdGlvbnM/OiBJVXNlck5vdGlmaWNhdGlvbltdO1xuICAgIHBhdGg6IHN0cmluZztcbiAgICByZWxvYWQ6IGJvb2xlYW47IC8vSGFyZCByZWZyZXNoIGJyb3dzZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVXNlck5vdGlmaWNhdGlvbiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIHRvYXN0VHlwZTogc3RyaW5nO1xuICAgIHRvYXN0ck9wdGlvbnM/OiBPYmplY3Q7XG4gICAgc2VuZGVySWQ/OiBudW1iZXI7XG4gICAgc2VuZGVyU2Vzc2lvbktleT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRmlyZWJhc2VVc2Vyc09iamVjdCB7XG4gICAgW2tleTogbnVtYmVyXTogeyAvL1VzZXIgSURcbiAgICAgICAgY29ubmVjdGlvbnM6IHsgW2tleTogc3RyaW5nXTogSUZpcmViYXNlU2Vzc2lvbk9iamVjdCB9IC8vT2JqZWN0IGZvciBlYWNoIGFjdGl2ZSBjb25uZWN0aW9uXG4gICAgICAgIGxhc3RPbmxpbmU6IG51bWJlcjsgLy9UaW1lc3RhbXBcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZpcmViYXNlV2F0Y2hFdmVudCB7XG4gICAgZXZlbnQ6IHN0cmluZztcbiAgICBrZXk6IHN0cmluZztcbiAgICBwcmV2SWQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQG5nZG9jIE9iamVjdFxuICogQG5hbWUgUHJlc2VuY2VTZXJ2aWNlXG4gKiBAZGVzY3JpcHRpb25cbiAqIENyZWF0ZXMgYSByZWFsdGltZSByZWZlcmVuY2UgdG8gd2hlcmUgZWFjaCB1c2VyIGlzIHdpdGhpbiB0aGUgYXBwbGljYXRpb24gd2hlbiBsb2dnZWQgaW4sIHdoYXQgYnJvd3NlciB0aGV5J3JlIHVzaW5nLCB3aGVuXG4gKiB0aGUgc2Vzc2lvbiB3YXMgc3RhcnRlZCwgYW5kIGlmIG5vdCBvbmxpbmUgd2hlbiB0aGUgbGFzdCB0aW1lIHRoZXkgd2VyZSBvbmxpbmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBQcmVzZW5jZVNlcnZpY2Uge1xuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcScsICckcm9vdFNjb3BlJywgJyRmaXJlYmFzZUFycmF5JywgJyRmaXJlYmFzZU9iamVjdCcsICckbG9jYXRpb24nLCAnYXBTeW5jU2VydmljZSddO1xuICAgIGlkZW50aWZ5QnJvd3NlciA9IGlkZW50aWZ5QnJvd3NlcjtcbiAgICBpbml0aWFsaXplU2Vzc2lvbjogbmcuSVByb21pc2U8SUZpcmViYXNlU2Vzc2lvbk9iamVjdD47XG4gICAgdXNlckNvbm5lY3Rpb25Vcmw6IHN0cmluZztcbiAgICB1c2VyczogQW5ndWxhckZpcmVPYmplY3Q7XG4gICAgc2Vzc2lvbkNvbm5lY3Rpb246IEZpcmViYXNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlLCAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlLCBwcml2YXRlICRmaXJlYmFzZUFycmF5OiBBbmd1bGFyRmlyZUFycmF5U2VydmljZSwgcHJpdmF0ZSAkZmlyZWJhc2VPYmplY3Q6IEFuZ3VsYXJGaXJlT2JqZWN0U2VydmljZSxcbiAgICAgICAgICAgICAgICAkbG9jYXRpb246IGFuZ3VsYXIuSUxvY2F0aW9uU2VydmljZSwgYXBTeW5jU2VydmljZTogU3luY1NlcnZpY2UpIHtcblxuICAgICAgICBzZXJ2aWNlID0gdGhpcztcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgc2VydmljZS5pbml0aWFsaXplU2Vzc2lvbiA9IGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgLy9XYWl0IGZvciBTeW5jU2VydmljZSB0byBiZSBpbml0aWFsaXplZCB3aXRoIGN1cnJlbnQgdXNlcnMgdXNlcklkIGFuZCBmaXJlYmFzZVVybFxuICAgICAgICBzZXJ2aWNlSXNJbml0aWFsaXplZC50aGVuKChpbml0aWFsaXphdGlvblBhcmFtc09iamVjdDogSVN5bmNTZXJ2aWNlSW5pdGlhbGl6YXRpb25QYXJhbXMpID0+IHtcbiAgICAgICAgICAgIHZhciB1c2VySWQgPSBpbml0aWFsaXphdGlvblBhcmFtc09iamVjdC51c2VySWQ7XG4gICAgICAgICAgICB2YXIgZmlyZWJhc2VVcmwgPSBpbml0aWFsaXphdGlvblBhcmFtc09iamVjdC5maXJlYmFzZVVybDtcbiAgICAgICAgICAgIHZhciBmaXJlYmFzZVJvb3QgPSBmaXJlYmFzZVVybC5yZXBsYWNlKCdvZmZsaW5lLycsICcnKTtcbiAgICAgICAgICAgIHNlcnZpY2UudXNlckNvbm5lY3Rpb25VcmwgPSBmaXJlYmFzZVVybCArICd1c2Vycy8nICsgdXNlcklkICsgJy8nO1xuXG4gICAgICAgICAgICAvLyB2YXIgdXNlcnNSZWYgPSBuZXcgRmlyZWJhc2UoZmlyZWJhc2VVcmwgKyAndXNlcnMnKTtcbiAgICAgICAgICAgIC8vIHNlcnZpY2UudXNlcnMgPSAkZmlyZWJhc2VPYmplY3QodXNlcnNSZWYpLiRsb2FkZWQ7XG5cbiAgICAgICAgICAgIC8vIHNpbmNlIEkgY2FuIGNvbm5lY3QgZnJvbSBtdWx0aXBsZSBkZXZpY2VzIG9yIGJyb3dzZXIgdGFicywgd2Ugc3RvcmUgZWFjaCBjb25uZWN0aW9uIGluc3RhbmNlIHNlcGFyYXRlbHlcbiAgICAgICAgICAgIC8vIGFueSB0aW1lIHRoYXQgY29ubmVjdGlvbnNSZWYncyB2YWx1ZSBpcyBudWxsIChpLmUuIGhhcyBubyBjaGlsZHJlbikgSSBhbSBvZmZsaW5lXG4gICAgICAgICAgICB2YXIgdGhpc0Nvbm5lY3Rpb25SZWYgPSBuZXcgRmlyZWJhc2Uoc2VydmljZS51c2VyQ29ubmVjdGlvblVybCArICdjb25uZWN0aW9ucycpO1xuXG4gICAgICAgICAgICAvLyBzdG9yZXMgdGhlIHRpbWVzdGFtcCBvZiBteSBsYXN0IGRpc2Nvbm5lY3QgKHRoZSBsYXN0IHRpbWUgSSB3YXMgc2VlbiBvbmxpbmUpXG4gICAgICAgICAgICB2YXIgbGFzdE9ubGluZVJlZiA9IG5ldyBGaXJlYmFzZShzZXJ2aWNlLnVzZXJDb25uZWN0aW9uVXJsICsgJ2xhc3RPbmxpbmUnKTtcbiAgICAgICAgICAgIHZhciBjb25uZWN0ZWRSZWYgPSBuZXcgRmlyZWJhc2UoZmlyZWJhc2VSb290ICsgJy5pbmZvL2Nvbm5lY3RlZCcpO1xuXG5cbiAgICAgICAgICAgIGNvbm5lY3RlZFJlZi5vbigndmFsdWUnLCBmdW5jdGlvbiAoc25hcCkge1xuICAgICAgICAgICAgICAgIGlmIChzbmFwLnZhbCgpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlJ3JlIGNvbm5lY3RlZCAob3IgcmVjb25uZWN0ZWQpISBEbyBhbnl0aGluZyBoZXJlIHRoYXQgc2hvdWxkIGhhcHBlbiBvbmx5IGlmIG9ubGluZSAob3Igb24gcmVjb25uZWN0KVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGlzIGRldmljZSB0byBteSBjb25uZWN0aW9ucyBsaXN0XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgdmFsdWUgY29udGFpbnMgaW5mbyBhYm91dCB0aGUgZGV2aWNlIGFuZCBjb25uZWN0aW9uIHN0YXJ0IHRpbWVzdGFtcFxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlc3Npb25Db25uZWN0aW9uID0gdGhpc0Nvbm5lY3Rpb25SZWYucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyOiBpZGVudGlmeUJyb3dzZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogRmlyZWJhc2UuU2VydmVyVmFsdWUuVElNRVNUQU1QLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEFjdGl2ZTogRmlyZWJhc2UuU2VydmVyVmFsdWUuVElNRVNUQU1QLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJGxvY2F0aW9uLnVybCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsb2FkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvL1VwZGF0ZSB0aGUgY3VycmVudCBwYXRoIHdoZW5ldmVyIHN0YXRlIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIGN1cnJlbnQsIHByZXZpb3VzLCByZWplY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uuc2Vzc2lvbkNvbm5lY3Rpb24udXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0QWN0aXZlOiBGaXJlYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJGxvY2F0aW9uLnVybCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBJIGRpc2Nvbm5lY3QsIHJlbW92ZSB0aGlzIGRldmljZVxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlc3Npb25Db25uZWN0aW9uLm9uRGlzY29ubmVjdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gSSBkaXNjb25uZWN0LCB1cGRhdGUgdGhlIGxhc3QgdGltZSBJIHdhcyBzZWVuIG9ubGluZVxuICAgICAgICAgICAgICAgICAgICBsYXN0T25saW5lUmVmLm9uRGlzY29ubmVjdCgpLnNldChGaXJlYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVApO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVTZXNzaW9uT2JqZWN0ID0gc2VydmljZS4kZmlyZWJhc2VPYmplY3Qoc2VydmljZS5zZXNzaW9uQ29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoYWN0aXZlU2Vzc2lvbk9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gd2F0Y2ggZm9yIGV2ZW50c1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLndhdGNoRm9yUmVsb2FkRXZlbnQoPGFueT4gYWN0aXZlU2Vzc2lvbk9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2Uud2F0Y2hGb3JOb3RpZmljYXRpb25zKHVzZXJJZCwgYWN0aXZlU2Vzc2lvbk9iamVjdC4kaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgZGVsZXRlU2Vzc2lvbkRhdGEodXNlcklkOiBudW1iZXIsIHNlc3Npb25LZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gc2VydmljZS5nZXRTZXNzaW9uQ29ubmVjdGlvVXJsKHVzZXJJZCwgc2Vzc2lvbktleSlcbiAgICAgICAgICAgIC50aGVuKHNlc3Npb25Db25uZWN0aW9uVXJsID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc2Vzc2lvblJlZiA9IG5ldyBGaXJlYmFzZShzZXNzaW9uQ29ubmVjdGlvblVybCk7XG4gICAgICAgICAgICAgICAgc2Vzc2lvblJlZi5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc3BsYXlVc2VyTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogSVVzZXJOb3RpZmljYXRpb24pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRvYXN0cikge1xuICAgICAgICAgICAgdG9hc3RyW25vdGlmaWNhdGlvbi50b2FzdFR5cGVdKG5vdGlmaWNhdGlvbi5tZXNzYWdlLCBub3RpZmljYXRpb24udGl0bGUsIG5vdGlmaWNhdGlvbi50b2FzdHJPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGVbbm90aWZpY2F0aW9uLnRvYXN0VHlwZV0obm90aWZpY2F0aW9uLnRpdGxlLCBub3RpZmljYXRpb24ubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZXNzaW9uTm90aWZpY2F0aW9uc0FycmF5KHVzZXJJZDogbnVtYmVyLCBzZXNzaW9uS2V5OiBzdHJpbmcpOiBuZy5JUHJvbWlzZTxBbmd1bGFyRmlyZUFycmF5PiB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlLmdldFNlc3Npb25Db25uZWN0aW9VcmwodXNlcklkLCBzZXNzaW9uS2V5KS50aGVuKChzZXNzaW9uQ29ubmVjdGlvblVybCkgPT4ge1xuICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbnNSZWYgPSBuZXcgRmlyZWJhc2Uoc2Vzc2lvbkNvbm5lY3Rpb25VcmwgKyAnL25vdGlmaWNhdGlvbnMnKTtcbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLiRmaXJlYmFzZUFycmF5KG5vdGlmaWNhdGlvbnNSZWYpLiRsb2FkZWQoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRTZXNzaW9uQ29ubmVjdGlvVXJsKHVzZXJJZDogbnVtYmVyLCBzZXNzaW9uS2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJc0luaXRpYWxpemVkLnRoZW4oKGluaXRpYWxpemF0aW9uUGFyYW1zT2JqZWN0OiBJU3luY1NlcnZpY2VJbml0aWFsaXphdGlvblBhcmFtcykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxpemF0aW9uUGFyYW1zT2JqZWN0LmZpcmViYXNlVXJsICsgJ3VzZXJzLycgKyB1c2VySWQgKyAnL2Nvbm5lY3Rpb25zLycgKyBzZXNzaW9uS2V5O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRVc2VyQ29ubmVjdGlvblVybCh1c2VySWQ6IG51bWJlcik6IG5nLklQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gc2VydmljZUlzSW5pdGlhbGl6ZWQudGhlbigoaW5pdGlhbGl6YXRpb25QYXJhbXNPYmplY3Q6IElTeW5jU2VydmljZUluaXRpYWxpemF0aW9uUGFyYW1zKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbGl6YXRpb25QYXJhbXNPYmplY3QuZmlyZWJhc2VVcmwgKyAndXNlcnMvJyArIHVzZXJJZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0VXNlcnMoKTogbmcuSVByb21pc2U8SUZpcmViYXNlVXNlcnNPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJc0luaXRpYWxpemVkLnRoZW4oKGluaXRpYWxpemF0aW9uUGFyYW1zT2JqZWN0OiBJU3luY1NlcnZpY2VJbml0aWFsaXphdGlvblBhcmFtcykgPT4ge1xuICAgICAgICAgICAgaWYgKCFzZXJ2aWNlLnVzZXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXJzUmVmID0gbmV3IEZpcmViYXNlKGluaXRpYWxpemF0aW9uUGFyYW1zT2JqZWN0LmZpcmViYXNlVXJsICsgJ3VzZXJzJyk7XG4gICAgICAgICAgICAgICAgc2VydmljZS51c2VycyA9IHNlcnZpY2UuJGZpcmViYXNlT2JqZWN0KHVzZXJzUmVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLnVzZXJzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWxvYWRCcm93c2VyKHVzZXJJZDogbnVtYmVyLCBzZXNzaW9uS2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc2VydmljZS5nZXRTZXNzaW9uQ29ubmVjdGlvVXJsKHVzZXJJZCwgc2Vzc2lvbktleSkudGhlbigoc2Vzc2lvbkNvbm5lY3Rpb25VcmwpID0+IHtcbiAgICAgICAgICAgIHZhciBzZXNzaW9uUmVmID0gbmV3IEZpcmViYXNlKHNlc3Npb25Db25uZWN0aW9uVXJsKTtcbiAgICAgICAgICAgIHZhciBzZXNzaW9uT2JqZWN0OiBhbnkgPSBzZXJ2aWNlLiRmaXJlYmFzZU9iamVjdChzZXNzaW9uUmVmKTtcbiAgICAgICAgICAgIHNlc3Npb25PYmplY3QuJGxvYWRlZCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uT2JqZWN0LnJlbG9hZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25PYmplY3QuJHNhdmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZW5kVXNlck5vdGlmaWNhdGlvbih1c2VySWQ6IG51bWJlciwgc2Vzc2lvbktleTogc3RyaW5nLCBub3RpZmljYXRpb246IElVc2VyTm90aWZpY2F0aW9uKTogbmcuSVByb21pc2U8SVVzZXJOb3RpZmljYXRpb24+IHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gdGhpcy4kcS5kZWZlcigpO1xuICAgICAgICB0aGlzLmdldFNlc3Npb25Ob3RpZmljYXRpb25zQXJyYXkodXNlcklkLCBzZXNzaW9uS2V5KVxuICAgICAgICAgICAgLnRoZW4oKHNlc3Npb25Ob3RpZmljYXRpb25zKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzZXNzaW9uTm90aWZpY2F0aW9ucy4kYWRkKG5vdGlmaWNhdGlvbikpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfVxuXG4gICAgd2F0Y2hGb3JOb3RpZmljYXRpb25zKHVzZXJJZDogbnVtYmVyLCBzZXNzaW9uS2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRTZXNzaW9uTm90aWZpY2F0aW9uc0FycmF5KHVzZXJJZCwgc2Vzc2lvbktleSlcbiAgICAgICAgICAgIC50aGVuKChub3RpZmljYXRpb25BcnJheTogQW5ndWxhckZpcmVBcnJheSkgPT4gbm90aWZpY2F0aW9uQXJyYXkuJHdhdGNoKChldmVudE9iamVjdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9UcmlnZ2VyIHdoZW4gYSBuZXcgbm90aWZpY2F0aW9uIGlzIGFkZGVkIHRvIHRoZSBzZXNzaW9uIG5vdGlmaWNhdGlvbnMgYXJyYXlcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRPYmplY3QuZXZlbnQgPT09ICdjaGlsZF9hZGRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKG5vdGlmaWNhdGlvbkFycmF5LCAobm90aWZpY2F0aW9uOiBJVXNlck5vdGlmaWNhdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuZGlzcGxheVVzZXJOb3RpZmljYXRpb24obm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbkFycmF5LiRyZW1vdmUobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgfVxuXG4gICAgd2F0Y2hGb3JSZWxvYWRFdmVudChhY3RpdmVTZXNzaW9uT2JqZWN0OiBJRmlyZWJhc2VTZXNzaW9uT2JqZWN0KTogdm9pZCB7XG4gICAgICAgIGFjdGl2ZVNlc3Npb25PYmplY3QuJHdhdGNoKChldmVudE9iamVjdDogSUZpcmViYXNlV2F0Y2hFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCEhYWN0aXZlU2Vzc2lvbk9iamVjdC5yZWxvYWQpIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVTZXNzaW9uT2JqZWN0LnJlbG9hZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGFjdGl2ZVNlc3Npb25PYmplY3QuJHNhdmUoKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaWRlbnRpZnlCcm93c2VyKCk6IHN0cmluZyB7XG4gICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCwgdGVtLFxuICAgICAgICBNID0gdWEubWF0Y2goLyhvcGVyYXxjaHJvbWV8c2FmYXJpfGZpcmVmb3h8bXNpZXx0cmlkZW50KD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fCBbXTtcbiAgICBpZiAoL3RyaWRlbnQvaS50ZXN0KE1bMV0pKSB7XG4gICAgICAgIHRlbSA9IC9cXGJydlsgOl0rKFxcZCspL2cuZXhlYyh1YSkgfHwgW107XG4gICAgICAgIHJldHVybiAnSUUgJyArICh0ZW1bMV0gfHwgJycpO1xuICAgIH1cbiAgICBpZiAoTVsxXSA9PT0gJ0Nocm9tZScpIHtcbiAgICAgICAgdGVtID0gdWEubWF0Y2goL1xcYihPUFJ8RWRnZSlcXC8oXFxkKykvKTtcbiAgICAgICAgaWYgKHRlbSAhPSBudWxsKSByZXR1cm4gdGVtLnNsaWNlKDEpLmpvaW4oJyAnKS5yZXBsYWNlKCdPUFInLCAnT3BlcmEnKTtcbiAgICB9XG4gICAgTSA9IE1bMl0gPyBbTVsxXSwgTVsyXV0gOiBbbmF2aWdhdG9yLmFwcE5hbWUsIG5hdmlnYXRvci5hcHBWZXJzaW9uLCAnLT8nXTtcbiAgICBpZiAoKHRlbSA9IHVhLm1hdGNoKC92ZXJzaW9uXFwvKFxcZCspL2kpKSAhPSBudWxsKSBNLnNwbGljZSgxLCAxLCB0ZW1bMV0pO1xuICAgIHJldHVybiBNLmpvaW4oJyAnKTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL3ByZXNlbmNlLnNlcnZpY2UudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJsb2Rhc2hcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7c2VydmljZUlzSW5pdGlhbGl6ZWQsICRmaXJlYmFzZUFycmF5LCAkcX0gZnJvbSAnLi9zeW5jLnNlcnZpY2UnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxvY2tSZWZlcmVuY2Uge1xuICAgIGxvY2tRdWV1ZTogQW5ndWxhckZpcmVBcnJheTtcbiAgICBteUxvY2tSZWY6IG5nLklQcm9taXNlPEZpcmViYXNlPjtcbiAgICB1bmxvY2soKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTGlzdEl0ZW1Mb2NrIHtcbiAgICB1c2VySWQ6IG51bWJlcjtcbiAgICB0aW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMb2NrKCk6IG5nLklQcm9taXNlPElMb2NrUmVmZXJlbmNlPiB7XG4gICAgY29uc3QgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzO1xuXG4gICAgLyoqIE9ubHkgY2FuIGxvY2sgZXhpc3RpbmcgcmVjb3JkcyAqL1xuICAgIGlmIChsaXN0SXRlbS5pZCkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IGxpc3RJdGVtLmdldE1vZGVsKCk7XG4gICAgICAgIC8qKiBNYWtlIHN1cmUgdXNlciBoYXMgcmlnaHRzIHRvIGVkaXQgKi9cbiAgICAgICAgY29uc3QgdXNlclBlcm1NYXNrID0gbGlzdEl0ZW0ucmVzb2x2ZVBlcm1pc3Npb25zKCk7XG4gICAgICAgIGlmICh1c2VyUGVybU1hc2suRWRpdExpc3RJdGVtcykge1xuXG4gICAgICAgICAgICBzZXJ2aWNlSXNJbml0aWFsaXplZFxuICAgICAgICAgICAgICAgIC50aGVuKChpbml0aWFsaXphdGlvblBhcmFtcykgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGZpcmViYXNlIGxvY2sgcXVldWUgZm9yIHRoaXMgcmVjb3JkKi9cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW1Mb2NrUmVmID0gbmV3IEZpcmViYXNlKGluaXRpYWxpemF0aW9uUGFyYW1zLmZpcmViYXNlVXJsICsgJ2xvY2tzLycgKyBtb2RlbC5saXN0LnRpdGxlICsgJy8nICsgbGlzdEl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NrUXVldWUgPSAkZmlyZWJhc2VBcnJheShsaXN0SXRlbUxvY2tSZWYpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGxvY2sgcmVjb3JkIEkgY3JlYXRlZCAqL1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBteUxvY2tSZWYgPSBsb2NrUXVldWUuJGFkZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IGluaXRpYWxpemF0aW9uUGFyYW1zLnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IEZpcmViYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvKiogUGFzc2VkIGFzIGEgcmVmZXJlbmNlIHNvIHdlIGNhbiByZW1vdmUgdGhlIGxvY2sgd2hlbiB0aGUgbW9kYWwgZm9ybSBpcyBjbG9zZWQqL1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bmxvY2sgPSAoKSA9PiBteUxvY2tSZWYudGhlbigobXlMb2NrKSA9PiBteUxvY2sucmVtb3ZlKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQXV0b21hdGljYWxseSByZW1vdmUgYW55IGxpc3QgaXRlbSBsb2NrcyBvbGRlciB0aGFuIDQgaG91cnNcbiAgICAgICAgICAgICAgICAgICAgbG9ja1F1ZXVlLiRsb2FkZWQoKCkgPT4gXy5lYWNoKGxvY2tRdWV1ZSwgKGxpc3RJdGVtTG9jazogSUxpc3RJdGVtTG9jaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbWVudCgpLmRpZmYobG9ja1F1ZXVlLCAnaG91cnMnKSA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUHVyZ2luZyBleHBpcmVkIGxpc3QgaXRlbSBsb2NrLicsIGxpc3RJdGVtTG9jayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja1F1ZXVlLiRyZW1vdmUobGlzdEl0ZW1Mb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2tSZWZlcmVuY2UgPSB7bG9ja1F1ZXVlLCBteUxvY2tSZWYsIHVubG9ja307XG5cbiAgICAgICAgICAgICAgICAgICAgbXlMb2NrUmVmLnRoZW4oKGxvY2tSZWYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBSZW1vdmUgdGhlIGxvY2sgaW4gdGhlIGV2ZW50IHRoZSB1c2VyIGxvb3NlcyBjb25uZWN0aW9uLCBjaGFuZ2VzIHBhZ2UsIG9yIGNsb3NlcyBicm93c2VyKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tSZWYub25EaXNjb25uZWN0KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIga2V5ID0gbG9ja1JlZi5rZXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciBpbmRleCA9IGxvY2tRdWV1ZS4kaW5kZXhGb3Ioa2V5KTsgLy8gcmV0dXJucyBsb2NhdGlvbiBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmVycmVkTG9jay5yZXNvbHZlKGxvY2tRdWV1ZVtpbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEluY2x1ZGUgYSByZWZlcmVjZSB0byB0aGUgbG9jayBpbiB0aGUgcXVldWVcblxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxvY2tSZWZlcmVuY2UpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qKiBVc2VyIGRvZXNuJ3QgaGF2ZSBlZGl0IHJpZ2h0cyAqL1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7fSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvKiogTmV3IHJlY29yZCBzbyBjYW4ndCBsb2NrICovXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoe30pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL2xvY2suZmFjdG9yeS50cyIsImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJ2FuZ3VsYXItcG9pbnQnO1xuLy8gaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi4vYW5ndWxhci1wb2ludC9mYWN0b3JpZXMvYXBNb2RlbEZhY3RvcnknO1xuaW1wb3J0IHtzZXJ2aWNlSXNJbml0aWFsaXplZCwgJGZpcmViYXNlQXJyYXksICRyb290U2NvcGV9IGZyb20gJy4vc3luYy5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3luY1NlcnZpY2VDaGFuZ2VFdmVudCB7XG4gICAgY2hhbmdlVHlwZTogc3RyaW5nOyAvLyAnYWRkJ3wndXBkYXRlJ3wnZGVsZXRlJztcbiAgICBsaXN0SXRlbUlkOiBudW1iZXI7XG4gICAgdXNlcklkOiBudW1iZXI7XG4gICAgdGltZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTeW5jU2VydmljZUluaXRpYWxpemF0aW9uUGFyYW1zIHtcbiAgICB1c2VySWQ6IG51bWJlcjtcbiAgICBmaXJlYmFzZVVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTeW5jUG9pbnQge1xuICAgIGV2ZW50TG9nTGVuZ3RoOiBudW1iZXI7XG4gICAgcmVjZW50RXZlbnRzOiBJU3luY1NlcnZpY2VDaGFuZ2VFdmVudFtdO1xuICAgIHJlZ2lzdGVyQ2hhbmdlKGNoYW5nZVR5cGU6IHN0cmluZywgbGlzdEl0ZW1JZDogbnVtYmVyKTtcbiAgICBzdWJzY3JpYmVUb0NoYW5nZXMoY2FsbGJhY2s6IEZ1bmN0aW9uLCB1bnN1YnNjcmliZU9uU3RhdGVDaGFuZ2U6IGJvb2xlYW4pOiBGdW5jdGlvbjtcbiAgICB1bnN1YnNjcmliZShjYWxsYmFjayk7XG59XG5cblxuZXhwb3J0IGNsYXNzIFN5bmNQb2ludCBpbXBsZW1lbnRzIElTeW5jUG9pbnQge1xuICAgIGV2ZW50TG9nTGVuZ3RoID0gMTA7XG4gICAgY2hhbmdlTm90aWZpZXI7XG4gICAgcmVjZW50RXZlbnRzO1xuICAgIC8qKiBDb250YWluZXIgdG8gaG9sZCBhbGwgY3VycmVudCBzdWJzY3JpcHRpb25zIGZvciB0aGUgbW9kZWwgKi9cbiAgICBzdWJzY3JpcHRpb25zID0gW107XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtb2RlbFxuICAgICAqIEBwYXJhbSB1cGRhdGVRdWVyeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE1vZGVsKSB7XG4gICAgICAgIHZhciBzeW5jUG9pbnQgPSB0aGlzO1xuXG4gICAgICAgIHNlcnZpY2VJc0luaXRpYWxpemVkXG4gICAgICAgICAgICAudGhlbigoaW5pdGlhbGl6YXRpb25QYXJhbXM6IElTeW5jU2VydmljZUluaXRpYWxpemF0aW9uUGFyYW1zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBzeW5jUG9pbnQuY2hhbmdlTm90aWZpZXIgPSBuZXcgRmlyZWJhc2UoaW5pdGlhbGl6YXRpb25QYXJhbXMuZmlyZWJhc2VVcmwgKyAnL2NoYW5nZXMvJyArIG1vZGVsLmxpc3QudGl0bGUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gc3luY1BvaW50LmNoYW5nZU5vdGlmaWVyLmxpbWl0VG9MYXN0KHN5bmNQb2ludC5ldmVudExvZ0xlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICBzeW5jUG9pbnQucmVjZW50RXZlbnRzID0gJGZpcmViYXNlQXJyYXkocXVlcnkpO1xuXG4gICAgICAgICAgICAgICAgc3luY1BvaW50LnJlY2VudEV2ZW50cy4kbG9hZGVkKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGV2ZW50QXJyYXkpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqIEZpcmVkIHdoZW4gYW55b25lIHVwZGF0ZXMgYSBsaXN0IGl0ZW0gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHN5bmNQb2ludC5yZWNlbnRFdmVudHMuJHdhdGNoKChsb2cpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmV2ZW50ID09PSAnY2hpbGRfYWRkZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdFdmVudDogSVN5bmNTZXJ2aWNlQ2hhbmdlRXZlbnQgPSBzeW5jUG9pbnQucmVjZW50RXZlbnRzLiRnZXRSZWNvcmQobG9nLmtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBDYXB0dXJlIGlmIGV2ZW50IHdhcyBjYXVzZWQgYnkgY3VycmVudCB1c2VyICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHRlcm5hbFRyaWdnZXIgPSBuZXdFdmVudC51c2VySWQgIT09IGluaXRpYWxpemF0aW9uUGFyYW1zLnVzZXJJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3luY1BvaW50LnByb2Nlc3NDaGFuZ2VzKG5ld0V2ZW50LCBleHRlcm5hbFRyaWdnZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0lTeW5jU2VydmljZUNoYW5nZUV2ZW50fSBuZXdFdmVudCBEZXRhaWxzIG9mIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXh0ZXJuYWxUcmlnZ2VyIFdhcyB0aGUgY2hhbmdlZCBjYXVzZWQgYnkgYW5vdGhlciB1c2VyLlxuICAgICAqL1xuICAgIHByaXZhdGUgcHJvY2Vzc0NoYW5nZXMobmV3RXZlbnQ6IElTeW5jU2VydmljZUNoYW5nZUV2ZW50LCBleHRlcm5hbFRyaWdnZXI6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdmFyIHN5bmNQb2ludCA9IHRoaXM7XG4gICAgICAgIC8qKiBOb3RpZnkgc3Vic2NyaWJlcnMgKi9cbiAgICAgICAgXy5lYWNoKHN5bmNQb2ludC5zdWJzY3JpcHRpb25zLCAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobmV3RXZlbnQsIGV4dGVybmFsVHJpZ2dlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgICAqIEBuYW1lIFN5bmNQb2ludC5yZWdpc3RlckNoYW5nZVxuICAgICAqIEBtZXRob2RPZiBTeW5jUG9pbnRcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBOb3RpZnkgYWxsIG90aGVyIHVzZXJzIGxpc3RlbmluZyB0byB0aGlzIG1vZGVsIHRoYXQgYSBjaGFuZ2UgaGFzIGJlZW4gbWFkZS5cbiAgICAgKi9cbiAgICByZWdpc3RlckNoYW5nZShjaGFuZ2VUeXBlOiBzdHJpbmcsIGxpc3RJdGVtSWQ6IG51bWJlcikge1xuICAgICAgICB2YXIgc3luY1BvaW50ID0gdGhpcztcbiAgICAgICAgc2VydmljZUlzSW5pdGlhbGl6ZWRcbiAgICAgICAgICAgIC50aGVuKChpbml0aWFsaXphdGlvblBhcmFtcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzeW5jUG9pbnQucmVjZW50RXZlbnRzLmxlbmd0aCA+PSBzeW5jUG9pbnQuZXZlbnRMb2dMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqIFRyaW0gdGhlIGxvZyB0byBwcmV2ZW50IHVubmVjZXNzYXJ5IHNpemUgKi9cbiAgICAgICAgICAgICAgICAgICAgc3luY1BvaW50LnJlY2VudEV2ZW50cy4kcmVtb3ZlKDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN5bmNQb2ludC5yZWNlbnRFdmVudHMuJGFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVR5cGU6IGNoYW5nZVR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtSWQ6IGxpc3RJdGVtSWQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogaW5pdGlhbGl6YXRpb25QYXJhbXMudXNlcklkLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBGaXJlYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIGZ1bmN0aW9uXG4gICAgICogQG5hbWUgU3luY1BvaW50LnN1YnNjcmliZVRvQ2hhbmdlc1xuICAgICAqIEBtZXRob2RPZiBTeW5jUG9pbnRcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBBbGxvd3Mgc3Vic2NyaWJlcnMgKGNvbnRyb2xsZXJzICYgc2VydmljZXMpIHRvIGJlIG5vdGlmaWVkIHdoZW4gY2hhbmdlIGlzIG1hZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBleGVjdXRlIGFmdGVyIGEgY2hhbmdlIGlzIG1hZGUuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbdW5zdWJzY3JpYmVPblN0YXRlQ2hhbmdlID0gdHJ1ZV1cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEZ1bmN0aW9uIHVzZWQgdG8gdW5zdWJzY3JpYmUuXG4gICAgICovXG4gICAgc3Vic2NyaWJlVG9DaGFuZ2VzKGNhbGxiYWNrOiBGdW5jdGlvbiwgdW5zdWJzY3JpYmVPblN0YXRlQ2hhbmdlOiBib29sZWFuID0gdHJ1ZSk6IEZ1bmN0aW9uIHtcbiAgICAgICAgdmFyIHN5bmNQb2ludCA9IHRoaXM7XG4gICAgICAgIGlmIChzeW5jUG9pbnQuc3Vic2NyaXB0aW9ucy5pbmRleE9mKGNhbGxiYWNrKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8qKiBPbmx5IHJlZ2lzdGVyIG5ldyBzdWJzY3JpcHRpb25zLCBpZ25vcmUgaWYgc3Vic2NyaXB0aW9uIGFscmVhZHkgZXhpc3RzICovXG4gICAgICAgICAgICBzeW5jUG9pbnQuc3Vic2NyaXB0aW9ucy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9ICgpID0+IHRoaXMudW5zdWJzY3JpYmUoY2FsbGJhY2spO1xuXG4gICAgICAgIGlmICh1bnN1YnNjcmliZU9uU3RhdGVDaGFuZ2UpIHtcbiAgICAgICAgICAgIC8vdmFyICRyb290U2NvcGUgPSAkaW5qZWN0b3IuZ2V0KCckcm9vdFNjb3BlJyk7XG5cbiAgICAgICAgICAgIC8qKiBVbnN1YnNjcmliZSBmcm9tIG5vdGlmaWNhdGlvbnMgd2hlbiB3ZSBsZWF2ZSB0aGlzIHN0YXRlICovXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG5cbiAgICB9XG5cbiAgICB1bnN1YnNjcmliZShjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnN1YnNjcmlwdGlvbnMuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL3N5bmMtcG9pbnQuZmFjdG9yeS50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFuZ3VsYXItcG9pbnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhbmd1bGFyLXBvaW50XCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9tZW50XCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG9hc3RyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidG9hc3RyXCJcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtTeW5jU2VydmljZX0gZnJvbSAnLi9zeW5jLnNlcnZpY2UnO1xuaW1wb3J0IHtQcmVzZW5jZVNlcnZpY2V9IGZyb20gJy4vcHJlc2VuY2Uuc2VydmljZSc7XG5pbXBvcnQge0FuZ3VsYXJQb2ludE1vZHVsZX0gZnJvbSAnYW5ndWxhci1wb2ludCc7XG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lIHN5bmNcbiAqIEBkZXNjcmlwdGlvblxuICogU3VwcG9ydHMgMy13YXkgZGF0YSBiaW5kaW5nIGlmIHlvdSBkZWNpZGUgdG8gaW5jb3Jwb3JhdGUgZmlyZWJhc2UgKGFueSBjaGFuZ2UgYnkgYW55IHVzZXJcbiAqIHRvIGEgbGlzdCBpdGVtIGlzIG1pcnJvcmVkIGFjcm9zcyB1c2VycykuIFRoZSBkYXRhIGlzbid0IHNhdmVkIHRvIGZpcmViYXNlIGJ1dCB0aGUgY2hhbmdlXG4gKiBldmVudCBpcyBzbyBhbGwgc3Vic2NyaWJlcnMgYXJlIG5vdGlmaWVkIHRvIHJlcXVlc3QgYW4gdXBkYXRlIGZyb20gU2hhcmVQb2ludC5cbiAqXG4gKiBJbiBvcmRlciB0byBnZXQgdGhpcyBzZXJ2aWNlIHRvIHdvcmssIHlvdSBuZWVkIHRvIGhhdmUgYW5ndWxhckZpcmUgaW5zdGFsbGVkIGFuZCBoYXZlIHlvdXJcbiAqIGZpcmViYXNlIHVybCBzZXQgYXQgYXBDb25maWcuZmlyZWJhc2VVUkwuXG4gKlxuICogVGhpcyB3aWxsIGNyZWF0ZSBhIGNoYW5nZSBwb2ludCBhdDogYXBDb25maWcuZmlyZWJhc2VVUkwgKyAnL2NoYW5nZXMvJyArIG1vZGVsLmxpc3QudGl0bGVcbiAqIFRoZSBwb2ludCBjb250YWlucyBGaXJlYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVAgdG8gZGV0ZXJtaW5lIHRoZSB0aW1lIG9mIHRoZSBtb3N0IHJlY2VudCBjaGFuZ2UuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxoMz5FeGFtcGxlIG9mIGhvdyB0byBzZXQgdGhlIGZpcmViYXNlIHVybDwvaDM+XG4gKiA8cHJlPlxuICogLnJ1bihmdW5jdGlvbiAoYXBDb25maWcpIHtcbiAqICAgLy9TZXQgdGhlIGZvbGRlciB3aGVyZSBvZmZsaW5lIFhNTCBpcyBzdG9yZWRcbiAqICAgYXBDb25maWcuZmlyZWJhc2VVUkwgPSAnTXkgRmlyZWJhc2UgVVJMJztcbiAqXG4gKiB9KTtcbiAqIDwvcHJlPlxuICpcbiAqIDxoMz5FeGFtcGxlIG9mIGhvdyB0byByZWdpc3RlciBmcm9tIHRoZSBtb2RlbDwvaDM+XG4gKiA8cHJlPlxuICogLy9BZGQgYSBzdWJzY3JpcHRpb24gc2VydmljZSB0aGF0IHdpbGwgYXV0b21hdGljYWxseSBrZWVwIGRhdGEgaW4gc3luYyB3aXRoIGFsbCBvdGhlciBhY3RpdmUgdXNlcnNcbiAqIG1vZGVsLnN5bmMgPSBhcFN5bmNTZXJ2aWNlLmNyZWF0ZVN5bmNQb2ludChtb2RlbCk7XG4gKlxuICogbW9kZWwuc3luYy5zdWJzY3JpYmVUb0NoYW5nZXMoZnVuY3Rpb24gKCkge1xuICogICAgLy9EbyBzb21ldGhpbmcgYmVjYXVzZSBhIGNoYW5nZSBoYXMgb2NjdXJyZWRcbiAqXG4gKiAgfSwgdHJ1ZSk7IC8vVW5zdWJzY3JpYmUgb24gcm91dGUgY2hhbmdlIHNvIHdlIGRvbid0IGtlZXAgcmVmZXJlbmNlIGluIGZ1dHVyZVxuICogPC9wcmU+XG4gKlxuICovXG5cblxuQW5ndWxhclBvaW50TW9kdWxlXG4gICAgLnNlcnZpY2UoJ2FwU3luY1NlcnZpY2UnLCBTeW5jU2VydmljZSlcbiAgICAuc2VydmljZSgnYXBQcmVzZW5jZVNlcnZpY2UnLCBQcmVzZW5jZVNlcnZpY2UpXG4gICAgLy8gSW5zdGFudGlhdGUgaW1tZWRpYXRlbHlcbiAgICAucnVuKFsnYXBQcmVzZW5jZVNlcnZpY2UnLCAoYXBQcmVzZW5jZVNlcnZpY2UpID0+IHtcbiAgICB9XSk7XG5cblxuZXhwb3J0ICogZnJvbSAnLi9sb2NrLmZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi9wcmVzZW5jZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vc3luYy1wb2ludC5mYWN0b3J5JztcbmV4cG9ydCAqIGZyb20gJy4vc3luYy5zZXJ2aWNlJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9pbmRleC50cyJdLCJzb3VyY2VSb290IjoiIn0=