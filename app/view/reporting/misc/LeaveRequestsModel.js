/**
 * View Model class for Misc Leave Requests reporting view
 * @class LeaveRequestsModel
 * @namespace Breeze.view.reporting.misc.LeaveRequestsModel
 * @alias viewmodel.reporting.misc.leaverequests
 */
Ext.define('Breeze.view.reporting.misc.LeaveRequestsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.leaverequests',

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
                ReportTitle: 'Leave Requests Report',
                sdate: (new Date()),
                edate: (new Date()),
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: '',
                status: 0, // Request Status
                includedtl: true // Include Details (default true)
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
