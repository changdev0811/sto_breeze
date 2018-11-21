/**
 * Accrual Policy (admin)
 * @class Policy
 * @namespace Breeze.store.accrual.Policy
 * @api getAccrualPolicy
 */
Ext.define('Breeze.store.accrual.Policy', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.accrual.Policy',
    autoLoad: false,
    alias: 'store.accrual.policy',
    config: {
        scheduleId: null
    },
    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.addExtraParams({schedule_id: this.getScheduleId()});
        }
    },
    proxy: {
        type: 'ajax',
        // TODO: Add API URL
        url: Breeze.helper.Store.api.url('getAccrualPolicy'),
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