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

    //ui: 'employee-info-dashboard',

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