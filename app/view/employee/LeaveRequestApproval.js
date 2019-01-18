/**
 * Employee LeaveRequestApproval View
 * @class Breeze.view.employee.LeaveRequestApproval
 */
Ext.define('Breeze.view.employee.LeaveRequestApproval',{
    extend: 'Ext.Panel',
    alias: 'widget.employee.leaverequestapproval',

    config: {
        crumbTitle: 'Leave Request Approval',
    },
    
    requires: [
        'Breeze.view.employee.FyiController',
        'Breeze.view.employee.FyiModel',
        'Breeze.view.employee.fyi.AccrualItem',
        'Ext.field.Display',
        'Ext.field.Date',
        'Ext.picker.Date'
    ],

    viewModel: {
        type: 'employee.leaverequestapproval'
    },
    controller: 'employee.leaverequestapproval',

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



    title: 'Leave Request Approval',
    ui: 'leave-request-approval-base',
    layout: 'vbox',
    userCls: 'employee-fyi-container',
    scrollable:true,
    // Action buttons shown at bottom of panel
    buttonAlign: 'center',
    buttons: {
        notes: { weight:1, iconCls: 'x-fa fa-file-alt', /* handler: 'onPrintExcel',*/ ui:'alt', style: 'width:auto;' },
        edit:  { weight:2, iconCls: 'x-fa fa-edit', /* handler: 'onPrintExcel',*/    ui:'alt', style: 'width:auto;' },
        apply: { weight:3, text: 'Save', /* handler: 'onPrintExcel',*/ ui: 'confirm alt', style: 'width:125pt' },
    },
    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'leave-request-approval-actions',
        shadow: false,
    },
    items: [
        {
            // xtype: 'fieldset',
            // userCls: 'leave-request-fieldset no-side-margin',
            // title:'Employee Accrual Policy - [CATEGORY]',
            xtype:'container',
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
                            xtype: 'container',
                            flex: 1,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    userCls: 'leave-request-fieldset no-side-margin no-padding',
                                    title:'Leave Requests:',
                                    flex:1,
                                    layout: 'vbox',
                                    items:[
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
                                                    text:'Submitted',
                                                    dataIndex: 'text',
                                                    flex: 3,
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Employee',
                                                    dataIndex: 'text',
                                                    flex: 3,
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Department',
                                                    dataIndex: 'text',
                                                    flex: 3,
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Request',
                                                    dataIndex: 'text',
                                                    flex: 3,
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Status',
                                                    dataIndex: 'text',
                                                    flex: 2,
                                                },
                                            ],
                                            //reference: 'departmentTree',
                                            //bind: '{departmentsTree}'
                                        }

                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    userCls: 'leave-request-fieldset no-padding',
                                    title:'Viewing Requests:',
                                    flex:1,
                                    layout: 'vbox',
                                    defaults: {
                                        xtype: 'displayfield',
                                        ui: 'leave-request-approval-display-field',
                                    },
                                    items: [
                                        {
                                            xtype:'container',
                                            height:'2pt',
                                        },
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
                                        },
                                        {
                                            xtype:'container',
                                            height:'2pt',
                                        },
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'leave-request-fieldset no-border no-side-margin',
                                            title:'Requested Days',
                                            layout:'vbox',
                                            flex:1,
                                            items:[
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
                                                            text:'Date',
                                                            dataIndex: 'text',
                                                            flex: 1,
                                                        },

                                                        {
                                                            xtype: 'gridcolumn',
                                                            text:'Category',
                                                            dataIndex: 'text',
                                                            flex: 3,
                                                        },
                                                                                {
                                                            xtype: 'gridcolumn',
                                                            text:'Amount',
                                                            dataIndex: 'text',
                                                            flex: 1,
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            text:'Conflicts',
                                                            dataIndex: 'text',
                                                            flex: 1,
                                                        },
                                                    ],
                                                    //reference: 'departmentTree',
                                                    //bind: '{departmentsTree}'
                                                }
                                            ]
                                        },


                                    ]
                                },
                            ]
                        },


                        // row 2
                        {
                            xtype: 'fieldset',
                            userCls: 'leave-request-fieldset no-side-margin no-padding no-border',

                            layout: 'hbox',
                            defaults: {
                                xtype: 'displayfield',
                                ui: 'leave-request-approval-display-field',
                                flex:1,
                            },
                            items: [
                                {
                                    label: 'Approval Mode:',
                                    labelAlign: 'left',
                                    labelWidth: 'auto',
                                    bind: { value: '{approvalMode}' },
                                },
                                {
                                    label: 'Conflict Scope:',
                                    labelAlign: 'left',
                                    labelWidth: 'auto',
                                    bind: { value: '{conflictScope}' },
                                },
                                {
                                    label: 'Conflict Limit:',
                                    labelAlign: 'left',
                                    labelWidth: 'auto',
                                    bind: { value: '{conflictLimit}' },
                                },
                                {
                                    label: 'FYI as of Date:',
                                    labelAlign: 'left',
                                    labelWidth: 'auto',
                                    bind: { value: '{fyiAsOfDate}' },

                                },
                            ]
                        },



                        // row 3
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    userCls: 'leave-request-fieldset no-side-margin no-padding',
                                    title:'Current Supervisor Responses',
                                    flex:2,
                                    layout:'vbox',
                                    items:[
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
                                                    text:'Supervisor',
                                                    dataIndex: 'text',
                                                    flex: 1,
                                                },

                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Response',
                                                    dataIndex: 'text',
                                                    flex: 1,
                                                },
                                                
                                            ],
                                            //reference: 'departmentTree',
                                            //bind: '{departmentsTree}'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    userCls: 'leave-request-fieldset no-padding',
                                    title:'Request Conflicts:',
                                    flex:3,
                                    layout:'vbox',
                                    items:[
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
                                                    text:'Date',
                                                    dataIndex: 'text',
                                                    flex: 2,
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Employee',
                                                    dataIndex: 'text',
                                                    flex: 3,
                                                },

                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Department',
                                                    dataIndex: 'text',
                                                    flex: 3,
                                                },
                                                                        {
                                                    xtype: 'gridcolumn',
                                                    text:'Recorded',
                                                    dataIndex: 'text',
                                                    flex: 3,
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Ammount',
                                                    dataIndex: 'text',
                                                    flex: 3,
                                                },
                                            ],
                                            //reference: 'departmentTree',
                                            //bind: '{departmentsTree}'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    userCls: 'leave-request-fieldset no-padding',
                                    //title:'Leave Requests:',
                                    flex:3,
                                    layout:'vbox',
                                    items:[

                                        {
                                            xtype: 'toolbar',
                                            ui: 'leave-request-tree',
                                            shadow: false,
                                            items: [
                                                {
                                                    xtype: 'checkbox',
                                                    ui: 'reporting',
                                                    boxLabel:'Show Scheduled Recorded',
                                                    //bind: {
                                                    //    boxLabel: '{selectedCategory.categoryName} Accrual Rules',
                                                    //    checked: '{selectedCategory.allowAccrual}'
                                                    //},
                                                    //listeners: {
                                                    //    change: 'onCategoriesCheckAllChange'
                                                    //}
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
                                                    text:' ',
                                                    dataIndex: 'text',
                                                    width:'10pt',
                                                },

                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Category',
                                                    dataIndex: 'text',
                                                    flex: 1,
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Allowed',
                                                    dataIndex: 'text',
                                                    flex: 1,
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'recorded',
                                                    dataIndex: 'text',
                                                    flex: 1,
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text:'Remaining',
                                                    dataIndex: 'text',
                                                    flex: 1,
                                                },
                                            ],
                                            //reference: 'departmentTree',
                                            //bind: '{departmentsTree}'
                                        }
                                    ]
                                },
                            ]
                        },
                    ]
                },
            ]
        }
    ]
});