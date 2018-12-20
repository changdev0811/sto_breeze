/**
 * Admin Superadmin Options API calls
 * Extends Breeze.api.Base.
 * @class Roles
 * @namespace Breeze.api.admin.SuperAdminOptions
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.SuperAdminOptions', {
    extend: 'Breeze.api.Base',


    /**
     * @return {Promise} Promise resolving with bool indicating
     *      time kron status or rejecting with error object
     * @api getTimeKronStatus
     */
    timeKronStatus: function () {
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getTimeKronStatus',
                {},
                true, false,
                function(resp){
                    resolve(api.decodeJsonResponse(resp));
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * @api UpdateCompanyConfig
     */
    update: function(){

    }

});