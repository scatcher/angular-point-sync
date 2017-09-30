import * as browser from 'detect-browser';
import * as firebase from 'firebase';
import * as _ from 'lodash';
import * as toastr from 'toastr';

import { ISyncServiceInitializationParams } from './sync-point.factory';
import { serviceIsInitialized, SyncService } from './sync.service';

let service: PresenceService;

export interface IFirebaseSessionObject extends AngularFireObject {
    browser: string;
    connected: number;
    lastActive: number;
    notifications?: IUserNotification[];
    path: string;
    reload: boolean; // Hard refresh browser
}

export interface IUserNotification {
    message: string;
    title?: string;
    toastType: string;
    toastrOptions?: Object;
    senderId?: number;
    senderSessionKey?: string;
}

export interface IFirebaseUsersObject {
    [key: number]: {
        // User ID
        connections: { [key: string]: IFirebaseSessionObject }; // Object for each active connection
        lastOnline: number; // Timestamp
    };
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
    static $inject = ['$q', '$rootScope', '$firebaseArray', '$firebaseObject', '$location', 'apSyncService'];
    currentUserId: number;
    initializeSession: ng.IPromise<any>;
    userConnectionUrl: string;
    users: AngularFireObject;
    sessionConnection: firebase.database.Reference;

    constructor(
        private $q: ng.IQService,
        $rootScope: angular.IRootScopeService,
        private $firebaseArray: AngularFireArrayService,
        private $firebaseObject: AngularFireObjectService,
        $location: angular.ILocationService,
        apSyncService: SyncService,
    ) {
        service = this;
        const deferred = $q.defer();
        service.initializeSession = deferred.promise;

        // Wait for SyncService to be initialized with current users userId and firebaseUrl
        serviceIsInitialized.then((initializationParamsObject: ISyncServiceInitializationParams) => {
            this.currentUserId = initializationParamsObject.userId;

            // since I can connect from multiple devices or browser tabs, we store each connection instance separately
            // any time that connectionsRef's value is null (i.e. has no children) I am offline
            const thisConnectionRef = initializationParamsObject.firebaseRef.child(
                'users/' + this.currentUserId + '/connections'
            );

            // stores the timestamp of my last disconnect (the last time I was seen online)
            const lastOnlineRef = initializationParamsObject.firebaseRef.child(
                'users/' + String(this.currentUserId) + '/lastOnline'
            );

            // stores the timestamp of my last disconnect (the last time I was seen online)
            const logsRef = initializationParamsObject.firebaseRef.child(
                'users/' + String(this.currentUserId) + '/logs'
            );

            const connectedRef = initializationParamsObject.firebaseRef.root.child('.info/connected');

            connectedRef.on('value', snap => {
                if (snap.val() === true) {
                    // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

                    // add this device to my active connections list
                    service.sessionConnection = thisConnectionRef.push({
                        browserName: browser.name,
                        browserVersion: browser.version,
                        connected: firebase.database.ServerValue.TIMESTAMP,
                        lastActive: firebase.database.ServerValue.TIMESTAMP,
                        path: $location.url(),
                        reload: false,
                    });

                    // Create a new log entry
                    const sessionLog = logsRef.push({
                        browserName: browser.name,
                        browserVersion: browser.version,
                        connected: firebase.database.ServerValue.TIMESTAMP,
                        disconnected: null,
                        history: [],
                    });

                    const sessionHistory = sessionLog.child('history');

                    // Update the disconnect time on the log so we can see how long the session was
                    sessionLog
                        .child('disconnected')
                        .onDisconnect()
                        .set(firebase.database.ServerValue.TIMESTAMP);

                    // Update the current path whenever state changes
                    $rootScope.$on('$stateChangeSuccess', (event, current, previous, rejection) => {
                        // Update indicator showing where user currently is within app
                        service.sessionConnection.update({
                            lastActive: firebase.database.ServerValue.TIMESTAMP,
                            path: $location.url(),
                        });

                        // Log to history for current user
                        sessionHistory.push({
                            time: firebase.database.ServerValue.TIMESTAMP,
                            path: $location.url(),
                        });
                    });

                    // When I disconnect, remove this device
                    service.sessionConnection.onDisconnect().remove();

                    // When I disconnect, update the last time I was seen online
                    lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

                    const activeSessionObject = service.$firebaseObject(service.sessionConnection);
                    deferred.resolve(activeSessionObject);

                    // Watch for events
                    service.watchForReloadEvent(activeSessionObject);
                    service.watchForNotifications(this.currentUserId, activeSessionObject.$id);
                }
            });
        });
    }

    deleteSessionData(userId: number, sessionKey: string) {
        return service.getSessionConnectioUrl(userId, sessionKey).then(sessionConnectionUrl => {
            const sessionRef = this.sessionConnection.root.child(sessionConnectionUrl);
            sessionRef.remove();
        });
    }

    displayUserNotification(notification: IUserNotification): void {
        if (toastr) {
            toastr[notification.toastType](notification.message, notification.title, notification.toastrOptions);
        } else {
            console[notification.toastType](notification.title, notification.message);
        }
    }

    getSessionNotificationsArray(userId: number, sessionKey: string): ng.IPromise<AngularFireArray> {
        return service.getSessionConnectioUrl(userId, sessionKey).then(sessionConnectionUrl => {
            const notificationsRef = this.sessionConnection.root.child(sessionConnectionUrl + '/notifications');
            return service.$firebaseArray(notificationsRef).$loaded();
        });
    }

    getSessionConnectioUrl(userId: number, sessionKey: string): ng.IPromise<string> {
        return serviceIsInitialized.then((initializationParamsObject: ISyncServiceInitializationParams) => {
            return initializationParamsObject.firebaseRef.path + '/users/' + userId + '/connections/' + sessionKey;
        });
    }

    getUsers(): ng.IPromise<IFirebaseUsersObject> {
        return serviceIsInitialized.then((initializationParamsObject: ISyncServiceInitializationParams) => {
            if (!service.users) {
                const usersRef = initializationParamsObject.firebaseRef.child('users');
                service.users = service.$firebaseObject(usersRef);
            }
            return service.users;
        });
    }

    reloadBrowser(userId: number, sessionKey: string): void {
        service.getSessionConnectioUrl(userId, sessionKey).then((sessionConnectionUrl: string) => {
            const sessionRef = service.sessionConnection.root.child(sessionConnectionUrl);
            const sessionObject = service.$firebaseObject(sessionRef);
            sessionObject.$loaded().then(() => {
                sessionObject.reload = true;
                sessionObject.$save();
            });
        });
    }

    sendUserNotification(
        userId: number,
        sessionKey: string,
        notification: IUserNotification
    ): ng.IPromise<IUserNotification> {
        const deferred = this.$q.defer();
        this.getSessionNotificationsArray(userId, sessionKey).then(sessionNotifications => {
            deferred.resolve(sessionNotifications.$add(notification));
        });

        return deferred.promise as ng.IPromise<IUserNotification>;
    }

    watchForNotifications(userId: number, sessionKey: string): void {
        this.getSessionNotificationsArray(userId, sessionKey).then(notificationArray =>
            notificationArray.$watch((eventObject: any) => {
                // Trigger when a new notification is added to the session notifications array
                if (eventObject.event === 'child_added') {
                    _.each(notificationArray, (notification: IUserNotification, index: any) => {
                        service.displayUserNotification(notification);
                        notificationArray.$remove(notification);
                    });
                }
            })
        );
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
