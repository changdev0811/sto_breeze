/**
 * View Model class for Misc Anniversaries reporting view
 * @class AnniversariesModel
 * @namespace Breeze.view.reporting.misc.AnniversariesModel
 * @alias viewmodel.reporting.misc.anniversaries
 */
Ext.define('Breeze.view.reporting.misc.AnniversariesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.anniversaries',

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
                ReportTitle: 'Anniversaries Report',
                recyear: null,
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
