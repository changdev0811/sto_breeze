/**
 * User Preferences API Class
 * 
 * Inherits references to auth and api helpers from api Base class
 * @class Base
 * @namespace Breeze.api.user.Preferences
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.user.Preferences', {
    extend: 'Breeze.api.Base',

    savePrefs: function(param){
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'UpdateUserPreferences',
                {
                    ConfigInfo: param
                },
                true,
                true,
                function(r){
                    console.info("'UpdateUserPreferences' call success", r);
                    resolve(r);
                },
                function(err){
                    console.warn("'UpdateUserPreferences' call failed", err);
                    reject(err);
                }
            );
        });
    }
})