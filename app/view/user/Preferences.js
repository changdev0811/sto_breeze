/**
 * Employee Information Report form
 * @class Information
 * @namespace Breeze.view.user.Preferences
 * @alias widget.user.preferences
 */
Ext.define('Breeze.view.user.Preferences', {
    extend: 'Ext.Panel',
    alias: 'widget.user.preferences',
    
    listeners: {
        initialize: 'onInit'
    },

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
        //save: { text: 'Save', handler: 'onSave', ui: 'action', userCls:'report-action-button' },
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
                maxWidth: '600pt',
                minWidth: '400pt',
                layout: 'hbox',
                title: 'Night Mode',
                userCls: 'reporting-fieldset',
                defaults: {
                            bodyAlign: 'stretch',
                            ui: 'reporting',
                            xtype: 'breeze-checkbox'
                        },
                items: [
                    {
                        name: 'cbNightMode',
			            ui: 'reporting',
                        reference:'nightMode',
                        boxLabel: 'Enable',
                        bind: '{params.NightMode}',
                        listeners: {
                            change: 'onMenuNightModeChange'
                        }
                    },
                ]
            },
            {
                xtype: 'fieldset',
                flex: 1,
                maxWidth: '600pt',
                minWidth: '400pt',
                title: 'Preferences',
                userCls: 'reporting-fieldset',
                items: [
                    {
                        xtype:'container',
                        layout:'hbox',
                        items:[
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
                                        name: 'cbGoogleCal',
                                        boxLabel: 'Integrate with Google Calendar',
                                        hidden: true,
                                	    bind: '{params.GoogleCal}'
                                    },
                                    {
                                        name: 'cbShowHints',
                                        inline: true,
                                        label: '',
                                        boxLabel: 'View STO Hints at Login',
                                	    bind: '{params.ShowHints}'
                                    },
                                    {
                                        name: 'cbLeaveRequestWizard',
                                        label: '',
                                        labelMinWidth: 0,
                                        boxLabel: 'Show Leave Request Wizard',
                                	    bind: '{params.LeaveRequestWizard}'
                                    },
                                    {
                                        name: 'cbViewSupervisorDashboard',
                                        label: '',
                                        boxLabel: 'View Supervisor Dashboard at Login',
                                	    bind: '{params.ViewSupervisorDashboard}'
                                    },
                                    {
                                        name: 'cbViewMessageOfTheDay',
                                        boxLabel: 'View Message of the Day at Login',
                                	    bind: '{params.ViewMessageOfTheDay}'
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
                                	    bind: '{params.HHMM}'
                                    },
                                    {
                                        name: 'cbViewTimeLocal',
                                        boxLabel: 'View Local Time instead of UTC',
                                	    bind: '{params.ViewTimeLocal}'
                                    },
                                    {
                                        name: 'cbClockOutSignOut',
                                        boxLabel: 'Sign out when you clock out',
                                	    bind: '{params.ClockOutSignOut}'
                                    },
                                    {
                                        name: 'cbYaagCalendarView',
                                        boxLabel: 'YAAG Calendar Mode',
                                        bind: '{params.YaagCalendarView}',
                                        listeners: {
                                            change: 'enableYCalType'
                                        }
                                    },
                                    {
                                        xtype: 'selectfield',
                                        name: 'YaagCalendarType',
                                        reference: 'yaagCalendarType',
                                        ui: 'yaagCalendarType',
                                        label: 'YAAG Recording Year Type',
                                        valueField: 'id',
                                        bind: {
                                            store: '{calendarTypes}',
                                            value: '{params.YaagCalendarType}'
                                        }
                                    },

                                ]
                            },
                        ]
                    },

                    {
                        xtype:'container',
                        layout:'hbox',
                        padding:'10pt 0pt 0pt 0pt',
                        items:[
                            {
                                xtype:'component',
                                flex:1
                            },
                            {
                                xtype:'button',
                                ui: 'confirm alt',
                                width:'120pt', 
                                userCls:'report-action-button',
                                text: 'Save', 
                                handler: 'onSave', 

                            }
                        ]
                    },
                ]
            },
        ]
    }]
});