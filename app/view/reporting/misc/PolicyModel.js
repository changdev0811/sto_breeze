/**
 * View Model class for Misc Policy reporting view
 * @class PolicyModel
 * @namespace Breeze.view.reporting.misc.PolicyModel
 * @alias viewmodel.reporting.misc.policy
 */
Ext.define('Breeze.view.reporting.misc.PolicyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.policy',

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
                ReportTitle: 'Policy Report',
                // Concerning selected policies
                idtype: 'policies', // According to existing code, this is always 'emps'
                incids: '',
                printBlank: false // Print blank checkbox
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
