/**
 * User Preferences store (from UserPreferences.js)
 * @class UserPreferences
 * @namespace Breeze.store.record.UserPreferences
 * @api getUserPreferences
 */
Ext.define('Breeze.store.record.UserPreferences', {
	extend: 'Breeze.store.Base',
	model: 'Breeze.model.data.UserPreference',
	autoLoad: false,
	root: 'd',
	
	config: {
		userId: null
	},

	listeners: {
		beforeload : function () {
            this.provideAuthCookieToProxy();
			this.useJsonParams();
			this.addExtraParams({
				lookup: this.getUserId()
			});
		}
		// load: function (store, records, success, opts) {
		//     STI.currentPrefs = store.getAt(0).data;
		// }
	},
	proxy: {
		type: 'ajax', // Because it's a cross-domain request
		url : Breeze.helper.Store.api.url('getUserPreferences'),
		headers: { 'Content-Type': 'application/json;' },
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
			rootProperty: 'd' // The returned JSON will have array
					  	// of users under a "users" property
		},
		// Don't want proxy to include these params in request
		pageParam: undefined,
		startParam: undefined
	}
});
