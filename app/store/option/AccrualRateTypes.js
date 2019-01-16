/**
 * Accrual Rate Types (used in admin/accrualPolicies) 
 *  (from store.AccRateOptions)
 * @class AccrualRateTypes
 * @namespace Breeze.store.option.AccrualRateTypes
 */
Ext.define('Breeze.store.option.AccrualRateTypes', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.data.TypeOption',
    alias: 'store.option.accrualratetypes',
    storeId: 'AccrualRateTypes',
    autoLoad: true,
    listeners: {
		beforeload : function () {
			// this.provideAuthCookieToProxy();
			this.useJsonParams();
			this.getProxy().extraParams.code_type_id = 14;
		}
	},
	proxy: {
		type: 'ajax',
        url : Breeze.helper.Store.api.url('typeOptionCodeList','14'),
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