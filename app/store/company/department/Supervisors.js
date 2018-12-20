/**
 * Department supervisors store
 *
 * @class Supervisors
 * @namespace Breeze.store.company.department.Supervisors
 */
Ext.define('Breeze.store.company.department.Supervisors', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.company.department.Supervisor',
    autoLoad: false,
    config: {
        departmentId: null,
    },
    listeners: {
        beforeload: function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.getProxy().extraParams.department_id = this.getDepartmentId();
        }
    },
    proxy: {
        type: 'ajax', // Because it's a cross-domain request
        url: Breeze.helper.Store.api.url('getSupervisorsbyDept'),
        headers: { 'Content-Type': 'application/json;' },
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'd.Rows' // The returned JSON will have array
            // of users under a "users" property
        },
        // Don't want proxy to include these params in request
        pageParam: undefined,
        startParam: undefined
    }
});