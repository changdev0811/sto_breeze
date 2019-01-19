/**
 * View Model class for Department Payroll Summary reporting view
 * @class PayrollSummaryModel
 * @namespace Breeze.view.reporting.department.PayrollSummaryModel
 * @alias viewmodel.reporting.department.payrollsummary
 */
Ext.define('Breeze.view.reporting.department.PayrollSummaryModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.payrollsummary',
    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:
        users: {
            model: 'User',
            autoLoad: true
        }
        */

        /** Store will hold selected weeks
         * fields: 
         *  - start (date)
         *  - startText (short date string)
         */
        selectedWeeks: {
        }
    },

    
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
                ReportTitle: 'Payroll Summary Report',
                hhmm_format: true,
                hourly_only: false,
                hhmm_format: true,
                submit_approve: true,
                submit_submit: false,
                submit_unsubmit: false,
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: '',
                // Date range fields
                date_type: 'weeks', // Either 'weeks' or 'date_range
                weeks_str: '', // Weeks chosen, if using 'weeks' type
                weeks_strUtc: '', // Weeks chosen (utc)
                dStart: null, // start date, if using date_range
                dStartUtc: null, // start date, if using date_range
                dEnd: null, // end date, if using date_range
                dEndUtc: null // end date, if using date_range
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */

    }

});
