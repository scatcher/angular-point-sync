(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular-point"), require("lodash"), require("moment"), require("toastr"));
	else if(typeof define === 'function' && define.amd)
		define(["angular-point", "lodash", "moment", "toastr"], factory);
	else if(typeof exports === 'object')
		exports["angular-point-sync"] = factory(require("angular-point"), require("lodash"), require("moment"), require("toastr"));
	else
		root["angular-point-sync"] = factory(root["angular-point"], root["lodash"], root["moment"], root["toastr"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sync_point__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Lock__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return serviceIsInitialized; });
/* unused harmony export deferred */
/* unused harmony export apListItemFactory */
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return $rootScope; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return $firebaseArray; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return $q; });
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return SyncService; });


var $q, $firebaseArray, $rootScope, apListItemFactory, deferred, serviceIsInitialized;
var SyncService = (function () {
    function SyncService(_$firebaseArray_, _$q_, _apListItemFactory_, _$rootScope_) {
        this.Lock = __WEBPACK_IMPORTED_MODULE_1__Lock__["a" /* Lock */];
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
        return new __WEBPACK_IMPORTED_MODULE_0__sync_point__["a" /* SyncPoint */](model);
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
        apListItemFactory.ListItem.prototype.lock = __WEBPACK_IMPORTED_MODULE_1__Lock__["a" /* Lock */];
    };
    return SyncService;
}());

/** Minification safe - we're using leading and trailing underscores but gulp plugin doesn't treat them correctly */
SyncService.$inject = ['$firebaseArray', '$q', 'apListItemFactory', '$rootScope'];


/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("lodash");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_toastr__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(1);
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
/* 3 */
/***/ function(module, exports) {

module.exports = require("angular-point");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(1);
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(1);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__presence_service__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_point___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular_point__);



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZjYxZDc5N2IwZWU3ODU3MzMxMyIsIndlYnBhY2s6Ly8vLi9zcmMvc3luY19zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy8uL3NyYy9wcmVzZW5jZV9zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXItcG9pbnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvTG9jay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3luY19wb2ludC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0b2FzdHJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUR1RjtBQUN6QztBQUN2QyxJQUFJLEVBQUUsRUFDVCxjQUFjLEVBQ2QsVUFBVSxFQUNW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QUFDLENBQUMsQ0FBQztRQUVQLENBQUM7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDO0lBRXZCLENBQUM7SUFFRCwrQkFBVyxHQUFYLFVBQVksUUFBUTtRQUNoQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7SUFDTCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDOzs7Ozs7OztBQ3hKRCxtQzs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQTJDO0FBQ1E7QUFDRjtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFHSCxpRUFBa0I7S0FDYixPQUFPLENBQUMsZUFBZSxFQUFFLGtFQUFXLENBQUM7S0FDckMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLDBFQUFlLENBQUM7S0FFN0MsR0FBRyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxpQkFBaUI7SUFDN0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJhbmd1bGFyLXBvaW50LXN5bmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyLXBvaW50XCIpLCByZXF1aXJlKFwibG9kYXNoXCIpLCByZXF1aXJlKFwibW9tZW50XCIpLCByZXF1aXJlKFwidG9hc3RyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImFuZ3VsYXItcG9pbnRcIiwgXCJsb2Rhc2hcIiwgXCJtb21lbnRcIiwgXCJ0b2FzdHJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYW5ndWxhci1wb2ludC1zeW5jXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhci1wb2ludFwiKSwgcmVxdWlyZShcImxvZGFzaFwiKSwgcmVxdWlyZShcIm1vbWVudFwiKSwgcmVxdWlyZShcInRvYXN0clwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYW5ndWxhci1wb2ludC1zeW5jXCJdID0gZmFjdG9yeShyb290W1wiYW5ndWxhci1wb2ludFwiXSwgcm9vdFtcImxvZGFzaFwiXSwgcm9vdFtcIm1vbWVudFwiXSwgcm9vdFtcInRvYXN0clwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9yeSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb3J5IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHR9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJmNjFkNzk3YjBlZTc4NTczMzEzIiwiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICdhbmd1bGFyLXBvaW50JztcblxuaW1wb3J0IHsgSVN5bmNTZXJ2aWNlSW5pdGlhbGl6YXRpb25QYXJhbXMsIElTeW5jUG9pbnQsIFN5bmNQb2ludCB9IGZyb20gJy4vc3luY19wb2ludCc7XG5pbXBvcnQgeyBJTG9ja1JlZmVyZW5jZSwgTG9jayB9IGZyb20gJy4vTG9jayc7XG5leHBvcnQgdmFyICRxLFxuICAgICRmaXJlYmFzZUFycmF5LFxuICAgICRyb290U2NvcGUsXG4gICAgYXBMaXN0SXRlbUZhY3RvcnksXG4gICAgZGVmZXJyZWQ6IG5nLklEZWZlcnJlZDxJU3luY1NlcnZpY2VJbml0aWFsaXphdGlvblBhcmFtcz4sXG4gICAgc2VydmljZUlzSW5pdGlhbGl6ZWQ6IG5nLklQcm9taXNlPElTeW5jU2VydmljZUluaXRpYWxpemF0aW9uUGFyYW1zPjtcblxuZXhwb3J0IGludGVyZmFjZSBJU3luY1NlcnZpY2Uge1xuICAgIGNyZWF0ZVN5bmNQb2ludChtb2RlbDogTW9kZWwpOiBJU3luY1BvaW50O1xuICAgIGluaXRpYWxpemUodXNlcklkOiBudW1iZXIsIGZpcmViYXNlVXJsOiBzdHJpbmcpOiB2b2lkO1xuICAgIExvY2s6ICgpID0+IG5nLklQcm9taXNlPElMb2NrUmVmZXJlbmNlPjtcbn1cblxuZXhwb3J0IGNsYXNzIFN5bmNTZXJ2aWNlIGltcGxlbWVudHMgSVN5bmNTZXJ2aWNlIHtcbiAgICAvKiogTWluaWZpY2F0aW9uIHNhZmUgLSB3ZSdyZSB1c2luZyBsZWFkaW5nIGFuZCB0cmFpbGluZyB1bmRlcnNjb3JlcyBidXQgZ3VscCBwbHVnaW4gZG9lc24ndCB0cmVhdCB0aGVtIGNvcnJlY3RseSAqL1xuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckZmlyZWJhc2VBcnJheScsICckcScsICdhcExpc3RJdGVtRmFjdG9yeScsICckcm9vdFNjb3BlJ107XG5cbiAgICBjb25zdHJ1Y3RvcihfJGZpcmViYXNlQXJyYXlfLCBfJHFfLCBfYXBMaXN0SXRlbUZhY3RvcnlfLCBfJHJvb3RTY29wZV8pIHtcbiAgICAgICAgLyoqIEV4cG9zZSB0byBzZXJ2aWNlIHNjb3BlICovXG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgJGZpcmViYXNlQXJyYXkgPSBfJGZpcmViYXNlQXJyYXlfO1xuICAgICAgICBhcExpc3RJdGVtRmFjdG9yeSA9IF9hcExpc3RJdGVtRmFjdG9yeV87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG5cbiAgICAgICAgLyoqIENyZWF0ZSBhIGRlZmVycmVkIG9iamVjdCB0aGF0IHdpbGwgYWxsb3cgc2VydmljZSB0byBwcm9jZWVkIG9uY2UgYSB1c2VySWQgaXMgcHJvdmlkZWQgKi9cbiAgICAgICAgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICBzZXJ2aWNlSXNJbml0aWFsaXplZCA9IGRlZmVycmVkLnByb21pc2U7XG4gICAgfVxuXG4gICAgY3JlYXRlU3luY1BvaW50KG1vZGVsOiBNb2RlbCk6IElTeW5jUG9pbnQge1xuICAgICAgICByZXR1cm4gbmV3IFN5bmNQb2ludChtb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNlcnZpY2Ugd2FpdHMgZm9yIHVzZXJJZCB0byBiZSBwcm92aWRlZCBiZWZvcmUgYWRkaW5nIHRoZSB3YXRjaCB0byBldmVudCBhcnJheS5cbiAgICAgKiBAcGFyYW0ge3t1c2VySWQ6IHVzZXJJZCwgZmlyZWJhc2VVcmw6IGZpcmViYXNlVXJsfX0gdXNlcklkXG4gICAgICovXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNlcnZpY2Ugd2FpdHMgZm9yIHVzZXJJZCB0byBiZSBwcm92aWRlZCBiZWZvcmUgYWRkaW5nIHRoZSB3YXRjaCB0byBldmVudCBhcnJheS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdXNlcklkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpcmViYXNlVXJsXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZSh1c2VySWQ6IG51bWJlciwgZmlyZWJhc2VVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHsgdXNlcklkOiB1c2VySWQsIGZpcmViYXNlVXJsOiBmaXJlYmFzZVVybCB9KTtcbiAgICAgICAgYXBMaXN0SXRlbUZhY3RvcnkuTGlzdEl0ZW0ucHJvdG90eXBlLmxvY2sgPSBMb2NrO1xuICAgIH1cblxuICAgIExvY2sgPSBMb2NrO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL3N5bmNfc2VydmljZS50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImxvZGFzaFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIHRvYXN0ciBmcm9tICd0b2FzdHInO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtTeW5jU2VydmljZSwgc2VydmljZUlzSW5pdGlhbGl6ZWR9IGZyb20gJy4vc3luY19zZXJ2aWNlJztcbmltcG9ydCB7SVN5bmNTZXJ2aWNlSW5pdGlhbGl6YXRpb25QYXJhbXN9IGZyb20gJy4vc3luY19wb2ludCc7XG52YXIgc2VydmljZTogUHJlc2VuY2VTZXJ2aWNlO1xuXG5leHBvcnQgaW50ZXJmYWNlIElGaXJlYmFzZVNlc3Npb25PYmplY3QgZXh0ZW5kcyBBbmd1bGFyRmlyZU9iamVjdCB7XG4gICAgYnJvd3Nlcjogc3RyaW5nO1xuICAgIGNvbm5lY3RlZDogbnVtYmVyO1xuICAgIGxhc3RBY3RpdmU6IG51bWJlcjtcbiAgICBub3RpZmljYXRpb25zPzogSVVzZXJOb3RpZmljYXRpb25bXTtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgcmVsb2FkOiBib29sZWFuOyAvL0hhcmQgcmVmcmVzaCBicm93c2VyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXJOb3RpZmljYXRpb24ge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0aXRsZT86IHN0cmluZztcbiAgICB0b2FzdFR5cGU6IHN0cmluZztcbiAgICB0b2FzdHJPcHRpb25zPzogT2JqZWN0O1xuICAgIHNlbmRlcklkPzogbnVtYmVyO1xuICAgIHNlbmRlclNlc3Npb25LZXk/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZpcmViYXNlVXNlcnNPYmplY3Qge1xuICAgIFtrZXk6IG51bWJlcl06IHsgLy9Vc2VyIElEXG4gICAgICAgIGNvbm5lY3Rpb25zOiB7IFtrZXk6IHN0cmluZ106IElGaXJlYmFzZVNlc3Npb25PYmplY3QgfSAvL09iamVjdCBmb3IgZWFjaCBhY3RpdmUgY29ubmVjdGlvblxuICAgICAgICBsYXN0T25saW5lOiBudW1iZXI7IC8vVGltZXN0YW1wXG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGaXJlYmFzZVdhdGNoRXZlbnQge1xuICAgIGV2ZW50OiBzdHJpbmc7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgcHJldklkPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEBuZ2RvYyBPYmplY3RcbiAqIEBuYW1lIFByZXNlbmNlU2VydmljZVxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGEgcmVhbHRpbWUgcmVmZXJlbmNlIHRvIHdoZXJlIGVhY2ggdXNlciBpcyB3aXRoaW4gdGhlIGFwcGxpY2F0aW9uIHdoZW4gbG9nZ2VkIGluLCB3aGF0IGJyb3dzZXIgdGhleSdyZSB1c2luZywgd2hlblxuICogdGhlIHNlc3Npb24gd2FzIHN0YXJ0ZWQsIGFuZCBpZiBub3Qgb25saW5lIHdoZW4gdGhlIGxhc3QgdGltZSB0aGV5IHdlcmUgb25saW5lLlxuICovXG5leHBvcnQgY2xhc3MgUHJlc2VuY2VTZXJ2aWNlIHtcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHEnLCAnJHJvb3RTY29wZScsICckZmlyZWJhc2VBcnJheScsICckZmlyZWJhc2VPYmplY3QnLCAnJGxvY2F0aW9uJywgJ2FwU3luY1NlcnZpY2UnXTtcbiAgICBpZGVudGlmeUJyb3dzZXIgPSBpZGVudGlmeUJyb3dzZXI7XG4gICAgaW5pdGlhbGl6ZVNlc3Npb246IG5nLklQcm9taXNlPElGaXJlYmFzZVNlc3Npb25PYmplY3Q+O1xuICAgIHVzZXJDb25uZWN0aW9uVXJsOiBzdHJpbmc7XG4gICAgdXNlcnM6IEFuZ3VsYXJGaXJlT2JqZWN0O1xuICAgIHNlc3Npb25Db25uZWN0aW9uOiBGaXJlYmFzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHE6IG5nLklRU2VydmljZSwgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSwgcHJpdmF0ZSAkZmlyZWJhc2VBcnJheTogQW5ndWxhckZpcmVBcnJheVNlcnZpY2UsIHByaXZhdGUgJGZpcmViYXNlT2JqZWN0OiBBbmd1bGFyRmlyZU9iamVjdFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uOiBhbmd1bGFyLklMb2NhdGlvblNlcnZpY2UsIGFwU3luY1NlcnZpY2U6IFN5bmNTZXJ2aWNlKSB7XG5cbiAgICAgICAgc2VydmljZSA9IHRoaXM7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgIHNlcnZpY2UuaW5pdGlhbGl6ZVNlc3Npb24gPSBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgIC8vV2FpdCBmb3IgU3luY1NlcnZpY2UgdG8gYmUgaW5pdGlhbGl6ZWQgd2l0aCBjdXJyZW50IHVzZXJzIHVzZXJJZCBhbmQgZmlyZWJhc2VVcmxcbiAgICAgICAgc2VydmljZUlzSW5pdGlhbGl6ZWQudGhlbigoaW5pdGlhbGl6YXRpb25QYXJhbXNPYmplY3Q6IElTeW5jU2VydmljZUluaXRpYWxpemF0aW9uUGFyYW1zKSA9PiB7XG4gICAgICAgICAgICB2YXIgdXNlcklkID0gaW5pdGlhbGl6YXRpb25QYXJhbXNPYmplY3QudXNlcklkO1xuICAgICAgICAgICAgdmFyIGZpcmViYXNlVXJsID0gaW5pdGlhbGl6YXRpb25QYXJhbXNPYmplY3QuZmlyZWJhc2VVcmw7XG4gICAgICAgICAgICB2YXIgZmlyZWJhc2VSb290ID0gZmlyZWJhc2VVcmwucmVwbGFjZSgnb2ZmbGluZS8nLCAnJyk7XG4gICAgICAgICAgICBzZXJ2aWNlLnVzZXJDb25uZWN0aW9uVXJsID0gZmlyZWJhc2VVcmwgKyAndXNlcnMvJyArIHVzZXJJZCArICcvJztcblxuICAgICAgICAgICAgLy8gdmFyIHVzZXJzUmVmID0gbmV3IEZpcmViYXNlKGZpcmViYXNlVXJsICsgJ3VzZXJzJyk7XG4gICAgICAgICAgICAvLyBzZXJ2aWNlLnVzZXJzID0gJGZpcmViYXNlT2JqZWN0KHVzZXJzUmVmKS4kbG9hZGVkO1xuXG4gICAgICAgICAgICAvLyBzaW5jZSBJIGNhbiBjb25uZWN0IGZyb20gbXVsdGlwbGUgZGV2aWNlcyBvciBicm93c2VyIHRhYnMsIHdlIHN0b3JlIGVhY2ggY29ubmVjdGlvbiBpbnN0YW5jZSBzZXBhcmF0ZWx5XG4gICAgICAgICAgICAvLyBhbnkgdGltZSB0aGF0IGNvbm5lY3Rpb25zUmVmJ3MgdmFsdWUgaXMgbnVsbCAoaS5lLiBoYXMgbm8gY2hpbGRyZW4pIEkgYW0gb2ZmbGluZVxuICAgICAgICAgICAgdmFyIHRoaXNDb25uZWN0aW9uUmVmID0gbmV3IEZpcmViYXNlKHNlcnZpY2UudXNlckNvbm5lY3Rpb25VcmwgKyAnY29ubmVjdGlvbnMnKTtcblxuICAgICAgICAgICAgLy8gc3RvcmVzIHRoZSB0aW1lc3RhbXAgb2YgbXkgbGFzdCBkaXNjb25uZWN0ICh0aGUgbGFzdCB0aW1lIEkgd2FzIHNlZW4gb25saW5lKVxuICAgICAgICAgICAgdmFyIGxhc3RPbmxpbmVSZWYgPSBuZXcgRmlyZWJhc2Uoc2VydmljZS51c2VyQ29ubmVjdGlvblVybCArICdsYXN0T25saW5lJyk7XG4gICAgICAgICAgICB2YXIgY29ubmVjdGVkUmVmID0gbmV3IEZpcmViYXNlKGZpcmViYXNlUm9vdCArICcuaW5mby9jb25uZWN0ZWQnKTtcblxuXG4gICAgICAgICAgICBjb25uZWN0ZWRSZWYub24oJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXApIHtcbiAgICAgICAgICAgICAgICBpZiAoc25hcC52YWwoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSdyZSBjb25uZWN0ZWQgKG9yIHJlY29ubmVjdGVkKSEgRG8gYW55dGhpbmcgaGVyZSB0aGF0IHNob3VsZCBoYXBwZW4gb25seSBpZiBvbmxpbmUgKG9yIG9uIHJlY29ubmVjdClcblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhpcyBkZXZpY2UgdG8gbXkgY29ubmVjdGlvbnMgbGlzdFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHZhbHVlIGNvbnRhaW5zIGluZm8gYWJvdXQgdGhlIGRldmljZSBhbmQgY29ubmVjdGlvbiBzdGFydCB0aW1lc3RhbXBcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXNzaW9uQ29ubmVjdGlvbiA9IHRoaXNDb25uZWN0aW9uUmVmLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3NlcjogaWRlbnRpZnlCcm93c2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWQ6IEZpcmViYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RBY3RpdmU6IEZpcmViYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICRsb2NhdGlvbi51cmwoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbG9hZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9VcGRhdGUgdGhlIGN1cnJlbnQgcGF0aCB3aGVuZXZlciBzdGF0ZSBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCBjdXJyZW50LCBwcmV2aW91cywgcmVqZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnNlc3Npb25Db25uZWN0aW9uLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEFjdGl2ZTogRmlyZWJhc2UuU2VydmVyVmFsdWUuVElNRVNUQU1QLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICRsb2NhdGlvbi51cmwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gSSBkaXNjb25uZWN0LCByZW1vdmUgdGhpcyBkZXZpY2VcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5zZXNzaW9uQ29ubmVjdGlvbi5vbkRpc2Nvbm5lY3QoKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIEkgZGlzY29ubmVjdCwgdXBkYXRlIHRoZSBsYXN0IHRpbWUgSSB3YXMgc2VlbiBvbmxpbmVcbiAgICAgICAgICAgICAgICAgICAgbGFzdE9ubGluZVJlZi5vbkRpc2Nvbm5lY3QoKS5zZXQoRmlyZWJhc2UuU2VydmVyVmFsdWUuVElNRVNUQU1QKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlU2Vzc2lvbk9iamVjdCA9IHNlcnZpY2UuJGZpcmViYXNlT2JqZWN0KHNlcnZpY2Uuc2Vzc2lvbkNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGFjdGl2ZVNlc3Npb25PYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdhdGNoIGZvciBldmVudHNcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS53YXRjaEZvclJlbG9hZEV2ZW50KDxhbnk+IGFjdGl2ZVNlc3Npb25PYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLndhdGNoRm9yTm90aWZpY2F0aW9ucyh1c2VySWQsIGFjdGl2ZVNlc3Npb25PYmplY3QuJGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIGRlbGV0ZVNlc3Npb25EYXRhKHVzZXJJZDogbnVtYmVyLCBzZXNzaW9uS2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2UuZ2V0U2Vzc2lvbkNvbm5lY3Rpb1VybCh1c2VySWQsIHNlc3Npb25LZXkpXG4gICAgICAgICAgICAudGhlbihzZXNzaW9uQ29ubmVjdGlvblVybCA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHNlc3Npb25SZWYgPSBuZXcgRmlyZWJhc2Uoc2Vzc2lvbkNvbm5lY3Rpb25VcmwpO1xuICAgICAgICAgICAgICAgIHNlc3Npb25SZWYucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNwbGF5VXNlck5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IElVc2VyTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIGlmICh0b2FzdHIpIHtcbiAgICAgICAgICAgIHRvYXN0cltub3RpZmljYXRpb24udG9hc3RUeXBlXShub3RpZmljYXRpb24ubWVzc2FnZSwgbm90aWZpY2F0aW9uLnRpdGxlLCBub3RpZmljYXRpb24udG9hc3RyT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlW25vdGlmaWNhdGlvbi50b2FzdFR5cGVdKG5vdGlmaWNhdGlvbi50aXRsZSwgbm90aWZpY2F0aW9uLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2Vzc2lvbk5vdGlmaWNhdGlvbnNBcnJheSh1c2VySWQ6IG51bWJlciwgc2Vzc2lvbktleTogc3RyaW5nKTogbmcuSVByb21pc2U8QW5ndWxhckZpcmVBcnJheT4ge1xuICAgICAgICByZXR1cm4gc2VydmljZS5nZXRTZXNzaW9uQ29ubmVjdGlvVXJsKHVzZXJJZCwgc2Vzc2lvbktleSkudGhlbigoc2Vzc2lvbkNvbm5lY3Rpb25VcmwpID0+IHtcbiAgICAgICAgICAgIHZhciBub3RpZmljYXRpb25zUmVmID0gbmV3IEZpcmViYXNlKHNlc3Npb25Db25uZWN0aW9uVXJsICsgJy9ub3RpZmljYXRpb25zJyk7XG4gICAgICAgICAgICByZXR1cm4gc2VydmljZS4kZmlyZWJhc2VBcnJheShub3RpZmljYXRpb25zUmVmKS4kbG9hZGVkKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0U2Vzc2lvbkNvbm5lY3Rpb1VybCh1c2VySWQ6IG51bWJlciwgc2Vzc2lvbktleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlSXNJbml0aWFsaXplZC50aGVuKChpbml0aWFsaXphdGlvblBhcmFtc09iamVjdDogSVN5bmNTZXJ2aWNlSW5pdGlhbGl6YXRpb25QYXJhbXMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsaXphdGlvblBhcmFtc09iamVjdC5maXJlYmFzZVVybCArICd1c2Vycy8nICsgdXNlcklkICsgJy9jb25uZWN0aW9ucy8nICsgc2Vzc2lvbktleTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0VXNlckNvbm5lY3Rpb25VcmwodXNlcklkOiBudW1iZXIpOiBuZy5JUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJc0luaXRpYWxpemVkLnRoZW4oKGluaXRpYWxpemF0aW9uUGFyYW1zT2JqZWN0OiBJU3luY1NlcnZpY2VJbml0aWFsaXphdGlvblBhcmFtcykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxpemF0aW9uUGFyYW1zT2JqZWN0LmZpcmViYXNlVXJsICsgJ3VzZXJzLycgKyB1c2VySWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFVzZXJzKCk6IG5nLklQcm9taXNlPElGaXJlYmFzZVVzZXJzT2JqZWN0PiB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlSXNJbml0aWFsaXplZC50aGVuKChpbml0aWFsaXphdGlvblBhcmFtc09iamVjdDogSVN5bmNTZXJ2aWNlSW5pdGlhbGl6YXRpb25QYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGlmICghc2VydmljZS51c2Vycykge1xuICAgICAgICAgICAgICAgIHZhciB1c2Vyc1JlZiA9IG5ldyBGaXJlYmFzZShpbml0aWFsaXphdGlvblBhcmFtc09iamVjdC5maXJlYmFzZVVybCArICd1c2VycycpO1xuICAgICAgICAgICAgICAgIHNlcnZpY2UudXNlcnMgPSBzZXJ2aWNlLiRmaXJlYmFzZU9iamVjdCh1c2Vyc1JlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VydmljZS51c2VycztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVsb2FkQnJvd3Nlcih1c2VySWQ6IG51bWJlciwgc2Vzc2lvbktleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHNlcnZpY2UuZ2V0U2Vzc2lvbkNvbm5lY3Rpb1VybCh1c2VySWQsIHNlc3Npb25LZXkpLnRoZW4oKHNlc3Npb25Db25uZWN0aW9uVXJsKSA9PiB7XG4gICAgICAgICAgICB2YXIgc2Vzc2lvblJlZiA9IG5ldyBGaXJlYmFzZShzZXNzaW9uQ29ubmVjdGlvblVybCk7XG4gICAgICAgICAgICB2YXIgc2Vzc2lvbk9iamVjdDogYW55ID0gc2VydmljZS4kZmlyZWJhc2VPYmplY3Qoc2Vzc2lvblJlZik7XG4gICAgICAgICAgICBzZXNzaW9uT2JqZWN0LiRsb2FkZWQoKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbk9iamVjdC5yZWxvYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uT2JqZWN0LiRzYXZlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VuZFVzZXJOb3RpZmljYXRpb24odXNlcklkOiBudW1iZXIsIHNlc3Npb25LZXk6IHN0cmluZywgbm90aWZpY2F0aW9uOiBJVXNlck5vdGlmaWNhdGlvbik6IG5nLklQcm9taXNlPElVc2VyTm90aWZpY2F0aW9uPiB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IHRoaXMuJHEuZGVmZXIoKTtcbiAgICAgICAgdGhpcy5nZXRTZXNzaW9uTm90aWZpY2F0aW9uc0FycmF5KHVzZXJJZCwgc2Vzc2lvbktleSlcbiAgICAgICAgICAgIC50aGVuKChzZXNzaW9uTm90aWZpY2F0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc2Vzc2lvbk5vdGlmaWNhdGlvbnMuJGFkZChub3RpZmljYXRpb24pKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH1cblxuICAgIHdhdGNoRm9yTm90aWZpY2F0aW9ucyh1c2VySWQ6IG51bWJlciwgc2Vzc2lvbktleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0U2Vzc2lvbk5vdGlmaWNhdGlvbnNBcnJheSh1c2VySWQsIHNlc3Npb25LZXkpXG4gICAgICAgICAgICAudGhlbigobm90aWZpY2F0aW9uQXJyYXk6IEFuZ3VsYXJGaXJlQXJyYXkpID0+IG5vdGlmaWNhdGlvbkFycmF5LiR3YXRjaCgoZXZlbnRPYmplY3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vVHJpZ2dlciB3aGVuIGEgbmV3IG5vdGlmaWNhdGlvbiBpcyBhZGRlZCB0byB0aGUgc2Vzc2lvbiBub3RpZmljYXRpb25zIGFycmF5XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50T2JqZWN0LmV2ZW50ID09PSAnY2hpbGRfYWRkZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChub3RpZmljYXRpb25BcnJheSwgKG5vdGlmaWNhdGlvbjogSVVzZXJOb3RpZmljYXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLmRpc3BsYXlVc2VyTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25BcnJheS4kcmVtb3ZlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgIH1cblxuICAgIHdhdGNoRm9yUmVsb2FkRXZlbnQoYWN0aXZlU2Vzc2lvbk9iamVjdDogSUZpcmViYXNlU2Vzc2lvbk9iamVjdCk6IHZvaWQge1xuICAgICAgICBhY3RpdmVTZXNzaW9uT2JqZWN0LiR3YXRjaCgoZXZlbnRPYmplY3Q6IElGaXJlYmFzZVdhdGNoRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghIWFjdGl2ZVNlc3Npb25PYmplY3QucmVsb2FkKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlU2Vzc2lvbk9iamVjdC5yZWxvYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBhY3RpdmVTZXNzaW9uT2JqZWN0LiRzYXZlKCk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlkZW50aWZ5QnJvd3NlcigpOiBzdHJpbmcge1xuICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQsIHRlbSxcbiAgICAgICAgTSA9IHVhLm1hdGNoKC8ob3BlcmF8Y2hyb21lfHNhZmFyaXxmaXJlZm94fG1zaWV8dHJpZGVudCg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHwgW107XG4gICAgaWYgKC90cmlkZW50L2kudGVzdChNWzFdKSkge1xuICAgICAgICB0ZW0gPSAvXFxicnZbIDpdKyhcXGQrKS9nLmV4ZWModWEpIHx8IFtdO1xuICAgICAgICByZXR1cm4gJ0lFICcgKyAodGVtWzFdIHx8ICcnKTtcbiAgICB9XG4gICAgaWYgKE1bMV0gPT09ICdDaHJvbWUnKSB7XG4gICAgICAgIHRlbSA9IHVhLm1hdGNoKC9cXGIoT1BSfEVkZ2UpXFwvKFxcZCspLyk7XG4gICAgICAgIGlmICh0ZW0gIT0gbnVsbCkgcmV0dXJuIHRlbS5zbGljZSgxKS5qb2luKCcgJykucmVwbGFjZSgnT1BSJywgJ09wZXJhJyk7XG4gICAgfVxuICAgIE0gPSBNWzJdID8gW01bMV0sIE1bMl1dIDogW25hdmlnYXRvci5hcHBOYW1lLCBuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgJy0/J107XG4gICAgaWYgKCh0ZW0gPSB1YS5tYXRjaCgvdmVyc2lvblxcLyhcXGQrKS9pKSkgIT0gbnVsbCkgTS5zcGxpY2UoMSwgMSwgdGVtWzFdKTtcbiAgICByZXR1cm4gTS5qb2luKCcgJyk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9wcmVzZW5jZV9zZXJ2aWNlLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW5ndWxhci1wb2ludFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImFuZ3VsYXItcG9pbnRcIlxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtzZXJ2aWNlSXNJbml0aWFsaXplZCwgJGZpcmViYXNlQXJyYXksICRxfSBmcm9tICcuL3N5bmNfc2VydmljZSc7XG5cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUxvY2tSZWZlcmVuY2Uge1xuICAgICAgICBsb2NrUXVldWU6IEFuZ3VsYXJGaXJlQXJyYXk7XG4gICAgICAgIG15TG9ja1JlZjogbmcuSVByb21pc2U8RmlyZWJhc2U+O1xuICAgICAgICB1bmxvY2soKTogdm9pZDtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIElMaXN0SXRlbUxvY2sge1xuICAgICAgICB1c2VySWQ6IG51bWJlcjtcbiAgICAgICAgdGltZTogc3RyaW5nO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBMb2NrKCk6IG5nLklQcm9taXNlPElMb2NrUmVmZXJlbmNlPiB7XG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRoaXM7XG5cbiAgICAgICAgLyoqIE9ubHkgY2FuIGxvY2sgZXhpc3RpbmcgcmVjb3JkcyAqL1xuICAgICAgICBpZiAobGlzdEl0ZW0uaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gbGlzdEl0ZW0uZ2V0TW9kZWwoKTtcbiAgICAgICAgICAgIC8qKiBNYWtlIHN1cmUgdXNlciBoYXMgcmlnaHRzIHRvIGVkaXQgKi9cbiAgICAgICAgICAgIGNvbnN0IHVzZXJQZXJtTWFzayA9IGxpc3RJdGVtLnJlc29sdmVQZXJtaXNzaW9ucygpO1xuICAgICAgICAgICAgaWYgKHVzZXJQZXJtTWFzay5FZGl0TGlzdEl0ZW1zKSB7XG5cbiAgICAgICAgICAgICAgICBzZXJ2aWNlSXNJbml0aWFsaXplZFxuICAgICAgICAgICAgICAgICAgICAudGhlbigoaW5pdGlhbGl6YXRpb25QYXJhbXMpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgZmlyZWJhc2UgbG9jayBxdWV1ZSBmb3IgdGhpcyByZWNvcmQqL1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW1Mb2NrUmVmID0gbmV3IEZpcmViYXNlKGluaXRpYWxpemF0aW9uUGFyYW1zLmZpcmViYXNlVXJsICsgJ2xvY2tzLycgKyBtb2RlbC5saXN0LnRpdGxlICsgJy8nICsgbGlzdEl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9ja1F1ZXVlID0gJGZpcmViYXNlQXJyYXkobGlzdEl0ZW1Mb2NrUmVmKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgbG9jayByZWNvcmQgSSBjcmVhdGVkICovXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBteUxvY2tSZWYgPSBsb2NrUXVldWUuJGFkZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBpbml0aWFsaXphdGlvblBhcmFtcy51c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogRmlyZWJhc2UuU2VydmVyVmFsdWUuVElNRVNUQU1QXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqIFBhc3NlZCBhcyBhIHJlZmVyZW5jZSBzbyB3ZSBjYW4gcmVtb3ZlIHRoZSBsb2NrIHdoZW4gdGhlIG1vZGFsIGZvcm0gaXMgY2xvc2VkKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVubG9jayA9ICgpID0+IG15TG9ja1JlZi50aGVuKChteUxvY2spID0+IG15TG9jay5yZW1vdmUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQXV0b21hdGljYWxseSByZW1vdmUgYW55IGxpc3QgaXRlbSBsb2NrcyBvbGRlciB0aGFuIDQgaG91cnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tRdWV1ZS4kbG9hZGVkKCgpID0+IF8uZWFjaChsb2NrUXVldWUsIChsaXN0SXRlbUxvY2s6IElMaXN0SXRlbUxvY2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9tZW50KCkuZGlmZihsb2NrUXVldWUsICdob3VycycpID4gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUHVyZ2luZyBleHBpcmVkIGxpc3QgaXRlbSBsb2NrLicsIGxpc3RJdGVtTG9jayk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja1F1ZXVlLiRyZW1vdmUobGlzdEl0ZW1Mb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2tSZWZlcmVuY2UgPSB7IGxvY2tRdWV1ZSwgbXlMb2NrUmVmLCB1bmxvY2sgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbXlMb2NrUmVmLnRoZW4oKGxvY2tSZWYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogUmVtb3ZlIHRoZSBsb2NrIGluIHRoZSBldmVudCB0aGUgdXNlciBsb29zZXMgY29ubmVjdGlvbiwgY2hhbmdlcyBwYWdlLCBvciBjbG9zZXMgYnJvd3NlciovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja1JlZi5vbkRpc2Nvbm5lY3QoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIga2V5ID0gbG9ja1JlZi5rZXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgaW5kZXggPSBsb2NrUXVldWUuJGluZGV4Rm9yKGtleSk7IC8vIHJldHVybnMgbG9jYXRpb24gaW4gdGhlIGFycmF5ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmVycmVkTG9jay5yZXNvbHZlKGxvY2tRdWV1ZVtpbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5jbHVkZSBhIHJlZmVyZWNlIHRvIHRoZSBsb2NrIGluIHRoZSBxdWV1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsb2NrUmVmZXJlbmNlKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKiogVXNlciBkb2Vzbid0IGhhdmUgZWRpdCByaWdodHMgKi9cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qKiBOZXcgcmVjb3JkIHNvIGNhbid0IGxvY2sgKi9cbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe30pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgfVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL0xvY2sudHMiLCJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge01vZGVsfSBmcm9tICdhbmd1bGFyLXBvaW50JztcblxuLy8gaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi4vYW5ndWxhci1wb2ludC9mYWN0b3JpZXMvYXBNb2RlbEZhY3RvcnknO1xuaW1wb3J0IHtzZXJ2aWNlSXNJbml0aWFsaXplZCwgJGZpcmViYXNlQXJyYXksICRyb290U2NvcGV9IGZyb20gJy4vc3luY19zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3luY1NlcnZpY2VDaGFuZ2VFdmVudCB7XG4gICAgY2hhbmdlVHlwZTogc3RyaW5nOyAvLyAnYWRkJ3wndXBkYXRlJ3wnZGVsZXRlJztcbiAgICBsaXN0SXRlbUlkOiBudW1iZXI7XG4gICAgdXNlcklkOiBudW1iZXI7XG4gICAgdGltZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTeW5jU2VydmljZUluaXRpYWxpemF0aW9uUGFyYW1zIHtcbiAgICB1c2VySWQ6IG51bWJlcjtcbiAgICBmaXJlYmFzZVVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTeW5jUG9pbnQge1xuICAgIGV2ZW50TG9nTGVuZ3RoOiBudW1iZXI7XG4gICAgcmVjZW50RXZlbnRzOiBJU3luY1NlcnZpY2VDaGFuZ2VFdmVudFtdO1xuICAgIHJlZ2lzdGVyQ2hhbmdlKGNoYW5nZVR5cGU6IHN0cmluZywgbGlzdEl0ZW1JZDogbnVtYmVyKTtcbiAgICBzdWJzY3JpYmVUb0NoYW5nZXMoY2FsbGJhY2s6IEZ1bmN0aW9uLCB1bnN1YnNjcmliZU9uU3RhdGVDaGFuZ2U6IGJvb2xlYW4pOiBGdW5jdGlvbjtcbiAgICB1bnN1YnNjcmliZShjYWxsYmFjayk7XG59XG5cblxuZXhwb3J0IGNsYXNzIFN5bmNQb2ludCBpbXBsZW1lbnRzIElTeW5jUG9pbnQge1xuICAgIGV2ZW50TG9nTGVuZ3RoID0gMTA7XG4gICAgY2hhbmdlTm90aWZpZXI7XG4gICAgcmVjZW50RXZlbnRzO1xuICAgIC8qKiBDb250YWluZXIgdG8gaG9sZCBhbGwgY3VycmVudCBzdWJzY3JpcHRpb25zIGZvciB0aGUgbW9kZWwgKi9cbiAgICBzdWJzY3JpcHRpb25zID0gW107XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtb2RlbFxuICAgICAqIEBwYXJhbSB1cGRhdGVRdWVyeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWw6IE1vZGVsKSB7XG4gICAgICAgIHZhciBzeW5jUG9pbnQgPSB0aGlzO1xuXG4gICAgICAgIHNlcnZpY2VJc0luaXRpYWxpemVkXG4gICAgICAgICAgICAudGhlbigoaW5pdGlhbGl6YXRpb25QYXJhbXM6IElTeW5jU2VydmljZUluaXRpYWxpemF0aW9uUGFyYW1zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBzeW5jUG9pbnQuY2hhbmdlTm90aWZpZXIgPSBuZXcgRmlyZWJhc2UoaW5pdGlhbGl6YXRpb25QYXJhbXMuZmlyZWJhc2VVcmwgKyAnL2NoYW5nZXMvJyArIG1vZGVsLmxpc3QudGl0bGUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gc3luY1BvaW50LmNoYW5nZU5vdGlmaWVyLmxpbWl0VG9MYXN0KHN5bmNQb2ludC5ldmVudExvZ0xlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICBzeW5jUG9pbnQucmVjZW50RXZlbnRzID0gJGZpcmViYXNlQXJyYXkocXVlcnkpO1xuXG4gICAgICAgICAgICAgICAgc3luY1BvaW50LnJlY2VudEV2ZW50cy4kbG9hZGVkKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGV2ZW50QXJyYXkpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqIEZpcmVkIHdoZW4gYW55b25lIHVwZGF0ZXMgYSBsaXN0IGl0ZW0gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHN5bmNQb2ludC5yZWNlbnRFdmVudHMuJHdhdGNoKChsb2cpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmV2ZW50ID09PSAnY2hpbGRfYWRkZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdFdmVudDogSVN5bmNTZXJ2aWNlQ2hhbmdlRXZlbnQgPSBzeW5jUG9pbnQucmVjZW50RXZlbnRzLiRnZXRSZWNvcmQobG9nLmtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBDYXB0dXJlIGlmIGV2ZW50IHdhcyBjYXVzZWQgYnkgY3VycmVudCB1c2VyICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHRlcm5hbFRyaWdnZXIgPSBuZXdFdmVudC51c2VySWQgIT09IGluaXRpYWxpemF0aW9uUGFyYW1zLnVzZXJJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3luY1BvaW50LnByb2Nlc3NDaGFuZ2VzKG5ld0V2ZW50LCBleHRlcm5hbFRyaWdnZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0lTeW5jU2VydmljZUNoYW5nZUV2ZW50fSBuZXdFdmVudCBEZXRhaWxzIG9mIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXh0ZXJuYWxUcmlnZ2VyIFdhcyB0aGUgY2hhbmdlZCBjYXVzZWQgYnkgYW5vdGhlciB1c2VyLlxuICAgICAqL1xuICAgIHByaXZhdGUgcHJvY2Vzc0NoYW5nZXMobmV3RXZlbnQ6IElTeW5jU2VydmljZUNoYW5nZUV2ZW50LCBleHRlcm5hbFRyaWdnZXI6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdmFyIHN5bmNQb2ludCA9IHRoaXM7XG4gICAgICAgIC8qKiBOb3RpZnkgc3Vic2NyaWJlcnMgKi9cbiAgICAgICAgXy5lYWNoKHN5bmNQb2ludC5zdWJzY3JpcHRpb25zLCAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobmV3RXZlbnQsIGV4dGVybmFsVHJpZ2dlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgICAqIEBuYW1lIFN5bmNQb2ludC5yZWdpc3RlckNoYW5nZVxuICAgICAqIEBtZXRob2RPZiBTeW5jUG9pbnRcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBOb3RpZnkgYWxsIG90aGVyIHVzZXJzIGxpc3RlbmluZyB0byB0aGlzIG1vZGVsIHRoYXQgYSBjaGFuZ2UgaGFzIGJlZW4gbWFkZS5cbiAgICAgKi9cbiAgICByZWdpc3RlckNoYW5nZShjaGFuZ2VUeXBlOiBzdHJpbmcsIGxpc3RJdGVtSWQ6IG51bWJlcikge1xuICAgICAgICB2YXIgc3luY1BvaW50ID0gdGhpcztcbiAgICAgICAgc2VydmljZUlzSW5pdGlhbGl6ZWRcbiAgICAgICAgICAgIC50aGVuKChpbml0aWFsaXphdGlvblBhcmFtcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzeW5jUG9pbnQucmVjZW50RXZlbnRzLmxlbmd0aCA+PSBzeW5jUG9pbnQuZXZlbnRMb2dMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqIFRyaW0gdGhlIGxvZyB0byBwcmV2ZW50IHVubmVjZXNzYXJ5IHNpemUgKi9cbiAgICAgICAgICAgICAgICAgICAgc3luY1BvaW50LnJlY2VudEV2ZW50cy4kcmVtb3ZlKDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN5bmNQb2ludC5yZWNlbnRFdmVudHMuJGFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVR5cGU6IGNoYW5nZVR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtSWQ6IGxpc3RJdGVtSWQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogaW5pdGlhbGl6YXRpb25QYXJhbXMudXNlcklkLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBGaXJlYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIGZ1bmN0aW9uXG4gICAgICogQG5hbWUgU3luY1BvaW50LnN1YnNjcmliZVRvQ2hhbmdlc1xuICAgICAqIEBtZXRob2RPZiBTeW5jUG9pbnRcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBBbGxvd3Mgc3Vic2NyaWJlcnMgKGNvbnRyb2xsZXJzICYgc2VydmljZXMpIHRvIGJlIG5vdGlmaWVkIHdoZW4gY2hhbmdlIGlzIG1hZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBleGVjdXRlIGFmdGVyIGEgY2hhbmdlIGlzIG1hZGUuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbdW5zdWJzY3JpYmVPblN0YXRlQ2hhbmdlID0gdHJ1ZV1cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEZ1bmN0aW9uIHVzZWQgdG8gdW5zdWJzY3JpYmUuXG4gICAgICovXG4gICAgc3Vic2NyaWJlVG9DaGFuZ2VzKGNhbGxiYWNrOiBGdW5jdGlvbiwgdW5zdWJzY3JpYmVPblN0YXRlQ2hhbmdlOiBib29sZWFuID0gdHJ1ZSk6IEZ1bmN0aW9uIHtcbiAgICAgICAgdmFyIHN5bmNQb2ludCA9IHRoaXM7XG4gICAgICAgIGlmIChzeW5jUG9pbnQuc3Vic2NyaXB0aW9ucy5pbmRleE9mKGNhbGxiYWNrKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8qKiBPbmx5IHJlZ2lzdGVyIG5ldyBzdWJzY3JpcHRpb25zLCBpZ25vcmUgaWYgc3Vic2NyaXB0aW9uIGFscmVhZHkgZXhpc3RzICovXG4gICAgICAgICAgICBzeW5jUG9pbnQuc3Vic2NyaXB0aW9ucy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9ICgpID0+IHRoaXMudW5zdWJzY3JpYmUoY2FsbGJhY2spO1xuXG4gICAgICAgIGlmICh1bnN1YnNjcmliZU9uU3RhdGVDaGFuZ2UpIHtcbiAgICAgICAgICAgIC8vdmFyICRyb290U2NvcGUgPSAkaW5qZWN0b3IuZ2V0KCckcm9vdFNjb3BlJyk7XG5cbiAgICAgICAgICAgIC8qKiBVbnN1YnNjcmliZSBmcm9tIG5vdGlmaWNhdGlvbnMgd2hlbiB3ZSBsZWF2ZSB0aGlzIHN0YXRlICovXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG5cbiAgICB9XG5cbiAgICB1bnN1YnNjcmliZShjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnN1YnNjcmlwdGlvbnMuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL3N5bmNfcG9pbnQudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtb21lbnRcIlxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0b2FzdHJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ0b2FzdHJcIlxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1N5bmNTZXJ2aWNlfSBmcm9tICcuL3N5bmNfc2VydmljZSc7XG5pbXBvcnQge1ByZXNlbmNlU2VydmljZX0gZnJvbSAnLi9wcmVzZW5jZV9zZXJ2aWNlJztcbmltcG9ydCB7QW5ndWxhclBvaW50TW9kdWxlfSBmcm9tICdhbmd1bGFyLXBvaW50JztcblxuLyoqXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5hbWUgc3luY1xuICogQGRlc2NyaXB0aW9uXG4gKiBTdXBwb3J0cyAzLXdheSBkYXRhIGJpbmRpbmcgaWYgeW91IGRlY2lkZSB0byBpbmNvcnBvcmF0ZSBmaXJlYmFzZSAoYW55IGNoYW5nZSBieSBhbnkgdXNlclxuICogdG8gYSBsaXN0IGl0ZW0gaXMgbWlycm9yZWQgYWNyb3NzIHVzZXJzKS4gVGhlIGRhdGEgaXNuJ3Qgc2F2ZWQgdG8gZmlyZWJhc2UgYnV0IHRoZSBjaGFuZ2VcbiAqIGV2ZW50IGlzIHNvIGFsbCBzdWJzY3JpYmVycyBhcmUgbm90aWZpZWQgdG8gcmVxdWVzdCBhbiB1cGRhdGUgZnJvbSBTaGFyZVBvaW50LlxuICpcbiAqIEluIG9yZGVyIHRvIGdldCB0aGlzIHNlcnZpY2UgdG8gd29yaywgeW91IG5lZWQgdG8gaGF2ZSBhbmd1bGFyRmlyZSBpbnN0YWxsZWQgYW5kIGhhdmUgeW91clxuICogZmlyZWJhc2UgdXJsIHNldCBhdCBhcENvbmZpZy5maXJlYmFzZVVSTC5cbiAqXG4gKiBUaGlzIHdpbGwgY3JlYXRlIGEgY2hhbmdlIHBvaW50IGF0OiBhcENvbmZpZy5maXJlYmFzZVVSTCArICcvY2hhbmdlcy8nICsgbW9kZWwubGlzdC50aXRsZVxuICogVGhlIHBvaW50IGNvbnRhaW5zIEZpcmViYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUCB0byBkZXRlcm1pbmUgdGhlIHRpbWUgb2YgdGhlIG1vc3QgcmVjZW50IGNoYW5nZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGgzPkV4YW1wbGUgb2YgaG93IHRvIHNldCB0aGUgZmlyZWJhc2UgdXJsPC9oMz5cbiAqIDxwcmU+XG4gKiAucnVuKGZ1bmN0aW9uIChhcENvbmZpZykge1xuICogICAvL1NldCB0aGUgZm9sZGVyIHdoZXJlIG9mZmxpbmUgWE1MIGlzIHN0b3JlZFxuICogICBhcENvbmZpZy5maXJlYmFzZVVSTCA9ICdNeSBGaXJlYmFzZSBVUkwnO1xuICpcbiAqIH0pO1xuICogPC9wcmU+XG4gKlxuICogPGgzPkV4YW1wbGUgb2YgaG93IHRvIHJlZ2lzdGVyIGZyb20gdGhlIG1vZGVsPC9oMz5cbiAqIDxwcmU+XG4gKiAvL0FkZCBhIHN1YnNjcmlwdGlvbiBzZXJ2aWNlIHRoYXQgd2lsbCBhdXRvbWF0aWNhbGx5IGtlZXAgZGF0YSBpbiBzeW5jIHdpdGggYWxsIG90aGVyIGFjdGl2ZSB1c2Vyc1xuICogbW9kZWwuc3luYyA9IGFwU3luY1NlcnZpY2UuY3JlYXRlU3luY1BvaW50KG1vZGVsKTtcbiAqXG4gKiBtb2RlbC5zeW5jLnN1YnNjcmliZVRvQ2hhbmdlcyhmdW5jdGlvbiAoKSB7XG4gKiAgICAvL0RvIHNvbWV0aGluZyBiZWNhdXNlIGEgY2hhbmdlIGhhcyBvY2N1cnJlZFxuICpcbiAqICB9LCB0cnVlKTsgLy9VbnN1YnNjcmliZSBvbiByb3V0ZSBjaGFuZ2Ugc28gd2UgZG9uJ3Qga2VlcCByZWZlcmVuY2UgaW4gZnV0dXJlXG4gKiA8L3ByZT5cbiAqXG4gKi9cblxuXG5Bbmd1bGFyUG9pbnRNb2R1bGVcbiAgICAuc2VydmljZSgnYXBTeW5jU2VydmljZScsIFN5bmNTZXJ2aWNlKVxuICAgIC5zZXJ2aWNlKCdhcFByZXNlbmNlU2VydmljZScsIFByZXNlbmNlU2VydmljZSlcbiAgICAvLyBJbnN0YW50aWF0ZSBpbW1lZGlhdGVseVxuICAgIC5ydW4oWydhcFByZXNlbmNlU2VydmljZScsIChhcFByZXNlbmNlU2VydmljZSkgPT4ge1xuICAgIH1dKTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3RzbGludC1sb2FkZXIhLi9zcmMvaW5kZXgudHMiXSwic291cmNlUm9vdCI6IiJ9