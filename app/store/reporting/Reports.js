/**
 * Report selector list items
 * @class Reports
 * @namespace Breeze.store.reporting.Reports
 * @alias store.reporting.reports
 * @extends Breeze.store.TreeBase
 * @api getReportListAPI
 */
Ext.define('Breeze.store.reporting.Reports', {
    mixins: {
        styleable: 'Breeze.mixin.ListStylable'
    },
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.node.Node',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
	alias: 'store.reporting.reports',
	config: {
        // includeActions: true,
        // excludeTerminated: false,
    },
    ruleSet: 'list',
	listeners: {
		beforeload : function () {
            // refreshCategoryMap()
            this.provideAuthCookieToProxy();
			this.useJsonParams();
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
		url : Breeze.helper.Store.api.url('getReportListAPI'),
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
        startParam: undefined
    }
});