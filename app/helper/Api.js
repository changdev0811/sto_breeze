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
                // TODO: make api url relative
                // api: 'https://vitest.softtimeonline.com/STOServe/Service1.asmx/',
                api: '../STOServe/Service1.asmx/',
                // ASHX Script path
                ashx: 'https://vitest.softtimeonline.com/STOServe/',
                // pulled from sti_namespace, used in STOLogin view
                // TODO: make login api url relative
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
             * Get url path to ASHX script
             * @param {String} action API ASHX file name
             * @return {String} full url path to ASHX
             */
            ashxUrl: function(action){
                return [this.apiPaths.ashx,action].join('');
            },

            /**
             * Generic AJAX API request
             * @todo TODO: Revisit and decide on keeping/tossing cookieParams
             * @param {String} api API Path url (can be name of attribute in apiPaths)
             * @param {String} service Service name
             * @param {Object} params Parameters
             * @param {boolean} cookieParams If true, cookie auth params are included in request params
             *  Default true
             * @param {Boolean} sync Enable/disable sync (default true)
             * @param {Function} successHandler Success function
             * @param {Function} failureHandler Failure function
             */
            request: function(api, service, params, cookieParams, sync, successHandler, failureHandler){
                if(cookieParams){
                    // If cookies are gone, force reload to ask for login
                    Breeze.helper.Auth.isAuthorized(true);
                }

                if(this.apiPaths[api]){
                    api = this.apiPaths[api];
                }
                
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
                if(cookieParams){
                    // If cookies are gone, force reload to ask for login
                    Breeze.helper.Auth.isAuthorized(true);
                }

                if(this.apiPaths[api]){
                    api = this.apiPaths[api];
                }
                var workingMessage = Object.defVal(workingMessage, 'Upload in progress...',true);
                var reqParams = {};
                var authCookies = Breeze.helper.Auth.getCookies();
                var cookieParams = defVal(cookieParams, true);
                if(cookieParams) {
                    reqParams.cust_id = defVal(reqParams.cust_id, authCookies.cust);
                    reqParams.emp_id = defVal(reqParams.emp_id, authCookies.emp);
                    reqParams.hashcookie = defVal(reqParams.hashcookie, authCookies.pass);
                }
                // var sync = defVal(sync, false);
                var successHandler = defVal(successHandler, function(a,b){});
                var failureHandler = defVal(failureHandler, function(a,b){});
                
                form.submit({
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    url: api + service,
                    waitMsg: workingMessage,
                    params: JSON.stringify(reqParams),
                    // form: form,
                    success: successHandler,
                    failure: failureHandler
                });
            },

            /**
             * Punch API AJAX Request (ported from old homemade.js 'PunchAjax')
             * @todo TODO: Revisit and decide on keeping/tossing cookieParams
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
             * @todo TODO: Revisit and decide on keeping/tossing cookieParams
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
             * @param {String} root Optional name of root element to pull from (default 'd', null for none)
             */
            decodeJsonResponse: function(result,root){
                var root = Object.defVal(root, 'd'),
                    resp = Ext.decode(result.responseText);
                if(root){
                    resp = resp[root];
                }
                return resp;
            }
        }

    });
     /** If a is undefined, return b, else return a 
     * (for handling undefined optional params) */
    var defVal = function(a,b){return"undefined"==typeof a?b:a};
})();