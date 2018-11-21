/**
 * View Model class for Employee Lateness Check reporting view
 * @class LatenessModel
 * @namespace Breeze.view.reporting.employee.Lateness
 * @alias viewmodel.reporting.employee.lateness
 */
Ext.define('Breeze.view.reporting.employee.LatenessModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.lateness',

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
                ReportTitle: 'Employee Lateness Check Report',
                on_time: null,
                no_record: null,
                reportDay: (new Date()),
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
