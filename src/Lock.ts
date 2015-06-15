/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

module ap.sync {
    'use strict';

    export var Lock = (): ng.IPromise<{reference:IListItemLock[]; unlock(lockReference: IListItemLock)}> => {
        var deferred = $q.defer();

        var listItem = this;

        /** Only can lock existing records */
        if (listItem.id) {
            var model = listItem.getModel();
            /** Make sure user has rights to edit */
            var userPermMask = listItem.resolvePermissions();
            if (userPermMask.EditListItems) {

                serviceIsInitialized
                    .then((initializationParams) => {

                        /** Reference to the firebase lock queue for this record*/
                        var ref = new Firebase(initializationParams.fireBaseUrl + 'locks/' + model.list.title + '/' + listItem.id);
                        var lockQueue = $firebaseArray(ref);

                        /** Reference to the lock record I created */
                        var myLock = lockQueue.$add({
                            userId: initializationParams.userId,
                            time: Firebase.ServerValue.TIMESTAMP
                        });

                        /** Passed as a reference so we can remove the lock when the modal form is closed*/
                        var unlock = () => myLock.then((lockReference) => lockReference.remove());

                        /** Remove the lock in the event the user looses connection, changes page, or closes browser*/
                        myLock.then((lockReference) => {
                            lockReference.onDisconnect().remove();
                            deferred.resolve({reference: lockQueue, unlock: unlock});
                        });

                    });

            } else {
                /** User doesn't have edit rights */
                deferred.resolve({});
            }
        } else {
            /** New record so can't lock */
            deferred.resolve({});
        }
        return deferred.promise;

    }
}