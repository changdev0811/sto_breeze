/**
 * View Model class for Department Daily Totals reporting view
 * @class DailyTotalsModel
 * @namespace Breeze.view.reporting.department.DailyTotalsModel
 * @alias viewmodel.reporting.department.dailytotals
 */
Ext.define('Breeze.view.reporting.department.DailyTotalsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.dailytotals',

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
                ReportTitle: 'Department Daily Totals Report',
                inccats: '',
                hhmm_format: true,
                submit_approve: true,
                submit_submit: false,
                submit_unsubmit: false,
                dStart: (new Date()),
                dEnd: (new Date()),
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