/**
 * View Model class for Department Absence Summary reporting view
 * @class AbsenceSummaryModel
 * @namespace Breeze.view.reporting.department.AbsenceSummaryModel
 * @alias viewmodel.reporting.department.absencesummary
 */
Ext.define('Breeze.view.reporting.department.AbsenceSummaryModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.absencesummary',
    
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
                ReportTitle: 'Absence Summary Report',
                inccats: '',
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