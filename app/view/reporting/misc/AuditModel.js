/**
 * View Model class for Misc Audit reporting view
 * @class AuditModel
 * @namespace Breeze.view.reporting.misc.AuditModel
 * @alias viewmodel.reporting.misc.audit
 */
Ext.define('Breeze.view.reporting.misc.AuditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.audit',

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
                ReportTitle: 'Audit Report',
                dStart: (new Date()),
                dEnd: (new Date()),
                searchString: '', // Search String
                useSearchString: false, // Bound to whether searcString != ''
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
