/**
 * Time Zones (from ./TimeZoneStore.js)
 * @class TimeZones
 * @namespace Breeze.store.option.TimeZones
 * @extends Breeze.store.Base
 * @api getTimeZoneList
 */
Ext.define('Breeze.store.option.TimeZones', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.data.TimeZone',
    alias: 'store.option.timezones',
    listeners: {
		beforeload : function () {
            this.useJsonParams();
		}
	},
	proxy: {
		type: 'ajax',
        url : Breeze.helper.Store.api.url('getTimeZoneList'),
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