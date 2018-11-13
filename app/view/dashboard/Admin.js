/**
 * Admin Dashboard view
 * @class Admin
 * @alias Breeze.view.dashboard.PerAdminsonal
 */
Ext.define('Breeze.view.dashboard.Admin', {
    extend: 'Ext.Container',
    alias: 'widget.dashboard.admin',
    userCls:'admin-content',
    requires: [
        'Breeze.view.dashboard.AdminController',
        'Breeze.view.dashboard.AdminModel'
    ],
    controller: 'dashboard.admin',
    viewModel: {
        type: 'dashboard.admin'
    },
    listeners: {
        initialize: 'onInit'
    },
    layout: 'vbox',
    items: [
        {
            xtype: 'dashboard.admin.leaverequestsrequiringaction',
            reference:'leaverequestsrequiringactionDash',
            flex: 1,
        },
        {            
            xtype: 'dashboard.admin.leaverequestsactiontaken',
            reference:'leaverequestsactiontaken',
            flex: 1,
        },
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [
                {
                    xtype: 'dashboard.admin.employeeabsences',
                    reference:'employeeabsences',
                    flex:2
                },
                {    
                    xtype: 'dashboard.admin.departmentAattendance',
                    reference:'departmentAattendance',
                    flex:1
                }
            ]
        }
    ]
});