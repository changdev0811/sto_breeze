/**
 * Employee FYI View
 * @class Breeze.view.employee.Fyi
 */
Ext.define('Breeze.view.employee.Calendar',{
    extend: 'Ext.Container',
    alias: 'widget.employee.calendar',
    requires: [
        'Ext.calendar.panel.Month',
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Component'
    ],
    
    //viewModel: {
    //    type: 'employee.fyi'
    //},
    //controller: 'employee.fyi',
    //listeners: {
    //   initialize: 'onInit'
    //},
    
    layout: 'vbox',

    userCls: 'employee-calendar-container',

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            ui: 'employee-calendar',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    ui: "calendarMonthSelectionButton",
                    iconCls: 'x-fa fa-angle-left'
                },
                {
                    xtype: 'component',
                    html: 'Month Year'
                },
                {
                    xtype: 'button',
                    ui: "calendarMonthSelectionButton",
                    iconCls: 'x-fa fa-angle-right'
                }
            ]
        },

        {
            xtype: 'calendar',
            userCls: 'employee-calendar',
            label: 'Month',
            flex: 1,
            ui: 'employee-calendar',
            compact: true,
            titleBar: {
                ui:'employee-calendar', 
                shadow: false
            },
            views:{
                month:{
                    xtype: 'calendar-month',
                    dayHeader: {
                        ui:'employee-calendar',
                    },
                    view:{
                        ui: 'employee-calendar',
                    }
                },


            }
        }
    ]

});