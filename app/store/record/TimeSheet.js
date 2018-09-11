/**
 * Work Time Record Timesheet Store.
 * Ported from old TimeSheet;
 * TODO: Determine what this will be used for
 * @class TimeSheet
 * @namespace Breeze.store.record.TimeSheet
 * @alias store.record.timesheet
 */
Ext.define('Breeze.store.record.TimeSheet', {
    extend: 'Breeze.store.Base',
    alias: 'store.record.timesheet',
    model: 'Breeze.model.record.TimeSheet',

    autoLoad: false,

    listeners: {
        beforeload: function(){
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            // TODO: Figure out what offset should be
			// workaround for offset error
			this.getProxy().extraParams.offset = 0;
        }
    },

    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('GetTimeSheet'),
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
            rootProperty: 'd.d'
        },
        pageParam: undefined,
        startParam: undefined
    }
});