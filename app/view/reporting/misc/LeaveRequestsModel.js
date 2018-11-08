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

    /* Automatically available stores not loaded from API calls */
    stores: {
        /**
         * request status choice store (static, not from API call)
         */
        requestStatus: {
            model: 'Breeze.model.data.TypeOption',
            data: [
                {
                    ID: 0,
                    CodeTypeID: 0,
                    Description: 'All'
                },
                {
                    ID: 2,
                    CodeTypeID: 0,
                    Description: 'Approved'
                },
                {
                    ID: 6,
                    CodeTypeID: 0,
                    Description: 'Cancellation Denied'
                },
                {
                    ID: 4,
                    CodeTypeID: 0,
                    Description: 'Cancellation Pending'
                },
                {
                    ID: 5,
                    CodeTypeID: 0,
                    Description: 'Cancelled'
                },
                {
                    ID: 3,
                    CodeTypeID: 0,
                    Description: 'Denied'
                },
                {
                    ID: 1,
                    CodeTypeID: 0,
                    Description: 'Pending'
                }
            ]
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
