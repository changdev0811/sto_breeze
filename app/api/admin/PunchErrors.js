/**
 * Admin Punch Errors API calls
 * Extends Breeze.api.Base.
 * @class PunchErrors
 * @namespace Breeze.api.admin.PunchErrors
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.PunchErrors', {
    extend: 'Breeze.api.Base',

    /**
     * @api RemovePunchError
     */
    removeError: function(punch){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.punchRequest(
                'RemovePunchError',
                {
                    punchData: punch
                },
                true, false,
                function(r){
                    resolve();
                },
                function(e){
                    reject(e);
                }
            )
        });
    },

    /**
     * 
     * @param {*} punch
     * @api /SubmitPunch, also calls RemovePunchError on success
     */
    process: function(punch){
        var api = this.api,
            me = this;
        return new Promise((resolve, reject)=>{
            api.punchRequest(
                'SubmitPunch',
                {
                    punchData: punch
                },
                true, false,
                function(r){
                    me.removeError(punch).then((r2)=>{
                        resolve();
                    }).catch((e)=>{
                        reject();
                    })
                },
                function(e){
                    reject(e);
                }
            )
        });
    }
});