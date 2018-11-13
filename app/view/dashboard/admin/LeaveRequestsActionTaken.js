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
            handler: 'onInfoNavClick'

        }
    ],

    items: [

    ]

});