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
        type: 'admin.saoptions'
    },

    // Controller
    controller: 'admin.saoptions',
    listeners: {
        initialize: 'onInit'
    },



    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',
    title: 'Super Admin Options',

    buttonAlign: 'right',
    buttons: {
        apply: { text: 'Save',  ui: 'confirm alt', style:'width:175pt;' },
    },
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

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
                    // buttonAlign: 'right',
                    // buttons: {
                    //     apply: { text: 'Save',  ui: 'action', style:'width:175pt;' },
                    // },
                    // buttonToolbar: {
                    //     xtype: 'toolbar',
                    //     ui: 'admin-actions',
                    //     shadow: false
                    // },
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
                                    

                                    bind:{
                                        html: 'Employee License {ConfigInfo.EmployeesLicensed}'
                                    }

                                },
                                {
                                    xtype:'spacer',
                                    width:'20pt',
                                },
                                {
                                    xtype: 'component',
                                    userCls: 'employeeinfo-label admin-label',
                                    bind:{
                                        html: 'Renewal Date {CompanyInfo.renewal_date}'
                                    }
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
                                                                    bind:{
                                                                        value:'{ConfigInfo.CompanyName}'
                                                                    }

                                                                },
                                                                {
                                                                    xtype: 'datefield',
                                                                    //bodyAlign: 'stretch',
                                                                    ui: 'admin admin-text reporting-date',
                                                                    //name: 'Fiscal Date',
                                                                    label: 'Fiscal Date',
                                                                    picker: {
                                                                        xtype: 'datepicker',
                                                                        title: 'Fiscal Date'
                                                                    },
                                                                    bind:'{ConfigInfo.FiscDate}'
                                                                    
                                                                },
                                                                {
                                                                    xtype: 'selectfield',
                                                                    label:'Home TimeZone',                                                                    
                                                                    bind: {
                                                                        store: '{TimeZoneOptions}',
                                                                        value:'{ConfigInfo.TimeZone_ID}'
                                                                    },
                                                                    valueField: 'Timezone_id',
                                                                    displayField: 'description'
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
                                                            title:'Report Options',
                                                            items:[
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    boxLabel: 'Company Logo in Report Header',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{ConfigInfo.RepLogo}'
                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    boxLabel: 'Company Name in Report Title',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{ConfigInfo.RepComp}'
                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    boxLabel: 'Signature Lines in Report Footer',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{ConfigInfo.RepSignature}'
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
                                                                    bind: '{ConfigInfo.PasswordComplexity}'
                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio5',
                                                                    value: '20',
                                                                    boxLabel: 'Disable SSN Field',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{ConfigInfo.DisableSSN}'
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
                                    layout:'hbox',
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
                                                                            xtype: 'selectfield',
                                                                            bodyAlign: 'stretch',
                                                                            ui: 'admin admin-text admin-date',
                                                                            name: 'year',
                                                                            label: 'Carry Over Effective Year',
                                                                            labelWidth: 'auto',
                                                                            //labelAlign: 'left',
                                                                            store: 'Years',
                                                                            bind: { value: '{ConfigInfo.CarryYear}' },
                                                                            displayField: 'Year',
                                                                            valueField: 'Year',
                                                                        }
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
                                                                            value: 0,
                                                                            bind: {
                                                                                groupValue: '{ConfigInfo.RecMode}'
                                                                            }

                                                                        },
                                                                        {
                                                                            flex: 1,
                                                                            name: 'recording_year_type',
                                                                            boxLabel: 'Used and Negative Time',
                                                                            value:  1,
                                                                            bind: {
                                                                                groupValue: '{ConfigInfo.RecMode}'
                                                                            }
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
                                                            title:'Accrual Cap Options',
                                                            defaults: {
                                                                bodyAlign: 'stretch',
                                                                ui: 'admin',
                                                                xtype: 'radio'
                                                            },
                                                            items:[
                                                                {
                                                                    flex: 1,
                                                                    name: 'Accrual_Cap_Option',
                                                                    boxLabel: 'Skip accrual that would exceed cap',
                                                                    value: 0,
                                                                    bind: {
                                                                        groupValue: '{ConfigInfo.AccrualCapOption}'
                                                                    }

                                                                },
                                                                {
                                                                    flex: 1,
                                                                    name: 'Accrual_Cap_Option',
                                                                    boxLabel: 'Allow accrual that would exceed cap',
                                                                    value: 1,
                                                                    bind: {
                                                                        groupValue: '{ConfigInfo.AccrualCapOption}'
                                                                    }
                                                                },
                                                                {
                                                                    flex: 1,
                                                                    name: 'Accrual_Cap_Option',
                                                                    boxLabel: 'Prorate accrual that would exceed cap',
                                                                    value: 2,
                                                                    bind: {
                                                                        groupValue: '{ConfigInfo.AccrualCapOption}'
                                                                    }
                                                                }
                                                            ]
                                                        },

                                                    ]
                                                }
                                            ]
                                        },
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
                                                            title:'Balance Cap Option',
                                                            items:[
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    //name: 'isWorktime',
                                                                    id: 'radio6',
                                                                    value: '20',
                                                                    boxLabel: 'Suppress Accrual Caps when applying Balance Caps',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{ConfigInfo.BalanceCapOption}'
                                                                },
                                                            ]
                                                        },
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
                                                                    id: 'radio7',
                                                                    value: '20',
                                                                    boxLabel: 'Calculate Years of Service From Hire Date',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{ConfigInfo.HireDateYOS}'
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
                                                    minValue: 0, 
                                                    bind: { value: '{ConfigInfo.ConflictLimit}' }
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
                                                                            name: 'ConflictOpt',
                                                                            boxLabel: 'Employee Department',
                                                                            value: 0,
                                                                            bind: {
                                                                                groupValue: '{ConfigInfo.ConflictOpt}'
                                                                            }
                                                                        },
                                                                        {
                                                                            flex: 1,
                                                                            name: 'ConflictOpt',
                                                                            boxLabel: 'All Departments',
                                                                            value: 1,
                                                                            bind: {
                                                                                groupValue: '{ConfigInfo.ConflictOpt}'
                                                                            }
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
                                                                            name: 'LeaveApproveOpt',
                                                                            boxLabel: 'Instant',
                                                                            value: 0,
                                                                            bind: {
                                                                                groupValue: '{ConfigInfo.LeaveApproveOpt}'
                                                                            }
                                                                        },
                                                                        {
                                                                            flex: 1,
                                                                            name: 'LeaveApproveOpt',
                                                                            boxLabel: 'Require Login',
                                                                            value: 1,
                                                                            bind: {
                                                                                groupValue: '{ConfigInfo.LeaveApproveOpt}'
                                                                            }
                                                                        },

                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype:'fieldset',
                                                            userCls:'admin-fieldset',
                                                            title:'Approval Models',
                                                            flex:1,
                                                            defaults: {
                                                                bodyAlign: 'stretch',
                                                                ui: 'admin',
                                                                xtype: 'radio'
                                                            },
                                                            items: [
                                                                {
                                                                    name: 'LeaveApproveMode',
                                                                    boxLabel: 'All Supervisors',
                                                                    value:122,
                                                                    bind: {
                                                                        groupValue: '{ConfigInfo.LeaveApproveMode}'
                                                                    }
                                                                },
                                                                {
                                                                    name: 'LeaveApproveMode',
                                                                    boxLabel: 'Any Supervisor',
                                                                    value:120,
                                                                    bind: {
                                                                        groupValue: '{ConfigInfo.LeaveApproveMode}'
                                                                    }
                                                                },
                                                                {
                                                                    name: 'LeaveApproveMode',
                                                                    boxLabel: 'Any Super Admin',
                                                                    value:121,
                                                                    bind: {
                                                                        groupValue: '{ConfigInfo.LeaveApproveMode}'
                                                                    }
                                                                },
                                                                {
                                                                    name: 'LeaveApproveMode',
                                                                    boxLabel: 'First Supervisor',
                                                                    value:130,
                                                                    bind: {
                                                                        groupValue: '{ConfigInfo.LeaveApproveMode}'
                                                                    }
                                                                },
                                                                {
                                                                    name: 'LeaveApproveMode',
                                                                    boxLabel: 'Vote',
                                                                    value:123,
                                                                    bind: {
                                                                        groupValue: '{ConfigInfo.LeaveApproveMode}'
                                                                    }
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
                                                                    xtype: 'selectfield',
                                                                    label:'Pending Requests',
                                                                    bind: {
                                                                        store: '{pendingCancellationStore}',
                                                                        value:'{ConfigInfo.CancelLeavePending}'
                                                                    },
                                                                    valueField: 'Code',
                                                                    displayField: 'Description'
                                                                },
                                                                {
                                                                    xtype: 'selectfield',
                                                                    label:'Approved Requests - Future',
                                                                    bind: {
                                                                        store: '{CancellationStore}',
                                                                        value:'{ConfigInfo.CancelLeaveNotTaken}'
                                                                    },
                                                                    valueField: 'Code',
                                                                    displayField: 'Description'
                                                                },
                                                                {
                                                                    xtype: 'selectfield',
                                                                    label:'Approved Requests - Past',
                                                                    bind: {
                                                                        store: '{CancellationStore}',
                                                                        value:'{ConfigInfo.CancelLeaveAfterTaken}'
                                                                    },
                                                                    valueField: 'Code',
                                                                    displayField: 'Description'
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
                                                                    boxLabel: 'Employees may not request leave exceeding their allowed time.',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{ConfigInfo.EnforceAllowed}'

                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    boxLabel: 'Employees may request leave in the past.',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{ConfigInfo.RequestLeaveInPast}'
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
                                                                    boxLabel: "Email Supervisors when their employees' requests have been approved.",
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{ConfigInfo.LeaveApprovalEmailSupervisor}',
                                                                },
                                                                {
                                                                    xtype:'checkbox',
                                                                    ui:'admin',
                                                                    boxLabel: "Email Supervisors when their employees' requests have been denied.",
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{ConfigInfo.LeaveDenialEmailSupervisor}',
                                                                },
                                                            ]
                                                        }
                                                    ]
                                                },
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
                                                        xtype: 'radio',
                                                    },
                                                    items: [
                                                        {
                                                            name: 'PointExpirationType',
                                                            boxLabel: 'Expiration Date',
                                                            value:134,
                                                            bind: {
                                                                groupValue: '{ConfigInfo.PointExpirationType}'
                                                            }
                                                            /* +++ hide rolling_options +++ */
                                                        },
                                                        {
                                                            name: 'PointExpirationType',
                                                            boxLabel: 'Rolling Expiration',
                                                            value:135,
                                                            bind: {
                                                                groupValue: '{ConfigInfo.PointExpirationType}'
                                                            }
                                                            /* +++ show rolling_options +++ */
                                                        },
                                                        {
                                                            
                                                            /* +++ show / hide based on radio selection above. 134 = show +++ */
                                                            xtype:'container',
                                                            name: 'rolling_options',
                                                            layout:'hbox',
                                                            defaults: {
                                                                ui: 'admin admin-text'
                                                            },
                                                            items:[
                                                                {
                                                                    xtype: 'spinnerfield',
                                                                    flex: 1,
                                                                    style: 'padding-left: 4pt',
                                                                    decimals: 0,
                                                                    minValue: 0,
                                                                    //bind: {
                                                                    //    value: '{ConfigInfo.PointRollingDuration}' /* PointRollingDuration.split(',')[0] */
                                                                    //}
                                                                },
                                                                {
                                                                    xtype: 'spacer',
                                                                    width: '10pt'
                                                                },
                                                                {
                                                                    xtype: 'selectfield',
                                                                    flex: 2,
                                                                    displayField: 'Description',
                                                                    valueField: 'ID',
                                                                    bind: {
                                                                        store: '{OptionList}',
                                                                        //value:'{ConfigInfo.PointRollingDuration}' /* PointRollingDuration.split(',')[1] */
                                                                    },

                                                                },
                                                            ]
                                                        }
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
                                                    valueField: 'ID',
                                                    bind:{
                                                        value:'{ConfigInfo.Captions.EmployeeNumber}'
                                                    }
                                                },
                                                {
                                                    xtype:'spacer',
                                                    height:'5pt'
                                                },
                                                {
                                                    xtype: 'breeze-textfield',
                                                    label: 'Project Singular',
                                                    ui: 'admin admin-text',
                                                    valueField: 'ID',
                                                    bind:{
                                                        value:'{ConfigInfo.Captions.ProjectSingle}'
                                                    }
                                                },
                                                {
                                                    xtype:'spacer',
                                                    height:'5pt'
                                                },
                                                {
                                                    xtype: 'breeze-textfield',
                                                    label: 'Project Plural',
                                                    ui: 'admin admin-text',
                                                    valueField: 'ID',
                                                    bind:{
                                                        value:'{ConfigInfo.Captions.ProjectPlural}'
                                                    }
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
                                                    xtype: 'selectfield',
                                                    label:'Work week starts',
                                                    labelAlign: 'left',
                                                    labelWidth: 'auto',

                                                    displayField: 'value',
                                                    valueField: 'id',
                                                    bind: {
                                                        store: '{daysOfWeek}',
                                                        value:'{ConfigInfo.StartOfWeek}' /* PointRollingDuration.split(',')[1] */
                                                    },
                                                },

                                                
                                                {
                                                    xtype:'spacer',
                                                    height:'20pt'
                                                },
                                                            
                                                {
                                                    xtype: 'breeze-textfield',
                                                    label: 'Export Code',
                                                    labelAlign: 'left',
                                                    ui: 'admin admin-text',
                                                    bind:{
                                                        value:'{ConfigInfo.ExportCode}'
                                                    }
                                                },
                                                {
                                                    xtype:'spacer',
                                                    height:'20pt'
                                                },
                                                {
                                                    xtype:'checkbox',
                                                    ui:'admin',
                                                    boxLabel: 'SA can Punch Station in Kiosk Mode',
                                                    bodyAlign: 'stretch',
                                                    bind: '{ConfigInfo.SAKioskMode}',
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