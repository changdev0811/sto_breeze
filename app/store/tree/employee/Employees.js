/**
 * Employee Panel Employees tree store
 * @class Employees
 * @namespace Breeze.store.tree.employee.Employees
 * @alias store.tree.employee.employees
 * @extends Breeze.store.TreeBase
 * @api getEmployeeTree
 */
Ext.define('Breeze.store.tree.employee.Employees', {
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.node.Node',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
    alias: 'store.tree.employee.employees',
    
    config: {
        searchString: '',
        excludeTerminated: false
    },
    
    listeners: {
		beforeload : function () {
            // TODO: look into refreshCategoryMap call
            // refreshCategoryMap()
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.getProxy().extraParams.searchString = this.getSearchString();
            this.getProxy().extraParams.excludeterminated = (this.getExcludeTerminated())? 1 : 0;
		}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('getEmployeeTree'),
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