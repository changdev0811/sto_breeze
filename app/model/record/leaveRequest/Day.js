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
        {name: 'request_date', type: 'date'},
        {name: 'category_name', type: 'string'},
        {name:'Amount', type: 'number'},
        {name: 'request_conflicts', type: 'integer'},
        {name: 'category_code', type: 'string'},
        {name: 'recording_mode', type: 'integer'}
    ],
    hasMany: {
        model: 'Breeze.model.record.leaveRequest.Conflict',
        name: 'Conflicts'
    }
});