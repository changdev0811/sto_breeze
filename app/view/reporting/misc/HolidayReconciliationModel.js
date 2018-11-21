/**
 * View Model class for Misc Holiday Reconciliation reporting view
 * @class HolidayReconciliationModel
 * @namespace Breeze.view.reporting.misc.HolidayReconciliationModel
 * @alias viewmodel.reporting.misc.holidayreconciliation
 */
Ext.define('Breeze.view.reporting.misc.HolidayReconciliationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.holidayreconciliation',

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
                ReportTitle: 'Holiday Reconciliation Report',
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: '',
                recyear: (new Date()).getYear() + 1900 // Defaults rec year to current year 
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
