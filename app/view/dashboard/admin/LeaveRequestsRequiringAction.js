/**
 * Admin Dashboard > Leave Requests Requiring Action Widget
 * @class LeaveRequestsRequiringAction
 * @alias Breeze.view.dashboard.admin.LeaveRequestsRequiringAction
 */
Ext.define('Breeze.view.dashboard.admin.LeaveRequestsRequiringAction', {
    extend: 'Ext.Panel',
    alias: 'widget.dashboard.admin.leaverequestsrequiringaction',

    layout: 'fit',

    title: {
      userCls:'headerCursor',
      text:'Leave Requests Requiring Action'
    },

    ui: 'admin-leaverequestsrequiringaction-dashboard',
    userCls: 'admin-leaverequestsrequiringaction-dashboard',

    header:{
        userCls:'headerCursor'
    },

    tools: [
        {
            iconCls: 'x-fas fa-angle-right',
            handler: 'onLeaveRequestsRequiringActionNavClick'

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
                            flex: 3,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Department',
                            dataIndex: 'text',
                            flex: 2,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Date Submitted',
                            dataIndex: 'text',
                            flex: 2,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Request',
                            dataIndex: 'text',
                            flex: 5,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Status',
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