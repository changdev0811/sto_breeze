/**
 * Worktime Record TimeSheet View Record model
 * Ported from TimeSheetViewRecord
 * @class View
 * @namespace Breeze.model.record.timeSheet.Record
 * @alias model.record.timesheet.record
 */
Ext.define('Breeze.model.record.timeSheet.Record', {
    extend: 'Breeze.model.Base',
    alias: 'model.record.timesheet.record',
    fields: [
        { name: 'Customer_ID' },
        { name: 'Project_ID' },
        { name: 'Employee_ID' },
        { name: 'Day1Hours' },
        { name: 'Day2Hours' },
        { name: 'Day3Hours' },
        { name: 'Day4Hours' },
        { name: 'Day5Hours' },
        { name: 'Day6Hours' },
        { name: 'Day7Hours' },
        { name: 'Day1Minutes' },
        { name: 'Day2Minutes' },
        { name: 'Day3Minutes' },
        { name: 'Day4Minutes' },
        { name: 'Day5Minutes' },
        { name: 'Day6Minutes' },
        { name: 'Day7Minutes' },
        { name: 'Day1HHMM' },
        { name: 'Day2HHMM' },
        { name: 'Day3HHMM' },
        { name: 'Day4HHMM' },
        { name: 'Day5HHMM' },
        { name: 'Day6HHMM' },
        { name: 'Day7HHMM' },
        { name: 'Day1_Date' },
        { name: 'Day2_Date' },
        { name: 'Day3_Date' },
        { name: 'Day4_Date' },
        { name: 'Day5_Date' },
        { name: 'Day6_Date' },
        { name: 'Day7_Date' },
        { name: 'WT_Hours' },
        { name: 'ProjTotal' },
        { name: 'AbsenceName' },
        { name: 'RowClass', type: 'string' }
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'd'
        }
    }
});


