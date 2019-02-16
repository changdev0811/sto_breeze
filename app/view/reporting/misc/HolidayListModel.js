/**
 * View Model class for Misc Holiday List reporting view
 * @class HolidayListModel
 * @namespace Breeze.view.reporting.misc.HolidayListModel
 * @alias viewmodel.reporting.misc.holidaylist
 */
Ext.define('Breeze.view.reporting.misc.HolidayListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.misc.holidaylist',

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
                LogoInHeader: false,
                NameInHeader: false,
                RepSignature: false,
                ReportTitle: 'Holiday List Report',
                year: (new Date()).getYear() + 1900 // Defaults rec year to current year 
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
