/**
 * Worktime Record TimeSheet View model
 * Ported from TimeSheetViewRecord
 * @class View
 * @namespace Breeze.model.record.timeSheet.View
 * @alias model.record.timesheet.view
 */
Ext.define('Breeze.model.record.timeSheet.View', {
    extend: 'Breeze.model.Base',
    alias: 'model.record.timesheet.view',
    fields: [
        { name: 'Customer_ID', type: 'int' },
        { name: 'Employee_ID', type: 'int' },
        { name: 'TimeSheet' },
        { name: 'Week_Start' },
        { name: 'Week_End' }
    ],

    hasMany: [
        {
            model: 'Breeze.model.record.timeSheet.Record',
            name: 'Records'
        },
        {
            model: 'Breeze.model.record.timeSheet.Record',
            name: 'SummaryRecords'
        }
    ]
});


