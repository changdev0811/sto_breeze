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
        workTimeRecords: null,
        // Labels for columns in time sheet view, updated when selected dates change
        sheetDayLabels: {
            day1: 'Day 1',
            day2: 'Day 2',
            day3: 'Day 3',
            day4: 'Day 4',
            day5: 'Day 5',
            day6: 'Day 6',
            day7: 'Day 7'
        }
    }

    // stores: {
    //     workTimeRecords: {
    //         type: 'Breeze.store.record.WorkTime'
    //     }
    // }
});