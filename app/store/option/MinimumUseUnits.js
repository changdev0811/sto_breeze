/**
 * New Accrual Rates (used in admin/UDC) 
 * @class MinimumUseUnits
 * @namespace Breeze.store.option.MinimumUseUnits
 */
Ext.define('Breeze.store.option.MinimumUseUnits', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.data.TypeOption',
    alias: 'store.option.minimumuseunits',
    storeId: 'MinimumUseUnits',
    autoLoad: true,
    listeners: {
		beforeload : function () {
			// this.provideAuthCookieToProxy();
			this.useJsonParams();
			this.getProxy().extraParams.code_type_id = 13;
		}
	},
	proxy: {
		type: 'ajax',
        url : Breeze.helper.Store.api.url('typeOptionCodeList','13'),
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