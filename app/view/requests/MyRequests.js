/**
 * MOTD Requests view
 * @class MyRequests
 * @namespace Breeze.view.requests.MyRequests
 * @alias widget.requests.myrequests
 */
Ext.define('Breeze.view.requests.MyRequests', {
    extend: 'Ext.Container',
    alias: 'widget.requests.myrequests',

    userCls:'requests-content',

    // Layout and base styles
    layout: 'hbox',
    scrollable:'x',

    // Body contents
    items: [

        // column 1
        {
            xtype: 'container',
            userCls:'requests-content',
            //flex: 1,
            width: '220pt',
            layout: 'vbox',
            items:[
                {
                    xtype: 'panel',
                    ui:'requests-leave-panel',
                    userCls:'requests-leave-panel',
                    title: 'My Leave Requests',
                    tools: [
                        {
                            iconCls: 'x-fas fa-plus',
                            handler: 'showLeaveRequestForm'
                        }
                    ],
                    flex: 1,
                    layout: 'vbox',
                    items:[
                        {
                            xtype:'container',
                            userCls:'requests-fieldset',
                            layout: 'fit',
                            scrollable:'y',
                            flex:1,
                            items:[
                                // Departments tree
                                {
                                    xtype: 'grid',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'grid',
                                    ui: 'employeeinfo-shift-grid requests-grid',
                                    userCls: 'no-background',
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            text:'Name',
                                            dataIndex: 'text',
                                            flex: 1,
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text:'State',
                                            dataIndex: 'text',
                                            flex: 1,
                                        }
                                    ],
                                    //reference: 'departmentTree',
                                    //bind: '{departmentsTree}'
                                }
                            ]
                        },
                        {
                            xtype:'container',
                            userCls:'requests-fieldset no-border',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    userCls: 'requests-label',
                                    html: 'Employee Notes',
                                },
                                {
                                    xtype: 'button',
                                    //text: 'Save for Future Use',
                                    iconCls:'x-fas fa-edit',
                                    ui: 'plain wtr-button',                   
                                },

                            ]



                        }
                    ]
                },
                {
                    xtype: 'panel',
                    ui:'requests-days-panel',
                    userCls:'requests-days-panel',
                    title: 'Requested Days',
                    tools: [
                        {
                            iconCls: 'x-fas fa-table',
                            //handler: 'onFyiNavClick'
                        }
                    ],
                    flex: 1,
                    layout: 'vbox',
                    items:[
                        {
                            xtype:'container',
                            userCls:'requests-fieldset',
                            layout: 'fit',
                            flex:1,
                            items: [
                                // Departments tree
                                {
                                    xtype: 'grid',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'grid',
                                    ui: 'employeeinfo-shift-grid requests-grid',
                                    userCls: 'no-background',
                                    scrollable:'y',
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            text:'Date',
                                            dataIndex: 'text',
                                            flex: 4,
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text:'Category',
                                            dataIndex: 'text',
                                            flex: 5,
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text:'Percent',
                                            dataIndex: 'text',
                                            flex: 5,
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text:'Conflicts',
                                            dataIndex: 'text',
                                            flex: 5,
                                        }
                                    ],
                                    //reference: 'departmentTree',
                                    //bind: '{departmentsTree}'
                                }
                            ]
                        },
                    ]
                },
            ]
        },
        // column 2 (calendar)
        {
            xtype: 'container',
            userCls:'requests-content',

            flex: 2,
            minWidth: '600pt',
            layout: 'vbox',
            items:[
                {
                    xtype: 'panel',
                    userCls:'requests-calendar-panel',
                    title: ' ',
                    tools: [
                        {
                            iconCls: 'x-fa fa-sync',
                            //handler: 'onRefreshTool'  
                        },
                        {
                            iconCls: 'x-fa fa-print',
                            //handler: 'onPrintTool'
                        }
                    ],
                    ui: 'employee-calendar-panel',
                    flex: 1,
                    layout: 'vbox',
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

                        
                        //{
                        //    xtype: 'container',
                        //    layout: 'vbox',
                        //    userCls:'legend-title',
                        //    height:'14pt',
                        //    html:"Legend"
                        //},
                        


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
                },
            ]
        },
    ]
});


