/**
 * Buffered Report data store, ported from BufferedReportStore
 * @class Buffered
 * @namespace Breeze.store.reporting.BufferedReport
 * @alias store.reporting.bufferedreport
 * @extends Breeze.store.Base
 * @see Breeze.model.reporting.Object
 */
Ext.define('Breeze.store.reporting.BufferedReport', {
	extend: 'Breeze.store.Base',
    model: 'Breeze.model.reporting.Object',
    alias: 'store.reporting.bufferedreport',
	autoLoad: false,
	buffered: false,
	remoteFilter: true,
	remoteGroup: false,
	remoteSort: false,

	listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },

	proxy: {
		type: 'ajax',
		timeout: 999999999,
		url: Breeze.helper.Store.api.url('doReport'),
		headers: { 'Content-Type': 'application/json' },
		ctionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
			rootProperty: 'd.Content',
			totalProperty: 'd.Results',
			successProperty: 'd.Success'
		},
		writer: {
			type: 'json'
		}
	}
});