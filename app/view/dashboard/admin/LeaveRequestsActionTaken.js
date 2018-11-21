/**
 * Admin Dashboard > Leave Requests Action Taken Widget
 * @class LeaveRequestsActionTaken
 * @alias Breeze.view.dashboard.admin.LeaveRequestsActionTaken
 */
Ext.define('Breeze.view.dashboard.admin.LeaveRequestsActionTaken', {
    extend: 'Ext.Panel',
    alias: 'widget.dashboard.admin.leaverequestsactiontaken',

    layout: 'fit',

    title: {
      userCls:'headerCursor',
      text:'Leave Requests Action Taken'
    },

    ui: 'admin-leaverequestsactiontaken-dashboard',
    userCls: 'admin-leaverequestsactiontaken-dashboard',

    header:{
        userCls:'headerCursor'
    },

    tools: [
        {
            iconCls: 'x-fas fa-angle-right',
            handler: 'onLeaveRequestsActionTakenNavClick'

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
                            flex: 4,
                        },

                        {
                            xtype: 'gridcolumn',
                            text:'Request',
                            dataIndex: 'text',
                            flex: 5,
                        },
                                                {
                            xtype: 'gridcolumn',
                            text:'Reply Date',
                            dataIndex: 'text',
                            flex: 3,
                        },
                        {
                            xtype: 'gridcolumn',
                            text:'Action',
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