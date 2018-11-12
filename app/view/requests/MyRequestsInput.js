/**
 * MOTD Requests view
 * @class MyRequestsInput
 * @namespace Breeze.view.requests.MyRequestsInput
 * @alias widget.requests.myrequestsinput
 */
Ext.define('Breeze.view.requests.MyRequestsInput', {
    extend: 'Ext.Container',
    alias: 'widget.requests.myrequestsinput',

    // Layout and base styles
    layout: 'hbox',
    scrollable:'x',



    // Body contents
    items: [

        // column 1
        {
            xtype: 'container',
            flex: 2,
            minWidth:'400pt',
            layout: 'vbox',


            items:[
                {
                    xtype: 'panel',
                    ui:'requests-input-panel',
                    userCls:'requests-input-panel',
                    title: 'Leave Request',
                    layout:'vbox',
                    tools: [
                        {
                            iconCls: 'x-fas fa-times',
                            //handler: ''
                        }
                    ], 

                    // Action buttons shown at bottom of panel
                    buttonAlign: 'center',
                    buttons: {
                        save:   { name: 'save_button',   text: 'Save Request', /* handler: 'onPrintPDF',*/     ui: 'action', style:'width:125pt' },
                        submit: { name: 'submit_button', text: 'Submit Request', /* handler: 'onPrintExcel',*/ ui: 'action', style:'width:125pt' },
                        remove: { name: 'remove_button', text: 'Delete Request', /* handler: 'onPrintExcel',*/ ui: 'action', style:'width:125pt' },
                    },

                    // Adjust action button toolbar spacing and appearance with UI and shadow
                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false,
                    },

                    items:[
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Request Name',
                                    ui: 'requests-text-input',
                                    flex:1,
                                },
                                {
                                    xtype:'spacer',
                                    width:'10pt',
                                },
                                {
                                    xtype: 'selectfield',
                                    label: 'Category',
                                    ui: 'requests-text-input',
                                    flex: 1,
                                    displayField: 'Category',
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'datefield',
                                    ui: 'requests-date-input',
                                    //name: 'start_date',
                                    label: 'Start Date',
                                    reference: 'viewDate',
                                    maxWidth:'125pt',
                                    picker: {
                                        xtype: 'datepicker',
                                        title: 'Select Date'
                                    },
                                    //listeners: {
                                    //    change: 'onViewDateChanged'
                                    //}
                                },

                                {
                                    xtype:'spacer',
                                    width:'20pt'
                                },


                                {
                                    xtype:'fieldset',
                                    //title:'percentage',
                                    ui:'admin-fieldset',
                                    items:[
                                        {
                                            xtype:'containerfield',
                                            layout:'hbox',
                                            
                                            defaults:{
                                                bodyAlign: 'stretch',
                                                ui: 'requests-input',
                                                padding:'0pt 5pt 0pt 5,t',
                                            },
                                            items:[
                                                {
                                                    xtype: 'radio',
                                                    //name: 'start100',
                                                    boxLabel: '100%',
                                                },
                                                {
                                                    xtype: 'radio',
                                                    //name: 'start75',
                                                    boxLabel: '75%',
                                                },
                                                {
                                                    xtype: 'radio',
                                                    //name: 'start50',
                                                    boxLabel: '50%',
                                                },
                                                {
                                                    xtype: 'radio',
                                                    //name: 'start25',
                                                    boxLabel: '25%',
                                                },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'datefield',
                                    ui: 'requests-date-input',
                                    //name: 'start_date',
                                    label: 'End Date',
                                    reference: 'viewDate',
                                    maxWidth:'125pt',
                                    picker: {
                                        xtype: 'datepicker',
                                        title: 'Select Date'
                                    },
                                    //listeners: {
                                    //    change: 'onViewDateChanged'
                                    //}
                                },

                                {
                                    xtype:'spacer',
                                    width:'20pt'
                                },


                                {
                                    xtype:'fieldset',
                                    //title:'percentage',
                                    ui:'admin-fieldset',
                                    items:[
                                        {
                                            xtype:'containerfield',
                                            layout:'hbox',
                                            
                                            defaults:{
                                                bodyAlign: 'stretch',
                                                ui: 'requests-input',
                                                padding:'0pt 5pt 0pt 5,t',
                                            },
                                            items:[
                                                {
                                                    xtype: 'radio',
                                                    //name: 'end100',
                                                    boxLabel: '100%',
                                                },
                                                {
                                                    xtype: 'radio',
                                                    //name: 'end75',
                                                    boxLabel: '75%',
                                                },
                                                {
                                                    xtype: 'radio',
                                                    //name: 'end50',
                                                    boxLabel: '50%',
                                                },
                                                {
                                                    xtype: 'radio',
                                                    //name: 'end25',
                                                    boxLabel: '25%',
                                                },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'fieldset',
                            userCls:'requests-fieldset-input',
                            flex:1,
                        }
                    ]
                }
            ],
        },
        // column 2
        {
            xtype: 'container',
            flex: 1,
            minWidth:'200pt',
            layout: 'vbox',
            items:[
                {
                    xtype: 'panel',
                    ui:'requests-input-panel',
                    userCls:'requests-input-panel requests-rule',
                    title: 'Work Days Requested',
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
                                    ui: 'employeeinfo-shift-grid requests-grid-input',
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



                    ]



                }
            ],
        },


    ]
});


