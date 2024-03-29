import { ListItemChangeType, Model } from "angular-point";
import * as firebase from "firebase/app";
import * as _ from "lodash";
import {
  $firebaseArray,
  $rootScope,
  serviceIsInitialized,
} from "./sync.service";

export interface ISyncServiceChangeEvent {
  changeType: ListItemChangeType;
  listItemId: number;
  userId: number;
  time: number;
}

export interface ISyncServiceInitializationParams {
  userId: number;
  firebaseRef: firebase.database.Reference;
}

export interface ISyncPoint {
  eventLogLength: number;
  recentEvents: ISyncServiceChangeEvent[];
  registerChange(changeType: string, listItemId: number);
  subscribeToChanges(
    callback: Function,
    unsubscribeOnStateChange: boolean
  ): Function;
  unsubscribe(callback);
}

export class SyncPoint implements ISyncPoint {
  eventLogLength = 10;
  changeNotifier: firebase.database.Reference;
  recentEvents;
  /** Container to hold all current subscriptions for the model */
  subscriptions = [];

  constructor(private model: Model) {
    const syncPoint = this;

    serviceIsInitialized.then(
      (initializationParams: ISyncServiceInitializationParams) => {
        syncPoint.changeNotifier = initializationParams.firebaseRef.child(
          "changes/" + model.list.title
        );

        const query = syncPoint.changeNotifier.limitToLast(
          syncPoint.eventLogLength
        );

        syncPoint.recentEvents = $firebaseArray(query);

        syncPoint.recentEvents.$loaded().then((eventArray) => {
          /** Fired when anyone updates a list item */
          syncPoint.recentEvents.$watch((log) => {
            if (log.event === "child_added") {
              const newEvent: ISyncServiceChangeEvent =
                syncPoint.recentEvents.$getRecord(log.key);
              /** Capture if event was caused by current user */
              const externalTrigger =
                newEvent.userId !== initializationParams.userId;
              syncPoint.processChanges(newEvent, externalTrigger);
            }
          });
        });
      }
    );
  }

  /**
   *
   * @param {ISyncServiceChangeEvent} newEvent Details of event.
   * @param {boolean} externalTrigger Was the changed caused by another user.
   */
  private processChanges(
    newEvent: ISyncServiceChangeEvent,
    externalTrigger: boolean
  ): void {
    const syncPoint = this;
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
    const syncPoint = this;
    serviceIsInitialized.then((initializationParams) => {
      if (syncPoint.recentEvents.length >= syncPoint.eventLogLength) {
        /** Trim the log to prevent unnecessary size */
        syncPoint.recentEvents.$remove(0);
      }

      syncPoint.recentEvents.$add({
        changeType: changeType,
        listItemId: listItemId,
        userId: initializationParams.userId,
        time: firebase.database.ServerValue.TIMESTAMP,
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
  subscribeToChanges(
    callback: Function,
    unsubscribeOnStateChange = true
  ): Function {
    const syncPoint = this;
    if (syncPoint.subscriptions.indexOf(callback) === -1) {
      /** Only register new subscriptions, ignore if subscription already exists */
      syncPoint.subscriptions.push(callback);
    }

    const unsubscribe = () => this.unsubscribe(callback);

    if (unsubscribeOnStateChange) {
      /** Unsubscribe from notifications when we leave this state */
      $rootScope.$on("$stateChangeStart", () => {
        unsubscribe();
      });
    }

    return unsubscribe;
  }

  unsubscribe(callback) {
    const index = this.subscriptions.indexOf(callback);
    if (index !== -1) {
      this.subscriptions.splice(index, 1);
    }
  }
}
