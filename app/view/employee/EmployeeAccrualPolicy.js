/**
 * Employee EmployeeAccrualPolicy View
 * @class Breeze.view.employee.EmployeeAccrualPolicy
 */
Ext.define('Breeze.view.employee.EmployeeAccrualPolicy',{
    extend: 'Ext.Panel',
    alias: 'widget.employee.employeeaccrualpolicy',
    requires: [
        'Breeze.view.employee.FyiController',
        'Breeze.view.employee.FyiModel',
        'Breeze.view.employee.fyi.AccrualItem',
        'Ext.field.Display',
        'Ext.field.Date',
        'Ext.picker.Date'
    ],

    viewModel: {
        type: 'employee.employeeaccrualpolicy'
    },
    controller: 'employee.employeeaccrualpolicy',

    listeners: {
        initialize: 'onInit'
    },


    title: 'My Accrual Policy',
    ui: 'employee-fyi-panel',
    layout: 'vbox',
    userCls: 'employee-fyi-container',
    // Action buttons shown at bottom of panel
    buttonAlign: 'right',
    buttons: {
        apply: { name: 'apply_button_container', text: 'Apply', /* handler: 'onPrintExcel',*/ ui: 'action', style: 'width:125pt' },
    },
    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'employee-fyi-actions',
        shadow: false,
    },
    items: [
        {
            xtype: 'fieldset',
            userCls: 'admin-fieldset no-side-margin',
            title:'Employee Accrual Policy - [CATEGORY]',
            flex: 1,
            layout: 'hbox',
            items: [
                // column 1
                {
                    xtype: 'container',
                    flex: 2,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-side-margin',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'displayfield',
                                ui: 'fyi-display-field',
                            },
                            items: [
                                // row 1
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    flex: 1,
                                    defaults: {
                                        xtype: 'displayfield',
                                        //ui: 'fyi-display-field',
                                    },
                                    items: [
                                        {
                                            xtype:'checkbox',
                                            ui:'admin',
                                            boxLabel: 'Carry Over',
                                            //bodyAlign: 'stretch',
                                        },




                                        
                                    ]
                                },
                                // row 2
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    flex: 1,
                                    defaults: {
                                        xtype: 'displayfield',
                                        //ui: 'fyi-display-field',
                                    },
                                    items: [
                                        {
                                            xtype:'checkbox',
                                            ui:'admin',
                                            boxLabel: 'Expires',
                                            //bodyAlign: 'stretch',
                                        },
                                    ]
                                },



                            ]
                        },


                    ]
                },
                // column 2
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'displayfield',
                                ui: 'fyi-display-field',
                            },
                            items: [
                                {  
                                    ui: 'fyi-display-field',
                                    label: 'Employee Name',
                                    labelAlign: 'left',
                                    labelWidth: 'auto',
                                    bind: { value: '{employeeName}' },
                                },
                                {
                                    label: 'Department',
                                    labelAlign: 'left',
                                    labelWidth: 'auto',
                                    bind: { value: '{departmentName}' },
                                },
                                {
                                    label: 'Hire Date',
                                    labelAlign: 'left',
                                    labelWidth: 'auto',
                                    ui: 'fyi-display-field',
                                    bind: { value: '{hireDate}' },
                                }
                            ]
                        },
                        {
                            xtype: 'datefield',
                            userCls: 'admin-fieldset no-padding no-border',
                            ui: ['dark-textfield', 'fyi-field','fyi-textfield'],
                            name: 'viewdate_field',
                            label: 'Start accruing on:',
                            labelAlign:'left',
                            labelWidth:'auto',
                            reference: 'viewDate',
                            picker: {
                                xtype: 'datepicker',
                                title: 'Select Date'
                            },
                            //listeners: {
                            //    change: 'onViewDateChanged'
                            //}
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset',
                            layout: 'vbox',
                            flex: 1,
                            defaults: {
                                xtype: 'displayfield',
                                ui: 'fyi-display-field',
                            },
                            items: [
                                {  
                                    ui: 'fyi-display-field',
                                    label: 'Carried Over',
                                    labelAlign: 'left',
                                    labelWidth: '120pt',
                                    bind: { value: '+ {carriedOver}' },
                                },
                                {  
                                    ui: 'fyi-display-field',
                                    label: 'Carry Over Expired',
                                    labelAlign: 'left',
                                    labelWidth: '120pt',
                                    bind: { value: '- {carryOverExpired}' },
                                },
                                {  
                                    ui: 'fyi-display-field',
                                    label: 'Accrued',
                                    labelAlign: 'left',
                                    labelWidth: '120pt',
                                    bind: { value: '+ {accrued}' },
                                },
                                {  
                                    ui: 'fyi-display-field',
                                    label: 'Adjustments',
                                    labelAlign: 'left',
                                    labelWidth: '120pt',
                                    bind: { value: '+ {adjustments}' },
                                },
                                {  
                                    ui: 'fyi-display-field',
                                    label: ' ',
                                    labelAlign: 'left',
                                    labelWidth: '120pt',
                                    bind: { value: '--------------------' },
                                },
                                {  
                                    ui: 'fyi-display-field',
                                    label: 'Allowed',
                                    labelAlign: 'left',
                                    labelWidth: '120pt',

                                    bind: { value: '{allowed}' },
                                },
                                {  
                                    ui: 'fyi-display-field',
                                    label: 'Recorded',
                                    labelAlign: 'left',
                                    labelWidth: '120pt',
                                    bind: { value: '- {recorded}' },
                                },
                                {  
                                    ui: 'fyi-display-field',
                                    label: ' ',
                                    labelAlign: 'left',
                                    labelWidth: '120pt',
                                    bind: { value: '--------------------' },
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    boxLabel: 'Show Schedule Time',
                                    bodyAlign: 'stretch',
                                },
                                {  
                                    ui: 'fyi-display-field',
                                    label: 'Remaining',
                                    labelAlign: 'left',
                                    labelWidth: '120pt',
                                    bind: { value: '{remaining}' },
                                },

                            ]
                        },
                    ]
                }
            ]
        }
    ]
});