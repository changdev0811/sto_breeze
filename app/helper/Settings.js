/**
 * Helper class serving as base for static settings.
 * 
 * Provides references to intent-scoped settings helper classes
 * @class Settings
 * @namespace Breeze.helper.Settings
 * @static
 */
Ext.define('Breeze.helper.Settings', {
   singleton: true,

   requires: [
       'Breeze.helper.settings.Employee'
   ],

   /**
    * Alias/reference to Employee-scoped settings
    */
   employee: Breeze.helper.settings.Employee

});