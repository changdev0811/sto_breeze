/**
 * Report Department tree store
 * @class Departments
 * @namespace Breeze.store.tree.reporting.Departments
 * @alias store.tree.reporting.departments
 * @extends Breeze.store.TreeBase
 * @api getReportDepartments
 */
Ext.define('Breeze.store.tree.reporting.Departments', {
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.node.Checked',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
    alias: 'store.tree.reporting.departments',
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
		url : Breeze.helper.Store.api.url('getReportDepartments'),
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