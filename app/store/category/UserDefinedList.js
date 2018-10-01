/**
 * User defined category list store ()
 * @class UserDefinedList
 * @namespace Breeze.store.category.UserDefinedList
 * @alias store.tree.udc
 * @extends Breeze.store.TreeBase
 */
Ext.define('Breeze.store.category.UserDefinedList', {
	extend: 'Breeze.store.Base',
	model: 'Breeze.model.category.Node',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
    alias: 'store.category.udclist',
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
		url : Breeze.helper.Store.api.url('getUDCTree'),
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