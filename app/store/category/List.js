/**
 * User defined category list store (used in reports)
 * @class List
 * @namespace Breeze.store.category.List
 * @alias store.category.list
 * @extends Breeze.store.Base
 * @api getUDCListAPI
 */
Ext.define('Breeze.store.category.UserDefinedList', {
	extend: 'Breeze.store.Base',
	model: 'Breeze.model.category.Detail',
    autoLoad: false,
    clearOnLoad: true,
    // storeId: 'PunchPolicyList',
    alias: 'store.category.list',
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
		url : Breeze.helper.Store.api.url('getUDCListAPI'),
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