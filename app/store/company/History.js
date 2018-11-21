/**
 * Company History / Audit store
 * (ported from /CompanyHistory.js)
 * @class History
 * @namespace Breeze.store.company.History
 * @api /getCompanyHistory
 */
Ext.define('Breeze.store.company.History', {
	extend: 'Breeze.store.Base',
	model: 'Breeze.model.record.Audit',
    autoLoad: false,
	listeners: {
		beforeload : function () {
			this.provideAuthCookieToProxy();
			this.useJsonParams();
		}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('getCompanyHistory'),
		headers: { 'Content-Type': 'application/json;' },
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
        //noCache: false,
		reader: {
			type: 'json',
			rootProperty: 'd.Rows'
		},
        writer: {
            type: 'json' 
        }
	}
});