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
            handler: 'onInfoNavClick'

        }
    ],

    items: [

    ]

});