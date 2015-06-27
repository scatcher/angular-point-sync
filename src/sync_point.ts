/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

module ap.sync {
    'use strict';

    export interface ISyncServiceChangeEvent {
        changeType: string; // 'add'|'update'|'delete';
        listItemId: number;
        userId: number;
        time: number;
    }

    export interface ISyncServiceInitializationParams {
        userId: number;
        firebaseUrl: string;
    }

    export interface ISyncPoint {
        eventLogLength: number;
        recentEvents: ISyncServiceChangeEvent[];
        registerChange(changeType: string, listItemId: number);
        subscribeToChanges(callback: Function, unsubscribeOnStateChange: boolean): Function;
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
        constructor(private model: ap.Model) {
            var syncPoint = this;

            serviceIsInitialized
                .then((initializationParams: ISyncServiceInitializationParams) => {

                    syncPoint.changeNotifier = new Firebase(initializationParams.firebaseUrl + '/changes/' + model.list.title);

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

            if (unsubscribeOnStateChange) {
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
}