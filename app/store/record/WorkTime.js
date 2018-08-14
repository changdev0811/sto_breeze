Ext.define('Breeze.store.record.WorkTime', {
	extend: 'Breeze.store.Base',
	model: 'Breeze.model.record.WorkTime',
	autoLoad: false,
	root: 'd.Records',
	storeId: 'WorkTimeViewStore',
	listeners: {
		beforeload: function() {
			this.provideAuthCookieToProxy();
            this.useJsonParams();
		}
	},
	proxy: {
		type: 'ajax', // Because it's a cross-domain request
        // url : '../STOServe/Service1.asmx/GetWorkTimeViewForRange',
        url : Breeze.helper.Store.api.url('GetWorkTimeViewForRange'),
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