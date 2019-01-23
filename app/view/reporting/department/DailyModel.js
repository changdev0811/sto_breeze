/**
 * View Model class for Department Daily reporting view
 * @class DailyModel
 * @namespace Breeze.view.reporting.department.DailyModel
 * @alias viewmodel.reporting.department.daily
 */
Ext.define('Breeze.view.reporting.department.DailyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.daily',
    
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
                ReportTitle: 'Department Daily Report',
                showadj: null,
                showacc: null,
                sDate: (new Date()),
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