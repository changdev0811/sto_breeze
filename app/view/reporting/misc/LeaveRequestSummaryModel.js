/**
 * View Model class for Misc Leave Request Summary reporting view
 * @class LeaveRequestSummaryModel
 * @namespace Breeze.view.reporting.misc.LeaveRequestSummaryModel
 * @alias viewmodel.reporting.misc.leaverequestsummary
 */
Ext.define('Breeze.view.reporting.misc.LeaveRequestSummaryModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.leaverequestsummary',

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
                ReportTitle: 'Leave Requests Summary Report',
                dStart: (new Date()),
                dEnd: (new Date()),
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
