/**
 * View Model class for Project Time Summary reporting view
 * @class ProjectTimeModel
 * @namespace Breeze.view.reporting.project.ProjectTimeModel
 * @alias viewmodel.reporting.project.projecttime
 */
Ext.define('Breeze.view.reporting.project.ProjectTimeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.project.projecttime',

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
                ReportTitle: 'Project Time Summary Report',
                submit_approve: true,
                submit_submit: false,
                submit_unsubmit: false,
                dStart: (new Date()),
                dEnd: (new Date()),
                hhmm_format: true,
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: ''
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
