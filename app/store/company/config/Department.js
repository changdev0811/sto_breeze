/**
 * Department config store
 * (from ./DeptConfigInfo)
 * @class Department
 * @namespace Breeze.store.company.config.Department
 * @extends Breeze.store.Base
 * @api /getDepartmentConfig
 */
Ext.define('Breeze.store.company.config.Department', {
    extend: 'Breeze.store.Base',
    autoLoad: false,
    config: {
        departmentId: null
    },
	listeners: {
		beforeload : function () {
			this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.addExtraParams({dept_id: this.getDepartmentId()});
		}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('getDepartmentConfig'),
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
			rootProperty: 'd'
		},
        writer: {
            type: 'json' 
        }
	}
});