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
        apiPaths: {
            punch: 'resources/dummy_api/',
            // api: '../STOServe/Service1.asmx/',
            api: 'resources/dummy_api/',
            // pulled from sti_namespace, used in STOLogin view
            login: 'resources/dummy_api/'
        },
        
        dummyPath: 'resources/dummy_api/',

        // clones of API
        url: function(action, special){
            var special = (typeof special == 'undefined')? 'default' : special;
            return [this.dummyPath,action,'/',[special,'.json'].join('')].join('');
        },
        request: function(api, service, params, cookieParams, sync, successHandler, failureHandler){
            return Breeze.helper.Api.request(api,service,params, cookieParams, sync,successHandler,failureHandler);
        },
        // Wrapped version of serviceRequest that targets dummy JSON data
        serviceRequest: function(service, params, cookieParams, sync, successHandler, failureHandler){
            return Breeze.helper.Api.request(
                '', [[this.dummyPath, service].join(''), 'default.json'].join('/'), 
                params, cookieParams, sync, successHandler, failureHandler
            );
        },
        decodeJsonResponse: function(result){
            return Breeze.helper.Api.decodeJsonResponse(result);
        }

    }
});