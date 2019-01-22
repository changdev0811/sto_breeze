/**
 * View Model class for Employee Allowance Projection reporting view
 * @class AllowanceModel
 * @namespace Breeze.view.reporting.employee.AllowanceModel
 * @alias viewmodel.reporting.employee.allowance
 */
Ext.define('Breeze.view.reporting.employee.AllowanceModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.allowance',
    
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
                ReportTitle: 'Employee Allowance Projection Report',
                inccats: '',
                scheduledtime: null,
                sdate: (new Date()),
                // Concerning selected departments/ids
                idtype: 'emps',         // According to existing code, this is always 'emps'
                incids: ''
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
