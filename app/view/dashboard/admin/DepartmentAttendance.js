/**
 * Admin Dashboard > Department Attendance Widget
 * @class DepartmentAttendance
 * @alias Breeze.view.dashboard.admin.DepartmentAttendance
 */
Ext.define('Breeze.view.dashboard.admin.DepartmentAttendance', {
    extend: 'Ext.Panel',
    alias: 'widget.dashboard.admin.departmentAattendance',

    layout: 'fit',

    title: {
      userCls:'headerCursor',
      text:'Dept Attendance'
    },

    ui: 'admin-departmentattendance-dashboard',
    userCls: 'admin-departmentattendance-dashboard',

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