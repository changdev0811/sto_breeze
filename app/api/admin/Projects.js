/**
 * Admin Projects API calls
 * Extends Breeze.api.Base.
 * @class Projects
 * @namespace Breeze.api.admin.Projects
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.Projects', {
    extend: 'Breeze.api.Base',

    add: function(parentId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'addProject',
                { parent_id: parentId },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.SUCCESS,
                            message: resp.info.join('')
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.info
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
    },

    /**
     * Delete project
     * @param {String} projectId ID of  project to remove
     * @return {Promise} Promise resolving or rejecting with toast
     * based on success/failure
     * @api removeProject
     */
    delete: function(projectId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'removeProject',
                { project_id: projectId },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.SUCCESS,
                            message: resp.info.join('')
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.info
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
    },

    update: function(){

    }

});