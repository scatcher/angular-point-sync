import { Model } from 'angular-point';
import { Lock } from './lock.factory';
import { ISyncPoint, ISyncServiceInitializationParams, SyncPoint } from './sync-point.factory';

export let $q,
  $firebaseArray,
  $rootScope,
  apListItemFactory,
  deferred: ng.IDeferred<ISyncServiceInitializationParams>,
  serviceIsInitialized: ng.IPromise<ISyncServiceInitializationParams>;

export class SyncService {
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
   * @description Service waits for userId to be provided along with reference to the databse before adding the watch to event array.
   * @param {number} userId
   * @param {firebase.database.Reference} firebaseRef
   */
  initialize(userId: number, firebaseRef: firebase.database.Reference) {
    deferred.resolve({ userId, firebaseRef });
    apListItemFactory.ListItem.prototype.lock = Lock;
  }
}
