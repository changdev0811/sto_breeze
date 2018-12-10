/**
 * Point Cateogory > UDC List (updated api)
 * @class CategpryList
 * @namespace Breeze.store.point.CategoryList
 * @alias store.point.udclist
 * @extends Breeze.store.Base
 * @api getUDCPointsListAPI
 */
Ext.define('Breeze.store.point.CategoryList', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.data.InfoObj',
    alias: 'store.point.udclist',
    autoLoad: false,
    config: {
        pointID: null
    },
    listeners: {
        beforeload: function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.getProxy().extraParams.pointID = this.getPointID();
        }
    },
    proxy: {
        type: 'ajax', // Because it's a cross-domain request
        url: Breeze.helper.Store.api.url('getUDCPointsListAPI'),
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