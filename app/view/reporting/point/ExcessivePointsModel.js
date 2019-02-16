/**
 * View Model class for Excessive Points reporting view
 * @class ExcessivePointsModel
 * @namespace Breeze.view.reporting.point.ExcessivePointsModel
 * @alias viewmodel.reporting.point.excessivepoints
 */
Ext.define('Breeze.view.reporting.point.ExcessivePointsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.point.excessivepoints',

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
                ReportTitle: 'Excessive Points Report',
                sDate: (new Date()),
                eDate: (new Date()),
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: '',
                pointids: '', // Point category IDs
                limit: 0, // Points >= value 
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
