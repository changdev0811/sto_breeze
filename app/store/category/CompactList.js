/**
 * Category list (compact)
 * @api getCategoryMap
 * @class CompactList
 * @namespace Breeze.store.category.CompactList
 */
Ext.define('Breeze.store.category.CompactList', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.category.Compact',
    autoLoad: false,
    alias: 'store.category.compactlist',
    storeId: 'compactCategoryList',

    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },

    proxy: {
        type: 'ajax',
        // TODO: Add API URL
        url: Breeze.helper.Store.api.url('getCategoryMap'),
        // url: Breeze.helper.Api.url('getDepartmentList'),
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