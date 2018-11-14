/**
 * Super Admin Options Admin view
 * @class SAOptions
 * @namespace Breeze.view.admin.SAOptions
 * @alias widget.admin.saoptions
 */
Ext.define('Breeze.view.admin.SAOptions', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.saoptions',

    // View Model
    viewModel: {
        type: 'admin.punchpolicies'
    },

    // Controller
    controller: 'admin.punchpolicies',
    listeners: {
        initialize: 'onInit'
    },



    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',
    title: 'Super Admin Options',

    // Body contents
    items: [

        // Main horizontal arranging container
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            // +++ Allow h scroll when panel is too small +++
            scrollable:true,
            items: [

                // Column 1
                {
                    xtype: 'panel',
                    ui: 'admin-sub',
                    userCls:'admin-fieldset',
                    flex: 1,
                    // +++ fixed width +++
                    minWidth:'700pt',
                    maxWidth:'890pt',

                    minHeight:'450pt',
                    //maxHeight:'450pt',


                    layout: 'vbox',
                    buttonAlign: 'right',
                    buttons: {
                        apply: { text: 'Apply',  ui: 'action', style:'width:175pt;' },
                    },
                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false
                    },
                    items:[
                        {
                            xtype: 'container',
                            userCls:'admin-text',
                            layout: 'hbox',
                            userCls:'admin-fieldset no-border no-background no-margin no-padding',
                            items: [
                                {
                                    xtype: 'component',
                                    userCls: 'employeeinfo-label admin-label',
                                    html: 'Employee License [SEATS]',
                                },
                                {
                                    xtype:'spacer',
                                    width:'20pt',
                                },
                                {
                                    xtype: 'component',
                                    userCls: 'employeeinfo-label admin-label',
                                    html: 'Renewal Date [DATE]',
                                },
                                {
                                    xtype:'spacer',
                                    flex:1,
                                },
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            layout: {
                                animation: 'fade'
                            },
                            ui: 'wtr-tabbar',
                            userCls:'admin-fieldset no-border no-margin',
                            tabBar: {
                                defaultTabUI: 'wtr-tabbar',
                                shadow: false
                            },
                            flex: 1,
                            defaults: {
                                style:'background:transparent;',
                                userCls:'employeeinfo-shift-grid'
                            },
                            items: [
                                //========[Company Tab]===========
                                {
                                    title: 'Company',
                                    reference: 'compantTab',
                                    xtype: 'container',
                                    layout:'vbox',
                                    items:[
                                        {
                                            xtype: 'fieldset',
                                            userCls:'admin-fieldset no-margin no-border',
                                            flex:1,
                                            layout:'vbox',

                                            items:[
                                                // row 1
                                                {
                                                    xtype: 'container',
                                                    layout:'hbox',
                                                    items:[
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset no-side-margin no-border',
                                                            flex:1,
                                                            items:[]
                                                        },
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset no-border no-padding',
                                                            flex:1,
                                                            layout:'vbox',
                                                            defaults: {
                                                                ui: 'admin admin-text'
                                                            },
                                                            items:[
                                                                {
                                                                    xtype: 'breeze-textfield',
                                                                    label: 'Company Name',
                                                                    ui: 'admin admin-text',
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    label:'Fiscal Date',
                                                                    allowBlank: false,
                                                                    editable: false,
                                                                    displayField: 'Description',
                                                                    forceSelection: true,
                                                                    queryMode: 'local',
                                                                    valueField: 'ID'
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    label:'Home TimeZone',
                                                                    allowBlank: false,
                                                                    editable: false,
                                                                    displayField: 'Description',
                                                                    forceSelection: true,
                                                                    queryMode: 'local',
                                                                    valueField: 'ID'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                // row 2
                                                {
                                                    xtype: 'container',
                                                    layout:'hbox',
                                                    items:[
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset no-side-margin',
                                                            flex:1,
                                                            title:'Report Options',
                                                            items:[
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio1',
                                                                    value: '20',
                                                                    boxLabel: 'Company Logo in Report Header',
                                                                    bodyAlign: 'stretch',
                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio2',
                                                                    value: '20',
                                                                    boxLabel: 'Company Name in Report Title',
                                                                    bodyAlign: 'stretch',
                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio3',
                                                                    value: '20',
                                                                    boxLabel: 'Signature Lines in Report Footer',
                                                                    bodyAlign: 'stretch',
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset',
                                                            flex:1,
                                                            title:'Securety Options',
                                                            items:[
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio4',
                                                                    value: '20',
                                                                    boxLabel: 'Enforce Password Complexity',
                                                                    bodyAlign: 'stretch',
                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio5',
                                                                    value: '20',
                                                                    boxLabel: 'Disable SSN Field',
                                                                    bodyAlign: 'stretch',
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                    ]
                                },
                                //========[Accruals Tab]===========
                                {
                                    title: 'Accruals',
                                    reference: 'compantTab',
                                    xtype: 'container',
                                    layout:'vbox',
                                    items:[
                                        {
                                            xtype: 'fieldset',
                                            userCls:'admin-fieldset no-margin no-border',
                                            flex:1,
                                            layout:'vbox',

                                            // +++ fixed width +++
                                            width:'400pt',


                                            items:[
                                                // row 1
                                                {
                                                    xtype: 'container',
                                                    layout:'vbox',
                                                    items:[
                                                        
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset no-side-margin',
                                                            flex:1,
                                                            title:'Carry Over Options',
                                                            layout:'hbox',
                                                            
                                                            items:[
                                                                {
                                                                    xtype: 'container',
                                                                    flex:1,
                                                                    layout:'vbox',
                                                                    items:[
                                                                        {
                                                                            xtype: 'combobox',
                                                                            ui: 'admin admin-text',
                                                                            width:'160pt',
                                                                            label:'Carry Over Effective Year',
                                                                            allowBlank: false,
                                                                            editable: false,
                                                                            displayField: 'Description',
                                                                            forceSelection: true,
                                                                            queryMode: 'local',
                                                                            valueField: 'ID'

                                                                        },
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldset',
                                                                    flex:1,
                                                                    userCls:'admin-fieldset',
                                                                    title:'Carry Over Type',
                                                                    layout:'vbox',
                                                                    defaults: {
                                                                        bodyAlign: 'stretch',
                                                                        ui: 'admin',
                                                                        xtype: 'radio'
                                                                    },
                                                                    items:[
                                                                        {
                                                                            flex: 1,
                                                                            name: 'recording_year_type',
                                                                            boxLabel: 'Used Time Only',
                                                                        },
                                                                        {
                                                                            flex: 1,
                                                                            name: 'recording_year_type',
                                                                            boxLabel: 'Used and Negative Time',
                                                                        },
                                                                    ]
                                                                }                                                                
                                                            ]
                                                        }
                                                    ]
                                                },
                                                // row 2
                                                {
                                                    xtype: 'container',
                                                    layout:'vbox',
                                                    items:[
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset no-side-margin',
                                                            flex:1,
                                                            title:'Employee Options',
                                                            items:[
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    id: 'radio6',
                                                                    value: '20',
                                                                    boxLabel: 'Calculate Years of Service From Hire Date',
                                                                    bodyAlign: 'stretch',
                                                                },
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //========[Leave Requests Tab]===========
                                {
                                    title: 'Leave Requests',
                                    reference: 'compantTab',
                                    xtype: 'container',
                                    layout:'vbox',
                                    items:[
                                        
                                        {
                                            xtype: 'fieldset',
                                            userCls:'admin-fieldset no-border no-padding',

                                            layout: 'hbox',
                                            defaults: {
                                                userCls: 'employee-info-general-field',
                                                ui: 'employeeinfo-textfield'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    userCls: 'employeeinfo-label admin-label ',
                                                    html: 'Global Leave Request Conflict Limit',
                                                },
                                                {
                                                    xtype:'spacer',
                                                    width:'5pt'
                                                },
                                                {
                                                    xtype: 'spinnerfield',
                                                    name: 'auto_close_shift',
                                                    width:'75pt',
                                                    minValue: 0, maxValue: 24, value: 1,
                                                    //bind: { value: '{info.punchPolicy.Auto_Close_Shift}' }
                                                },
                                            ]
                                        },

                                        {
                                            xtype: 'fieldset',
                                            userCls:'admin-fieldset no-margin no-border',
                                            flex:1,
                                            layout:'vbox',
                                            items:[
                                                // row 1
                                                {
                                                    xtype: 'container',
                                                    layout:'hbox',
                                                    items:[
                                                        {
                                                            xtype: 'container',
                                                            layout:'vbox',
                                                            flex:1,
                                                            items:[
                                                                {
                                                                    xtype:'fieldset',
                                                                    userCls:'admin-fieldset no-side-margin',
                                                                    title:'Conflict Scope',
                                                                    defaults: {
                                                                        bodyAlign: 'stretch',
                                                                        ui: 'admin',
                                                                        xtype: 'radio'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            flex: 1,
                                                                            name: 'recording_year_type',
                                                                            boxLabel: 'Employee Department',
                                                                        },
                                                                        {
                                                                            flex: 1,
                                                                            name: 'recording_year_type',
                                                                            boxLabel: 'All Departments',
                                                                        },

                                                                    ]
                                                                },
                                                                {
                                                                    xtype:'fieldset',
                                                                    userCls:'admin-fieldset no-side-margin',
                                                                    title:'Approval Options',
                                                                    defaults: {
                                                                        bodyAlign: 'stretch',
                                                                        ui: 'admin',
                                                                        xtype: 'radio'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            flex: 1,
                                                                            name: 'recording_year_type',
                                                                            boxLabel: 'Instant',
                                                                        },
                                                                        {
                                                                            flex: 1,
                                                                            name: 'recording_year_type',
                                                                            boxLabel: 'Require Login',
                                                                        },

                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset',
                                                            title:'Approvial Models',
                                                            flex:1,
                                                            defaults: {
                                                                bodyAlign: 'stretch',
                                                                ui: 'admin',
                                                                xtype: 'radio'
                                                            },
                                                            items: [
                                                                {
                                                                    name: 'recording_year_type',
                                                                    boxLabel: 'All Supervisors',
                                                                },
                                                                {
                                                                    name: 'recording_year_type',
                                                                    boxLabel: 'Any Supervisor',
                                                                },
                                                                {
                                                                    name: 'recording_year_type',
                                                                    boxLabel: 'Any Super Admin',
                                                                },
                                                                {
                                                                    name: 'recording_year_type',
                                                                    boxLabel: 'First Supervisor',
                                                                },
                                                                {
                                                                    name: 'recording_year_type',
                                                                    boxLabel: 'Vote',
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset',
                                                            flex:1,
                                                            layout:'vbox',
                                                            title:'Cancellation Options',
                                                            defaults:{
                                                                ui: 'admin admin-text'
                                                            },          
                                                            items:[
                                                                
                                                                {
                                                                    xtype: 'combobox',
                                                                    label:'Pending Requests',
                                                                    allowBlank: false,
                                                                    editable: false,
                                                                    displayField: 'Description',
                                                                    forceSelection: true,
                                                                    queryMode: 'local',
                                                                    valueField: 'ID'
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    label:'Approved Requests - Future',
                                                                    allowBlank: false,
                                                                    editable: false,
                                                                    displayField: 'Description',
                                                                    forceSelection: true,
                                                                    queryMode: 'local',
                                                                    valueField: 'ID'
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    label:'Approved Requests - Past',
                                                                    allowBlank: false,
                                                                    editable: false,
                                                                    displayField: 'Description',
                                                                    forceSelection: true,
                                                                    queryMode: 'local',
                                                                    valueField: 'ID'
                                                                },
                                                                



                                                            ]
                                                        }
                                                        


                                                    ]
                                                },
                                                // row 2
                                                {
                                                    xtype: 'container',
                                                    layout:'hbox',
                                                    items:[
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset no-side-margin',
                                                            flex:1,
                                                            title:'Employee Options',
                                                            items:[
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio7',
                                                                    value: '20',
                                                                    boxLabel: 'Employees may not request leave exceeding their allowed time.',
                                                                    bodyAlign: 'stretch',
                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio8',
                                                                    value: '20',
                                                                    boxLabel: 'Employees may request leave in the past.',
                                                                    bodyAlign: 'stretch',
                                                                },
                                                            ]
                                                        },

                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset',
                                                            flex:1,
                                                            title:'Leave Response Notification Options',
                                                            items:[
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio9',
                                                                    value: '20',
                                                                    boxLabel: "Email Supervisors when their employees' requests have been approved.",
                                                                    bodyAlign: 'stretch',
                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio10',
                                                                    value: '20',
                                                                    boxLabel: "Email Supervisors when their employees' requests have been denied.",
                                                                    bodyAlign: 'stretch',
                                                                },
                                                            ]
                                                        }


                                                    ]
                                                },
                                                // row 3
                                                /*
                                                {
                                                    xtype: 'container',
                                                    layout:'vbox',
                                                    items:[
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset no-side-margin',
                                                            flex:1,
                                                            title:'Leave Response Notification Options',
                                                            items:[
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    id: 'radio9',
                                                                    value: '20',
                                                                    boxLabel: "Email Supervisors when their employees' requests have been approved.",
                                                                    bodyAlign: 'stretch',
                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    id: 'radio10',
                                                                    value: '20',
                                                                    boxLabel: "Email Supervisors when their employees' requests have been denied.",
                                                                    bodyAlign: 'stretch',
                                                                },
                                                            ]
                                                        }
                                                    ]
                                                }
                                                */

                                            ]
                                        }
                                    ]
                                },
                                //========[Points Tab]===========
                                {
                                    title: 'Points',
                                    reference: 'compantTab',
                                    xtype: 'container',
                                    layout:'vbox',
                                    items:[
                                        {
                                            xtype: 'fieldset',
                                            userCls:'admin-fieldset no-margin no-border',
                                            flex:1,
                                            // +++ fixed width +++
                                            width:'400pt',
                                            layout:'vbox',
                                            items:[
                                                {
                                                    xtype:'fieldset',
                                                    userCls:'admin-fieldset no-side-margin',
                                                    title:'Point Expiration Type',
                                                    defaults: {
                                                        bodyAlign: 'stretch',
                                                        ui: 'admin',
                                                        xtype: 'radio'
                                                    },
                                                    items: [
                                                        {
                                                            name: 'recording_year_type',
                                                            boxLabel: 'Expiration Date',
                                                        },
                                                        {
                                                            name: 'recording_year_type',
                                                            boxLabel: 'Rolling Expiration',
                                                        },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                                //========[Captions Tab]===========
                                {
                                    title: 'Captions',
                                    reference: 'compantTab',
                                    xtype: 'container',
                                    layout:'vbox',
                                    items:[
                                        {
                                            xtype: 'fieldset',
                                            userCls:'admin-fieldset no-margin no-border',
                                            flex:1,
                                            layout:'vbox',
                                            defaults: {
                                                ui: 'admin admin-text',
                                                width:'300pt'
                                            },
                                            items:[
                                                {
                                                    xtype: 'breeze-textfield',
                                                    label: 'Employee Number',
                                                    ui: 'admin admin-text',
                                                    valueField: 'ID'
                                                },
                                                {
                                                    xtype:'spacer',
                                                    height:'5pt'
                                                },
                                                {
                                                    xtype: 'breeze-textfield',
                                                    label: 'Project Singular',
                                                    ui: 'admin admin-text',
                                                    valueField: 'ID'
                                                },
                                                {
                                                    xtype:'spacer',
                                                    height:'5pt'
                                                },
                                                {
                                                    xtype: 'breeze-textfield',
                                                    label: 'Project Plural',
                                                    ui: 'admin admin-text',
                                                    valueField: 'ID'
                                                },
                                            ]
                                        }
                                    ]
                                },
                                //========[Punches Tab]===========
                                {
                                    title: 'Punches',
                                    reference: 'compantTab',
                                    xtype: 'container',
                                    layout:'vbox',
                                    items:[
                                        {
                                            xtype: 'fieldset',
                                            userCls:'admin-fieldset no-margin no-border',
                                            flex:1,
                                            layout:'vbox',

                                            defaults: {
                                                ui: 'admin admin-text',
                                                width:'300pt'
                                            },
                                            items:[
                                                {
                                                    xtype: 'combobox',
                                                    width:'160pt',
                                                    label:'Work week starts',
                                                    allowBlank: false,
                                                    editable: false,
                                                    displayField: 'Description',
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    valueField: 'ID'

                                                },
                                                {
                                                    xtype:'spacer',
                                                    height:'20pt'
                                                },
                                                {
                                                    xtype:'checkbox',
                                                    ui:'admin',
                                                    //name: 'isWorktime',
                                                    // id: 'radio11',
                                                    value: '20',
                                                    boxLabel: 'SA can Punch Station in Kiosk Mode',
                                                    bodyAlign: 'stretch',
                                                },

                                            ]
                                        }
                                    ]
                                },
                            ]
                        }       
                    ]
                },

            ]
        }
    ]
});