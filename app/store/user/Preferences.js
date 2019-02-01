Ext.define('Breeze.store.user.Preferences', {
    extend: 'Breeze.store.Base',
	model: 'Breeze.model.user.Preferences',
	autoLoad: false,
	root: 'd',
	storeId: 'UserPreferencesStore',
    auth: Breeze.helper.Auth,
    config: {
        offset: 0,
        limit: 0
    },
	listeners: {
		beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            
			this.getProxy().extraParams.lookup = this.auth.getCookies().emp;
            this.getProxy().extraParams.offset = this.getOffset();
			this.getProxy().extraParams.limit = this.getLimit();
		}
	},
	proxy: {
        type: 'ajax', // Because it's a cross-domain request
        url: Breeze.helper.Store.api.url('getUserPreferences'),
		headers: { 'Content-Type': 'application/json;' },
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
			root: 'd'
		},
		// Don't want proxy to include these params in request
		pageParam: undefined,
		startParam: undefined
	}
});
