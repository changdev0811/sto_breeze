/**
 * API related helper methods
 */
(function(){
    Ext.define('Breeze.helper.Api', {
        requires: [
            'Breeze.helper.Auth'
        ],
        statics: {

            // API Request paths
            apiPaths: {
                punch: '../STOServe/PunchService.asmx/',
                // api: '../STOServe/Service1.asmx/',
                api: 'https://vitest.softtimeonline.com/STOServe/Service1.asmx/',
                // pulled from sti_namespace, used in STOLogin view
                login: 'https://vitest.softtimeonline.com/STOServe/Service1.asmx/'
            },

            /**
             * Return action attached to apiPaths.api base as url
             * @param {String} action API Action String
             * @return {String} full api url
             */
            url: function(action){
                return [this.apiPaths.api,action].join('');
            },

            /**
             * Generic AJAX API request
             * @param {String} api API Path url
             * @param {String} service Service name
             * @param {Object} params Parameters
             * @param {boolean} cookieParams If true, cookie auth params are included in request params
             *  Default true
             * @param {Boolean} sync Enable/disable sync (default true)
             * @param {Function} successHandler Success function
             * @param {Function} failureHandler Failure function
             */
            request: function(api, service, params, cookieParams, sync, successHandler, failureHandler){
                var reqParams = params;
                var authCookies = Breeze.helper.Auth.getCookies();
                var cookieParams = defVal(cookieParams, true);
                if(cookieParams) {
                    reqParams.cust_id = defVal(reqParams.cust_id, authCookies.cust);
                    reqParams.emp_id = defVal(reqParams.emp_id, authCookies.emp);
                    reqParams.hashcookie = defVal(reqParams.hashcookie, authCookies.pass);
                }
                var sync = defVal(sync, true);
                var successHandler = defVal(successHandler, function(a,b){});
                var failureHandler = defVal(failureHandler, function(a,b){});

                Ext.Ajax.request({
                    method: 'POST', async: sync,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    sto: true,
                    url: api + service,
                    params: JSON.stringify(reqParams),
                    success: successHandler,
                    failure: failureHandler
                });
            },

            /**
             * Punch API AJAX Request (ported from old homemade.js 'PunchAjax')
             * @param {String} service Service name
             * @param {Object} params Parameters
             * @param {Boolean} sync Enable/disable sync (default true)
             * @param {Function} successHandler Success function
             * @param {Function} failureHandler Failure function
             */
            punchRequest: function(service, params, sync, successHandler, failureHandler){
                this.request(this.apiPaths.punch, service, params, true, sync, successHandler, failureHandler);
            },

            /**
             * Common service API AJAX Request (ported from old homemade.js 'Ajax')
             * @param {String} service Service name
             * @param {Object} params Parameters
             * @param {boolean} cookieParams If true, cookie auth params are included in request params
             *  Default true
             * @param {Boolean} sync Enable/disable sync (default true)
             * @param {Function} successHandler Success function
             * @param {Function} failureHandler Failure function
             */
            serviceRequest: function(service, params, cookieParams, sync, successHandler, failureHandler){
                this.request(this.apiPaths.api, service, params, cookieParams, sync, successHandler, failureHandler);
            },

            /**
             * Parse .NET JSON response (ported from old homemade.js::responseFrom)
             */
            decodeJsonResponse: function(result){
                return Ext.decode(result.responseText).d;
            }
        }

    });
     /** If a is undefined, return b, else return a 
     * (for handling undefined optional params) */
    var defVal = function(a,b){return"undefined"==typeof a?b:a};
})();