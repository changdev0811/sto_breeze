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
            handler: 'onInfoNavClick'

        }
    ],

    items: [

    ]

});