/**
 * View Model class for Employee Summary by Project reporting view
 * @class EmployeeProjectModel
 * @namespace Breeze.view.reporting.employee.EmployeeProjectModel
 * @alias viewmodel.reporting.employee.employeeproject
 */
Ext.define('Breeze.view.reporting.employee.EmployeeProjectModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.employeeproject',

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
                ReportTitle: 'Employee Summary by Project Report',
                dStart: (new Date()),
                dEnd: (new Date()),
                hhmm_format: null,
                submit_approve: true,
                submit_submit: false,
                submit_unsubmit: false,
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
