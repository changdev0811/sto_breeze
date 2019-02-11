/**
 * API Calls for My Accrual Policies
 * @class AccrualPolicy
 * @memberof Breeze.api.employee
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.employee.AccrualPolicy', {
    extend: 'Breeze.api.Base',
    singleton: true,
    /**
     * @api /getCategoryAdjustInfo
     */
    categoryAdjustInfo: function (employeeId, categoryId, activeDay, showScheduled) {
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getCategoryAdjustInfo',
                {
                    employee_id: employeeId,
                    category_id: categoryId,
                    activeDay: activeDay,
                    showScheduled: showScheduled
                },
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
     * API call for getting category point in time info
     * @memberof Breeze.api.employee.AccrualPolicy
     * @api /getCategoryPointinTime
     * @param {String} employeeId Employee ID
     * @param {Number} categoryId Category ID
     * @param {Date} activeDay Active day
     * @param {Boolean} showScheduled Whether scheduled should be shown
     * @return {Promise} Promise resolving with object containing response data, or failing with error
     */
    categoryPointInTime: function(employeeId, categoryId, activeDay, showScheduled) {
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getCategoryPointinTime',
                {
                    employee_id: employeeId,
                    category_id: categoryId,
                    activeDay: activeDay,
                    showScheduled: showScheduled
                },
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
     * Save employee category adjustment API call (ported from EmployeeCategoryAdjust.js)
     * @api saveEmployeeCategoryAdjust
     * @param {String} employeeId ID of employee adjustment is for
     * @param {Number} categoryId Target category ID
     * @param {Objet} category Category Adjustment parameters
     * @param {Object} rules Accrual Rules parameters
     * @return {Promise} Promise resolving with success toast or rejecting with error toast
     */
    saveCategoryAdjust: function(employeeId, categoryId, categoryParams, rules){
        var api = this.api,
            params = Ext.Object.merge({
                employee_id: employeeId, category_id: categoryId
            }, categoryParams, rules);
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'saveEmployeeCategoryAdjust',
                params,
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: 'info',
                            message: 'Category Adjust successfully saved',
                            timeout: 'info'
                        });
                    } else {
                        reject({
                            type: 'error',
                            message: resp.err,
                            timeout: 'error'
                        });
                    }
                },
                function(err){
                    reject({
                        type: 'error',
                        message: 'Unknown error occured',
                        timeout: 'error',
                        error: err
                    });
                }
            )
        })
        
    },

    /**
     * @api saveEmployeeCategoryAdjustNotAllowed
     * @param {*} employeeId 
     * @param {*} categoryId 
     * @param {*} calendarType 
     */
    saveCategoryAdjustNotAllowed: function(employeeId, categoryId, calendarType){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'saveEmployeeCategoryAdjustNotAllowed',
                {
                    employee_id: employeeId,
                    category_id: categoryId,
                    cal_type: calendarType
                },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(r);
                    if(resp.success){
                        resolve({
                            type: 'info',
                            message: 'Category Adjust successfully saved',
                            timeout: 'info'
                        });
                    } else {
                        reject({
                            type: 'error',
                            message: resp.err,
                            timeout: 'error'
                        });
                    }
                },
                function(err){
                    reject({
                        type: 'error',
                        message: 'Unknown error occured',
                        timeout: 'error',
                        error: err
                    });
                }
            )
        })
        
    }
});