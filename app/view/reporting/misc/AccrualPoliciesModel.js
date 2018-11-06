/**
 * View Model class for Misc Accrual Policies reporting view
 * @class AccrualPoliciesModel
 * @namespace Breeze.view.reporting.misc.AccrualPoliciesModel
 * @alias viewmodel.reporting.misc.accrualpolicies
 */
Ext.define('Breeze.view.reporting.misc.AccrualPoliciesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.accrualpolicies',

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
                ReportTitle: 'Accrual Policies Report',
                schedule_ids: '' // Accrual policy IDs
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
