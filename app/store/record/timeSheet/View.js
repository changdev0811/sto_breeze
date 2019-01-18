/**
 * Work Time Record Timesheet View Store.
 * Ported from old TimeSheetViewStore
 * @class View
 * @namespace Breeze.store.record.timeSheet.View
 * @alias store.record.timesheet.view
 */
Ext.define('Breeze.store.record.timeSheet.View', {
    extend: 'Breeze.store.Base',
    alias: 'store.record.timesheet.view',
    model: 'Breeze.model.record.timeSheet.View',

    autoLoad: false,

    config: {
        lookupId: null,
        startTime: null,
        endTime: null,
        utcStartTime: null,
        utcEndTime: null
    },

    listeners: {
        beforeload: function(){
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            // TODO: Figure out what offset should be
			// workaround for offset error
			this.addExtraParams({
                lookup_id: this.getLookupId(),
                start_time: this.getStartTime(),
                end_time: this.getEndTime(),
                UTCstart_time: this.getUtcStartTime(),
                UTCend_time: this.getUtcEndTime()
            });
        }
    },

    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('GetTimeSheetViewForRange'),
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
            rootProperty: 'd'
        },
        pageParam: undefined,
        startParam: undefined
    }
});