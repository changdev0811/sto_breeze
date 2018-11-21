/**
 * View Model class for Project Details reporting view
 * @class ProjectDetailsModel
 * @namespace Breeze.view.reporting.project.ProjectDetailsModel
 * @alias viewmodel.reporting.project.projectdetails
 */
Ext.define('Breeze.view.reporting.project.ProjectDetailsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.project.projectdetails',

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
                ReportTitle: 'Project Details Report',
                inccats: '',
                submit_approve: true,
                submit_submit: false,
                submit_unsubmit: false,
                dStart: (new Date()),
                dEnd: (new Date()),
                hhmm_format: true,
                // Concerning selected departments/ids
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
