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

        resPath: 'resources/dummy_api/',
        railsPath: 'http://0.0.0.0:3000/STOServe/Service1.asmx/',
        
        useResources: false,

        dummyPath: function(){
            if(this.useResources){
                return this.resPath;
            } else {
                return this.railsPath;
            }
        },

        // clones of API
        url: function(action, special){
            var special = (typeof special == 'undefined')? 'default' : special;
            if(this.useResources){
                return [this.dummyPath(),action,'/',[special,'.json'].join('')].join('');
            } else {
                return [this.dummyPath(),action].join('');
            }
        },
        request: function(api, service, params, cookieParams, sync, successHandler, failureHandler){
            return Breeze.helper.Api.request(api,service,params, cookieParams, sync,successHandler,failureHandler);
        },
        // Wrapped version of serviceRequest that targets dummy JSON data
        serviceRequest: function(service, params, cookieParams, sync, successHandler, failureHandler){
            return Breeze.helper.Api.request(
                '', [[this.dummyPath(), service].join(''), (this.useResources)? '/default.json' : ''].join(''), 
                params, cookieParams, sync, successHandler, failureHandler
            );
        },
        decodeJsonResponse: function(result){
            return Breeze.helper.Api.decodeJsonResponse(result);
        }

    }
});