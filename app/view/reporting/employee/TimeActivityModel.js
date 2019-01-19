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
                LogoInHeader: false,
                NameInHeader: false,
                RepSignature: false,
                ReportTitle: 'Employee Time Activity Report',
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
