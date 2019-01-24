/**
 * Model for day in Leave Request
 * Used by RequestedDays store
 * Ported from old LeaveRequestApproval.js
 * @class Day
 * @namespace Breeze.model.record.leaveRequest.Day
 */
Ext.define('Breeze.model.record.leaveRequest.Day', {
    extend: 'Breeze.model.Base',
    alias: 'breeze.model.record.leaverequest.day',
    fields: [
        'request_date', 'category_name', 'Amount',
        'request_conflicts', 'category_code',
        'recording_mode'
    ],
    hasMany: {
        model: 'Breeze.model.record.leaveRequest.Conflict',
        name: 'Conflicts'
    }
});