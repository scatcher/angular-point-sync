import * as moment from 'moment';
import * as _ from 'lodash';

import {serviceIsInitialized, $firebaseArray, $q} from './sync_service';


    export interface ILockReference {
        lockQueue: AngularFireArray;
        myLockRef: ng.IPromise<Firebase>;
        unlock(): void;
    }

    export interface IListItemLock {
        userId: number;
        time: string;
    }

    export function Lock(): ng.IPromise<ILockReference> {
        const deferred = $q.defer();

        const listItem = this;

        /** Only can lock existing records */
        if (listItem.id) {
            const model = listItem.getModel();
            /** Make sure user has rights to edit */
            const userPermMask = listItem.resolvePermissions();
            if (userPermMask.EditListItems) {

                serviceIsInitialized
                    .then((initializationParams) => {

                        /** Reference to the firebase lock queue for this record*/
                        const listItemLockRef = new Firebase(initializationParams.firebaseUrl + 'locks/' + model.list.title + '/' + listItem.id);
                        const lockQueue = $firebaseArray(listItemLockRef);

                        /** Reference to the lock record I created */
                        const myLockRef = lockQueue.$add({
                            userId: initializationParams.userId,
                            time: Firebase.ServerValue.TIMESTAMP
                        });

                        /** Passed as a reference so we can remove the lock when the modal form is closed*/
                        const unlock = () => myLockRef.then((myLock) => myLock.remove());
                        
                        //Automatically remove any list item locks older than 4 hours
                        lockQueue.$loaded(() => _.each(lockQueue, (listItemLock: IListItemLock) => {
                            if (moment().diff(lockQueue, 'hours') > 4) {
                                console.log('Purging expired list item lock.', listItemLock);                                
                                lockQueue.$remove(listItemLock);
                            }
                        }));

                        const lockReference = { lockQueue, myLockRef, unlock };

                        myLockRef.then((lockRef) => {
                            /** Remove the lock in the event the user looses connection, changes page, or closes browser*/
                            lockRef.onDisconnect().remove();
                            // var key = lockRef.key();
                            // var index = lockQueue.$indexFor(key); // returns location in the array                            
                            // deferredLock.resolve(lockQueue[index]);

                        });
                        
                        // Include a referece to the lock in the queue                            

                        deferred.resolve(lockReference);

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
