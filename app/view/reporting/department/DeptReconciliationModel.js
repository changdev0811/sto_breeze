/**
 * View Model class for Department Department Reconciliation reporting view
 * @class DeptReconciliationModel
 * @namespace Breeze.view.reporting.department.DeptReconciliation
 * @alias viewmodel.reporting.department.deptreconciliation
 */
Ext.define('Breeze.view.reporting.department.DeptReconciliationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.deptreconciliation',

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
                ReportTitle: 'Department Reconciliation Report',
                scheduledtime: null,
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