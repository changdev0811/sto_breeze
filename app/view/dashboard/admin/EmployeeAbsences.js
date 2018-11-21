/**
 * Admin Dashboard > Employee Absences Widget
 * @class EmployeeAbsences
 * @alias Breeze.view.dashboard.admin.EmployeeAbsences
 */
Ext.define('Breeze.view.dashboard.admin.EmployeeAbsences', {
    extend: 'Ext.Panel',
    alias: 'widget.dashboard.admin.employeeabsences',

    layout: 'fit',

    title: {
      userCls:'headerCursor',
      text:'Employee Absences'
    },

    ui: 'admin-employeeabsences-dashboard',
    userCls: 'admin-employeeabsences-dashboard',

    header:{
        userCls:'headerCursor'
    },

    tools: [
        {
            iconCls: 'x-fas fa-angle-right',
            handler: 'onEmployeeAbsencesNavClick'

        }
    ],

    items: [

        {
            xtype:'container',
            userCls:'requests-fieldset',
            layout: 'fit',
            scrollable:'y',
            flex:1,
            items:[
                // Departments tree
                {
                    xtype: 'grid',
                    // == Item ID to make finding tree in panel easier
                    itemId: 'grid',
                    ui: 'employeeinfo-shift-grid requests-grid',
                    userCls: 'no-background',
                    layout: 'hbox',
                    hideHeaders: true,
                    rootVisible: false,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            text:'Employee',
                            dataIndex: 'text',
                            flex: 2,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Date',
                            dataIndex: 'text',
                            flex: 1,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Department',
                            dataIndex: 'text',
                            flex: 2,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Category',
                            dataIndex: 'text',
                            flex: 2,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Amount',
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

});