/**
 * Employee List for report params new API list store
 * @class Employees
 * @namespace Breeze.store.reporting.parameters.Employees
 * @alias store.reporting.parameters.employees
 * @extends Breeze.store.TreeBase
 * @api getEmployeeListAPI
 */
Ext.define('Breeze.store.reporting.parameters.Employees', {
    mixins: {
        styleable: 'Breeze.mixin.ListStylable'
    },
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.node.Checked',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
	alias: 'store.reporting.parameters.employees',
	config: {
        searchString: '',
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
            this.getProxy().extraParams.includeActions = this.getIncludeActions();
            this.getProxy().extraParams.excludeterminated = (this.getExcludeTerminated())? 1 : 0;
            this.getProxy().extraParams.searchString = this.getSearchString();
        },
        /**
         * Handle load event, using it as an opportunity to appl rule based
         * styling
         * @param {Object} self Reference to this store
         * @param {Array} records Loaded records
         * @param {Boolean} success Bool indicated if load succeeded
         * @param {Object} op Operations
         * @param {Ext.data.NodeInterface} node Loaded node
         * @param {Object} eOpts Event object
         */
        load: function(self, records, success, op, node, eOpts){
            if(success){
                this.applyStyling(records);
            }
        }
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('getEmployeeListAPI'),
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