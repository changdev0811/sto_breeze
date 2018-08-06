Ext.define('Breeze.store.record.WorkTime', {
	extend: 'Ext.data.Store',
	model: 'Breeze.model.record.WorkTime',
	autoLoad: false,
	root: 'd.Records',
	storeId: 'WorkTimeViewStore',
	listeners: {
		beforeload: function() {
			this.getProxy().extraParams.cust_id=Ext.util.Cookies.get('STOCUST');
			this.getProxy().extraParams.emp_id=Ext.util.Cookies.get('STOEMP');
			this.getProxy().extraParams.hashcookie=Ext.util.Cookies.get('STOPASS');
		}
	},
	proxy: {
		type: 'ajax', // Because it's a cross-domain request
        // url : '../STOServe/Service1.asmx/GetWorkTimeViewForRange',
        url : Breeze.helper.DummyApi.url('GetWorkTimeViewForRange'),
		headers: { 'Content-Type': 'application/json;' },
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
			rootProperty: 'd.Records' // The returned JSON will have array
					  // of users under a "users" property
		},
		// Don't want proxy to include these params in request
		pageParam: undefined,
		startParam: undefined
	}
});