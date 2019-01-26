/**
 * Employee Information Report form
 * @class Information
 * @namespace Breeze.view.user.Preferences
 * @alias widget.user.preferences
 */
Ext.define('Breeze.view.user.Preferences', {
    extend: 'Ext.Panel',
    
    ui: 'reporting-base',
    title: 'User Preferences',
    
    viewModel: {
        type: 'user.preferences'
    },
    controller: 'user.preferences',
    
    buttonAlign: 'left',
    buttons: {
        apply: { text: 'Apply', handler: 'onApply', ui: 'action', userCls:'report-action-button' },
    },
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'reporting-actions',
        shadow: false
    },
    
    // Body contents
    items: [{
        xtype: 'container',
        flex: 1,
        // +++ minWidth width to prevent truncating +++
        minWidth:'200pt',
        // +++ maxWidth width to prevent truncating +++
        maxWidth:'300pt',
        layout: 'vbox',
        defaults: {
            userCls: 'report-section-padding',
        },
        items: [
            {
                xtype: 'fieldset',
                layout: 'vbox',
                title: 'Preferences',
                userCls: 'reporting-fieldset',
                defaults: {
                    bodyAlign: 'stretch',
                    ui: 'reporting',
                    xtype: 'breeze-checkbox'
                },
                items: [
                    {
                        name: 'cbNightMode',
                        boxLabel: 'Enable Night Mode',
                        bind: '{params.cbNightMode}'
                    },
                    {
                        name: 'cbGoogleCal',
                        boxLabel: 'Integrate with Google Calendar',
                        hidden: true,
                        bind: '{params.cbGoogleCal}'
                    },
                    {
                        name: 'cbShowHints',
                        inline: true,
                        label: '',
                        boxLabel: 'View STO Hints at Login',
                        bind: '{params.cbShowHints}'
                    },
                    {
                        name: 'cbLeaveRequestWizard',
                        label: '',
                        labelMinWidth: 0,
                        boxLabel: 'Show Leave Request Wizard',
                        bind: '{params.cbLeaveRequestWizard}'
                    },
                    {
                        name: 'cbViewSupervisorDashboard',
                        label: '',
                        boxLabel: 'View Supervisor Dashboard at Login',
                        bind: '{params.cbViewSupervisorDashboard}'
                    },
                    {
                        name: 'cbViewMessageOfTheDay',
                        boxLabel: 'View Message of the Day at Login',
                        bind: '{params.cbViewMessageOfTheDay}'
                    },
                    {
                        name: 'cbHHMM',
                        boxLabel: 'View and Edit Time in HH:MM Mode',
                        bind: '{params.cbHHMM}'
                    },
                    {
                        name: 'cbViewTimeLocal',
                        boxLabel: 'View Local Time instead of UTC',
                        bind: '{params.cbViewTimeLocal}'
                    },
                    {
                        name: 'cbClockOutSignOut',
                        boxLabel: 'Sign out when you clock out',
                        bind: '{params.cbClockOutSignOut}'
                    },
                    {
                        name: 'cbYaagCalendarView',
                        boxLabel: 'YAAG Calendar Mode',
                        bind: '{params.cbYaagCalendarView}'
                    },
                    // {
                    //     xtype: 'component',
                    //     html: 'YAAG Recording Year Type'
                    // },
                    {
                        xtype: 'selectfield',
                        name: 'YaagCalendarType',
                        ui: 'weired',
                        label: 'YAAG Recording Year Type',
                        valueField: 'id',
                        bind: {
                            store: '{calendarTypes}',
                            value: '{params.YaagCalendarType}'
                        }
                    }
                ]
            },
            
        ]
    }]
});