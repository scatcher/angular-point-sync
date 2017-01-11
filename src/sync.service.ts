import { Model } from 'angular-point';

import {ISyncServiceInitializationParams, ISyncPoint, SyncPoint} from './sync-point.factory';
import { ILockReference, Lock } from './lock.factory';

export let $q,
    $firebaseArray,
    $rootScope,
    apListItemFactory,
    deferred: ng.IDeferred<ISyncServiceInitializationParams>,
    serviceIsInitialized: ng.IPromise<ISyncServiceInitializationParams>;

export interface SyncService {
    Lock: () => ng.IPromise<ILockReference>;
    createSyncPoint(model: Model): ISyncPoint;
    initialize(userId: number, firebaseUrl: string): void;
}

export class SyncService implements SyncService {
    /** Minification safe - we're using leading and trailing underscores but gulp plugin doesn't treat them correctly */
    static $inject = ['$firebaseArray', '$q', 'apListItemFactory', '$rootScope'];
    Lock = Lock;
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

    createSyncPoint(model: Model): ISyncPoint {
        return new SyncPoint(model);
    }

    /**
     * @description Service waits for userId to be provided before adding the watch to event array.
     * @param {{userId: userId, firebaseUrl: firebaseUrl}} userId
     */
    /**
     * @description Service waits for userId to be provided before adding the watch to event array.
     * @param {number} userId
     * @param {string} firebaseUrl
     */
    initialize(userId: number, firebaseUrl: string): void {
        deferred.resolve({userId: userId, firebaseUrl: firebaseUrl});
        apListItemFactory.ListItem.prototype.lock = Lock;
    }

}
