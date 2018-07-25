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