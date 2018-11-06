/**
 * Point Cateogory List store (from PointCatStore.js)
 * @class List
 * @namespace Breeze.store.point.List
 * @alias store.point.categorylist
 * @extends Breeze.store.Base
 * @api getPointCats
 */
Ext.define('Breeze.store.point.List', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.point.Category',
    alias: 'store.point.list',
    autoLoad: false,
    listeners: {
        beforeload: function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },
    proxy: {
        type: 'ajax', // Because it's a cross-domain request
        url: Breeze.helper.Store.api.url('getPointCats'),
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