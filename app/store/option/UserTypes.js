/**
 * User Type Options (from store.UserTypeOptions)
 * @class UserTypes
 * @alias Breeze.store.option.UserTypes
 */
Ext.define('Breeze.store.option.UserTypes', {
    extend: 'Ext.data.Store',
    model: 'Breeze.model.data.TypeOption',
    alias: 'store.option.usertypes',
    storeId: 'UserTypeOptions',
    autoLoad: true,
    listeners: {
		beforeload : function () {
			this.getProxy().extraParams.code_type_id = 5;
		}
	},
	proxy: {
		type: 'ajax',
        url : Breeze.helper.DummyApi.url('typeOptionCodeList','5'),
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