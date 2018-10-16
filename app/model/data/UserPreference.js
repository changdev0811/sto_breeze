/**
 * User preference data model. (Ported from UserPreferences.js)
 * @class UserPreference
 * @namespace Breeze.model.data.UserPreference
 */
Ext.define('Breeze.model.data.UserPreference', {
    extend: 'Breeze.model.Base',
    fields: [

        { name: 'GoogleCal', type: 'boolean' },
        { name: 'ViewSupervisorDashboard', type: 'boolean' },
        { name: 'ShowHints', type: 'boolean' },
        { name: 'LeaveRequestWizard', type: 'boolean' },
        { name: 'ViewMessageOfTheDay', type: 'boolean' },
        { name: 'ViewTimeLocal', type: 'boolean' },
        { name: 'HHMM', type: 'boolean' },
        { name: 'ClockOutSignOut', type: 'boolean' }
    ]
});
