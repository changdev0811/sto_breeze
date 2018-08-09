/**
 * Employee Gender Options (from store.EmpSexOptions)
 * @class Genders
 * @alias Breeze.store.option.Genders
 */
Ext.define('Breeze.store.option.Genders', {
    extend: 'Ext.data.Store',
    model: 'Breeze.model.data.TypeOption',
    alias: 'store.option.genders',
    storeId: 'GenderOptions',
    autoLoad: true,
    listeners: {
		beforeload : function () {
			this.getProxy().extraParams.code_type_id = 4;
		}
	},
	proxy: {
		type: 'ajax',
        url : Breeze.helper.Store.api.url('typeOptionCodeList','4'),
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
})