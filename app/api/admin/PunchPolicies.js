/**
 * Admin Punch Policies API calls
 * Extends Breeze.api.Base.
 * @class PunchPolicies
 * @namespace Breeze.api.admin.PunchPolicies
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.PunchPolicies', {
    extend: 'Breeze.api.Base',

    /**
     * @param {(String|Number)} templatePolicyId ID of policy to use as template
     * @return {Promise} Promise resolving with toast and generated Id in attr
     *  id, else rejecting with error toast
     * @api /addPunchPolicy
     */
    add: function (templatePolicyId) {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'addPunchPolicy',
                { policy_id: templatePolicyId },
                true, false,
                function (r) {
                    var resp = api.decodeJsonResponse(r);
                    if (resp.success) {
                        resolve({
                            type: Ext.Toast.INFO,
                            message: resp.info.join(''),
                            id: resp.err
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.info
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
     * @param {(Number|String)} policyId ID of policy to delete
     * @api /removePunchPolicy
     */
    delete: function (policyId) {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'removePunchPolicy',
                {policy_id: policyId},
                true, false,
                function (r) {
                    var resp = api.decodeJsonResponse(r);
                    if (resp.success) {
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Punch Policy successfully removed'
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.info
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
     * @param {Object} params Update parameters object
     * @return {Promise} Promise resolving with toast or rejecting with 
     *      error toast
     * @api /UpdatePunchPolicyInformation
     */
    update: function (params) {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'UpdatePunchPolicyInformation',
                params,
                true, false,
                function (r) {
                    var resp = api.decodeJsonResponse(r);
                    if (resp.success) {
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Punch Policy successfully updated'
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.info
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
     * @api /getPunchPolicyEmployees
     */
    applicableEmployees: function (policyId) {
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getPunchPolicyEmployees',
                { policy_id: policyId },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r).employees;
                    resolve(resp);
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * @api /applyPunchPolicyToEmployees
     */
    applyToEmployees: function (policyId, employees) {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'applyPunchPolicyToEmployees',
                { 
                    policy_id: policyId,
                    employee_ids: employees
                },
                true, false,
                function (r) {
                    var resp = api.decodeJsonResponse(r);
                    if (resp.success) {
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Punch Policy successfully applied'
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err,
                            error: resp.info
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