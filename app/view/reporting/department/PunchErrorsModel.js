/**
 * View Model class for Department Punch Errors reporting view
 * @class PunchErrorsModel
 * @namespace Breeze.view.reporting.department.PunchErrorsModel
 * @alias viewmodel.reporting.department.puncherrors
 */
Ext.define('Breeze.view.reporting.department.PunchErrorsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.puncherrors',


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
                ReportTitle: 'Punch Errors Report',
                dStart: (new Date()),
                dEnd: (new Date()),
                hhmm_format: false,
                errOption: 1,
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