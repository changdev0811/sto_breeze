/**
 * Ported from old RequestReply.js
 * @class Reply
 * @namespace Breeze.model.record.leaveRequest.Reply
 */
Ext.define('Breeze.model.record.leaveRequest.Reply', {
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'EmpName', type: 'string' },
        { name: 'EmpDepartment', type: 'string' },
        { name: 'Reply', type: 'string' }
    ]
});