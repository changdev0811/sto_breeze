/**
 * Admin Accrual Policy API calls
 * Extends Breeze.api.Base.
 * @class AccrualPolicies
 * @namespace Breeze.api.admin.AccrualPolicies
 */
Ext.define('Breeze.api.admin.AccrualPolicies', {
    extend: 'Breeze.api.Base',

    /**
     * Save accrual policy
     * @param {Object} params Call parameters
     * @api saveAccrualPolicy
     * @return {Promise} Promise resolving in success or rejecting with error
     */
    save: function(params){
        var api = this.api,
            me = this;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'saveAccrualPolicy',
                params,
                true, true,
                // Success
                function(resp, req){
                    var response = api.decodeJsonResponse(resp);
                    if(response.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: response.err,
                            policyId: params.scheduleId
                        });
                    } else {
                        if(response.err !== 'You are not authenticated'){
                            reject({
                                type: Ext.Toast.ERROR,
                                message: response.err
                            });
                        } else {
                            reject({
                                type: Ext.Toast.ERROR,
                                message: response.err
                            });
                        }
                    }
                },
                // failure
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: err
                    });
                }
            )
        });
    },

    /**
     * Create accrual policy
     * @param {String} name Schedule Name
     * @param {String} id Schedule ID (0 for stand alone)
     * @return {Promise} Promise resolving with success or rejecting with error message
     * @api createAccrualPolicy
     */
    create: function(name, id){
        var api = this.api,
            id = Object.defVal(id,0);
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'createAccrualPolicy',
                {schedule_id: id, schedule_name: name},
                true, true,
                // Success
                function(response){
                    var resp = api.decodeJsonResponse(response);
                    if(resp.success){
                        resolve(resp.err);
                    } else {
                        reject(resp.err);
                    }
                },
                // Failure
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * Check if policy can be deleted
     * @param {String} id Policy ID
     * @return {Promise} Promise resolving success or rejecting with error toast, if
     *      successful, return's policy's name
     * @api canDeleteAccrualPolicy
     */
    canDelete: function(id){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'canDeleteAccrualPolicy',
                {schedule_id: id},
                true, true,
                // Success
                function(response){
                    var resp = api.decodeJsonResponse(response);
                    if(resp.success){
                        resolve(resp.err);
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err
                        });
                    }
                },
                // Failure
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Error',
                        error: err
                    });
                }
            )
        });
    },

    /**
     * Delete accrual policy
     * @param {String} id Policy ID
     * @return {Promise} Promise resolving success or rejecting with error toast
     * @api deleteAccrualPolicy
     */
    delete: function(id){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'deleteAccrualPolicy',
                {schedule_id: id},
                true, true,
                // Success
                function(response){
                    var resp = api.decodeJsonResponse(response);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: (resp.err).concat(' was successfully deleted')
                        })
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'Unable to Delete',
                            error: resp.err
                        });
                    }
                },
                // Failure
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Error',
                        error: err
                    });
                }
            )
        });
    },

    /**
     * Gather Employees and Categories a given Policy can be applied to
     * @param {String} policyId ID of Policy to gather Apply info for
     * @return {Promise} Resolves with object containing two stores: employees and
     *      categories. Rejects with error object.
     */
    employeesAndCategoriesForApply: function(policyId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getAccrualPolicyEmployeesAndCategories',
                {
                    schedule_id: policyId.toString()
                },
                true, false,
                // Success
                function(response){
                    var resp = api.decodeJsonResponse(response),
                        stores = {
                            employees: resp.employees,
                            categories: resp.categories
                        };

                        resolve(stores);
                },
                // Failure
                function(err){
                    reject(err);
                }
            )
        });
    },

    apply: function(scheduleId, employees, categories, changePast, changeShifts, changeCats, progress){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'applyAccrualPolicyProgress',
                {
                    schedule_id: scheduleId,
                    employee_ids: employees,
                    category_ids: categories,
                    changePastRecords: changePast,
                    changeUserModifiedSchedule: changeShifts,
                    changeUserModifiedCategories: changeCats,
                    progress: progress
                },
                true, false,
                // success
                function(response){
                    var resp = api.decodeJsonResponse(response);
                    if(resp.success){
                        var iteration = resp.info[0],
                            total = resp.info[1],
                            percent = iteration / total;
                        if(percent == 1){
                            resolve({done: true});
                        } else {
                            resolve({done: false, progress: iteration});
                        }
                    } else {
                        reject(false);
                    }
                },
                // failure
                function(err){
                    reject(false);
                }
            )
        });
    }

});