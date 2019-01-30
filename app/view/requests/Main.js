/**
 * My Requests main content view
 * Displayed inside Requests view
 * @class Main 
 * @namespace Breeze.view.requests.Main
 * @alias widget.requests.main
 */
Ext.define('Breeze.view.requests.Main', {
    extend: 'Ext.Container',
    alias: 'widget.requests.main',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],

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
            width: '320pt', // 220pt
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
                            // handler: 'showLeaveRequestForm'
                            handler: 'showCreateRequestDialog'
                        }
                    ],
                    flex: 1,
                    layout: 'vbox',
                    items:[
                        // {
                        //     xtype:'container',
                        //     userCls:'requests-fieldset',
                        //     layout: 'fit',
                        //     scrollable:'y',
                        //     flex:1,
                        //     items:[
                        {
                            xtype: 'grid',
                            // == Item ID to make finding tree in panel easier
                            itemId: 'grid',
                            reference: 'leaveRequestsGrid',
                            ui: 'employeeinfo-shift-grid requests-grid',
                            userCls: 'no-background requests-fieldset',
                            // userCls: 'requests-fieldset',
                            layout: 'hbox',
                            flex: 1, scrollable: 'y',
                            selectable: {
                                mode: 'single'
                            },
                            hideHeaders: true,
                            plugins: { gridcellediting: true },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    text:'',
                                    dataIndex: 'request_name',
                                    flex: 1.5,
                                    editor: {
                                        xtype: 'breeze-textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text:'',
                                    dataIndex: 'request_status',
                                    flex: 1,
                                    tpl: [
                                        '<tpl switch="request_status">',
                                        '<tpl case="Approved">',
                                        '<span class="leaverequest lr-approved">{request_status}<span>',
                                        '<tpl case="Draft">',
                                        '<span class="leaverequest lr-draft">{request_status}<span>',
                                        '<tpl case="Pending">',
                                        '<span class="leaverequest lr-pending">{request_status}<span>',
                                        '<tpl case="Denied">',
                                        '<span class="leaverequest lr-denied">{request_status}<span>',
                                        '<tpl case="Cancelled">',
                                        '<tpl case="Cancellation Pending">',
                                        '<tpl case="Cancellation Denied">',
                                        '<span class="leaverequest lr-cancelled">{request_status}<span>',
                                        '<tpl default>',
                                        '<span>{request_status}</span>',
                                        '</tpl>'
                                    ],
                                    cell: {
                                        encodeHtml: false
                                    }
                                }
                            ],
                            bind: {
                                store: '{leaveRequests}'
                            },
                            listeners: {
                                select: 'onLeaveRequestSelect',
                                // beforecompleteedit: 'onLeaveRequestBeforeCompleteEdit',
                                edit: 'onLeaveRequestEdit'
                            }
                            
                        }
                        //     ]
                        // },
                    ],
                    buttonToolbar: { ui:'requests-leave-panel' },
                    // Leave Requests action buttons
                    buttons: [
                        {
                            xtype: 'button',
                            iconCls: 'x-fas fa-edit',
                            itemId: 'employeeNotes',
                            text: 'Employee', hidden: true,
                            bind: { hidden: '{requestActions.employeeNotes}' }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fas fa-edit',
                            itemId: 'employeeNotesReadOnly',
                            text: 'Employee', hidden: true,
                            bind: { hidden: '{requestActions.employeeNotesReadOnly}' }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fas fa-edit',
                            itemId: 'supervisorNotes',
                            text: 'Supervisor',  hidden: true,
                            bind: { hidden: '{requestActions.supervisorNotes}' }
                        },
                        {
                            xtype: 'spacer'
                        },
                        {
                            xtype: 'button',
                            ui: 'confirm alt', itemId: 'submit',
                            text: 'Submit', hidden: true,
                            bind: { hidden: '{!requestActions.submit}' }
                        },
                        {
                            xtype: 'button',
                            ui: 'decline alt', style: 'margin-left: 4pt',
                            itemId: 'delete',
                            text: 'Delete', hidden: true,
                            bind: { hidden: '{!requestActions.delete}' }
                        },
                        {
                            xtype: 'button',
                            ui: 'decline alt', style: 'margin-left: 4pt',
                            itemId: 'cancelRequest',
                            text: 'Cancel Request', hidden: true,
                            bind: { hidden: '{!requestActions.cancel}' }
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
                            iconCls: 'x-fas fa-plus',
                            handler: 'showLeaveRequestForm'
                            // handler: 'showCreateRequestDialog'
                        },
                        {
                            iconCls: 'x-fas fa-table',
                            handler: 'onFyiNavClick'
                        }
                    ],
                    flex: 1,
                    layout: 'vbox',
                    items:[

                        {
                            xtype: 'grid',
                            // == Item ID to make finding tree in panel easier
                            itemId: 'grid',
                            reference: 'requestedDaysGrid',
                            ui: 'employeeinfo-shift-grid requests-grid',
                            userCls: 'requests-fieldset no-background',
                            scrollable:'y', flex: 1,
                            plugins: { gridcellediting: true },
                            layout: 'hbox',
                            // hideHeaders: true,
                            columns: [
                                {
                                    xtype: 'datecolumn',
                                    text:'Date',
                                    dataIndex: 'request_date',
                                    format: 'm/d/Y',
                                    flex: 2,
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text:'Category',
                                    dataIndex: 'category_name',
                                    flex: 2,
                                },
                                {
                                    xtype: 'gridcolumn',
                                    bind: {
                                        text: '{requestedDaysAmountColumnTitle}'
                                    },
                                    dataIndex: 'Amount',
                                    flex: 1,
                                    editor: {
                                        xtype: 'numberfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text:'Conflicts',
                                    dataIndex: 'request_conflicts',
                                    flex: 1,
                                    // Remove button
                                    cell: {
                                        toolDefaults: {
                                            ui: 'employeeinfo-grid-tool',
                                            zone: 'end'
                                        },
                                        tools: [
                                            {
                                                iconCls: 'x-fas fa-times',
                                                hidden: true,
                                                bind: {
                                                    hidden: '{!requestActions.deleteDay}'
                                                }
                                                // handler: 'onDeleteAccrualInterval'
                                            }
                                        ]
                                    }
                                }
                            ],
                            bind: {
                                store: '{requestedDays}'
                            },
                            listeners: {
                                beforeedit: 'onRequestedDaysBeforeEdit',
                                edit: 'onRequestedDaysEdit'
                            }
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
            minWidth: '500pt', // 600pt
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
                            // minWidth:'614pt',
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


