/**
 * Punch Policies Detail List store
 * @class DetailList
 * @className Breeze.store.record.PunchPolicies
 */
Ext.define('Breeze.store.record.punchPolicies.DetailList', {
	extend: 'Breeze.store.Base',
	model: 'Breeze.model.record.punchPolicy.Detail',
	autoLoad: false,
    // storeId: 'PunchPolicyList',
	listeners: {
		beforeload : function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
		}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('getPunchPoliciesListAPI'),
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