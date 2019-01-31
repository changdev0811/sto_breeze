/**
 * View Model class for Employee Information reporting view
 * @class InformationModel
 * @namespace Breeze.view.user.Preferences
 * @alias viewmodel.user.preferences
 */
Ext.define('Breeze.view.user.PreferencesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user.preferences',

    constructor: function (cfg) {
        this.callParent([cfg]);
        /**
         * Report params contains attributes that get submitted along with
         * report request. When possible, they have been bound to their
         * respective form fields so their values are automatically changed
         * when edits are made in form
         */
        var data = {
            params: {
                NightMode: false,
                GoogleCal: false,
                ShowHints: false,    
                LeaveRequestWizard: false,
                ViewSupervisorDashboard: false,
                ViewMessageOfTheDay: false,       
                HHMM: false,
                ViewTimeLocal: false,
                ClockOutSignOut: false,
                YaagCalendarView: false,
                YaagCalendarType: 1
            }
        };
        this.setData(data);
    },

    stores: {
        calendarTypes: {
            fields: [
                {name: 'id', type: 'integer'},
                {name: 'text', type: 'string'}
            ],
            data: [
                { "id": 1, "text": 'Anniversary' },
                { "id": 2, "text": 'Calendar' },
                { "id": 3, "text": 'Fiscal' }
            ]
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }

});
