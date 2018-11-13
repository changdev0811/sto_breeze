/**
 * New Accrual Rates (used in admin/accrualpolicies) 
 *  (from store.NewRateOptions)
 * @class NewRates
 * @namespace Breeze.store.option.NewRates
 */
Ext.define('Breeze.store.option.NewRates', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.data.TypeOption',
    alias: 'store.option.newrates',
    storeId: 'NewRates',
    autoLoad: true,
    listeners: {
		beforeload : function () {
			// this.provideAuthCookieToProxy();
			this.useJsonParams();
			this.getProxy().extraParams.code_type_id = 11;
		}
	},
	proxy: {
		type: 'ajax',
        url : Breeze.helper.Store.api.url('typeOptionCodeList','11'),
        // url : Breeze.helper.Api.url('typeOptionCodeList'),
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