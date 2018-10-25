/**
 * Employee Panel Department new API list store
 * @class Departments
 * @namespace Breeze.store.employees.Departments
 * @alias store.employees.departments
 * @extends Breeze.store.TreeBase
 * @api getDepartmentListAPI
 */
Ext.define('Breeze.store.employees.Departments', {
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.node.Node',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
    alias: 'store.employees.departments',
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
		url : Breeze.helper.Store.api.url('getDepartmentListAPI'),
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