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
        'Ext.Component',
        'Ext.dataview.List',
        'Ext.XTemplate'
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
            userCls: ['employee-calendar','employee-calendar-noedge'],
            label: 'Month',
            flex: 4,
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
        },

        {
            xtype: 'list',
            ui:'calendar-legend',
            userCls:'legend' ,
            flex:1,
            layout: 'vbox',
            itemConfig: {
                ui:'calendar-legend'
            },
            itemTpl:'<div class="legend-item-label"><div class="legend-item-dot" style="background-color:{color}"></div>{title}</div>',

            store: [
                { title: 'Illness',     color:'rgb(153, 255, 204,1)'    },
                { title: 'Vacation',    color:'rgb(255, 255, 153,1)'    },
                { title: 'Personal',    color:'rgb(51, 153, 255,1)'     },
                { title: 'Jury',        color:'rgb(153, 153, 204,1)'    },
                { title: 'Bereavement', color:'rgb(153, 204, 255,1)'    },
                { title: 'Holiday',     color:'rgb(255, 153, 15,1)'     },
                { title: 'Training',    color:'rgb(153, 153, 153, 1)'   }
                
            ]
        }

    ]

});