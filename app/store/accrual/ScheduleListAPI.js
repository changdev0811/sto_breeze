/**
 * Employee Schedule List Store (API)
 * @class ScheduleListAPI
 * @namespace Breeze.store.accrual.ScheduleListAPI
 */
Ext.define('Breeze.store.accrual.ScheduleListAPI', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.data.InfoObj',
    autoLoad: false,
    alias: 'store.accrual.schedulelistapi',

    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },

    proxy: {
        type: 'ajax',
        // TODO: Add API URL
        url: Breeze.helper.Store.api.url('getAccrualPoliciesListAPI'),
        // url: Breeze.helper.Api.url('getAccrualPoliciesList'),
        headers: { 'Content-Type': 'application/json' },
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
        pageParam: undefined,
        startParam: undefined
    }
});