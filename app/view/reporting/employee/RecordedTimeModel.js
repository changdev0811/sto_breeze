/**
 * View Model class for Employee Recorded Time reporting view
 * @class RecordedTimeModel
 * @namespace Breeze.view.reporting.employee.RecordedTimeModel
 * @alias viewmodel.reporting.employee.recordedtime
 */
Ext.define('Breeze.view.reporting.employee.RecordedTimeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.recordedtime',

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
                ReportTitle: 'Employee Recorded Time Report',
                inccats: '',
                dStart: (new Date()),
                dEnd: (new Date()),
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
