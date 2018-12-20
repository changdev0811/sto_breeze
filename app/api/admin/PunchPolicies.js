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
     * @api /deletePunchPolicy
     */
    delete: function () {

    },

    /**
     * @api /UpdatePunchPolicyInformation
     */
    update: function () {

    },

    /**
     * @api /getPunchPolicyEmployees
     */
    applicableEmployees: function () {

    },

    /**
     * @api /applyPunchPolicyToEmployees
     */
    applyToEmployees: function () {

    }

});