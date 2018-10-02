/**
 * User defined category tree store ()
 * @class UserDefinedCategories
 * @namespace Breeze.store.tree.UserDefinedCategories
 * @alias store.tree.udc
 * @extends Breeze.store.TreeBase
 */
Ext.define('Breeze.store.tree.UserDefinedCategories', {
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.category.Node',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
    alias: 'store.tree.udc',
	listeners: {
		beforeload : function () {
            // TODO: look into refreshCategoryMap call
            // refreshCategoryMap()
            this.provideAuthCookieToProxy();
			this.useJsonParams();
			this.addExtraParams({
				leave_request_only: 0
			});
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