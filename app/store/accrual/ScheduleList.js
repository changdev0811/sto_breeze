/**
 * Employee Schedule List Store
 * @class ScheduleList
 * @alias Breeze.store.accrual.ScheduleList
 */
Ext.define('Breeze.store.accrual.ScheduleList', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.accrual.Schedule',
    autoLoad: false,
    alias: 'store.accrual.schedulelist',

    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },

    proxy: {
        type: 'ajax',
        // TODO: Add API URL
        url: Breeze.helper.Store.api.url('getAccrualPoliciesList'),
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
            rootProperty: 'd.Rows'
        },
        pageParam: undefined,
        startParam: undefined
    }
});