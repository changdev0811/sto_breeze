/**
 * Employee Panel Department new API list store
 * @class Departments
 * @namespace Breeze.store.employees.Departments
 * @alias store.employees.departments
 * @extends Breeze.store.TreeBase
 * @api getDepartmentListAPI
 */
Ext.define('Breeze.store.employees.Departments', {
	requires: [
		'Breeze.mixin.ListStylable'
	],
	mixins: {
        styleable: 'Breeze.mixin.ListStylable'
    },
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.node.Node',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
	alias: 'store.employees.departments',
	config: {
		searchString: '',
		includeActions: true,
		excludeTerminated: false,
	},
	ruleSet: 'list',
	listeners: {
		beforeload : function () {
            // TODO: look into refreshCategoryMap call
            // refreshCategoryMap()
            this.provideAuthCookieToProxy();
			this.useJsonParams();
			this.getProxy().extraParams.searchString = this.getSearchString();
			this.getProxy().extraParams.includeActions = this.getIncludeActions();
            this.getProxy().extraParams.excludeterminated = (this.getExcludeTerminated())? 1 : 0;
		},
		load: function(self, records, success){
			if(success){
				this.applyStyling(records);
			}
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