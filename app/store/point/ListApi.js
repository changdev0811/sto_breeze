/**
 * Point Cateogory List (updated api)
 * @class ListApi
 * @namespace Breeze.store.point.ListApi
 * @alias store.point.categorylistapi
 * @extends Breeze.store.Base
 * @api getPointCatListAPI
 */
Ext.define('Breeze.store.point.ListApi', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.point.Category',
    alias: 'store.point.listapi',
    autoLoad: false,
    listeners: {
        beforeload: function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },
    proxy: {
        type: 'ajax', // Because it's a cross-domain request
        url: Breeze.helper.Store.api.url('getPointCatListAPI'),
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