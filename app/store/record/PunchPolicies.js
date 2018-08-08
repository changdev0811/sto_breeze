/**
 * Punch Policies store (ported from /PunchPolicyList.js)
 * @class PunchPolicies
 * @alias Breeze.store.record.PunchPolicies
 */
Ext.define('Breeze.store.record.PunchPolicies', {
	extend: 'Ext.data.Store',
	model: 'Breeze.model.record.PunchPolicy',
	autoLoad: false,
    // storeId: 'PunchPolicyList',
    alias: 'store.record.punchpolicies',
	listeners: {
		beforeload : function () {
			var extras = Breeze.helper.Auth.getCookies();
            this.getProxy().extraParams.cust_id = extras.cust;
            this.getProxy().extraParams.emp_id = extras.emp;
            this.getProxy().extraParams.hashcookie = extras.pass;
		}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('getPunchPoliciesList'),
		headers: { 'Content-Type': 'application/json;' },
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
			rootProperty: 'd.Rows'
		},
		// Don't want proxy to include these params in request
		pageParam: undefined,
		startParam: undefined
	}
});