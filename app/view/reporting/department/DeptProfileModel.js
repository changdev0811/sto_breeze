/**
 * View Model class for Department Department Profile reporting view
 * @class DeptProfileModel
 * @namespace Breeze.view.reporting.department.DeptProfileModel
 * @alias viewmodel.reporting.department.deptprofile
 */
Ext.define('Breeze.view.reporting.department.DeptProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.deptprofile',

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
                ReportTitle: 'Department Profile',
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