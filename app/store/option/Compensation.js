/**
 * Employee Compensation Per Options (from store.EmpCompPerOptions)
 * @class Compensation
 * @alias Breeze.store.option.Compensation
 */
Ext.define('Breeze.store.option.Compensation', {
    extend: 'Ext.data.Store',
    model: 'Breeze.model.data.TypeOption',
    alias: 'store.option.compensation',
    storeId: 'CompensationOptions',
    autoLoad: true,
    listeners: {
		beforeload : function () {
			this.getProxy().extraParams.code_type_id = 3;
		}
	},
	proxy: {
		type: 'ajax',
        url : Breeze.helper.DummyApi.url('typeOptionCodeList','3'),
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