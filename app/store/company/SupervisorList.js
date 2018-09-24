/**
 * Supervisor List
 * @class SupervisorList
 * @alias Breeze.store.company.SupervisorList
 */
Ext.define('Breeze.store.company.SupervisorList', {
    extend: 'Breeze.store.Base',
    alias: 'store.company.supervisorlist',
    model: 'Breeze.model.data.Person',
    autoLoad: false,
    // storeId: 'SupervisorList',
    listeners: {
        beforeload: function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.getProxy().extraParams.super_admin_only = 0;
        }
    },
    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('getSupervisorList'),
        headers: { 'Content-Type': 'application/json;' },
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
        // Don't want proxy to include these params in request
        pageParam: undefined,
        startParam: undefined
    }
});