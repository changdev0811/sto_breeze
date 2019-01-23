/**
 * View Model class for Employee Timesheet reporting view
 * @class TimesheetModel
 * @namespace Breeze.view.reporting.employee.TimesheetModel
 * @alias viewmodel.reporting.employee.timesheet
 */
Ext.define('Breeze.view.reporting.employee.TimesheetModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.timesheet',

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
                LogoInHeader: false,    // reset by RepLogo of companyConfig store
                NameInHeader: false,    // reset by RepComp of companyConfig store
                RepSignature: false,    // reset by RepSignature of companyConfig store
                CompanyName: '',        // reset by CompanyName of companyConfig store
                RepLogoPath: '',        // reset by RepLogoPath of companyConfig store
                ReportTitle: 'Employee Timesheet Report',
                hhmm_format: true,
                showhours: null,
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: '',
                weeks_str: '',
                weeks_strUtc: ''
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
