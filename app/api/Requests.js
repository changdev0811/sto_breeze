/**
 * My Requests API calls base class
 * Extends Breeze.api.Base.
 * @class Requests
 * @namespace Breeze.api.Requests
 */
Ext.define('Breeze.api.Requests', {
    extend: 'Breeze.api.Base',
    // singleton: true,


    config: {
        // Copy of company config store record to fall back on
        companyConfigRecord: null
    },

    constructor: function(cfg){
        this.callParent(arguments);
        this.initConfig(cfg || {});
    },

    /**
     * @api /deleteLeaveRequest
     */
    deleteRequest: function(){

    },

    /**
     * @api /deleteLeaveRequestDay
     */
    deleteRequestDay: function(){

    },

    /**
     * @api /employeeCancelLeaveRequest
     */
    cancelEmployeeRequest: function(){

    },

    /**
     * @api /employeeLeaveRequestChangeNotes
     */
    changeEmployeeRequestNotes: function(){

    },

    /**
     * @api /supervisorUpdateLeaveRequestNotes
     */
    changeSupervisorRequestNotes: function(){

    },

    /**
     * @api /employeeRenameLeaveRequest
     */
    renameEmployeeRequest: function(){

    },

    /**
     * @api /employeeSubmitLeaveRequest
     */
    submitEmployeeRequest: function(){

    },

    /**
     * Ported from LeaveRequestSlidePanel.js; used to be part of leave request
     * days store, abstracted out for consistency
     * @param {Object} record Leave Request record object
     * @param {Object} requestId Leave Request ID
     * @param {Object} employeeId (optional) Employee ID to pass along as lookup param, 
     *      pass undefined or null to use cookie to determine
     * @param {Object} companyConfigRecord (optional) reference to company config record; if not given,
     *      falls back to company config record stored in class instance
     * @return {Promise} Resolves with response object, at which time leave request days
     *      store should get reloaded; failure rejects with error object
     * @api /updateLeaveRequestEvent
     */
    updateRequestEvent: function(record, requestId, employeeId, companyConfigRecord){
        var employeeId = (Object.isUnvalued(employeeId))? this.auth.getCookies().emp : employeeId,
            companyConfigRecord = Object.defVal(companyConfigRecord, this.getCompanyConfigRecord(), true),
            api = this.api,
            param = {
                time: record.get('request_date'),
                code: record.get('category_code'),
                request_id: requestId,
                EnforceAllowed: companyConfigRecord.get('EnforceAllowed'),
                amount: record.get('Amount') / 100,
                lookup: employeeId
            };
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'updateLeaveRequestEvent',
                param,
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r);
                    resolve(resp);
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * Ported from /LeaveRequestSlidePanel.js, performs validation on leave request day
     * @param {(String|Number)} requestId Leave request ID
     * @param {String} day Date string used for time param
     * @param {String} code Category code
     * @param {Number} amount Request amount
     * @param {String} employeeId (optional) Employee ID to pass along as lookup param, 
     *      pass undefined or null to use cookie to determine
     * @param {Object} companyConfigRecord (optional) reference to company config record; if not given,
     *      falls back to company config record stored in class instanc
     * @return {Promise} Resolves with true if valid, rejects with error string
     * @api /validateLeaveRequestDay
     */
    validateRequestDay: function(requestId, day, code, amount, employeeId, companyConfigRecord){
        // Provide default values to employeeId and companyConfigRecord if not explicitly provided
        var employeeId = (Object.isUnvalued(employeeId))? this.auth.getCookies().emp : employeeId,
            companyConfigRecord = Object.defVal(companyConfigRecord, this.getCompanyConfigRecord(), true),
            api = this.api;
        
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'validateRequestDay',
                {   
                    lookup: employeeId,
                    time: day,
                    request_id: requestId,
                    code: code,
                    amount: amount,
                    EnforceAllowed: companyConfigRecord.get('EnforceAllowed')
                },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve(true);
                    } else {
                        reject(resp.err);
                    }
                },
                function(err){
                    reject('Unable to validate');
                }
            )
        });
    }

});