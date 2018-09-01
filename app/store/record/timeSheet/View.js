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

    listeners: {
        beforeload: function(){
            this.provideAuthCookieToProxy();
            this.useJsonParams();
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
            rootProperty: 'd.Records'
        },
        pageParam: undefined,
        startParam: undefined
    }
});