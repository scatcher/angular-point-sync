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

module ap.sync {
    'use strict';

    angular.module('apSync', ['angularPoint', 'toastr'])
        .service('apSyncService', SyncService)
        .service('apPresenceService', PresenceService)
        .run(Run)
        
    //Instantiate immediately
    function Run(apPresenceService) {}

}