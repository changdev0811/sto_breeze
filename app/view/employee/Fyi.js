/**
 * Employee FYI View
 * @class Breeze.view.employee.Fyi
 */
Ext.define('Breeze.view.employee.Fyi',{
    extend: 'Ext.Panel',
    
    requires: [
        'Breeze.view.employee.FyiController',
        'Breeze.view.employee.FyiModel',
        'Breeze.view.employee.fyi.AccrualItem',
        'Ext.field.Display',
        'Ext.field.Date',
        'Ext.picker.Date'
    ],
    
    viewModel: {
        type: 'employee.fyi'
    },
    controller: 'employee.fyi',
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

    title: 'FYI',
    ui: 'employee-fyi-panel',
    //====[End of Panel Setup/Styling]==
    
    layout: 'vbox',

    userCls: 'employee-fyi-container',

    items: [
        {
            xtype: 'container',
            // ui: 'dark-form-container',
            layout: 'vbox',
            // flex: 1,
            defaults: {
                xtype: 'displayfield',
                flex: 1
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'displayfield',
                        ui: 'fyi-display-field',
                        flex: 1
                    },
                    items: [   
                        {  
                            label: 'Employee Name',
                            flex: 1,
                            bind: { value: '{employeeName}' }
                        },
                        {
                            label: 'Department',
                            bind: { value: '{departmentName}' }
                        },
                    ]
                },
                {
                    label: 'Hire Date',
                    ui: 'fyi-display-field',
                    bind: { value: '{hireDate}' }
                }
            ]
        },
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'datefield',
                    ui: ['dark-textfield', 'fyi-field','fyi-textfield'],
                    name: 'viewdate_field',
                    label: 'FYI View as of',
                    reference: 'viewDate',
                    picker: {
                        xtype: 'datepicker',
                        title: 'Select Date'
                    },
                    listeners: {
                        change: 'onViewDateChanged'
                    }
                }
            ]
        },
        {
            xtype: 'list',
            flex: 3,
            layout: 'vbox',
            itemConfig: {
                xtype: 'employee.fyi.accrualItem'
            },
            reference: 'fyiDataList',
            ui: 'fyi-accrual-list'
            // store: [
            //     {
            //         CatDesc: 'Test',
            //         CatColor: "rgb(79,128,49)",
            //         CatRecorded: 5.0,
            //         CatAllowed: 10.0
            //     },
            //     {
            //         CatDesc: 'Test2',
            //         CatColor: "rgb(250,128,49)",
            //         CatRecorded: 9.0,
            //         CatAllowed: 10.0
            //     }
            // ]

        },
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'checkbox',
                    ui: 'employeeinfo-checkbox',
                    label: 'Show scheduled recorded time',
                    labelAlign: 'right',
                    reference: 'showScheduled',
                    inline: true,
                    labelWidth: 'auto',
                    listeners: {
                        change: 'onShowScheduledChanged'
                    }
                }
            ]
        }
    ]

});