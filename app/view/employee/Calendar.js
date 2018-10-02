/**
 * Employee Calendar view
 * @class CalendarBreeze.view.employee.Calendar
 */
Ext.define('Breeze.view.employee.Calendar',{
    extend: 'Ext.Panel',
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

    ui: 'employee-calendar-panel',

    title: 'Calendar',

    //==[Start of Panel Setup/Styling]====
    tools: [
        {
            iconCls: 'x-fa fa-sync',
            handler: 'onRefreshTool'  
        },
        {
            iconCls: 'x-fa fa-print',
            handler: 'onPrintTool'
        }
    ],

    items: [

        {
            xtype: 'calendar',
            userCls: 'employee-calendar-noedge',
            label: 'Month',
            flex: 1,
            ui: 'employee-calendar',
            reference: 'calendarPanel',
            compact: true,
            compactOptions: {
                switcherPosition: null,
                switcher: null,
                createButtonPosition: null,
                createButton: {hidden: true, style: 'display: none'},
                menuButton: {hidden: true, style: 'display: none'},
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
                        handler: function(c){
                            c.getParent().getParent().getParent().navigate(-1,Ext.Date.MONTH);
                        }
                    },
                    {
                        xtype: 'button',
                        ui: "calendarMonthSelectionButton",
                        iconCls: 'x-fa fa-angle-right',
                        weight: 105,
                        handler: function(c){
                            c.getParent().getParent().getParent().navigate(1,Ext.Date.MONTH);
                        }
                    }
                ]
            },
            bind: {
                store: '{calendar}'
            },
            views:{
                month:{
                    addForm:{
                        xtype:'breeze-calendar-form-add',
                        userCls:'employee-calendar-form',
                        ui:'employee-calendar-form',
                        saveButton:       { ui:'alt confirm' },
                        cancelButton:     { ui:'alt action', userCls:'cancel-button'},
                        //startDateField:   { ui:'employee-calendar-form' },
                        //startTimeField:   { ui:'employee-calendar-form' },
                        //endDateField:     { ui:'employee-calendar-form' },
                        //endTimeField:     { ui:'employee-calendar-form' },
                        //allDayField:      { ui:'employee-calendar-form' },
                        //descriptionField: { ui:'employee-calendar-form' },
                        toolbarUi:'employee-calendar-form'
                    },

                    editForm:{
                        xtype:'breeze-calendar-form-edit',
                        userCls:'employee-calendar-form',
                        ui:'employee-calendar-form',
                        saveButton:       { ui:'alt confirm' },
                        cancelButton:     { ui:'alt action', userCls:'cancel-button'},
                        dropButton:       { ui:'alt decline' },
                        //startDateField:   { ui:'employee-calendar-form' },
                        //startTimeField:   { ui:'employee-calendar-form' },
                        //endDateField:     { ui:'employee-calendar-form' },
                        //endTimeField:     { ui:'employee-calendar-form' },
                        //allDayField:      { ui:'employee-calendar-form' },
                        //descriptionField: { ui:'employee-calendar-form' },
                        toolbarUi:'employee-calendar-form'
                    },

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

        /*
        {
            xtype: 'container',
            layout: 'vbox',
            userCls:'legend-title',
            height:'14pt',
            html:"Legend"
        },
        */


        {
            xtype: 'dataview',
            ui:'calendar-legend',
            inline: true,
            userCls:'legend' ,
            /*flex:1,*/
            minWidth:'614pt',
            height:'45pt',
            padding: '8pt 8pt 0pt 8pt',
            layout: {
                type: 'hbox',
                wrap: true
            },
            itemConfig: {
                ui:'calendar-legend',
                width: '33%'
            },
            itemTpl: '<div class="legend-item-label"><div class="legend-item-dot" style="background-color:{Category_Color_HEX}"></div>{Category_Name}</div>',

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