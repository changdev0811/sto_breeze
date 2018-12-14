/**
 * List a collection of deleted employees.
 * @namespace Breeze.store.employees.Deleted
 * @alias store.employees.deleted
 * @extends Breeze.store.Base
 * @api deleted
 */
Ext.define('Breeze.store.employees.Deleted', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.node.Node',
    alias: 'store.employees.deleted',
    autoLoad: false,
    listeners: {
        beforeload: function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },
    proxy: {
        type: 'ajax', // Because it's a cross-domain request
        url: Breeze.helper.Store.api.url('getEmployeeOnlyTreeDeleted'),
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