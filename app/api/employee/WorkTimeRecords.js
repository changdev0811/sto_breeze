/**
 * API Calls for Work Time Records scope; extends Breeze.api.Base, 
 * giving access to helper classes. 
 * Should be indirectly accessed through Breeze.api.Employee
 * @class WorkTimeRecords
 * @alias Breeze.api.employee.WorkTimeRecords
 */
Ext.define('Breeze.api.employee.WorkTimeRecords', {
    extend: 'Breeze.api.Base',
    
    /**
     * Wraps AJAX proxy in WorkTime record store to return a promise, and
     * to accept request parameters
     * @param {String} lookupId ID of user to lookup records for
     * @param {String} startTime Start date to get records for
     * @param {String} endTime Ending date to get records for
     * @param {String} storeId Optional name of created store, default is 'WorkTimeRecords'
     * @return {Promise} Promise wrapped around load callback, returning store on
     *  resolve, and nothing on reject
     */
    getWorkTimeRecordsForRange: function(lookupId, startTime, endTime, storeId){
        var storeId = this.defVal(storeId,'WorkTimeRecords');
        var me = this;
        return new Promise(function(resolve, reject){
            var store = Ext.create('Breeze.store.record.WorkTime', {
                storeId: storeId,
                // groupField: 'Employee_Id'
            });
            store.load({
                params: {
                    lookup_id: lookupId,
                    start_time: startTime,
                    end_time: endTime
                },
                callback: function(records, options, success){
                    if(success){
                        resolve(store);
                    } else {
                        reject();
                    }
                }
            });
        });
    },

    /**
     * Wraps AJAX proxy in TimeSheet view record store to return a promise, and
     * to accept request parameters
     * @param {String} lookupId ID of user to lookup records for
     * @param {String} startTime Start date to get records for
     * @param {String} endTime Ending date to get records for
     * @param {String} storeId Optional name of created store, default is 'TimeSheetViewRecords'
     * @return {Promise} Promise wrapped around load callback, returning store on
     *  resolve, and nothing on reject
     */
    getTimeSheetForRange: function(lookupId, startTime, endTime, storeId){
        var storeId = this.defVal(storeId,'TimeSheetViewRecords');
        var me = this;
        return new Promise(function(resolve, reject){
            var store = Ext.create('Breeze.store.record.timeSheet.View', {
                storeId: storeId,
                // groupField: 'Employee_Id'
            });
            store.load({
                params: {
                    lookup_id: lookupId,
                    start_time: startTime,
                    end_time: endTime
                },
                callback: function(records, options, success){
                    if(success){
                        resolve(store);
                    } else {
                        reject();
                    }
                }
            });
        });
    },

    /**
     * Get payroll stats for displaying in side panel of WTR
     * @api getEmployeePayroll
     * @param {String} lookupId ID of user to lookup records for
     * @param {String|Date} startDate Start date to get records for
     * @param {String|Date} endDate Ending date to get records for
     * @return {Promise} Promise resolving in Object mapping regular, and ot1-ot4 values, or rejecting with error
     */
    getEmployeePayrollHours: function(lookupId, startDate, endDate) {
        var me = this;
        var api = me.api;
        startDate = (typeof startDate == "object")? startDate.toUTCString() : startDate;
        endDate = (typeof endDate == "object")? endDate.toUTCString() : endDate;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'getEmployeePayroll',
                {
                    sdate: startDate,
                    edate: endDate,
                    lookup_id: lookupId
                },
                true, true,
                function(resp){
                    var response = {
                        regular: null,
                        ot1: null,
                        ot2: null,
                        ot3: null,
                        ot4: null
                    };
                    var records = api.decodeJsonResponse(resp).records[0].Hour_Records;
                    for(var i = 0; i < records.length; i++){
                        var rec = records[i];
                        switch(rec.Hours_Code){
                            case "REG":
                                response.regular = rec.Hours_Amount;
                            break;
                            case "OT1":
                                response.ot1 = rec.Hours_Amount;
                            break;
                            case "OT2":
                                response.ot2 = rec.Hours_Amount;
                            break;
                            case "OT3":
                                response.ot3 = rec.Hours_Amount;
                            break;
                            case "OT4":
                                response.ot4 = rec.Hours_Amount;
                            break;
                        }
                    }
                    resolve(response);
                },
                function(err){
                    reject(err);
                }
            )
        });
    }
});