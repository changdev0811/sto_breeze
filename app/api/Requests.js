/**
 * My Requests API calls base class
 * Extends Breeze.api.Base.
 * @class Requests
 * @namespace Breeze.api.Requests
 */
Ext.define('Breeze.api.Requests', {
    extend: 'Breeze.api.Base',
    singleton: true,

    /**
     * Create new leave request
     * @param {String} name Name of request
     * @return {Promise} Promise resolving with toast object also including
     *      'requestId' param defining the newly created request's unique ID
     *      Rejection returns a generic error message in an error toast object
     * @api /createLeaveRequest
     */
    createRequest: function(name){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'createLeaveRequest',
                {
                    name: name
                },
                true, false,
                function(r) {
                    var resp = api.decodeJsonResponse(r),
                        requestId = resp.info[0];
                    resolve({
                        type: Ext.Toast.INFO,
                        message: 'New Leave Request Created',
                        requestId: requestId
                    });
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Error creating Leave Request',
                        error: err
                    });
                }
            )
        })
    },

    /**
     * @api /deleteLeaveRequest
     */
    deleteRequest: function(){

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
     * Employee Rename leave request
     * @param {String} requestId ID of request to change
     * @api /employeeRenameLeaveRequest
     */
    renameEmployeeRequest: function(requestId, newName){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'employeeRenameLeaveRequest',
                {
                    request_id: requestId,
                    newName: newName
                },
                true, false,
                function(r){
                    resolve(requestId)
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * Submit employee leave request
     * @param {String} requestId Leave request ID
     * @return {Promise} Resolves with success toast, errors with error toast
     * @api /employeeSubmitLeaveRequest
     */
    submitEmployeeRequest: function(requestId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'employeeSubmitLeaveRequest',
                {
                    request_id: requestId
                },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Leave Request Submitted Successfully'
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err
                        });
                    }
                },
                function(err){
                    console.warn('Error occured in Requests.submitEmployeeRequest: ', err);
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error occurred',
                        error: err
                    });
                }
            );
        });
    },

    /**
     * Add single day to leave request
     * @param {String} requestId ID of target leave request
     * @param {Date} startDate Date of requested day
     * @param {Number} amount Amount of time requested
     * @param {String} employeeId (optional) id of employee to add request for
     * @param {Object} companyConfigRecord Reference to company config
     * @return {Promise} Promise resolving with success toast object including date object,
     *       or rejecting with error
     * @api /addLeaveRequestDay
     */
    addRequestDay: function(requestId, startDate, code, amount, employeeId, companyConfigRecord){
        var employeeId = this.resolveEmployeeId(employeeId),
            companyConfigRecord = this.resolveCompanyConfigRecord(companyConfigRecord),
            api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'addLeaveRequestDay',
                {
                    lookup: employeeId,
                    request_id: requestId,
                    code: code,
                    EnforceAllowed: companyConfigRecord.get('EnforceAllowed'),
                    recordAmount: amount,
                    time: (new Date(startDate)).toUTC({out: Date.UTC_OUT.NUMBER}) / 1000
                },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r);
                    if(!resp.success || (resp.err && resp.err.length > 0)){
                        reject({
                            type: Ext.Toast.ERROR,
                            message: resp.err
                        });
                    } else {
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Leave Request Day successfully added',
                            date: startDate
                        });
                    }
                },
                function(err){
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error occured'
                    });
                }
            )
        });
    },

    /**
     * @todo TODO: should replicate multiple day adding function from old calendar.js:477ish
     */
    addRequestDayRange: function(){

    },

    /**
     * Ported from LeaveRequestSlidePanel.js; used to be part of leave request
     * days store, abstracted out for consistency
     * @param {Object} record Leave Request record object
     * @param {Object} requestId Leave Request ID
     * @param {Object} employeeId (optional) Employee ID to pass along as lookup param, 
     *      pass undefined or null to use cookie to determine
     * @param {Object} companyConfigRecord reference to company config record;
     * @return {Promise} Resolves with response object, at which time leave request days
     *      store should get reloaded; failure rejects with error object
     * @api /updateLeaveRequestEvent
     */
    updateRequestEvent: function(record, requestId, employeeId, companyConfigRecord){
        var employeeId = this.resolveEmployeeId(employeeId),
            companyConfigRecord = this.resolveCompanyConfigRecord(companyConfigRecord),
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
     * @param {Object} companyConfigRecord reference to company config record;
     * @return {Promise} Resolves with true if valid, rejects with error string
     * @api /validateLeaveRequestDay
     */
    validateRequestDay: function(requestId, day, code, amount, employeeId, companyConfigRecord){
        // Provide default values to employeeId and companyConfigRecord if not explicitly provided
        var employeeId = this.resolveEmployeeId(employeeId),
            companyConfigRecord = this.resolveCompanyConfigRecord(companyConfigRecord),
            api = this.api;
        
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'validateLeaveRequestDay',
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
    },


    /**
     * @api /deleteLeaveRequestDay
     */
    deleteRequestDay: function(){

    },

    privates: {
        resolveEmployeeId: function(value){
            return (Object.isUnvalued(value))? this.auth.getCookies().emp : value;
        },
        resolveCompanyConfigRecord: function(value){
            return (Object.isUnvalued(value))? Ext.getStore('CompanyConfig').getAt(0) : value;
        }
    }

});