/**
 * User Preferences
 * @class Preferences
 * @namespace Breeze.model.user.Preferences
 * @alias model.user.preferences
 */
Ext.define('Breeze.model.user.Preferences', {
    extend: 'Breeze.model.Base',
    alias: 'model.user.preferences',

    fields: [
        { name: 'NightMode', type: 'boolean' },
        { name: 'GoogleCal', type: 'boolean' },
		{ name: 'ViewSupervisorDashboard', type: 'boolean' },
		{ name: 'ShowHints', type: 'boolean' },
		{ name: 'LeaveRequestWizard', type: 'boolean' },
		{ name: 'ViewMessageOfTheDay', type: 'boolean' },
        { name: 'ViewTimeLocal', type: 'boolean' },
        { name: 'HHMM', type: 'boolean' },
        { name: 'ClockOutSignOut', type: 'boolean'},
	    { name: 'YaagCalendarView', type: 'boolean' },
        { name: 'YaagCalendarType', type: 'integer' }
    ]
});