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
        this.callParent([cfg]);
        /**
         * Report params contains attributes that get submitted along with
         * report request. When possible, they have been bound to their
         * respective form fields so their values are automatically changed
         * when edits are made in form
         */
        var data = {
            reportParams: {
                LogoInHeader: false,    // reset by RepLogo of companyConfig store
                NameInHeader: false,    // reset by RepComp of companyConfig store
                RepSignature: false,    // reset by RepSignature of companyConfig store
                CompanyName: '',        // reset by CompanyName of companyConfig store
                RepLogoPath: '',        // reset by RepLogoPath of companyConfig store
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
