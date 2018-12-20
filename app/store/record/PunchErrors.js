/**
 * Punch Errors Store (ported from /PunchStore.js)
 * @class PunchErrors
 * @namespace Breeze.store.record.PunchErrors
 * @api GetPunchErrors
 */
Ext.define('Breeze.store.record.PunchErrors', {
	extend: 'Breeze.store.Base',
	model: 'Breeze.model.record.Punch',
	autoLoad: false,
    // storeId: 'PunchPolicyList',
    alias: 'store.record.puncherrors',
	listeners: {
		beforeload : function () {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
		}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('GetPunchErrors'),
		headers: { 'Content-Type': 'application/json;' },
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
			rootProperty: 'd'
		},
		// Don't want proxy to include these params in request
		pageParam: undefined,
		startParam: undefined
	}
});