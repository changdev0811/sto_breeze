/**
 * Employee TimeSheetApproval View
 * @class Breeze.view.employee.TimeSheetApproval
 */
Ext.define('Breeze.view.employee.TimeSheetApproval',{
    extend: 'Ext.Panel',
    alias: 'widget.employee.timesheetapproval',

    config: {
        crumbTitle: 'Time Sheet Approval',
    },

    requires: [
        'Breeze.view.employee.FyiController',
        'Breeze.view.employee.FyiModel',
        'Breeze.view.employee.fyi.AccrualItem',
        'Ext.field.Display',
        'Ext.field.Date',
        'Ext.picker.Date'
    ],

    //viewModel: {
    //    type: 'employee.timesheetapproval'
    //},
    //controller: 'employee.timesheetapproval',

    //listeners: {
    //    initialize: 'onInit'
    //},


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



    title: 'Time Sheet Approval',
    ui: 'leave-request-approval-base',
    layout: 'vbox',
    userCls: 'employee-fyi-container',
    scrollable:true,

    items: [

        {
            xtype: 'fieldset',
            userCls: 'admin-fieldset no-side-margin no-padding',
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
                            text:' ',
                            dataIndex: 'text',
                            flex: 1,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Employee',
                            dataIndex: 'text',
                            flex: 3,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Week Ending',
                            dataIndex: 'text',
                            flex: 3,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Total Time',
                            dataIndex: 'text',
                            flex: 3,
                        },
                        
                    ],
                    //reference: 'departmentTree',
                    //bind: '{departmentsTree}'
                },





            ]
        },

                {
                    xtype: 'toolbar',
                    userCls:'no-background',
                    ui: 'admin-tree',
                    shadow: false,
                    items: [
                        {
                            xtype: 'checkbox',
                            ui: 'reporting',
                            boxLabel:'HH:MM',
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
                            text:'Approve',
                            ui: 'action',
                            width:'125pt',
                            //bind: {
                            //    disabled: '{!selectedCategory.allowAccrual}'
                            //}
                        },
                        { xtype: 'spacer', width:'5pt'},
                        {
                            xtype: 'button',
                            //text: 'Save for Future Use',
                            text:'Deny',
                            ui: 'decline alt',
                            width:'125pt',
                            //bind: {
                            //    disabled: '{!selectedCategory.allowAccrual}'
                            //}
                        },


                    ]
                },


    ]
});