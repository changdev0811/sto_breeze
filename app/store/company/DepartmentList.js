/**
 * Department List Store
 * @class DepartmentList
 * @alias Breeze.store.company.DepartmentList
 */
Ext.define('Breeze.store.company.DepartmentList', {
    extend: 'Ext.data.Store',
    requires: ['Breeze.helper.Auth'],
    model: 'Breeze.model.company.Department',
    autoLoad: false,
    alias: 'store.company.departmentlist',
    storeId: 'DepartmentList',

    listeners: {
        beforeload: function() {
            var extras = Breeze.helper.Auth.getCookies();
            this.getProxy().extraParams.cust_id = extras.cust;
            this.getProxy().extraParams.emp_id = extras.emp;
            this.getProxy().extraParams.hashcookie = extras.pass;
            if (!this.getProxy().extraParams.excludeterminated) {
				this.getProxy().extraParams.excludeterminated = 0;
			}
        }
    },

    proxy: {
        type: 'ajax',
        // TODO: Add API URL
        url: Breeze.helper.Store.api.url('getDepartmentList'),
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
            rootProperty: 'd.Rows'
        },
        pageParam: undefined,
        startParam: undefined
    }
});