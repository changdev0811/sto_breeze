/**
 * Work Time Records view
 * @class WorkTimeRecords
 * @alias Breeze.view.employee.WorkTimeRecords
 */
Ext.define('Breeze.view.employee.WorkTimeRecords', {
    extend: 'Ext.Panel',
    alias: 'widget.employee.worktimerecords',
    
    controller: 'employee.worktimerecords',
    viewModel: {
        type: 'employee.worktimerecords'
    },

    listeners: {
        initialize: 'onInit'
    },

    layout: 'fit',

    title: 'John Doe\'s WorkTimeRecords (2-2-2018) - (2-2-2018)',

    ui: 'wtr-panel',

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
                            ui: 'minicalendar',//'wtr-small',,
                            collapsed: true,
                            flex: 1,
                            width: '100%',
                            margin: '0pt 10pt 0pt 10pt' 
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'wtr-content',
                            flex: 2,
                            defaults: {
                                labelAlign: 'left',
                                ui: 'dark-textfield'
                            },
                            layout: 'vbox',
                            title: 'Time at a Glance',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'regularHours',
                                    name: 'reg_hours',
                                    label: 'Regular Hours:',
                                    value: '20.00'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'ot1Hours',
                                    name: 'ot1_hours',
                                    label: 'OT1 Hours:',
                                    value: '20.00'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'ot2Hours',
                                    name: 'ot2_hours',
                                    label: 'OT2 Hours:',
                                    value: '20.00'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'ot3Hours',
                                    name: 'ot3_hours',
                                    label: 'OT3 Hours:',
                                    value: '20.00'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'ot4Hours',
                                    name: 'ot4_hours',
                                    label: 'OT4 Hours:',
                                    value: '20.00'
                                },
                                {
                                    xtype: 'menuseparator'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'totalHours',
                                    name: 'total_hours',
                                    label: 'Total Hours:',
                                    value: '20:00'
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