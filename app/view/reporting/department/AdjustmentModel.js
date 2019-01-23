/**
 * View Model class for Department Adjustment reporting view
 * @class AdjustmentModel
 * @namespace Breeze.view.reporting.department.AdjustmentModel
 * @alias viewmodel.reporting.department.adjustment
 */
Ext.define('Breeze.view.reporting.department.AdjustmentModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.adjustment',
    
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
                ReportTitle: 'Adjustment Report',
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