/**
 * Admin Point Categories API calls
 * @class PointCats
 * @namespace Breeze.api.admin.PointCats
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.PointCats', {
    extend: 'Breeze.api.Base',

    /**
     * Add Point Category
     * @return {Promise} promise resolving with object
     *      containing ID of created category and
     *      success message, or rejecting with error 
     *      toast message
     * @api addPointCategory
     */
    add: function () {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'addPointCategory',
                {},
                true, false,
                function (resp) {
                    var rsp = api.decodeJsonResponse(resp);
                    if(rsp.success){
                        resolve({
                            id: rsp.err,
                            message: rsp.info.join('')
                        });
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
    },

    /**
     * TODO: Implement delete
     * @api deletePointCategory
     */
    delete: function (point) {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'deletePointCategory',
                {
                    point_id: pointId
                },
                true, false,
                function (resp) {

                },
                function (err) {

                }
            )
        });
    },

    /**
     * TODO: implement update
     * @api updatePointCategory
     */
    update: function () {

    }
});