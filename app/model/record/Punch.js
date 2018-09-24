/**
 * Punch record model
 * @class Punch
 * @alias Breeze.model.record.Punch
 */
Ext.define('Breeze.model.record.Punch', {
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'Id', type: 'integer' },
        { name: 'Customer_ID', type: 'string' },
        { name: 'Employee_ID', type: 'string' },
        { name: 'Employee_Name', type: 'string' },
        { name: 'Punch_Time', type: 'date', dateFormat: 'MS' },
        { name: 'processed_time', type: 'date', dateFormat: 'MS' },
        { name: 'Badge_Number', type: 'integer' },
        { name: 'project_code', type: 'string' },
        { name: 'lat', type: 'integer' },
        { name: 'lng', type: 'integer' },
        { name: 'acc', type: 'string' },
        { name: 'TimeZone_ID', type: 'string' },
        { name: 'punch_error', type: 'string' },
        { name: 'punch_type', type: 'integer' },
        { name: 'checked', type: 'boolean' }
    ]
});