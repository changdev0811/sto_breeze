/**
 * Report employee tree store
 * @class Employees
 * @namespace Breeze.store.tree.reporting.Employees
 * @alias store.tree.reporting.employees
 * @extends Breeze.store.TreeBase
 * @api getReportEmployees
 */
Ext.define('Breeze.store.tree.reporting.Employees', {
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.node.Checked',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
    alias: 'store.tree.reporting.employees',
	listeners: {
		beforeload : function () {
            // TODO: look into refreshCategoryMap call
            // refreshCategoryMap()
            this.provideAuthCookieToProxy();
            this.useJsonParams();
		}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('getReportEmployees'),
		headers: { 'Content-Type': 'application/json;' },
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
			rootProperty: 'd'
		},
		// Don't want proxy to include these params in request
		pageParam: undefined,
        startParam: undefined,
        extraParams: {leave_request_only: 0}
	}
});