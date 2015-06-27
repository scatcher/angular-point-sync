/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

module ap.sync {
    'use strict';

    var service: PresenceService;

    export interface IFirebaseSessionObject extends AngularFireObject {
        browser: string;
        connected: number;
        lastActive: number;
        notifications?: IUserNotification[];
        reload: boolean; //Hard refresh browser
        path: string;
    }

    export interface IUserNotification {
        message: string;
        title?: string;
        toastType: string;
        toastrOptions?: Object;
    }

    export interface IFirebaseUsersObject {
        [key: number]: { //User ID
            connections: { [key: string]: IFirebaseSessionObject } //Object for each active connection
            lastOnline: number; //Timestamp
        }
    }

    export interface IFirebaseWatchEvent {
        event: string;
        key: string;
        prevId?: string;
    }

    /**
     * @ngdoc Object
     * @name PresenceService
     * @description
     * Creates a realtime reference to where each user is within the application when logged in, what browser they're using, when
     * the session was started, and if not online when the last time they were online.
     */
    export class PresenceService {
        identifyBrowser = identifyBrowser;
        initializeSession: ng.IPromise<IFirebaseSessionObject>;
        userConnectionUrl: string;
        users: AngularFireObject;
        sessionConnection: Firebase;
        static $inject = ['$q', '$rootScope', '$firebaseArray', '$firebaseObject', '$location', 'apSyncService', 'toastr'];
        constructor(private $q: ng.IQService, $rootScope: angular.IRootScopeService, private $firebaseArray: AngularFireArrayService, private $firebaseObject: AngularFireObjectService,
            $location: angular.ILocationService, apSyncService: SyncService, private toastr) {

            service = this;
            var deferred = $q.defer();
            service.initializeSession = deferred.promise;
            
            //Wait for SyncService to be initialized with current users userId and firebaseUrl
            serviceIsInitialized.then((initializationParamsObject: ISyncServiceInitializationParams) => {
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


                connectedRef.on('value', function(snap) {
                    if (snap.val() === true) {
                        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
                            
                        // add this device to my connections list
                        // this value contains info about the device and connection start timestamp
                        service.sessionConnection = thisConnectionRef.push({
                            browser: identifyBrowser(),
                            connected: Firebase.ServerValue.TIMESTAMP,
                            lastActive: Firebase.ServerValue.TIMESTAMP,
                            path: $location.url()
                        });

                        //Update the current path whenever state changes
                        $rootScope.$on('$stateChangeSuccess', function(event, current, previous, rejection) {
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
            })

        }
        deleteSessionData(userId: number, sessionKey: string) {
            var sessionRef = new Firebase(this.userConnectionUrl + 'connections/' + sessionKey);
            return sessionRef.remove();
        }

        displayUserNotification(notification: IUserNotification): void {
            service.toastr[notification.toastType](notification.message, notification.title, notification.toastrOptions);
        }
        
        getSessionNotificationsArray(userId: number, sessionKey: string): ng.IPromise<AngularFireArray> {
            var notificationsRef = new Firebase(this.userConnectionUrl + 'connections/' + sessionKey + '/notifications');
            return service.$firebaseArray(notificationsRef).$loaded();
        }
        getUsers(): ng.IPromise<IFirebaseUsersObject> {
            return serviceIsInitialized.then((initializationParamsObject: ISyncServiceInitializationParams) => {
                if(!service.users) {
                    var usersRef = new Firebase(initializationParamsObject.firebaseUrl + 'users');
                    service.users = service.$firebaseObject(usersRef);
                }
                return service.users;
            });
        }
        reloadBrowser(userId: number, sessionKey: string): void {
            var sessionRef = new Firebase(this.userConnectionUrl + 'connections/' + sessionKey);
            var sessionObject = service.$firebaseObject(sessionRef);
            sessionObject.$loaded()
                .then(() => {
                    sessionObject.reload = true;
                    sessionObject.$save();
                })
        }
        sendUserNotification(userId: number, sessionKey: string, notification: IUserNotification): ng.IPromise<IUserNotification> {
            var deferred = this.$q.defer();
            this.getSessionNotificationsArray(userId, sessionKey)
                .then((sessionNotifications) => {
                    deferred.resolve(sessionNotifications.$add(notification));
                });

            return deferred.promise;
        }
        watchForNotifications(userId: number, sessionKey: string): void {
            this.getSessionNotificationsArray(userId, sessionKey)
                .then((notificationArray: AngularFireArray) => notificationArray.$watch((eventObject) => {
                    //Trigger when a new notification is added to the session notifications array
                    if (eventObject.event === 'child_added') {
                        _.each(notificationArray, (notification: IUserNotification, index) => {
                            service.displayUserNotification(notification);
                            notificationArray.$remove(notification);
                        });
                    }
                }));

        }
        watchForReloadEvent(activeSessionObject: IFirebaseSessionObject): void {
            activeSessionObject.$watch((eventObject: IFirebaseWatchEvent) => {
                if (!!activeSessionObject.reload) {
                    activeSessionObject.reload = false;
                    activeSessionObject.$save();
                    location.reload(true);
                }
            });
        }
    }

    function identifyBrowser(): string {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }

}