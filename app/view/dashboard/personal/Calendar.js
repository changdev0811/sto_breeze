/**
 * Personal Dashboard > Calendar Widget
 * @class Calendar
 * @alias Breeze.view.dashboard.personal.Calendar
 */
Ext.define('Breeze.view.dashboard.personal.Calendar', {
    extend: 'Ext.Panel',
    ui:'employee-calendar-dashboard',
    alias: 'widget.dashboard.personal.calendar',
    userCls:'employee-calendar-dashboard',
    

    title: {
      userCls:'headerCursor',
      text:'Calendar'
    },

    header:{
      userCls:'headerCursor',
    },

    tools: [
        {
            iconCls: 'x-fas fa-angle-right',
            handler: 'onCalendarNavClick'
        }
    ]
});