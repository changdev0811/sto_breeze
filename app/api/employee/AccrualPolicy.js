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
                    resolve(r);
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
                    resolve(r);
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    saveCategoryAdjust: function(notAllowed){

    }
});