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
       //    path: 'app/resources/EmployeePhotos/',
       // Revised path, since ExtJS6 doesn't put resources/ in /app
       path: 'resources/EmployeePhotos/',

       /**
        * Old STO Employee Photo path
        */
       oldPath: 'app/resources/EmployeePhotos',

       /**
        * Helper that makes sure photo path url uses new path
        * if it is still using the old one
        * @param {String} url URL to force to use new path
        * @return {String} url, with path updated if necessary
        */
       forceUpdatedPath: function (url) {
           var path = url;
           if (url.startsWith(this.profilePicture.oldPath)) {
               path = url.replace(
                   this.profilePicture.oldPath,
                   this.profilePicture.path
               );
           }
           return path;
       },
       
       /**
        * Default profile image filename
        */
       defaultFile: 'default.png'
   }

});