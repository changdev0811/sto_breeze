/**
 * Admin Supervisor Roles API calls
 * Extends Breeze.api.Base.
 * @class Roles
 * @namespace Breeze.api.admin.Roles
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.Roles', {
    extend: 'Breeze.api.Base',


    /**
     * Check if supervisor role is currently in use
     * @param {(String|Number)} roleId ID of role to check
     * @return {Promise} Promise resolving with bool indicating true
     *      if role is in use, else false; Rejecting with object giving
     *      err and/or info attributes
     * @api CheckSupervisorRole
     */
    check: function(roleId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'CheckSupervisorRole',
                {RoleId: roleId},
                true, false,
                function(resp){
                    var r = api.decodeJsonResponse(resp);
                    if(r.success){
                        // return bool indicating if role is in use
                        // true means yes, false means no
                        resolve(r.err > 1);
                    } else {
                        reject({err: r.err, info: r.info});
                    }
                },
                function(err){
                    reject({
                        err: err, info: null
                    });
                }
            )
        })
    },

    /**
     * Delete existing supervisor role
     * @param {(String|Number)} roleId ID of role to delete
     * @param {String} roleName Name of role to delete
     * @param {(String|Number)} replacementRoleId ID of role to use as 
     *      replacement for any users assigned role being deleted (optional, 
     *      determined by check call)
     * @return {Promise} Promise resolving with success message or rejecting
     *      with error toast messag object
     * @api DeleteSupervisorRole
     */
    delete: function(roleId, roleName, replacmentRoleId){
        var api = this.api,
            replacementRoleId = Object.defVal(
                replacementRoleId, ''
            );
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'DeleteSupervisorRole',
                {
                    RoleId: roleId,
                    RoleName: roleName,
                    replaceId: replacementRoleId
                },
                true, false,
                function(resp){
                    var r = api.decodeJsonResponse(resp);
                    if(r.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: r.err,
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: r.err,
                            error: r.info
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Error',
                        error: err
                    })
                }
            )
        });
    },

    /**
     * Create new supervisor role
     * @api AddSupervisorRole
     * @return {Promise} Promise resolving to true on success or
     *      rejecting with error
     */
    add: function(){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'AddSupervisorRole',
                {},
                true, false,
                function(resp){
                    var r = api.decodeJsonResponse(resp);
                    if(r.success){
                        resolve(true);
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'Error',
                            error: e.err
                        });
                    }
                },
                // Error handler
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Error',
                        error: err
                    });
                }
            )
        })
    },

    /**
     * Update supervisor role
     * @api /UpdateSupervisorRole
     * @param {Object} secRole Updated security role data object
     * @return {Promise} Promise resolving to true or rejecting with
     *      error toast message
     */
    update: function(secRole){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'UpdateSupervisorRole',
                { SecRole: JSON.stringify(secRole) },
                true, false,
                function(resp){
                    var r = api.decodeJsonResponse(resp);
                    if(r.success){
                        resolve(true);
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'Error',
                            error: e.err
                        });
                    }
                },
                // Error handler
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Error',
                        error: err
                    });
                }
            )
        });
    }

});