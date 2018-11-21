/**
 * Store for Security Role List for Company (from ./SecurityRoleList)
 * @class SecurityRoleList
 * @namespace Breeze.store.company.SecurityRoleList
 */
Ext.define('Breeze.store.company.SecurityRoleList', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.company.SecurityRole',
    alias: 'store.company.securityrolelist',
    autoLoad: false,
    listeners: {
        beforeload: function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },
    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('getSecurityRoleList'),
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