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
    singleton: true,

    // statics: {
        apiPaths: {
            punch: 'resources/dummy_api/',
            // api: '../STOServe/Service1.asmx/',
            api: 'resources/dummy_api/',
            // ASHX Script path
            ashx: '/STOServe/',
            // pulled from sti_namespace, used in STOLogin view
            login: 'resources/dummy_api/'
        },

        resPath: 'resources/dummy_api/',
        apiPath: '/STOServe/Service1.asmx/',
        railsRoot: 'http://0.0.0.0:3000',
        proxyRoot: 'http://0.0.0.0:32332',
        
        useResources: false,
        useProxy: false,

        dummyPath: function(){
            if(this.useResources){
                return this.resPath;
            } else {
                return this.resolveRoot(this.apiPath);
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
        /**
         * Get url path to ASHX script
         * @param {String} action API ASHX file name
         * @return {String} full url path to ASHX
         */
        ashxUrl: function(action){
            var p = [this.resolveRoot(this.apiPaths.ashx),action].join('');
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
        /**
         * Parse .NET JSON response (ported from old homemade.js::responseFrom)
         * @param {String} root Optional name of root element to pull from (default 'd', null for none)
         */
        decodeJsonResponse: function(result,root){
            return Breeze.helper.Api.decodeJsonResponse(result,root);
        },
        /**
         * Generic AJAX Upload request using form
         * @todo TODO: Revisit and decide on keeping/tossing cookieParams
         * @param {String} api API Path url (can be name of attribute in apiPaths)
         * @param {String} service Service name
         * @param {Object} form Form element
         * @param {String} workingMessage Text to show while submit is in progress
         * @param {boolean} cookieParams If true, cookie auth params are included in request params
         *  Default true
         * @param {Function} successHandler Success function
         * @param {Function} failureHandler Failure function
         * @memberOf Breeze.helper.Api
         */
        upload: function(api, service, form, workingMessage, cookieParams, successHandler, failureHandler){
            // if using apiPaths, resolve locally so dummy path is used
            if(this.apiPaths[api]){
                api = this.apiPaths[api];
            }
            return Breeze.helper.Api.upload(api, service, form, workingMessage, cookieParams, successHandler, failureHandler);
        },

        privates: {
            resolveRoot: function(p){
                return [
                    (this.useProxy)? this.proxyRoot : this.railsRoot,
                    p
                ].join('');
            }
        }

    // }
});