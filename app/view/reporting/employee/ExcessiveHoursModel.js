/**
 * View Model class for Employee Excessive Hours reporting view
 * @class ExcessiveHoursModel
 * @namespace Breeze.view.reporting.employee.ExcessiveHoursModel
 * @alias viewmodel.reporting.employee.excessivehours
 */
Ext.define('Breeze.view.reporting.employee.ExcessiveHoursModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.excessivehours',

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
                LogoInHeader: false,    // reset by RepLogo of companyConfig store
                NameInHeader: false,    // reset by RepComp of companyConfig store
                RepSignature: false,    // reset by RepSignature of companyConfig store
                ReportTitle: 'Employee Excessive Hours Report',
                dStart: (new Date()),
                dEnd: (new Date()),
                dStartUtc: (new Date().toUTCString()),
                dEndUtc: (new Date().toUTCString()),
                hhmm_format: true,
                hours_value: 8,
                submit_approve: true,
                submit_submit: false,
                submit_unsubmit: false,
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
