/**
 * Company Projects tree store
 * @class Projects
 * @namespace Breeze.store.tree.company.Projects
 * @alias store.tree.company.projects
 * @extends Breeze.store.TreeBase
 * @api getProjectTree
 */
Ext.define('Breeze.store.tree.company.Projects', {
	extend: 'Breeze.store.TreeBase',
	model: 'Breeze.model.node.Node',
    autoLoad: false,
    clearOnLoad: true,
    
    listeners: {
		beforeload : function () {
            // TODO: look into refreshCategoryMap call
            // refreshCategoryMap()
            this.provideAuthCookieToProxy();
            this.useJsonParams();
    	}
	},
	proxy: {
		type: 'ajax',
		url : Breeze.helper.Store.api.url('getProjectTree'),
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
        startParam: undefined,
	}
});