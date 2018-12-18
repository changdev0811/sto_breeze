Ext.define('Breeze.store.company.SecurityRightsList', {
    extend: 'Breeze.store.Base',
    alias: 'store.company.securityrightslist',
    model: 'Breeze.model.data.InfoObj',
    autoLoad: false,
    config: {
        roleId: null
    },
    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.getProxy().extraParams.roleID = this.getRoleId();
        }
    },
    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('getSecRightsListAPI'),
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