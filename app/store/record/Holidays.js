/**
 * Holidays, by year (from /HolidayStore)
 * @class Holidays
 * @alias Breeze.store.record.Holidays
 */
Ext.define('Breeze.store.record.Holidays', {
	extend: 'Breeze.store.Base',
	model: 'Breeze.model.record.Holiday',
	autoLoad: false,
	config: {
		year: null
	},
	listeners: {
		beforeload : function () {
            this.provideAuthCookieToProxy();
			this.useJsonParams();
			this.getProxy().extraParams.rec_year = this.getYear();
		}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('GetHolidaysForYear'),
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