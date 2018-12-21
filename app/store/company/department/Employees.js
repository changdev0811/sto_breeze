/**
 * Department employees store
 *
 * @class Employees
 * @namespace Breeze.store.company.department.Employees
 */
Ext.define('Breeze.store.company.department.Employees', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.data.InfoObj',
    autoLoad: false,
    config: {
        departmentId: null,
        excludeTerminated: true
    },
    listeners: {
        beforeload: function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.getProxy().extraParams.dept = this.getDepartmentId();
            this.getProxy().extraParams.excludeTerminated = this.getExcludeTerminated();

        }
    },
    proxy: {
        type: 'ajax', // Because it's a cross-domain request
        url: Breeze.helper.Store.api.url('getEmployeeOnlyListByDeptAPI'),
        headers: { 'Content-Type': 'application/json;' },
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'd' // The returned JSON will have array
            // of users under a "users" property
        },
        // Don't want proxy to include these params in request
        pageParam: undefined,
        startParam: undefined
    }
});