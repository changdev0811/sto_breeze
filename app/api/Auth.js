/**
 * Authorization API Class
 * @class Auth
 * @alias Breeze.api.Auth
 */
Ext.define('Breeze.api.Auth', {
    extend: 'Breeze.api.Base',
    
    /**
     * Perform 'pre-login' which resolves actual login url for company code
     * @param {String} companyCode company code to use
     * @return {Promise} resolves with object {success: bool, url: string}, or rejects with error
     */
    preLogin: function(companyCode){
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest('getLoginServerUrl', {
                    company_code: companyCode
                }, false, true,
                function(resp){
                    var r = api.decodeJsonResponse(resp);
                    if(r.success){
                        resolve({success: true, url: r.err});
                    } else {
                        resolve({success: false})
                    }
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * Perform login action, returning success/failure result along
     * with any accompanying messages
     * 
     * Ported over from code in old STOLogin view
     * 
     * @param {String} url Base login API url, provided by preLogin
     * @param {String} companyCode Company code to use for login
     * @param {String} userName userName to use for login
     * @param {String} pass md5'd password for login
     * @return {Promise} promise, on resolve giving an object with 
     *  'success'; if true, {renewal: bool, renewalMessage: str},
     *  if false, {detail: {reason: str, message: str}}
     */
    login: function(url, companyCode, userName, pass){
        var parameters = {
            'loginCode': companyCode,
            'loginUsername': userName,
            'loginPassword': pass
        };
        var api = this.api;
        var auth = this.auth;
        return new Promise(function(resolve, reject){
            api.request(
                url, 'login', 
                parameters,
                false,
                true,
                function(resp){
                    var r = api.decodeJsonResponse(resp);
                    if(r.success){
                        var t = r.err.split("__");
                        auth.setCookies(t[0],t[1],t[2]);
                        var renewal = {enabled: false, message: ''};
                        if(t[3] && t[4] == 15){
                            renewal.enabled = true;
                            renewal.message = t[3];
                        }
                        resolve({
                            success: true,
                            renewal: renewal.enabled,
                            renewalMessage: renewal.message
                        });
                    } else {
                        var errorDetail = {
                            reason: null,
                            message: ''
                        };
                        if(r.err == "Terminated Employeees Cannot Login"){
                            errorDetail.reason = "terminated";
                            errorDetail.message = r.err;
                        } else if(r.err == "Subscription Expired.") {
                            errorDetail.reason = "expired";
                            errorDetail.message = r.err;
                        } else {
                            var t = r.err.split("__");
                            auth.setCookies(t[0],t[1],t[2]);
                            if(t[3] == "ShowEULA"){
                                if(t[4] == 15){
                                    // super admin, so need to show EULA
                                    errorDetail.reason = "showEula";
                                } else {
                                    // employee, they need to have admin agree
                                    errorDetail.reason = "eula";
                                    errorDetail.message = 'Your SoftTime Online End User License Agreement has not been accepted, please contact your Administrator';
                                    auth.reloadCookies(-1);
                                }
                            }
                        }
                        resolve({
                            success: false,
                            detail: errorDetail
                        });
                    }
                },
                function(err){
                    reject(err);
                }
            )
        });
    }


    
});