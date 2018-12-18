Ext.define('Breeze.api.admin.MOTD', {
    extend: 'Breeze.api.Base',

    /**
     * Load MOTD
     * @api getMOTD
     */
    get: function(){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getMOTD',
                {},
                true, false,
                function(resp){
                    var rsp = api.decodeJsonResponse(resp);
                    resolve(rsp.MOTDhtml);
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        error: err
                    });
                }
            )
        });
    },

    /**
     * Save MOTD
     * @param {String} motd Message of the Day
     * @api saveMOTD
     */
    save: function(motd){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'saveMOTD',
                {MOTD: motd},
                true, false,
                function(resp){
                    var rsp = api.decodeJsonResponse(resp);
                    if(rsp.success){
                        resolve();
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'Error saving MOTD',
                            error: rsp.err
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        error: err
                    });
                }
            )
        })
    }
});