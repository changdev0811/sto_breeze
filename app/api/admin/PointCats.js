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
     * Delete point category
     * @param {Object} pointId Category ID of point to delete
     * @return {Promise} Promise resolving with success message
     *      or rejecting with Toast error message
     * @api deletePointCategory
     */
    delete: function (pointId) {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'deletePointCategory',
                {
                    pointcat_id: pointId
                },
                true, false,
                function (resp) {
                    var rsp = api.decodeJsonResponse(resp);
                    if(rsp.success){
                        resolve(
                            rsp.info.join('')
                        );
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
     * TODO: implement update
     * @api updatePointCategory
     */
    update: function () {

    }
});