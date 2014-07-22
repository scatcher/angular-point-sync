'use strict';

/**
 * @ngdoc service
 * @name angularPoint.syncService
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
 * TODO: Change this from a single timestamp into an object containing the user id who made the most recent change allow us to better ignore changes made by the current user.
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
 * model.sync = apSyncService.synchronizeData(model, function () {
 *    //Do something because a change has occurred
 *
 *  });
 * </pre>
 *
 * @requires angularPoint.apConfig
 * @requires SyncPoint
 */
angular.module('angularPoint')
  .factory('apSyncService', ["$q", "$timeout", "$firebase", "apConfig", function ($q, $timeout, $firebase, apConfig) {


    /**
     * @ngdoc function
     * @name SyncPoint
     * @description
     * Constructor to handle notifying models when data is updated.
     *
     * @param {object} model Model to notify for change events.
     * @param {function} updateQuery Query to execute on change.
     * @returns {object} sync Sync object
     *
     * @requires angularPoint.apConfig
     * @requires angularPoint.apConfig#firebaseURL
     * @constructor
     */
    var SyncPoint = function (model, updateQuery) {
      var sync = this;
      sync.updateQuery = updateQuery;
      sync.changeNotifier = new Firebase(apConfig.firebaseURL + '/changes/' + model.list.title);
      sync.lastUpdate = $firebase(sync.changeNotifier);

      /**
       * @ngdoc function
       * @name SyncPoint.registerChange
       * @methodOf SyncPoint
       * @description
       * Notify all other users listening to this model that a change has been made.
       */
      sync.registerChange = function () {
        console.log("Change detected in " + model.list.title + ' list.');
        var timeStamp = Firebase.ServerValue.TIMESTAMP;
        /** Reset counter so change made by current user won't also cause a refresh */
        sync.changeCount = 0;
        sync.lastUpdate.$set(timeStamp);
      };

      /** Container to hold all current subscriptions for the model */
      sync.subscriptions = [];

      /** Running counter of the number of changes */
      sync.changeCount = 0;

      sync.processChanges = function () {
        /** Prevent from running the first time and when most recent change was made by current user */
        if (sync.changeCount > 0) {
          _.each(sync.subscriptions, function (callback) {
            console.log("Processing callback");
            if (_.isFunction(callback)) {
              callback();
            }
          });
        }

        sync.changeCount += 1;
      };

      /** Don't make a call more than once every second */
      sync.throttleRequests = _.throttle(function () {
        return sync.processChanges()
      }, 1000, {leading: false});

      /** Fired when anyone updates a list item */
      sync.lastUpdate.$on("change", function (newVal, oldVal) {
        sync.throttleRequests();
      });

      /**
       * @ngdoc function
       * @name SyncPoint.subscribeToChanges
       * @methodOf SyncPoint
       * @description
       * Allows subscribers (controllers) to be notified when change is made
       *
       * @param {function} callback Callback to execute after a change is made.
       */
      sync.subscribeToChanges = function (callback) {
        if (sync.subscriptions.indexOf(callback) === -1) {
          /** Only register new subscriptions, ignore if subscription already exists */
          sync.subscriptions.push(callback);
        }
      };

    };

    /**
     * @ngdoc method
     * @name angularPoint.syncService#synchronizeData
     * @methodOf angularPoint.syncService
     * @description
     * Uses the SyncPoint constructor to generate a new sync object responsible
     * for alerting a model of any changes.
     *
     * @param {object} model Model to notify for change events.
     * @param {function} updateQuery Query to execute on change.
     * @returns {object} sync Sync object
     *
     * @requires SyncPoint
     *
     */
    function synchronizeData(model, updateQuery) {
      return new SyncPoint(model, updateQuery);
    }

    return {
      synchronizeData: synchronizeData
    };
  }]);