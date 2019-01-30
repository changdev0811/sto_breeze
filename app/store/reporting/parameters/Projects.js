/**
 * Project list for reporting parameters
 * @class Projects
 * @namespace Breeze.store.reporting.parameters.Projects
 */
Ext.define('Breeze.store.reporting.parameters.Projects', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.company.Project',
    autoLoad: false,

    config: {
        showNoProjects: true
    },

    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            // this.addExtraParams({showNoProjects: this.getShowNoProjects()});
            this.addExtraParams({showNoProject: this.getShowNoProjects()});
        }
    },

    proxy: {
        type: 'ajax',
        // TODO: Add API URL
        url: Breeze.helper.Store.api.url('getReportProjectsAPI'),
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