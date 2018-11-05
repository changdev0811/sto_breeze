/**
 * Department list for report params using new API list store
 * @class Departments
 * @namespace Breeze.store.reporting.parameters.Departments
 * @alias store.reporting.parameters.departments
 * @extends Breeze.store.TreeBase
 * @api getDepartmentListAPI
 */
Ext.define('Breeze.store.reporting.parameters.Departments', {
	mixins: {
        styleable: 'Breeze.mixin.ListStylable'
    },
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.node.Checked',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
	alias: 'store.reporting.parameters.departments',
	config: {
		// searchString: '',
		includeActions: false,
		excludeTerminated: false,
		ruleSet: 'list'
    },
	listeners: {
		beforeload : function () {
            // TODO: look into refreshCategoryMap call
            // refreshCategoryMap()
            this.provideAuthCookieToProxy();
			this.useJsonParams();
			// this.getProxy().extraParams.searchString = this.getSearchString();
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