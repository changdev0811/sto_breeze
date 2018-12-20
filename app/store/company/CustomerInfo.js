/**
 * Company customer info store
 *
 * @class CustomerInfo
 * @namespace Breeze.store.company.CustomerInfo
 */
Ext.define('Breeze.store.company.CustomerInfo', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.company.CustomerInfo',
    autoLoad: false,
    config: {
        customerId: null,
        product: ""
    },
    listeners: {
        beforeload: function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.getProxy().extraParams.product = this.getProduct();
            this.getProxy().extraParams.customer_id = this.getCustomerId();
        }
    },
    proxy: {
        type: 'ajax', // Because it's a cross-domain request
        url: Breeze.helper.Store.api.url('getCustomerInfo'),
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