/**
 * Super Admin Options Admin view
 * @class SAOptions
 * @namespace Breeze.view.admin.SAOptions
 * @alias widget.admin.saoptions
 */
Ext.define('Breeze.view.admin.SAOptions', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.saoptions',

    config: {
        crumbTitle: 'Super Admin Options'
    },

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
        apply: { text: 'Save', ui: 'confirm alt', style: 'width:175pt;' },
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
            scrollable: true,
            items: [

                // Column 1
                {
                    xtype: 'panel',
                    ui: 'admin-sub',
                    userCls: 'admin-fieldset',
                    flex: 1,
                    // +++ fixed width +++
                    minWidth: '700pt',
                    maxWidth: '890pt',

                    minHeight: '450pt',
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
                    items: [
                        {
                            xtype: 'container',
                            userCls: 'admin-text',
                            layout: 'hbox',
                            userCls: 'admin-fieldset no-border no-background no-margin no-padding',
                            items: [
                                {
                                    xtype: 'component',
                                    userCls: 'employeeinfo-label admin-label',


                                    bind: {
                                        html: 'Employee License {configData.EmployeesLicensed}'
                                    }

                                },
                                {
                                    xtype: 'spacer',
                                    width: '20pt',
                                },
                                {
                                    xtype: 'component',
                                    userCls: 'employeeinfo-label admin-label',
                                    bind: {
                                        html: 'Renewal Date {customerData.renewal_date}'
                                    }
                                },
                                {
                                    xtype: 'spacer',
                                    flex: 1,
                                },
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            reference: 'saTabs',
                            layout: {
                                animation: 'fade'
                            },
                            ui: 'wtr-tabbar',
                            userCls: 'admin-fieldset no-border no-margin',
                            tabBar: {
                                defaultTabUI: 'wtr-tabbar',
                                shadow: false
                            },
                            flex: 1,
                            defaults: {
                                style: 'background:transparent;',
                                userCls: 'employeeinfo-shift-grid'
                            },
                            items: [
                                //========[Company Tab]===========
                                {
                                    title: 'Company',
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'admin-fieldset no-margin no-border',
                                            flex: 1,
                                            layout: 'vbox',

                                            items: [
                                                // row 1
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [

                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset no-side-margin',
                                                            height: '150pt',
                                                            flex: 1,
                                                            layout: 'vbox',
                                                            title: 'Company Logo',
                                                            layout: 'vbox',
                                                            items: [

                                                                {
                                                                    xtype: 'image',
                                                                    //ui: 'admin admin-text',
                                                                    flex: 1,
                                                                    bind: {
                                                                        src: '{info.Photo}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'filefield',
                                                                    ui: 'admin admin-text',
                                                                    name: 'photo_upload',
                                                                    accept: 'image/*',
                                                                    reference: 'pictureFileField',
                                                                    itemId: 'imageFile',
                                                                    label: 'Picture File',
                                                                    //ui: 'employeeinfo-dialog-field'
                                                                }
                                                            ]



                                                        },
                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset no-border no-padding',
                                                            flex: 1,
                                                            layout: 'vbox',
                                                            defaults: {
                                                                ui: 'admin admin-text'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'breeze-textfield',
                                                                    label: 'Company Name',
                                                                    ui: 'admin admin-text',
                                                                    bind: {
                                                                        value: '{configData.CompanyName}'
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
                                                                    bind: '{configData.FiscDate}'

                                                                },
                                                                {
                                                                    xtype: 'selectfield',
                                                                    label: 'Home TimeZone',
                                                                    bind: {
                                                                        store: '{timeZones}',
                                                                        value: '{configData.TimeZone_ID}'
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
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset no-side-margin',
                                                            flex: 1,
                                                            title: 'Report Options',
                                                            items: [
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    boxLabel: 'Company Logo in Report Header',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.RepLogo}'
                                                                },
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    boxLabel: 'Company Name in Report Title',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.RepComp}'
                                                                },
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    boxLabel: 'Signature Lines in Report Footer',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.RepSignature}'
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset',
                                                            flex: 1,
                                                            title: 'Securety Options',
                                                            items: [
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio4',
                                                                    value: '20',
                                                                    boxLabel: 'Enforce Password Complexity',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.PasswordComplexity}'
                                                                },
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    //name: 'isWorktime',
                                                                    //id: 'radio5',
                                                                    value: '20',
                                                                    boxLabel: 'Disable SSN Field',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.DisableSSN}'
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
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'admin-fieldset no-margin no-border',
                                            flex: 1,
                                            layout: 'vbox',

                                            // +++ fixed width +++
                                            width: '400pt',


                                            items: [
                                                // row 1
                                                {
                                                    xtype: 'container',
                                                    layout: 'vbox',
                                                    items: [

                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset no-side-margin',
                                                            flex: 1,
                                                            title: 'Carry Over Options',
                                                            layout: 'hbox',

                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    flex: 1,
                                                                    layout: 'vbox',
                                                                    items: [
                                                                        {
                                                                            xtype: 'selectfield',
                                                                            bodyAlign: 'stretch',
                                                                            ui: 'admin admin-text admin-date',
                                                                            name: 'year',
                                                                            label: 'Carry Over Effective Year',
                                                                            labelWidth: 'auto',
                                                                            //labelAlign: 'left',
                                                                            store: 'Years',
                                                                            bind: { value: '{configData.CarryYear}' },
                                                                            displayField: 'Year',
                                                                            valueField: 'Year',
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldset',
                                                                    flex: 1,
                                                                    userCls: 'admin-fieldset',
                                                                    title: 'Carry Over Type',
                                                                    layout: 'vbox',
                                                                    items: [
                                                                        {
                                                                            xtype: 'containerfield',
                                                                            layout: 'vbox',
                                                                            reference: 'recModeGroup',
                                                                            bind: {
                                                                                values: {
                                                                                    recMode: '{configData.RecMode}'
                                                                                }
                                                                            },
                                                                            defaults: {
                                                                                bodyAlign: 'stretch',
                                                                                ui: 'admin',
                                                                                xtype: 'radio'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    flex: 1,
                                                                                    name: 'recMode',
                                                                                    boxLabel: 'Used Time Only',
                                                                                    value: 0,
                                                                                    bind: {
                                                                                        groupValue: '{recModeGroup.recMode}'
                                                                                    }

                                                                                },
                                                                                {
                                                                                    flex: 1,
                                                                                    name: 'recMode',
                                                                                    boxLabel: 'Used and Negative Time',
                                                                                    value: 1,
                                                                                    bind: {
                                                                                        groupValue: '{recModeGroup.recMode}'
                                                                                    }
                                                                                },
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                // row 2
                                                {
                                                    xtype: 'container',
                                                    layout: 'vbox',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset no-side-margin',
                                                            flex: 1,
                                                            title: 'Accrual Cap Options',
                                                            items: [
                                                                {
                                                                    xtypo: 'containerfield',
                                                                    layout: 'vbox',
                                                                    defaults: {
                                                                        bodyAlign: 'stretch',
                                                                        ui: 'admin',
                                                                        xtype: 'radio'
                                                                    },
                                                                    reference: 'accrualCapOption',
                                                                    bind: {
                                                                        values: {
                                                                            accrualCap: '{configData.AccrualCapOption}'
                                                                        }
                                                                    },
                                                                    items: [
                                                                        {
                                                                            flex: 1,
                                                                            name: 'accrualCap',
                                                                            boxLabel: 'Skip accrual that would exceed cap',
                                                                            value: 0,
                                                                            bind: {
                                                                                groupValue: '{accrualCapOption.accruaCap}'
                                                                            }

                                                                        },
                                                                        {
                                                                            flex: 1,
                                                                            name: 'accrualCap',
                                                                            boxLabel: 'Allow accrual that would exceed cap',
                                                                            value: 1,
                                                                            bind: {
                                                                                groupValue: '{accrualCapOption.accruaCap}'
                                                                            }
                                                                        },
                                                                        {
                                                                            flex: 1,
                                                                            name: 'accrualCap',
                                                                            boxLabel: 'Prorate accrual that would exceed cap',
                                                                            value: 2,
                                                                            bind: {
                                                                                groupValue: '{accrualCapOption.accruaCap}'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },

                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'admin-fieldset no-margin no-border',
                                            flex: 1,
                                            layout: 'vbox',

                                            // +++ fixed width +++
                                            width: '400pt',


                                            items: [
                                                // row 1
                                                {
                                                    xtype: 'container',
                                                    layout: 'vbox',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset no-side-margin',
                                                            flex: 1,
                                                            title: 'Balance Cap Option',
                                                            items: [
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    //name: 'isWorktime',
                                                                    // id: 'radio6',
                                                                    value: '20',
                                                                    boxLabel: 'Suppress Accrual Caps when applying Balance Caps',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.BalanceCapOption}'
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset no-side-margin',
                                                            flex: 1,
                                                            title: 'Employee Options',
                                                            items: [
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    //name: 'isWorktime',
                                                                    // id: 'radio7',
                                                                    value: '20',
                                                                    boxLabel: 'Calculate Years of Service From Hire Date',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.HireDateYOS}'
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
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: [

                                        {
                                            xtype: 'fieldset',
                                            userCls: 'admin-fieldset no-border no-padding',

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
                                                    xtype: 'spacer',
                                                    width: '5pt'
                                                },
                                                {
                                                    xtype: 'spinnerfield',
                                                    name: 'auto_close_shift',
                                                    width: '75pt',
                                                    minValue: 0,
                                                    bind: { value: '{configData.ConflictLimit}' }
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'admin-fieldset no-margin no-border',
                                            flex: 1,
                                            layout: 'vbox',
                                            items: [
                                                // row 1
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'vbox',
                                                            flex: 1,
                                                            items: [
                                                                {
                                                                    xtype: 'fieldset',
                                                                    userCls: 'admin-fieldset no-side-margin',
                                                                    title: 'Conflict Scope',
                                                                    items: [
                                                                        {
                                                                            xtype: 'containerfield',
                                                                            layout: 'vbox',
                                                                            defaults: {
                                                                                bodyAlign: 'stretch',
                                                                                ui: 'admin',
                                                                                xtype: 'radio'
                                                                            },
                                                                            reference: 'conflictScope',
                                                                            bind: {
                                                                                values: {
                                                                                    conflictOpt: '{configData.ConflictOpt}'
                                                                                }
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    flex: 1,
                                                                                    name: 'conflictOpt',
                                                                                    boxLabel: 'Employee Department',
                                                                                    value: 0,
                                                                                    bind: {
                                                                                        groupValue: '{conflictScope.conflictOpt}'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    flex: 1,
                                                                                    name: 'conflictOpt',
                                                                                    boxLabel: 'All Departments',
                                                                                    value: 1,
                                                                                    bind: {
                                                                                        groupValue: '{conflictScope.conflictOpt}'
                                                                                    }
                                                                                },

                                                                            ]
                                                                        },
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldset',
                                                                    userCls: 'admin-fieldset no-side-margin',
                                                                    title: 'Approval Options',
                                                                    items: [
                                                                        {
                                                                            xtype: 'containerfield',
                                                                            layout: 'vbox',
                                                                            defaults: {
                                                                                bodyAlign: 'stretch',
                                                                                ui: 'admin',
                                                                                xtype: 'radio'
                                                                            },
                                                                            reference: 'appOpt',
                                                                            bind: {
                                                                                values: {
                                                                                    leaveApprove: '{configData.LeaveApproveOpt}'
                                                                                }
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    flex: 1,
                                                                                    name: 'leaveApprove',
                                                                                    boxLabel: 'Instant',
                                                                                    value: 0,
                                                                                    bind: {
                                                                                        groupValue: '{appOpt.leaveApprove}'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    flex: 1,
                                                                                    name: 'leaveApprove',
                                                                                    boxLabel: 'Require Login',
                                                                                    value: 1,
                                                                                    bind: {
                                                                                        groupValue: '{appOpt.leaveApprove}'
                                                                                    }
                                                                                },

                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset',
                                                            title: 'Approval Models',
                                                            flex: 1,
                                                            items: [
                                                                {
                                                                    xtype: 'containerfield',
                                                                    layout: 'vbox',
                                                                    defaults: {
                                                                        bodyAlign: 'stretch',
                                                                        ui: 'admin',
                                                                        xtype: 'radio'
                                                                    },
                                                                    reference: 'appMode',
                                                                    bind: {
                                                                        values: {
                                                                            leaveMode: '{configData.LeaveApprovMode}'
                                                                        }
                                                                    },
                                                                    items: [
                                                                        {
                                                                            name: 'leaveMode',
                                                                            boxLabel: 'All Supervisors',
                                                                            value: 122,
                                                                            bind: {
                                                                                groupValue: '{appMode.leaveMode}'
                                                                            }
                                                                        },
                                                                        {
                                                                            name: 'leaveMode',
                                                                            boxLabel: 'Any Supervisor',
                                                                            value: 120,
                                                                            bind: {
                                                                                groupValue: '{appMode.leaveMode}'
                                                                            }
                                                                        },
                                                                        {
                                                                            name: 'leaveMode',
                                                                            boxLabel: 'Any Super Admin',
                                                                            value: 121,
                                                                            bind: {
                                                                                groupValue: '{appMode.leaveMode}'
                                                                            }
                                                                        },
                                                                        {
                                                                            name: 'leaveMode',
                                                                            boxLabel: 'First Supervisor',
                                                                            value: 130,
                                                                            bind: {
                                                                                groupValue: '{appMode.leaveMode}'
                                                                            }
                                                                        },
                                                                        {
                                                                            name: 'leaveMode',
                                                                            boxLabel: 'Vote',
                                                                            value: 123,
                                                                            bind: {
                                                                                groupValue: '{appMode.leaveMode}'
                                                                            }
                                                                        },
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset',
                                                            flex: 1,
                                                            layout: 'vbox',
                                                            title: 'Cancellation Options',
                                                            defaults: {
                                                                ui: 'admin admin-text'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'selectfield',
                                                                    label: 'Pending Requests',
                                                                    bind: {
                                                                        store: '{pendingCancellationStore}',
                                                                        value: '{configData.CancelLeavePending}'
                                                                    },
                                                                    valueField: 'Code',
                                                                    displayField: 'Description'
                                                                },
                                                                {
                                                                    xtype: 'selectfield',
                                                                    label: 'Approved Requests - Future',
                                                                    bind: {
                                                                        store: '{CancellationStore}',
                                                                        value: '{configData.CancelLeaveNotTaken}'
                                                                    },
                                                                    valueField: 'Code',
                                                                    displayField: 'Description'
                                                                },
                                                                {
                                                                    xtype: 'selectfield',
                                                                    label: 'Approved Requests - Past',
                                                                    bind: {
                                                                        store: '{CancellationStore}',
                                                                        value: '{configData.CancelLeaveAfterTaken}'
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
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset no-side-margin',
                                                            flex: 1,
                                                            title: 'Employee Options',
                                                            items: [
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    boxLabel: 'Employees may not request leave exceeding their allowed time.',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.EnforceAllowed}'

                                                                },
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    boxLabel: 'Employees may request leave in the past.',
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.RequestLeaveInPast}'
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldset',
                                                            userCls: 'admin-fieldset',
                                                            flex: 1,
                                                            title: 'Leave Response Notification Options',
                                                            items: [
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    boxLabel: "Email Supervisors when their employees' requests have been approved.",
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.LeaveApprovalEmailSupervisor}',
                                                                },
                                                                {
                                                                    xtype: 'checkbox',
                                                                    ui: 'admin',
                                                                    boxLabel: "Email Supervisors when their employees' requests have been denied.",
                                                                    bodyAlign: 'stretch',
                                                                    bind: '{configData.LeaveDenialEmailSupervisor}',
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
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'admin-fieldset no-margin no-border',
                                            flex: 1,
                                            // +++ fixed width +++
                                            width: '400pt',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    userCls: 'admin-fieldset no-side-margin',
                                                    title: 'Point Expiration Type',
                                                    items: [


                                                        {
                                                            xtype: 'containerfield',
                                                            layout: 'vbox',
                                                            itemId: 'PointExpirationType',
                                                            reference: 'PointExpirationType',
                                                            bind: {
                                                                values: {
                                                                    expirationType: '{configData.PointExpirationType}'
                                                                }
                                                            },
                                                            defaults: {
                                                                bodyAlign: 'stretch',
                                                                ui: 'admin',
                                                                xtype: 'radio',
                                                            },
                                                            items: [
                                                                {
                                                                    name: 'expirationType',
                                                                    boxLabel: 'Expiration Date',
                                                                    value: 134,
                                                                    bind: {
                                                                        groupValue: '{PointExpirationType.expirationType}'
                                                                    }
                                                                    /* +++ hide rolling_options +++ */
                                                                },
                                                                {
                                                                    name: 'expirationType',
                                                                    boxLabel: 'Rolling Expiration',
                                                                    reference: 'rollingOptionRadio',
                                                                    value: 135,
                                                                    bind: {
                                                                        groupValue: '{PointExpirationType.expirationType}'
                                                                    }
                                                                    /* +++ show rolling_options +++ */
                                                                },
                                                            ]
                                                        },
                                                        {

                                                            /* +++ show / hide based on radio selection above. 135 = show +++ */
                                                            xtype: 'container',
                                                            name: 'rolling_options',
                                                            layout: 'hbox',
                                                            hidden: true,
                                                            bind: {
                                                                hidden: '{!rollingOptionRadio.checked}'
                                                            },
                                                            defaults: {
                                                                ui: 'admin admin-text'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'spinnerfield',
                                                                    flex: 1,
                                                                    style: 'padding-left: 4pt',
                                                                    decimals: 0,
                                                                    minValue: 0,
                                                                    //bind: {
                                                                    //    value: '{configData.PointRollingDuration}' /* PointRollingDuration.split(',')[0] */
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
                                                                        //value:'{configData.PointRollingDuration}' /* PointRollingDuration.split(',')[1] */
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
                                    itemId: 'captionsTab',
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'admin-fieldset no-margin no-border',
                                            flex: 1,
                                            layout: 'vbox',
                                            defaults: {
                                                ui: 'admin admin-text',
                                                width: '300pt'
                                            },
                                            items: [
                                                {
                                                    xtype: 'breeze-textfield',
                                                    label: 'Employee Number',
                                                    ui: 'admin admin-text',
                                                    valueField: 'ID',
                                                    bind: {
                                                        value: '{configData.Captions.EmployeeNumber}'
                                                    }
                                                },
                                                {
                                                    xtype: 'spacer',
                                                    height: '5pt'
                                                },
                                                {
                                                    xtype: 'breeze-textfield',
                                                    label: 'Project Singular',
                                                    ui: 'admin admin-text',
                                                    valueField: 'ID',
                                                    bind: {
                                                        value: '{configData.Captions.ProjectSingle}'
                                                    }
                                                },
                                                {
                                                    xtype: 'spacer',
                                                    height: '5pt'
                                                },
                                                {
                                                    xtype: 'breeze-textfield',
                                                    label: 'Project Plural',
                                                    ui: 'admin admin-text',
                                                    valueField: 'ID',
                                                    bind: {
                                                        value: '{configData.Captions.ProjectPlural}'
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
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'admin-fieldset no-margin no-border',
                                            flex: 1,
                                            layout: 'vbox',

                                            defaults: {
                                                ui: 'admin admin-text',
                                                width: '300pt'
                                            },
                                            items: [


                                                {
                                                    xtype: 'selectfield',
                                                    label: 'Work week starts',
                                                    labelAlign: 'left',
                                                    labelWidth: 'auto',

                                                    displayField: 'value',
                                                    valueField: 'id',
                                                    bind: {
                                                        store: '{daysOfWeek}',
                                                        value: '{configData.StartOfWeek}' /* PointRollingDuration.split(',')[1] */
                                                    },
                                                },


                                                {
                                                    xtype: 'spacer',
                                                    height: '20pt'
                                                },

                                                {
                                                    xtype: 'breeze-textfield',
                                                    label: 'Export Code',
                                                    labelAlign: 'left',
                                                    ui: 'admin admin-text',
                                                    bind: {
                                                        value: '{configData.ExportCode}'
                                                    }
                                                },
                                                {
                                                    xtype: 'spacer',
                                                    height: '20pt'
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    ui: 'admin',
                                                    boxLabel: 'SA can Punch Station in Kiosk Mode',
                                                    bodyAlign: 'stretch',
                                                    bind: '{configData.SAKioskMode}',
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