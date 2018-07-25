/**
 * Wraps main Breeze.helper.Api methods with ones altered 
 * to use local JSON data for testing.
 * @class DummyApi
 * @alias Breeze.helper.DummyApi
 * @see Breeze.helper.Api
 */
Ext.define('Breeze.helper.DummyApi', {
    requires: [
        'Breeze.helper.Api'
    ],

    statics: {
        dummyPath: 'resources/dummy_api/',

        // clones of API
        request: function(api, service, params, sync, successHandler, failureHandler){
            return Breeze.helper.Api.request(api,service,params,sync,successHandler,failureHandler);
        },
        // Wrapped version of serviceRequest that targets dummy JSON data
        serviceRequest: function(service, params, sync, successHandler, failureHandler){
            return Breeze.helper.Api.request(
                '', [this.dummyPath, service, 'default.json'].join('/'), 
                params, sync, successHandler, failureHandler
            );
        },
        decodeJsonResponse: function(result){
            return Breeze.helper.Api.decodeJsonResponse(result);
        }

    }
});