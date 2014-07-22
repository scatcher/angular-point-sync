angular-point-sync
==================

This is an optional [angular-point](https://github.com/scatcher/angular-point) service.

Supports 3-way data binding if you decide to incorporate firebase (any change by any user to a list item is 
mirrored across users). The data isn't saved to firebase but the change event is so all subscribers are notified 
to request an update from SharePoint.

In order to get this service to work, you need to have angularFire installed and have your firebase url 
set at apConfig.firebaseURL.

This will create a change point at: apConfig.firebaseURL + '/changes/' + model.list.title The point contains 
Firebase.ServerValue.TIMESTAMP to determine the time of the most recent change.

Initial documentation can be found [here](http://scatcher.github.io/angular-point-sync).

This is still a work in progress and I need to add in some tests and a demo.