/**
 * Work Time Records view
 * @class WorkTimeRecords
 * @alias Breeze.view.employee.WorkTimeRecords
 */
Ext.define('Breeze.view.employee.WorkTimeRecords', {
    extend: 'Ext.Panel',
    alias: 'widget.employee.worktimerecords',
    
    requires: [
        'Ext.ux.google.Map'
    ],

    controller: 'employee.worktimerecords',
    viewModel: {
        type: 'employee.worktimerecords'
    },

    listeners: {
        initialize: 'onInit'
    },

    //==[Start of Panel Setup/Styling]====
    tools: [
        {
            iconCls: 'x-fa fa-sync',
            handler: 'onRefreshTool'  
        },
        {
            iconCls: 'x-fa fa-print',
            handler: 'onPrintTool'
        }
    ],

    title: {
        bind: {
            data: {
                finish: '{titleDateEnd}',
                start: '{titleDateStart}',
                name: '{employeeName}'
            }
        },
        // tpl: 'Work Time Records for {name}'// ({startDate} - {[parent.titleDateEnd]})'
        tpl: 'Work Time Records for {name} ({start} - {finish})'
    },
    //====[End of Panel Setup/Styling]==

    layout: 'fit',

    ui: 'wtr-panel',

    dialog: {
        xtype: 'dialog',

        items: [
            {
                xtype: 'component',
                html: '<b>You were here</b>'
            },
            {
                xtype: 'google-map',
                width: '320px',
                height: '320px',
                bind: {
                    mapOptions: {
                        center: {
                            latitude: 20,
                            longitude: 20
                        }
                    }
                }
            }
        ]
    },

    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    id: 'wtrSideBar',
                    reference: 'wtrSideBar',
                    xtype: 'container',
                    //flex: 1,
                    width: '220pt',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'panel.minicalendar',
                            reference: 'weekSelector',
                            ui: 'minicalendar',//'wtr-small',,
                            collapsed: true,
                            flex: 1,
                            width: '100%',
                            margin: '0pt 10pt 0pt 10pt',
                            listeners: {
                                change: 'onWeekChange'
                            }
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'wtr-content',
                            width: '100%',
                            flex: 2,
                            defaults: {
                                labelAlign: 'left',
                                ui: 'dark-textfield dark-textfield-sm',
                                labelWidth: 'auto',
                                width: '100%',
                                bodyAlign: 'end'
                            },
                            reference: 'timeAtAGlanceFields',
                            layout: 'vbox',
                            title: 'Time at a Glance',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'regular',
                                    label: 'Regular Hours:',
                                    bind: {
                                        value: '{glanceRegularHours}'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'ot1',
                                    label: 'OT1 Hours:',
                                    bind: {
                                        value: '{glanceOt1Hours}',
                                        hidden: '{!showOt1Hours}'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'ot2',
                                    label: 'OT2 Hours:',
                                    bind: {
                                        value: '{glanceOt2Hours}',
                                        hidden: '{!showOt2Hours}'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'ot3',
                                    label: 'OT3 Hours:',
                                    bind: {
                                        value: '{glanceOt3Hours}',
                                        hidden: '{!showOt3Hours}'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'ot4',
                                    label: 'OT4 Hours:',
                                    bind: {
                                        value: '{glanceOt4Hours}',
                                        hidden: '{!showOt4Hours}'
                                    }
                                },
                                {
                                    xtype: 'menuseparator'
                                },
                                {
                                    xtype: 'displayfield',
                                    label: 'Total Hours:',
                                    itemId: 'total',
                                    bind: {
                                        value: '{glanceTotalHours}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'dialog',
                                    listeners: {
                                        tap: 'showLocationPopup'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',

                    ui: 'dark-tabbar',
                    tabBar: {
                        defaultTabUI: 'dark-tabbar',
                        shadow: false
                    },

                    
                    reference: 'wtrContentTabs',
                    flex: 1,
                    margin: '0pt 10pt 0pt 0pt', 

                    defaults: {
                        xtype: 'container'
                    },
                    items: [
                        {
                            reference: 'wtrRecordsTab',
                            title: 'WorkTime Records',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'employee.worktime.record',
                                }
                            ]
                        },
                        {
                            reference: 'wtrTimeSheetTab',
                            title: 'Time Sheet View',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'employee.worktime.sheet'
                                }
                            ]
                        }
                    ]

                }
            ]
        }
    ]

});