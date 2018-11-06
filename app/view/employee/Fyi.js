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
            layout: {
                type:'hbox',
                wrap:true,
            },
            // Fixes firefox display bug caused by flex-basis defaulting to 0%
            //flex: {
            //    grow: 1,
            //    shrink: 1,
            //    basis: 'auto'
            //},
            defaults: {
                xtype: 'displayfield',
                ui: 'fyi-display-field',
                flex: 1
            },
            items: [   
                {  
                    ui: 'fyi-display-field',
                    label: 'Employee Name',
                    bind: { value: '{employeeName}' },
                    minWidth:'200pt'
                },
                {
                    label: 'Department',
                    bind: { value: '{departmentName}' },
                    minWidth:'200pt'
                },
                {
                    label: 'Hire Date',
                    ui: 'fyi-display-field',
                    bind: { value: '{hireDate}' },
                    minWidth:'200pt'
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
                    maxWidth:'125pt',
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
            bind: {
                store: '{employee_fyi}'
            },
            reference: 'fyiDataList',
            ui: 'fyi-accrual-list',
            userCls: 'fyi-accrual-list'
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