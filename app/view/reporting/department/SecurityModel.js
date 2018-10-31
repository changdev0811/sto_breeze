/**
 * View Model class for Department Security reporting view
 * @class SecurityModel
 * @namespace Breeze.view.reporting.department.SecurityModel
 * @alias viewmodel.reporting.department.security
 */
Ext.define('Breeze.view.reporting.department.SecurityModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.security',

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
                ReportTitle: 'Security',
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