/**
 * Flat Project List Store
 * @class FlatProjectList
 * @alias Breeze.store.company.FlatProjectList
 */
Ext.define('Breeze.store.company.FlatProjectList', {
    extend: 'Ext.data.Store',
    requires: ['Breeze.helper.Auth'],
    model: 'Breeze.model.company.Department',
    autoLoad: false,
    alias: 'store.company.flatprojectlist',

    listeners: {
        beforeload: function() {
            var extras = Breeze.helper.Auth.getCookies();
            this.getProxy().extraParams.cust_id = extras.cust;
            this.getProxy().extraParams.emp_id = extras.emp;
            this.getProxy().extraParams.hashcookie = extras.pass;
        }
    },

    proxy: {
        type: 'ajax',
        // TODO: Add API URL
        url: Breeze.helper.Store.api.url('getFlatProjectList'),
        // url: Breeze.helper.Api.url('getFlatProjectList'),
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