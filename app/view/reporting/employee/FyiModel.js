/**
 * View Model class for Employee FYI reporting view
 * @class FyiModel
 * @namespace Breeze.view.reporting.employee.Fyi
 * @alias viewmodel.reporting.employee.fyi
 */
Ext.define('Breeze.view.reporting.employee.FyiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.fyi',

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
                ReportTitle: 'Employee FYI Report',
                FYIDate: (new Date()),
                showScheduled: false,
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                // incids: ''
                empids: ''      // instead of incids
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
