/**
 * Base class for scoped API call classes. Provides access to Api, Cookie and Auth helpers
 * @class Base
 * @alias Breeze.api.Base
 */
Ext.define('Breeze.api.Base', {
    requires: [
        'Breeze.helper.Api',
        'Breeze.helper.DummyApi',
        'Breeze.helper.Cookie',
        'Breeze.helper.Auth'
    ],

    // Helper aliases
    // TODO: Replace DummyApi ref with Api when done testing
    api: Breeze.helper.Base.api,
    cookie: Breeze.helper.Cookie,
    auth: Breeze.helper.Auth,
    /**
     * Alias for $breeze.defVal
     */
    defVal: Object.defVal,

    /** 
     * generic Api call maker
     * @param {String} method 
     * @param {Object} params payload
     * @param {Boolean} isCookie If true, cookie auth params are included in request params(Default true)
     * @param {Boolean} isSync Enable/disable sync (Default true)
    */
    makeApiCall: function(method, params, isCookie=true, isSync=true){
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                method,
                params,
                isCookie,
                isSync,
                function(r){
                    console.info(`"${method}" call success`, r);
                    resolve(r);
                },
                function(err){
                    console.warn(`"${method}" call failed`, err);
                    reject(err);
                }
            );
        });
    },
});