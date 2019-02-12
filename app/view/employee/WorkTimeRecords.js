/**
 * Work Time Records view
 * @class WorkTimeRecords
 * @namespace Breeze.view.employee.WorkTimeRecords
 * @alias employee.worktimerecords
 */
Ext.define('Breeze.view.employee.WorkTimeRecords', {
    extend: 'Ext.Panel',
    alias: 'widget.employee.worktimerecords',
    
    config: {
        crumbTitle: 'WorkTime Records',
    },
        
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
        tpl: 'WorkTime Records for {name} ({start} - {finish})'
    },
    //====[End of Panel Setup/Styling]==

    layout: 'fit',

    ui: 'wtr-panel',

    dialog: {
        xtype: 'dialog',
        // ui: 'employee-worktime-map-dialog',
        width:'400pt',
        height:'400pt',
        layout:'vbox',
        closeable: true,
        ui: 'dark-themed-dialog',
        title: {
            text: 'Punch Location',
            ui: 'dark-themed-dialog'
        },

        tools: [
            {
                iconCls: 'x-fa fa-times',
                ui: 'dark-themed-dialog',
                handler: 'onCloseDialog'
            }
        ],

        viewModel: {
            data: {
                date: '',
                lat: 0,
                lng: 0
            }
        },

        items: [
            {
                xtype: 'component',
                bind: {
                    html: '<b>Employee punch location:</b>' + 
                    '<ul><li>Latitude: {lat}</li>' +
                    '<li>Longitude: {lng}</li></ul>'
                }
            },
            {
                xtype: 'google-map',
                itemId: 'map',
                flex:2,
                //width: '320px',
                //height: '320px',
                mapOptions: {
                    center: {
                        latitude: 20,
                        longitude: 20
                    }
                },
                markerTemplate: {
                    title: 'Punch Location'
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
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',

                    layout: {
                        animation: 'fade'
                    },


                    ui: 'wtr-tabbar',
                    tabBar: {
                        defaultTabUI: 'wtr-tabbar',
                        shadow: false,
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
                            bind: {
                                hidden: '{!punch.policy.Can_Use_TimeSheets}',
                                disabled: '{!punch.policy.Can_Use_TimeSheets}'
                            },
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
    ],

    addNewWTRDialog: {
        xtype: 'dialog',
        // ui: 'dark-themed-dialog',
        ui: 'dark-themed-dialog',
        title: {
            text: 'Add New WorkTime Record',
            ui: 'dark-themed-dialog',
        },
        tools: [
            {
                iconCls: 'x-fa fa-times',
                ui: 'dark-themed-dialog',
                handler: 'onCloseDialog'
            }
        ],
        layout: 'vbox',
        items: [
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'datefield',
                        label: 'Date',
                        reference: 'date',
                        required: true
                    },
                    {
                        xtype: 'spacer',
                        width: '8pt'
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Project',
                        reference: 'project',
                        required: true,
                        bind: {
                            store: '{projects}',
                        },
                        displayField: 'Name',
                        valueField: 'ID'
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'selectfield',
                        label: 'Time IN',
                        reference: 'timeIn',
                        required: true,
                        bind: {
                            store: 'accrualShiftChoices'
                        },
                        displayField: 'time',
                        valueField: 'value'
                    },
                    {
                        xtype: 'spacer',
                        width: '8pt'
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Time OUT',
                        reference: 'timeOut',
                        required: true,
                        bind: {
                            store: 'accrualShiftChoices'
                        },
                        displayField: 'time',
                        valueField: 'value'
                    }
                ]
            }
        ],
        buttons: [
            {
                xtype: 'button',
                text: 'Save',
                ui: 'confirm alt',
                handler: 'onAddNewWTRDialogSave'
            },
            {
                xtype: 'spacer', width: '8pt'
            },
            {
                xtype: 'button',
                text: 'Cancel',
                ui: 'decline alt',
                handler: 'onDialogCancel',
                data: {
                    // cleanup function after closing dialog
                    // cancelableAction: 'onCreateShiftSegmentDialogCancel'
                    cancelableAction: 'onAddNewWTRDialogCancel'
                }
            }
        ]
    }
});