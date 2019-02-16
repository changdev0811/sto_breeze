/**
 * View Model class for Misc Department List reporting view
 * @class DepartmentListModel
 * @namespace Breeze.view.reporting.misc.DepartmentListModel
 * @alias viewmodel.reporting.misc.departmentlist
 */
Ext.define('Breeze.view.reporting.misc.DepartmentListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.departmentlist',

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
                LogoInHeader: false,
                NameInHeader: false,
                RepSignature: false,
                ReportTitle: 'Department List Report',
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: '',
                viewempty: false
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
