/**
 * Department List Store
 * @class DepartmentList
 * @alias Breeze.store.company.DepartmentList
 */
Ext.define('Breeze.store.company.DepartmentList', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.company.Department',
    autoLoad: false,
    alias: 'store.company.departmentlist',
    storeId: 'DepartmentList',

    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            if(!this.getProxy().extraParams.excludeterminated){
                this.getProxy().extraParams.excludeterminated = 0;
            }
            this.getProxy().extraParams.includeUserDept = false;
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