Ext.define('Breeze.store.company.SupervisorRoleList', {
    extend: 'Breeze.store.Base',
    alias: 'store.company.supervisorrolelist',
    model: 'Breeze.model.data.InfoObj',
    autoLoad: false,
    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },
    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('getRolesListAPI'),
        headers: { 'Content-Type': 'application/json;' },
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'd'
        },
        // Don't want proxy to include these params in request
        pageParam: undefined,
        startParam: undefined
    }
});