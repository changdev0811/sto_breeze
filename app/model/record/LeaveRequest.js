/**
 * Leave request model (from LeaveRequest.js)
 * @class LeaveRequest
 * @namespace Breeze.model.record.LeaveRequest
 */
Ext.define('Breeze.model.record.LeaveRequest', {
    requires: [
        'Breeze.model.record.leaveRequest.Reply'
    ],
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'emp_id', type: 'integer' },
        { name: 'cust_id', type: 'integer' },
        { name: 'employee_name', type: 'string' },
        { name: 'department_name', type: 'string' },
        { name: 'unique_id', type: 'integer' },
        { name: 'request_name', type: 'string' },
        { name: 'submit_date', type: 'string' },
        //{name: 'submit_date',			type: 'date',	dateFormat: 'MS'},
        { name: 'reply_date', type: 'date', dateFormat: 'MS' },
        // { name: 'Replies', type: 'Ext.model.RequestReply' },
        { name: 'request_status', type: 'string' },
        { name: 'is_saved', type: 'boolean' },
        { name: 'emp_notes', type: 'string' },
        { name: 'sup_notes', type: 'string' },
        { name: 'requestedDays', type: 'string' },
        { name: 'deny_notes', type: 'string' },
        { name: 'approval_mode', type: 'string' }
    ],
    hasMany: {
        model: 'Breeze.model.record.leaveRequest.Reply',
        name: 'Replies'
    }
});