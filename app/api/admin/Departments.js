/**
 * Admin Departments API calls
 * Extends Breeze.api.Base.
 * @class Departments
 * @namespace Breeze.api.admin.Departments
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.Departments', {
    extend: 'Breeze.api.Base',


    /**
     * Create department
     * TODO: implement create
     * @return {Promise} Promise resolving with success message or
     *      rejecting with error
     * @api /createDept
     */
    create: function(){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'createDept',
                {},
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: resp.info.join('')
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.err
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        err: err, 
                        info: null
                    });
                }
            );
        });
    },

    /**
     * Check if able to delete department
     * TODO: Implement canDelete
     * @param {String} departmentId ID of department to remove
     * @return {Promise} Promise resolving with success message or
     *      rejecting with error
     * @api /canDeleteDept
     */
    canRemove: function(departmentId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'canDeleteDept',
                { 
                    department_id: departmentId,
                },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve(true);
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.err
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        err: err, 
                        info: null
                    });
                }
            );
        });
    },

    /**
     * Remove department
     * @todo TODO: Implement removeDept
     * @param {String} departmentId ID of department to remove
     * @return {Promise} Promise resolving with success message or
     *      rejecting with error
     * @api /removeDept
     */
    remove: function(departmentId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'removeDept',
                { 
                    department_id: departmentId
                },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: resp.info.join('')
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.err
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        err: err, 
                        info: null
                    });
                }
            );
        });
    },

    /**
     * @api /AddDeptSupervisor
     */
    addSupervisor: function(departmentId, supervisorId, roleId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'AddDeptSupervisor',
                { 
                    department_id: departmentId,
                    role_id: roleId,
                    supervisor_id: supervisorId
                },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: resp.info.join('')
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.err
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        err: err, 
                        info: null
                    });
                }
            );
        });
    },

    /**
     * @api RemoveDeptSupervisor
     */
    removeSupervisor: function(departmentId, supervisorId, roleId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'RemoveDeptSupervisor',
                { 
                    department_id: departmentId,
                    role_id: roleId,
                    supervisor_id: supervisorId
                },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: resp.info.join('')
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.err
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        err: err, 
                        info: null
                    });
                }
            );
        });
    },

    /**
     * @api UpdateDeptSupervisor
     */
    updateSupervisor: function(departmentId, supervisorId, roleId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'UpdateDeptSupervisor',
                { 
                    department_id: departmentId,
                    role_id: roleId,
                    supervisor_id: supervisorId
                },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: resp.info.join('')
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.err
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        err: err, 
                        info: null
                    });
                }
            );
        });
    },

    filteredList: function(searchString){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getDepartmentListAPI',
                {
                    searchString: searchString,
                    excludeterminated: 1,
                    includeActions: true
                },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r),
                        ids = resp.map((r)=>{return r.data;});
                    
                    resolve(ids);
                },
                function(e){
                    reject(null);
                }
            )
        });
    },

    /**
     * @api updateDept
     */
    update: function(departmentId, name, config){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'updateDept',
                { 
                    department_id: departmentId,
                    department_name: name,
                    configinfo: Ext.JSON.encode(config)
                },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            // message: resp.info.join('')
                            message: 'Department updated successfully'
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'An error occured while saving changes to the department',
                            error: resp.err
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        err: err, 
                        info: null
                    });
                }
            );
        });
    }
});
