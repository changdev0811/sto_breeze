/**
 * Buffered Report data store, ported from BufferedReportStore
 * Unlike store.reporting.buffered, this store includes proxy data and ajax call
 * @class Buffered
 * @namespace Breeze.store.reporting.BufferedReport
 * @alias store.reporting.bufferedreport
 * @extends Breeze.store.Base
 * @see Breeze.model.reporting.Object
 * @api doReport
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

	config: {
		myFormat: null,
		myParameters: null,
		page: null,
		myReport: null,
		offset: 0,
		limit: 0
	},

	listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
			this.useJsonParams();
			this.getProxy().extraParams.myFormat = this.getMyFormat();
			this.getProxy().extraParams.myReport = this.getMyReport();
			this.getProxy().extraParams.myParameters = this.getMyParameters();
			this.getProxy().extraParams.page = this.getPage();
			this.getProxy().extraParams.offset = this.getOffset();
			this.getProxy().extraParams.limit = this.getLimit();

        }
    },

	proxy: {
		type: 'ajax',
		timeout: 999999999,
		url: Breeze.helper.Store.api.url('doReport'),
		headers: { 'Content-Type': 'application/json' },
		actionMethods: {
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