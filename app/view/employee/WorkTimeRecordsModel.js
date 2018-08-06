/**
 * View Model for WorkTimeRecords view
 * @class WorkTimeRecordsModel
 * @alias Breeze.view.employee.WorkTimeRecordsModel
 */
Ext.define('Breeze.view.employee.WorkTimeRecordsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employee.worktimerecords',

    data: {
        employeeId: undefined,
        startDate: undefined,
        endDate: undefined,
        showPunches: false,
        workTimeRecords: null
    }

    // stores: {
    //     workTimeRecords: {
    //         type: 'Breeze.store.record.WorkTime'
    //     }
    // }
});