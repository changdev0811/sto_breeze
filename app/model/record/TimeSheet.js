/**
 * TimeSheet record model
 * @class TimeSheet
 * @alias Breeze.model.record.TimeSheet
 */
Ext.define('Breeze.model.record.TimeSheet', {
	extend: 'Breeze.model.Base',
	fields: [
        {name: 'id', type: 'integer'},
		{name: 'customer_id', type: 'integer'},
        {name: 'employee_id', type: 'integer'},
        {name: 'start_date', type: 'date',dateFormat: 'MS'},
        {name: 'end_date', type: 'date',dateFormat: 'MS'},
        {name: 'approval_status', type: 'integer'},
        {name: 'employee_note', type: 'string'},
        {name: 'supervisor_note', type: 'string'}
	],
    hasMany: {model: 'record.WorkTime', name:'time_records'}
       
});
