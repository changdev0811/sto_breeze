/**
 * View Model class for Employee Time Activity reporting view
 * @class TimeActivityModel
 * @namespace Breeze.view.reporting.employee.TimeActivityModel
 * @alias viewmodel.reporting.employee.timeactivity
 */
Ext.define('Breeze.view.reporting.employee.TimeActivityModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.timeactivity',


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
                ReportTitle: 'Employee Time Activity Report',
                // inccats: '',
                category_ids: '',       // According to tko code, instead of inccats
                // dStart: (new Date()),
                // dEnd: (new Date()),
                sdate: (new Date()),    // According to tko code
                edate: (new Date()),    // According to tko code
                // Concerning selected departments/ids
                idtype: 'emps',         // According to existing code, this is always 'emps'
                // incids: '',
                employee_ids: ''        // According to tko code, instead of incids
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
