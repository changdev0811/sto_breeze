Ext.define('Breeze.model.employee.schedule.ShiftTime', {
    extend: 'Breeze.model.Base',
    alias: 'model.employee.schedule.shifttime',
    fields: [
        { name: 'time', type: 'string' },
        { name: 'value', type: 'integer' },
    ]
});