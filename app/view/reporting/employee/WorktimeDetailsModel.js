/**
 * View Model class for Employee Worktime Details reporting view
 * @class WorktimeDetailsModel
 * @namespace Breeze.view.reporting.employee.WorktimeDetailsModel
 * @alias viewmodel.reporting.employee.worktimedetails
 */
Ext.define('Breeze.view.reporting.employee.WorktimeDetailsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.worktimedetails',

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
                ReportTitle: 'Employee Worktime Details Report',
                dStart: (new Date()),
                dEnd: (new Date()),
                hhmm_format: true,
                submit_approve: true,
                submit_submit: false,
                submit_unsubmit: false,
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
