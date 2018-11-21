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



    title: 'My Accrual Policy',
    ui: 'employee-accrual-policy-base',
    layout: 'vbox',
    userCls: 'employee-fyi-container',
    scrollable:true,
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

            minWidth:'700pt',
            minHeight:'400pt',

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
                            ui: 'admin admin-text',
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
                            xtype: 'container',
                            //userCls: 'admin-fieldset no-side-margin no-border',
                            layout: 'hbox',
                            //flex: 1,
                            items: [
                                {
                                    xtype: 'datefield',
                                    userCls: 'admin-fieldset no-side-margin no-padding no-border',
                                    ui: 'admin admin-text',
                                    //name: 'viewdate_field',
                                    width:'170pt',
                                    label: 'View Date:',
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
                                    xtype:'spacer',
                                    width:'5pt',
                                },
                                
                                {
                                    xtype: 'selectfield',
                                    ui: 'admin admin-text',
                                    userCls: 'admin-fieldset no-padding no-border',
                                    width:'160pt',
                                    label: 'Recording Year:',
                                    labelAlign:'left',
                                    labelWidth:'auto',

                                    store: 'Years',
                                    displayField: 'Year', valueField: 'Year',
                                    bind: { value: String( (new Date()).getYear() + 1900 ) } //<-- this should probably be in the model.js
                                },
                                {
                                    xtype:'spacer',
                                    width:'5pt',
                                },
                                {  
                                    xtype: 'displayfield',
                                    ui: 'admin fyi-display-field',
                                    label: '(00/00/00 - 00/00/00)',
                                    labelAlign: 'left',
                                    labelWidth: 'auto',
                                },
                            ]
                        },

                        // row 4
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-side-margin no-padding',
                            layout: 'vbox',
                            flex: 1,
                            items: [

                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            ui: 'reporting',
                                            boxLabel:'Accrual Rules',
                                            //bind: {
                                            //    boxLabel: '{selectedCategory.categoryName} Accrual Rules',
                                            //    checked: '{selectedCategory.allowAccrual}'
                                            //},
                                            //listeners: {
                                            //    change: 'onCategoriesCheckAllChange'
                                            //}
                                        },

                                        { xtype: 'spacer', flex: 1 },

                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls: 'x-fas fa-plus',
                                            ui: 'plain wtr-button',
                                            bind: {
                                                disabled: '{!selectedCategory.allowAccrual}'
                                            }
                                        },
                                    ]
                                },


                                {
                                    xtype: 'grid',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'grid',
                                    ui: 'employeeinfo-shift-grid requests-grid',
                                    flex:1,
                                    userCls: 'no-background',
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            text:'From',
                                            dataIndex: 'text',
                                            flex: 2,
                                        },

                                        {
                                            xtype: 'gridcolumn',
                                            text:'To',
                                            dataIndex: 'text',
                                            flex: 2,
                                        },
                                                                {
                                            xtype: 'gridcolumn',
                                            text:'Accrual Information',
                                            dataIndex: 'text',
                                            flex: 8,
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text:'Occurrences',
                                            dataIndex: 'text',
                                            flex: 4,
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text:'Total Time',
                                            dataIndex: 'text',
                                            flex: 4,
                                        },
                                    ],
                                    //reference: 'departmentTree',
                                    //bind: '{departmentsTree}'
                                }






                            ]
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
                                            //reference: 'viewDate',
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
                    width:'220pt',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'displayfield',
                                ui: 'employee-accrual-policy-display-field',
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
                                    bind: { value: '{hireDate}' },
                                }
                            ]
                        },
                        {
                            xtype: 'datefield',
                            userCls: 'admin-fieldset no-padding no-border',
                            ui: 'admin admin-text',
                            //name: 'viewdate_field',
                            label: 'Start accruing on:',
                            labelAlign:'left',
                            labelWidth:'auto',
                            reference: 'startDate',
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
                                ui: 'employee-accrual-policy-display-field',
                            },
                            items: [
                                {  
                                    label: 'Carried Over',
                                    labelAlign: 'left',
                                    labelWidth: '115pt',
                                    bind: { value: '+ {carriedOver}' },
                                },
                                {  
                                    label: 'Carry Over Expired',
                                    labelAlign: 'left',
                                    labelWidth: '115pt',
                                    bind: { value: '- {carryOverExpired}' },
                                },
                                {  
                                    label: 'Accrued',
                                    labelAlign: 'left',
                                    labelWidth: '115pt',
                                    bind: { value: '+ {accrued}' },
                                },
                                {  
                                    label: 'Adjustments',
                                    labelAlign: 'left',
                                    labelWidth: '115pt',
                                    bind: { value: '+ {adjustments}' },
                                },
                                {  
                                    label: ' ',
                                    labelAlign: 'left',
                                    labelWidth: '115pt',
                                    bind: { value: '--------------------' },
                                },
                                {  
                                    label: 'Allowed',
                                    labelAlign: 'left',
                                    labelWidth: '115pt',

                                    bind: { value: '{allowed}' },
                                },
                                {  
                                    label: 'Recorded',
                                    labelAlign: 'left',
                                    labelWidth: '115pt',
                                    bind: { value: '- {recorded}' },
                                },
                                {  
                                    label: ' ',
                                    labelAlign: 'left',
                                    labelWidth: '115pt',
                                    bind: { value: '--------------------' },
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    boxLabel: 'Show Schedule Time',
                                    bodyAlign: 'stretch',
                                },
                                {  
                                    label: 'Remaining',
                                    labelAlign: 'left',
                                    labelWidth: '115pt',
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