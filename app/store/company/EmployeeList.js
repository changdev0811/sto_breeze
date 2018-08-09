/**
 * Company Employee List Store (from EmployeeList)
 * @class EmployeeList
 * @alias Breeze.store.company.EmployeeList
 */
Ext.define('Breeze.store.company.EmployeeList', {
    extend: 'Breeze.store.Base',
    alias: 'store.company.employeelist',
    model: 'Breeze.model.data.Person',
	autoLoad: false,
	listeners: {
		beforeload : function () {
			this.provideAuthCookieToProxy();
            this.getProxy().extraParams.super_admin_only = 0;
		}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('getEmployeeList'),
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
