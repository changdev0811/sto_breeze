/**
 * View Model class for Misc Supervisors reporting view
 * @class SupervisorsModel
 * @namespace Breeze.view.reporting.misc.SupervisorsModel
 * @alias viewmodel.reporting.misc.supervisors
 */
Ext.define('Breeze.view.reporting.misc.SupervisorsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.supervisors',

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
                ReportTitle: 'Supervisors Report',
                // checkboxes
                ShowEmps: false,
                sort_type: 1,
                superAdminList: false
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
