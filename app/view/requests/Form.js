/**
 * My Requests request form
 * Used by Requests view
 * @class Form
 * @namespace Breeze.view.requests.Form
 * @alias widget.requests.form
 */
Ext.define('Breeze.view.requests.Form', {
    extend: 'Ext.Container',
    alias: 'widget.requests.form',

    // Layout and base styles
    layout: 'hbox',
    scrollable:'x',


    // Body contents
    items: [

        // column 1
        {
            xtype: 'container',
            //flex: 2,
            width:'500pt',
            layout: 'vbox',


            items:[
                {
                    xtype: 'panel',
                    ui:'requests-input-panel',
                    userCls:'requests-input-panel',
                    title: 'Leave Request',
                    layout:'vbox',
 

                    // Action buttons shown at bottom of panel
                    buttonAlign: 'center',
                    buttons: {
                        save:   { weight:1,  text: 'Save Request',    /* handler: 'onPrintPDF',*/           ui: 'confirm alt',  width:'115pt' },
                        submit: { weight:2,  text: 'Submit Request',  /* handler: 'onPrintExcel',*/         ui: 'confirm alt',  width:'115pt' },
                        cancel: { weight:3,  text: 'cancel',             handler: 'closeLeaveRequestForm',  ui: 'action',      width:'115pt' },
                        remove: { weight:4,  text: 'Delete Request',  /* handler: 'onPrintExcel',*/         ui: 'decline alt', width:'115pt' },
                    },

                    // Adjust action button toolbar spacing and appearance with UI and shadow
                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'requests-input-panel',
                        shadow: false,
                    },

                    items:[
                        {
                            xtype: 'container',
                            userCls:'requests-fieldset',
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
                            userCls:'requests-fieldset',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'datefield',
                                    ui: 'requests-date-input',
                                    //name: 'start_date',
                                    label: 'Start Date',
                                    // reference: 'viewDate',
                                    maxWidth:'125pt',
                                    picker: {
                                        xtype: 'datepicker',
                                        title: 'Select Date'
                                    },
                                    listeners: {
                                        //change: ''
                                    }
                                },

                                {
                                    xtype:'spacer',
                                    width:'20pt'
                                },

                                {
                                    xtype: 'spinnerfield',
                                    ui: 'requests-text-input',
                                    //flex: 1,
                                    style: 'padding-left: 4pt',
                                    name: 'request-start-hours',
                                    label: 'Hours',
                                    decimals: 0,
                                    minValue: 1,
                                    maxValue: 24,
                                    value:24,
                                    bind: {
                                        //value: '',
                                        //minValue: '',
                                        //maxValue: ''
                                    }
                                },
                                {
                                    xtype:'spacer',
                                    width:'20pt'
                                },
                                {
                                    xtype: 'checkbox',
                                    ui: 'requests-input',
                                    userCls:'requests-radio-input',
                                    boxLabel:'All Day',
                                    bind: {
                                        //checked: ''
                                    },
                                    listeners: {
                                        //change: ''
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            userCls:'requests-fieldset',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'datefield',
                                    ui: 'requests-date-input',
                                    //name: 'start_date',
                                    label: 'End Date',
                                    // reference: 'viewDate',
                                    maxWidth:'125pt',
                                    picker: {
                                        xtype: 'datepicker',
                                        title: 'Select Date'
                                    },
                                    listeners: {
                                        //change: ''
                                    }
                                },
                                {
                                    xtype:'spacer',
                                    width:'20pt'
                                },
                                {
                                    xtype: 'spinnerfield',
                                    ui: 'requests-text-input',
                                    //flex: 1,
                                    style: 'padding-left: 4pt',
                                    name: 'request-end-hours',
                                    label: 'Hours',
                                    decimals: 0,
                                    minValue: 1,
                                    maxValue: 24,
                                    value:24,
                                    bind: {
                                        //value: '',
                                        //minValue: '',
                                        //maxValue: ''
                                    }
                                },
                                {
                                    xtype:'spacer',
                                    width:'20pt'
                                },
                                {
                                    xtype: 'checkbox',
                                    ui: 'requests-input',
                                    userCls:'requests-radio-input',
                                    boxLabel:'All Day',
                                    bind: {
                                        //checked: ''
                                    },
                                    listeners: {
                                        //change: ''
                                    }
                                },
                               
                            ]
                        },
                        {
                            xtype:'textareafield',
                            label:'Notes',
                            userCls:'requests-fieldset',
                            //flex:1,
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
                    layout: 'fit',
                    items:[
                        {
                            xtype:'container',
                            userCls:'requests-fieldset-input',
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
                                            text:'Day',
                                            dataIndex: 'text',
                                            flex: 1,
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text:'Percentage',
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


