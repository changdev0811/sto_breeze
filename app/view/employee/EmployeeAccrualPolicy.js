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
                        // row 1
                        {
                            xtype: 'selectfield',
                            ui: 'reporting admin-text',
                            userCls: 'admin-fieldset no-side-margin no-border',
                            value:'Max',
                            label:'Category:',
                            labelAlign:'left',
                            labelWidth:'auto',
                            options: []//<-- this should probably be in the model.js
                        },




                        // row 2
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {  
                                    xtype: 'displayfield',
                                    ui: 'fyi-display-field',
                                    userCls: 'admin-fieldset no-side-margin no-border',

                                    value: 'Year Type:',
                                    //labelAlign: 'left',
                                    //labelWidth: 'auto',
                                    //bind: { value: '{employeeName}' },
                                },
                                {
                                    xtype:'spacer',
                                    width:'10pt',
                                },
                                {
                                    xtype: 'fieldset',
                                    userCls: 'admin-fieldset no-side-margin',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype:'checkbox',
                                            ui:'admin',
                                            userCls:'tool-check-box',
                                            name: 'isWorktime',
                                            //id: 'radio1',
                                            value: '20',
                                            boxLabel: 'Anniversary',
                                            //bodyAlign: 'stretch',
                                        },
                                        {
                                            xtype:'spacer',
                                            width:'10pt',
                                        },
                                        {
                                            xtype:'checkbox',
                                            ui:'admin',
                                            userCls:'tool-check-box',
                                            name: 'isWorktime',
                                            //id: 'radio1',
                                            value: '20',
                                            boxLabel: 'Calendar',
                                            //bodyAlign: 'stretch',
                                        },
                                        {
                                            xtype:'spacer',
                                            width:'10pt',
                                        },
                                        {
                                            xtype:'checkbox',
                                            ui:'admin',
                                            userCls:'tool-check-box',
                                            name: 'isWorktime',
                                            //id: 'radio1',
                                            value: '20',
                                            boxLabel: 'Fiscal',
                                            //bodyAlign: 'stretch',
                                        },
                                    ]
                                },
                            ]
                        },


                        // row 3
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-side-margin',
                            layout: 'vbox',
                            flex: 1,
                            items: []
                        },

                        // row 4
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-side-margin',
                            layout: 'vbox',
                            flex: 1,
                            items: []
                        },

                        // row 5
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-side-margin',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'displayfield',
                                ui: 'fyi-display-field',
                            },
                            items: [
                                // sub row 1
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
                                        {
                                            xtype:'spacer',
                                            width:'10pt',
                                        },
                                        {
                                            xtype: 'selectfield',
                                            ui: 'reporting admin-text',
                                            value:'Max',
                                            options: [
                                                { text: 'No Max', value: 1 },
                                                { text: 'Max', value: 2 },
                                            ]//<-- this should probably be in the model.js
                                        },
                                        {
                                            xtype:'spacer',
                                            width:'10pt',
                                        },
                                        {
                                            xtype: 'breeze-textfield',
                                            ui: 'admin admin-text',
                                        },   
                                    ]
                                },
                                // sub row 2
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
                                        {
                                            xtype:'spacer',
                                            width:'10pt',
                                        },
                                        {
                                            xtype: 'datefield',
                                            userCls: 'admin-fieldset no-padding no-border',
                                            ui: ['dark-textfield', 'fyi-field','fyi-textfield'],
                                            reference: 'viewDate',
                                            picker: {
                                                xtype: 'datepicker',
                                                title: 'Select Date'
                                            },
                                            //listeners: {
                                            //    change: 'onViewDateChanged'
                                            //}
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