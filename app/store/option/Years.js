/**
 * Years option store (from /store/Years.js)
 * @class Years
 * @namespace Breeze.store.option.Years
 * @storeId Years
 * @extends Breeze.store.Base
 * @api getYears
 */
Ext.define('Breeze.store.option.Years', {
	extend: 'Breeze.store.Base',
	model: 'Breeze.model.data.Year',
	autoLoad: true,
	storeId: 'Years',
	listeners: {
		beforeload : function () {
            this.useJsonParams();
		}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('getYears'),
		headers: { 'Content-Type': 'application/json;' },
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
			rootProperty: 'd.Years'
		},
		// Don't want proxy to include these params in request
		pageParam: undefined,
		startParam: undefined
	}
});
