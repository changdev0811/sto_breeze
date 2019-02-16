/**
 * View Model class for Department Time Recap reporting view
 * @class TimeRecapModel
 * @namespace Breeze.view.reporting.department.TimeRecapModel
 * @alias viewmodel.reporting.department.timerecap
 */
Ext.define('Breeze.view.reporting.department.TimeRecapModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.timerecap',

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
                ReportTitle: 'Time Recap Report',
                hhmm_format: true,
                hourly_only: false,
                no_time: false,
                showSSN: false,
                weeks_str: '',
                weeks_strUtc: '',
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
