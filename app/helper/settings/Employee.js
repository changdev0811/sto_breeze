/**
 * Employee-scoped settings helper class
 * @class Employee
 * @namespace Breeze.helper.settings.Employee
 * @static
 */
Ext.define('Breeze.helper.settings.Employee', {
   singleton: true,


   /**
    * Employee profile image-related settings
    */
   profilePicture: {
       /**
        * Path where profile images are stored
        * TODO: Confirm correct relative server path for profile photos
        */
       path: 'app/resources/EmployeePhotos/',
       // Revised path, since ExtJS6 doesn't put resources/ in /app
       // path: 'resources/EmployeePhotos/
       
       /**
        * Default profile image filename
        */
       defaultFile: 'default.png'
   }

});