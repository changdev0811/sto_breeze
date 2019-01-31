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

    makeApiCall: function(method, params){
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                method,
                params,
                true,
                true,
                function(r){
                    console.info(`"${method}" call success`, r);
                    Ext.getStore('UserPreferencesStore').load(function(records, operation, success) {
                        if(success){
                            console.log(records);
                        }
                    });
                    resolve(r);
                },
                function(err){
                    console.warn(`"${method}" call failed`, err);
                    reject(err);
                }
            );
        });
    }
})