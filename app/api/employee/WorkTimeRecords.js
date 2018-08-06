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
    }
});