/**
 * View Model class for Point Details reporting view
 * @class PointDetailsModel
 * @namespace Breeze.view.reporting.point.PointDetailsModel
 * @alias viewmodel.reporting.point.pointdetails
 */
Ext.define('Breeze.view.reporting.point.PointDetailsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.point.pointdetails',

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
                ReportTitle: 'Point Details Report',
                sDate: (new Date()),
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
