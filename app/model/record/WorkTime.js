/**
 * WorkTime Record model, ported from Softtime.model.WorkTimeRecord
 * @class WorkTime
 * @alias Breeze.model.record.WorkTime
 */
Ext.define('Breeze.model.record.WorkTime', {
    extend: 'Breeze.model.Base',
    alias: 'model.record.worktime',
    idProperty: 'ID',
    fields: [
        { name: 'Customer_ID', type: 'integer' },
        { name: 'ID', type: 'integer' },
        { name: 'Employee_ID', type: 'string' },
        { name: 'Employee_Name', type: 'string' },
        { name: 'Approval_Status', type: 'integer' },
        { name: 'Record_Date', type: 'string' },
        { name: 'Start_Time', type: 'date', dateFormat: 'MS' },
        { name: 'End_Time', type: 'date', dateFormat: 'MS' },
        { name: 'Total_Time', type: 'integer' },
        { name: 'Project', type: 'string' },
        { name: 'Project_ID', type: 'integer' },
        { name: 'In_Punch', reference: 'record.Punch' },
        { name: 'Out_Punch', reference: 'record.Punch' },
        { name: 'RowClass', type: 'string' },
        { name: 'Photo', type: 'string' },
        { name: 'Deduction', reference: 'record.Deduction' },
        { name: 'AbsenceCode', type: 'string' },
        { name: 'Total_Time_Hours', calculate: function(data){
            return Breeze.helper.Time.minutesToHours(data.Total_Time);
        }}
    ],
    belongsTo: 'record.TimeSheet'
});