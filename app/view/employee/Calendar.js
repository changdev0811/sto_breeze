/**
 * Employee Calendar view
 * @class CalendarBreeze.view.employee.Calendar
 */
Ext.define('Breeze.view.employee.Calendar',{
    extend: 'Ext.Container',
    alias: 'widget.employee.calendar',
    requires: [
        'Breeze.view.employee.CalendarController',
        'Breeze.view.employee.CalendarModel',
        'Ext.calendar.panel.Month',
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Component',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],
    
    viewModel: {
       type: 'employee.calendar'
    },
    controller: 'employee.calendar',
    listeners: {
      initialize: 'onInit'
    },
    
    layout: 'vbox',

    userCls: 'employee-calendar-container',

    items: [

        {
            xtype: 'calendar',
            userCls: ['employee-calendar','employee-calendar-noedge'],
            label: 'Month',
            flex: 4,
            ui: 'employee-calendar',
            reference: 'calendarPanel',
            compact: true,
            compactOptions: {
                switcherPosition: null,
                switcher: null,
                createButtonPosition: null,
                createButton: null,
                menuButton: {hidden: true},
                nextButton: {
                    text: 'i'
                }
            },
            switcher: {},
            titleBar: {
                ui:'employee-calendar', 
                shadow: false,
                items: [
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-angle-left',
                        ui: "calendarMonthSelectionButton",
                        weight: '-5',
                        tooltop: 'Previous',
                        handler: function(c){
                            c.getParent().getParent().getParent().navigate(-1,Ext.Date.MONTH);
                        }
                    },
                    {
                        xtype: 'button',
                        ui: "calendarMonthSelectionButton",
                        iconCls: 'x-fa fa-angle-right',
                        weight: 105,
                        tooltip: 'Next',
                        reference: 'nextMonthButton'
                    }
                ]
            },
            views:{
                month:{
                    xtype: 'calendar-month',
                    reference: 'calendarMonth',
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
            xtype: 'dataview',
            ui:'calendar-legend',
            inline: true,
            userCls:'legend' ,
            flex:1,
            padding: '8pt 8pt 8pt 8pt',
            layout: {
                type: 'hbox',
                wrap: true
            },
            itemConfig: {
                ui:'calendar-legend',
                width: '33%'
            },
            itemTpl: '<div class="legend-item-label"><div class="legend-item-dot" style="background-color:{color}"></div>{Category_Name}</div>',

            // store: [
            //     { title: 'Illness',     color:'rgb(153, 255, 204,1)'    },
            //     { title: 'Vacation',    color:'rgb(255, 255, 153,1)'    },
            //     { title: 'Personal',    color:'rgb(51, 153, 255,1)'     },
            //     { title: 'Jury',        color:'rgb(153, 153, 204,1)'    },
            //     { title: 'Bereavement', color:'rgb(153, 204, 255,1)'    },
            //     { title: 'Holiday',     color:'rgb(255, 153, 15,1)'     },
            //     { title: 'Training',    color:'rgb(153, 153, 153, 1)'   }
                
            // ]
            bind: {
                store: '{categories}',
            },
            viewModel: true,
        }

    ]

});