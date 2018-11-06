/**
 * Calendar Types (used by report parameters) (from ./CalTypeOptions.js)
 * @class CalendarTypes
 * @namespace Breeze.store.option.CalendarTypes
 * @extends Breeze.store.Base
 * @api typeOptionCodeList?type=code_type_id=12
 */
Ext.define('Breeze.store.option.CalendarTypes', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.data.TypeOption',
    alias: 'store.option.CalendarTypes',
    storeId: 'CalendarTypeOptions',
    autoLoad: true,
    config: {
        codeTypeId: 12
    },
    listeners: {
		beforeload : function () {
            this.useJsonParams();
			this.getProxy().extraParams.code_type_id = this.getCodeTypeId();
		}
	},
	proxy: {
		type: 'ajax',
        url : Breeze.helper.Store.api.url('typeOptionCodeList','12'),
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