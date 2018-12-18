/**
 * Project List Store
 * @class ProjectList
 * @alias Breeze.store.company.ProjectList
 */
Ext.define('Breeze.store.company.ProjectList', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.company.Project',
    autoLoad: false,

    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
        }
    },

    proxy: {
        type: 'ajax',
        // TODO: Add API URL
        url: Breeze.helper.Store.api.url('getProjectListAPI'),
        // url: Breeze.helper.Api.url('getFlatProjectList'),
        headers: { 'Content-Type': 'application/json' },
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'd'
        },
        pageParam: undefined,
        startParam: undefined
    }
});