/**
 * View Model class for Employee Profile reporting view
 * @class ProfileModel
 * @namespace Breeze.view.reporting.employee.ProfileModel
 * @alias viewmodel.reporting.employee.profile
 */
Ext.define('Breeze.view.reporting.employee.ProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.employee.profile',

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
                LogoInHeader: false,    // reset by RepLogo of companyConfig store
                NameInHeader: false,    // reset by RepComp of companyConfig store
                RepSignature: false,    // reset by RepSignature of companyConfig store
                ReportTitle: 'Employee Profile Report',
                inccats: '',
                showScheduled: false,
                // ++Update 11/5++ used by recording years list
                recording_years: '', // List of recording years
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
