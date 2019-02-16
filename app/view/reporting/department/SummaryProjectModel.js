/**
 * View Model class for Department Summary by Project reporting view
 * @class SummaryProjectModel
 * @namespace Breeze.view.reporting.department.SummaryProjectModel
 * @alias viewmodel.reporting.department.summaryproject
 */
Ext.define('Breeze.view.reporting.department.SummaryProjectModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.summaryproject',

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
                GroupByDept: true,
                LogoInHeader: false,
                NameInHeader: false,
                RepSignature: false,
                ReportTitle: 'Department Summary by Project Report',
                hhmm_format: true,
                submit_approve: true,
                submit_submit: false,
                submit_unsubmit: false,
                dStart: (new Date()),
                dEnd: (new Date()),
                dStartUtc: (new Date().toUTCString()),
                dEndUtc: (new Date().toUTCString()),
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
