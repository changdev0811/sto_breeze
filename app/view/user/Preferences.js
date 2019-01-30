/**
 * Employee Information Report form
 * @class Information
 * @namespace Breeze.view.user.Preferences
 * @alias widget.user.preferences
 */
Ext.define('Breeze.view.user.Preferences', {
    extend: 'Ext.Panel',
    alias: 'widget.user.preferences',
    
    config: {
        crumbTitle: 'Preferences',
    },
    // View Model
    viewModel: {
        type: 'user.preferences'
    },

    // Controller
    controller: 'user.preferences',

    ui: 'reporting-base',
    title: 'User Preferences',
    
    buttonAlign: 'left',
    buttons: {
        save: { text: 'Save', handler: 'onSave', ui: 'action', userCls:'report-action-button' },
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
        scrollable: 'x',
        defaults: {
            userCls: 'report-section-padding',
        },
        items: [
            {
                xtype: 'fieldset',
                flex: 1,
                maxWidth: '600pt',
                minWidth: '400pt',
                layout: 'hbox',
                title: 'Preferences',
                userCls: 'reporting-fieldset',
                items: [
                    {
                        xtype: 'container',
                        flex: 1,
                        // +++ maxWidth to prevent expanding beyond tab selector +++
                        maxWidth:'300pt',
                        // +++ minWidth reasonable width to prevent most truncating +++
                        minWidth:'200pt',
                        layout: 'vbox',
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
                        ]
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        // +++ maxWidth to prevent expanding beyond tab selector +++
                        maxWidth:'300pt',
                        // +++ minWidth reasonable width to prevent most truncating +++
                        minWidth:'200pt',
                        layout: 'vbox',
                        defaults: {
                            bodyAlign: 'stretch',
                            ui: 'reporting',
                            xtype: 'breeze-checkbox'
                        },
                        items: [
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
                    }
                ]
            },
            
        ]
    }]
});