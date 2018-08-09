Ext.define('Softtime.store.SupervisorList', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.data.Person',
    autoLoad: false,
    storeId: 'Supervisors',
    listeners: {
        beforeload: function () {
            this.getProxy().extraParams.cust_id = Ext.util.Cookies.get('STOCUST');
            this.getProxy().extraParams.emp_id = Ext.util.Cookies.get('STOEMP');
            this.getProxy().extraParams.hashcookie = Ext.util.Cookies.get('STOPASS');
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
            root: 'd.Rows'
        },
        // Don't want proxy to include these params in request
        pageParam: undefined,
        startParam: undefined
    }
});