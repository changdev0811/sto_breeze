/**
 * View Model class for Employee Year At A Glance reporting view
 * @class YearAtAGlanceModel
 * @namespace Breeze.view.reporting.employee.YearAtAGlance
 * @alias viewmodel.reporting.employee.yearataglance
 */
Ext.define('Breeze.view.reporting.employee.YearAtAGlanceModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.yearataglance',

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
                ReportTitle: 'Employee Year At A Glance Report',
                recyear: null,
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
