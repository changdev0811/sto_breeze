/**
 * View Model class for Department In/Out Board reporting view
 * @class InOutBoardModel
 * @namespace Breeze.view.reporting.department.InOutBoard
 * @alias viewmodel.reporting.department.inoutboard
 */
Ext.define('Breeze.view.reporting.department.InOutBoardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.inoutboard',

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
                ReportTitle: 'In/Out Board Report',
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
