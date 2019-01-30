/**
 * View Model class for Project Recap reporting view
 * @class ProjectRecapModel
 * @namespace Breeze.view.reporting.project.ProjectRecapModel
 * @alias viewmodel.reporting.project.projectrecap
 */
Ext.define('Breeze.view.reporting.project.ProjectRecapModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.project.projectrecap',

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
                ReportTitle: 'Project Recap Report',
                submit_approve: true,
                submit_submit: false,
                submit_unsubmit: false,
                dStart: (new Date()),
                dEnd: (new Date()),
                dStartUtc: (new Date().toUTCString()),
                dEndUtc: (new Date().toUTCString()),
                hhmm_format: true,
                // Concerning selected departments/ids
                GroupByDept: true,
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: '',
                projids: '' // Project IDs
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
