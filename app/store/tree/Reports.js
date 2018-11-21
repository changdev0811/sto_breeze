/**
 * Reports tree store (from ReportTreeStore.js)
 * @class Reports
 * @namespace Breeze.store.tree.Reports
 * @alias store.tree.reports
 * @extends Breeze.store.TreeBase
 * @api getReportTree
 */
Ext.define('Breeze.store.tree.Reports', {
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.node.Node',
	autoLoad: false,
	alias: 'store.tree.reports',
	listeners: {
		beforeload: function() {
            this.provideAuthCookieToProxy();
			this.useJsonParams();
		},
		load: function() {
			this.getRootNode().expand();
		}
	},
	proxy: {
		type: 'ajax', // Because it's a cross-domain request
		url : Breeze.helper.Store.api.url('getReportTree'),
		headers: { 'Content-Type': 'application/json;' },
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
            root: 'd',
            rootProperty: 'd'
		},
		// Don't want proxy to include these params in request
		pageParam: undefined,
		startParam: undefined
	}
});