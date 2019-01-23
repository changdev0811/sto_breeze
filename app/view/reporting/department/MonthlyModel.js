/**
 * View Model class for Department Monthly reporting view
 * @class MonthlyModel
 * @namespace Breeze.view.reporting.department.MonthlyModel
 * @alias viewmodel.reporting.department.monthly
 */
Ext.define('Breeze.view.reporting.department.MonthlyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.monthly',

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
                ReportTitle: 'Monthly Report',
                inccats: '',
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: '',
                incmonths: '', // Recording year months
                recyear: (new Date()).getYear() + 1900 // Defaults rec year to current year 

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
         * ++New 11/5++: Used by year selector
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