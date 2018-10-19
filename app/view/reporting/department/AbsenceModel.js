/**
 * View Model class for Department Absence reporting view
 * @class AbsenceModel
 * @namespace Breeze.view.reporting.department.AbsenceModel
 * @alias viewmodel.reporting.department.absence
 */
Ext.define('Breeze.view.reporting.department.AbsenceModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.absence',

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
                ReportTitle: 'Absence Report',
                category_id: null,
                dStart: (new Date()),
                dEnd: (new Date()),
                conditional: '>',
                conditional_amt: 0,
                conditional_type: '21',
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