/**
 * Admin Projects API calls
 * Extends Breeze.api.Base.
 * @class DeletedEmployee
 * @namespace Breeze.api.admin.DeletedEmployee
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.DeletedEmployee', {
    extend: 'Breeze.api.Base',

    restore:function(id){
        var api = this.api;

        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'restoreEmployee',
                {
                    employee_id: id
                },
                true, false,
                function (resp) {
                    var rsp = api.decodeJsonResponse(resp);
                    if(rsp.success){
                        resolve(rsp.err);
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: rsp.err,
                            error: rsp.err
                        });
                    }
                },
                function (err) {
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        error: err
                    });
                }
            )
        });


    }

});