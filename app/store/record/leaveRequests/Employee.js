/**
 * Employee Leave Requests
 * Ported from old EmployeeLeaveRequests
 * @class Employees
 * @namespace Breeze.store.record.leaveRequests.Employee
 * @alias store.record.leaverequests.employee
 * @api /getLeaveRequestsforEmployee
 */
Ext.define('Breeze.store.record.leaveRequests.Employee', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.record.LeaveRequest',

    autoLoad: false,

    listeners: {
        beforeload: function(){
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },

    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('getLeaveRequestsforEmployee'),
        // url: Breeze.helper.Api.url('getDepartmentList'),
        headers: { 'Content-Type': 'application/json' },
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'd.Requests'
        },
        pageParam: undefined,
        startParam: undefined
    }
});