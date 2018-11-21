/**
 * View Model class for Project Profile reporting view
 * @class ProjectProfileModel
 * @namespace Breeze.view.reporting.project.ProjectProfileModel
 * @alias viewmodel.reporting.project.projectprofile
 */
Ext.define('Breeze.view.reporting.project.ProjectProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.project.projectprofile',

    constructor: function (cfg) {
        this.callSuper([cfg]);
        /**
         * Report params contains attributes that get submitted along with
         * report request. When possible, they have been bound to their
         * respective form fields so their values are automatically changed
         * when edits are made in form
         */
        var data = {
            reportParams: {
                GroupByDept: true,
                LogoInHeader: false,
                NameInHeader: false,
                RepSignature: false,
                ReportTitle: 'Project Profile Report',
                projids: '' // Project IDs
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
