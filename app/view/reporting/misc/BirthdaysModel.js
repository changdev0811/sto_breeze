/**
 * View Model class for Misc Birthdays reporting view
 * @class BirthdaysModel
 * @namespace Breeze.view.reporting.misc.BirthdaysModel
 * @alias viewmodel.reporting.misc.birthdays
 */
Ext.define('Breeze.view.reporting.misc.BirthdaysModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.birthdays',

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
                ReportTitle: 'Birthdays Report',
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: '',
                months: '', // List of chosen months
                show_WO_bday: false,
                ShowBirthYear: false,
                print_by_employee_name: false
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    },

    /**
     * Formula functions used to provide values from functions
     */
    formulas: {

        /**
         * ++New 11/5++: Used by month options
         * Months in form {name: 'Name', value: 1..12}
         */
        monthList: {
            // Only needs to evaluate formula once
            single: true,
            /**
             * Returns set of month choices
             * @param {Function} get ViewModel.get function
             */
            get: function(get){
                var months = Ext.Date.monthNames.map((m, idx)=>{
                    return {name: m, value: idx + 1};
                });
                return months;
            }
        }

    }

});
