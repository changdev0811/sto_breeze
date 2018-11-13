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

        {
            xtype: 'cartesian',
            layout:'fit',
            background:'transparent',
            store: {
               fields: ['name', 'value'],
               data: [
                   {
                       name: 'Test Dept',
                       value: 83
                   },
                   {
                       name: 'Other Dept',
                       value: 95
                   }
               ]
            },
            axes: [
            {
               type: 'numeric',
               position: 'left',
               //title: {
               //    text: 'Sample Values',
               //    fontSize: 15
               //},
               fields: 'value',

               style : {
                 strokeStyle : 'white',
               },

               label:{
                color:'white'
               }

            }, 
            {
               type: 'category',
               position: 'bottom',
               //title: {
               //    text: 'Sample Values',
               //    fontSize: 15
               //},
               fields: 'name',

               style : {
                 strokeStyle : 'white',
               },

               label:{
                color:'white'
               }

            }],
            series: {
               type: 'bar',
               style: {
                minGapWidth: 20,
                maxBarWidth: 20,
               },
               subStyle: {
                   fill: ['rgba(255,255,255,.66)'],
                   stroke: 'none',
               },
               xField: 'name',
               yField: 'value'
            }
        },
    ]
});