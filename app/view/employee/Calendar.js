/**
 * Employee FYI View
 * @class Breeze.view.employee.Fyi
 */
Ext.define('Breeze.view.employee.Calendar',{
    extend: 'Ext.Container',
    alias: 'widget.employee.calendar',
    requires: [
        'Ext.calendar.panel.Month'
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
            xtype: 'calendar',
            label: 'Month',
            flex: 1,
            ui: 'employee-calendar',
            compact: true,
            toolbar: {
                ui: 'employee-calendar',
            },
            views:{

                month:{
                    xtype: 'calendar-month',
                    view:{
                        ui: 'employee-calendar',
 
                    }
                },


            }
        }
    ]

});