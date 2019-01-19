/**
 * Supervisor Leave Requests
 * Ported from old SupervisorLeaveRequests
 * @class Supervisors
 * @namespace Breeze.store.record.leaveRequest.Supervisors
 * @alias store.record.leaverequest.employees
 * @api /getLeaveRequestsforSupervisor
 */
Ext.define('Breeze.store.record.leaveRequest.Supervisors', {
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
        url: Breeze.helper.Store.api.url('getLeaveRequestsforSupervisor'),
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