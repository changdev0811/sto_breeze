/**
 * View Model class for Department Department Details reporting view
 * @class DeptDetailsModel
 * @namespace Breeze.view.reporting.department.DeptDetailsModel
 * @alias viewmodel.reporting.department.deptdetails
 */
Ext.define('Breeze.view.reporting.department.DeptDetailsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.deptdetails',

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
                ReportTitle: 'Department Details Report',
                category_id: null,
                ShowChart: null,
                dEnd: (new Date()),
                recyear: null,
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: '',
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});