/**
 * PunchPolicies Admin view
 * @class PunchPolicies
 * @namespace Breeze.view.admin.PunchPolicies
 * @alias widget.admin.punchpolicies
 */
Ext.define('Breeze.view.admin.PunchPolicies', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.punchpolicies',

    config: {
        crumbTitle: 'Punch Policies'
    },

    // View Model
    viewModel: {
        type: 'admin.punchpolicies'
    },

    // Controller
    controller: 'admin.punchpolicies',
    listeners: {
        initialize: 'onInit'
    },

    chooseTemplateDialog: {
        xtype: 'dialog',
        title: 'Add Policy'

    },

    applyToEmployeesDialog: {
        xtype: 'dialog',
        bind: {
            title: 'Apply {policyData.policy_name}'
        }
    },

    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',
    title: 'Punch Policies',



    // Body contents
    items: [

        // Main horizontal arranging container
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            // +++ Allow h scroll when panel is too small +++
            scrollable: 'x',
            items: [

                // Column 1
                {
                    xtype: 'fieldset',
                    userCls: 'admin-fieldset no-padding',
                    flex: 1,
                    // +++ fixed width +++
                    minWidth: '200pt',
                    maxWidth: '200pt',
                    layout: 'vbox',


                    items: [
                        {
                            xtype: 'toolbar',
                            ui: 'admin-tree',
                            shadow: false,

                            items: [

                                {
                                    xtype: 'component',
                                    html: 'Punch Policies',
                                    userCls: 'admin-title-toolbar',
                                },

                                {
                                    xtype: 'spacer',
                                    flex: 1,

                                },

                                {
                                    xtype: 'button',
                                    //text: 'Save for Future Use',
                                    iconCls: 'x-fas fa-plus',
                                    ui: 'plain wtr-button',
                                },

                                {
                                    xtype: 'button',
                                    //text: 'Save for Future Use',
                                    iconCls: 'x-fas fa-minus',
                                    ui: 'plain wtr-button',

                                },
                            ]
                        },

                        {
                            xtype: 'breeze-select-list',
                            ui: 'admin-shift-grid',
                            flex: 1,
                            reference: 'policyList',
                            userCls: 'admin-fieldset no-background no-margin no-border',
                            fieldMode: 'none',
                            itemConfig: {
                                ui: 'admin-list-item-select',
                                templates: {
                                    radioValue: '{record.policy_id}',
                                    itemData: { name: '{record.policy_name}' },
                                    itemTpl: '{name}'
                                },
                            },
                            bind: {
                                store: '{policies}',
                            },
                            listeners: {
                                select: 'onPolicySelect',
                            },
                            viewModel: true
                        },
                    ]
                },

                // Column 2
                {
                    xtype: 'panel',
                    ui: 'admin-sub',
                    userCls: 'admin-fieldset',
                    flex: 2,
                    // +++ fixed width +++
                    maxWidth: '600pt',
                    minWidth: '500pt',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'breeze-textfield',
                            label: 'Name',
                            ui: 'admin admin-text',
                            userCls: 'admin-fieldset no-border',
                            bind: '{policyData.policy_name}'
                        },
                        {
                            xtype: 'tabpanel',
                            /* +++ New layout:{}, +++ */
                            layout: {
                                animation: 'fade'
                            },
                            /* +++ Update to ui: +++ */
                            ui: 'wtr-tabbar',
                            userCls: 'admin-fieldset no-border',

                            /* +++ New tabBar:{}, +++ */
                            tabBar: {
                                defaultTabUI: 'wtr-tabbar',
                                shadow: false
                            },
                            flex: 1,

                            defaults: {
                                ui: 'admin-sub',
                                style: 'background:transparent;'
                            },

                            items: [
                                // TODO: Finish implementing read only respect
                                //========[Overtime Tab]===========
                                {
                                    title: 'Overtime',
                                    reference: 'overtimeTab',
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'container',
                                            userCls: 'employee-info-container',
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                flex: 1
                                            },
                                            items: [
                                                // Header Labels
                                                {
                                                    defaults: {
                                                        xtype: 'container',
                                                        flex: 1
                                                    },
                                                    items: [
                                                        {
                                                            bind: {
                                                                html: ''
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: 'Daily Overtime',
                                                            userCls: 'employee-info-general-field admin-label',
                                                            ui: 'employeeinfo-textfield'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: 'Weekly Overtime',
                                                            userCls: 'employee-info-general-field admin-label',
                                                            ui: 'employeeinfo-textfield'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: 'Rate',
                                                            userCls: 'employee-info-general-field admin-label',
                                                            ui: 'employeeinfo-textfield'
                                                        }
                                                    ]
                                                },
                                                {
                                                    defaults: {
                                                        flex: 1,
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield',
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'breeze-checkbox',
                                                            boxLabel: 'Overtime 1',
                                                            labelWidth: 'auto',
                                                            ui: 'admin-checkbox',
                                                            bodyAlign: 'stretch',
                                                            reference: 'otCheck1',
                                                            itemId: 'overtime1',
                                                            bind: {
                                                                checked: '{overtime1Checked}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            // name: 'overtime_day1',
                                                            decimals: 2,
                                                            minValue: 0,
                                                            maxValue: 24,
                                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                                            bind: {
                                                                value: '{overtimeDaily1}',
                                                                hidden: '{!otCheck1.checked}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            // name: 'overtime_week1',
                                                            decimals: 2,
                                                            minValue: 0,
                                                            maxValue: 168,
                                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                                            bind: {
                                                                value: '{overtimeWeekly1}',
                                                                hidden: '{!otCheck1.checked}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            // name: 'overtime_rate1',
                                                            decimals: 2,
                                                            bind: {
                                                                value: '{policyData.Ot_Rate1}',
                                                                hidden: '{!otCheck1.checked}'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    defaults: {
                                                        flex: 1,
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'breeze-checkbox',
                                                            boxLabel: 'Overtime 2',
                                                            labelWidth: 'auto',
                                                            bodyAlign: 'stretch',
                                                            ui: 'admin-checkbox',
                                                            reference: 'otCheck2',
                                                            itemId: 'overtime2',
                                                            bind: {
                                                                checked: '{overtime2Checked}',
                                                                disabled: '{!overtime2Enabled}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            // name: 'overtime_day2',
                                                            decimals: 2,
                                                            minValue: 0,
                                                            maxValue: 24,
                                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                                            bind: {
                                                                value: '{overtimeDaily2}',
                                                                hidden: '{!otCheck2.checked}',
                                                                disabled: '{!otCheck2.checked}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            // name: 'overtime_week2',
                                                            decimals: 2,
                                                            minValue: 0,
                                                            maxValue: 168,
                                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                                            bind: {
                                                                value: '{overtimeWeekly2}',
                                                                hidden: '{!otCheck2.checked}',
                                                                disabled: '{!otCheck2.checked}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            decimals: 2,
                                                            // name: 'overtime_rate2',
                                                            bind: {
                                                                value: '{policyData.Ot_Rate2}',
                                                                hidden: '{!otCheck2.checked}',
                                                                disabled: '{!otCheck2.checked}'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    defaults: {
                                                        flex: 1,
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'breeze-checkbox',
                                                            bodyAlign: 'stretch',
                                                            boxLabel: 'Overtime 3',
                                                            labelWidth: 'auto',
                                                            ui: 'admin-checkbox',
                                                            reference: 'otCheck3',
                                                            itemId: 'overtime3',
                                                            bind: {
                                                                checked: '{overtime3Checked}',
                                                                disabled: '{!overtime3Enabled}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            // name: 'overtime_day2',
                                                            decimals: 2,
                                                            minValue: 0,
                                                            maxValue: 24,
                                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                                            bind: {
                                                                value: '{overtimeDaily3}',
                                                                hidden: '{!otCheck3.checked}',
                                                                disabled: '{!otCheck3.checked}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            // name: 'overtime_week2',
                                                            decimals: 2,
                                                            minValue: 0,
                                                            maxValue: 168,
                                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                                            bind: {
                                                                value: '{overtimeWeekly3}',
                                                                hidden: '{!otCheck3.checked}',
                                                                disabled: '{!otCheck3.checked}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            decimals: 2,
                                                            // name: 'overtime_rate2',
                                                            bind: {
                                                                value: '{policyData.Ot_Rate3}',
                                                                hidden: '{!otCheck3.checked}',
                                                                disabled: '{!otCheck3.checked}'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    defaults: {
                                                        flex: 1,
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'breeze-checkbox',
                                                            bodyAlign: 'stretch',
                                                            boxLabel: 'Overtime 4',
                                                            labelWidth: 'auto',
                                                            ui: 'admin-checkbox',
                                                            reference: 'otCheck4',
                                                            itemId: 'overtime4',
                                                            bind: {
                                                                checked: '{policyData.Ot_Opt4}',
                                                                disabled: '{!otCheck3.checked}',
                                                                readOnly: '{!otCheck3.checked}'
                                                            },
                                                            listeners: {
                                                                change: 'onOvertimeChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            // name: 'overtime_day2',
                                                            decimals: 2,
                                                            minValue: 0,
                                                            maxValue: 24,
                                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                                            bind: {
                                                                value: '{overtimeDaily4}',
                                                                hidden: '{!otCheck4.checked}',
                                                                disabled: '{!otCheck4.checked}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            // name: 'overtime_week2',
                                                            decimals: 2,
                                                            minValue: 0,
                                                            maxValue: 168,
                                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                                            bind: {
                                                                value: '{overtimeWeekly4}',
                                                                hidden: '{!otCheck4.checked}',
                                                                disabled: '{!otCheck4.checked}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            decimals: 2,
                                                            // name: 'overtime_rate2',
                                                            bind: {
                                                                value: '{policyData.Ot_Rate4}',
                                                                hidden: '{!otCheck4.checked}',
                                                                disabled: '{!otCheck4.checked}'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'breeze-checkbox',
                                                    label: 'Deduct Daily Overtime from Weekly Overtime',
                                                    // name: 'subtract_DayOt',
                                                    labelAlign: 'right',
                                                    labelWidth: 'auto',
                                                    flex: 1,
                                                    ui: 'employeeinfo-checkbox'
                                                }
                                            ]
                                        }
                                    ]

                                },
                                //========[Rounding Rules Tab]===========
                                {
                                    title: 'Rounding Rules',
                                    reference: 'roundingTab',
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'employee-info-fieldset',
                                            layout: 'vbox',
                                            title: 'Punch Rounding',
                                            items: [
                                                {
                                                    flex: 1,
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            html: 'Round punch to nearest',
                                                        },
                                                        {
                                                            xtype: 'selectfield',
                                                            store: 'PunchRoundingIncrements',
                                                            // name: 'rounding_inc',
                                                            displayField: 'name',
                                                            // label: 'Round punch to nearest increment of',
                                                            valueField: 'value',
                                                            // flex: 1,
                                                            //bind: '{info.punchPolicy.Round_Increment}',
                                                            listeners: {
                                                                //change: 'onRoundingIncChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            html: 'minute(s)',
                                                        }
                                                    ]
                                                },
                                                {
                                                    flex: 1,
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            html: 'Offset rounding by',
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            store: 'PunchRoundingIncrements',
                                                            // name: 'rounding_off',
                                                            // label: 'Minute(s)',
                                                            inline: true,
                                                            //bind: { value: '{info.punchPolicy.Round_Offset}' },
                                                            listeners: {
                                                                //change: 'onRoundingOffChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            html: 'minute(s)',
                                                        }
                                                    ]
                                                },
                                                {
                                                    flex: 1,
                                                    xtype: 'container',
                                                    layout: 'vbox',
                                                    defaults: {
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'component',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            reference: 'roundPrev1',
                                                            html: 'Punches between 7 and 8 am round to 8 AM'
                                                        },
                                                        {
                                                            xtype: 'component',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            reference: 'roundPrev2',
                                                            html: 'Punches between 7 and 8 am round to 8 AM'
                                                        },
                                                        {
                                                            xtype: 'component',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            reference: 'roundPrev3',
                                                            html: 'Punches between 7 and 8 am round to 8 AM'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //========[Punch Options Tab]===========
                                {
                                    title: 'Punch Options',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'employee-info-fieldset',
                                            title: 'Punch Options',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    defaults: {
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield'
                                                    },
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'checkbox',
                                                            ui: 'employeeinfo-checkbox',
                                                            // name: 'allow_punch_regular',
                                                            bodyAlign: 'stretch',
                                                            flex: 1,
                                                            boxLabel: 'Allow Regular Punch In/Out',
                                                            bind: {
                                                                //checked: '{info.punchPolicy.Allow_RegularPunch}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkbox',
                                                            ui: 'employeeinfo-checkbox',
                                                            // name: 'allow_punch_quick',
                                                            bodyAlign: 'stretch',
                                                            flex: 1,
                                                            boxLabel: 'Allow Quick Punch In/Out',
                                                            bind: {
                                                                //checked: '{info.punchPolicy.Allow_QuickPunch}'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    userCls: 'employee-info-general-field',

                                                    defaults: {
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield'
                                                    },
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            html: 'Maximum shift length',
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            // name: 'auto_close_shift',
                                                            minValue: 0, maxValue: 24, value: 1,
                                                            //bind: { value: '{info.punchPolicy.Auto_Close_Shift}' }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            html: 'hour(s)',
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'employee-info-fieldset',
                                            title: 'Other',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    defaults: {
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield',
                                                        width: '50%',
                                                    },
                                                    // layout: 'hbox',
                                                    layout: 'float',
                                                    items: [
                                                        {
                                                            xtype: 'checkbox',
                                                            ui: 'employeeinfo-checkbox',
                                                            // name: 'can_adjust_punches',
                                                            bodyAlign: 'stretch',
                                                            boxLabel: 'Can adjust time records',
                                                            bind: {
                                                                //checked: '{info.punchPolicy.Can_Adjust_Punches}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkbox',
                                                            ui: 'employeeinfo-checkbox',
                                                            // name: 'can_add_notes',
                                                            bodyAlign: 'stretch',
                                                            boxLabel: 'Can add notes to punches',
                                                            bind: {
                                                                //checked: '{info.punchPolicy.Can_Add_Notes}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkbox',
                                                            ui: 'employeeinfo-checkbox',
                                                            // name: 'can_use_timesheets',
                                                            bodyAlign: 'stretch',
                                                            boxLabel: 'Can use time sheets',
                                                            bind: {
                                                                //checked: '{info.punchPolicy.Can_Use_TimeSheets}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkbox',
                                                            ui: 'employeeinfo-checkbox',
                                                            // name: 'InOut_punch',
                                                            bodyAlign: 'stretch',
                                                            boxLabel: 'In/Out board punching without recording time',
                                                            hidden: true
                                                        },
                                                        {
                                                            xtype: 'checkbox',
                                                            ui: 'employeeinfo-checkbox',
                                                            // name: 'can_add_projects',
                                                            bodyAlign: 'stretch',
                                                            boxLabel: 'Can add Projects',
                                                            hidden: true
                                                        },
                                                        {
                                                            xtype: 'checkbox',
                                                            ui: 'employeeinfo-checkbox',
                                                            // name: 'can_edit_notes',
                                                            bodyAlign: 'stretch',
                                                            boxLabel: 'Can edit/delete employee notes',
                                                            hidden: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]

                                },
                                //========[Deductions Tab]===========
                                {
                                    title: 'Deductions',
                                    layout: 'vbox',
                                    reference: 'deductionsTab',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            userCls: 'employee-info-fieldset',
                                            title: 'Automatic Deductions',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    defaults: {
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield'
                                                    },
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'checkbox',
                                                            ui: 'employeeinfo-checkbox',
                                                            name: 'punch_out_lunch',
                                                            bodyAlign: 'stretch',
                                                            flex: 1,
                                                            boxLabel: 'Punch Out for lunch',
                                                            listeners: {
                                                                //change: 'onPunchForLunchChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'component',
                                                            flex: 1,
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    userCls: 'employee-info-general-field',

                                                    defaults: {
                                                        userCls: 'employee-info-general-field',
                                                        ui: 'employeeinfo-textfield'
                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                        wrap: true
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            html: 'Automaticly subtract ',
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            maxWidth: '6em',
                                                            // name: 'lunch_minutes',
                                                            minValue: 0, maxValue: 999,
                                                            decimals: 0, label: null,
                                                            inline: true,
                                                            disabled: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            userCls: 'employeeinfo-label admin-label',
                                                            html: ' minutes if employee works a '
                                                        },
                                                        {
                                                            xtype: 'spinnerfield',
                                                            maxWidth: '6em',
                                                            // name: 'lunch_seg',
                                                            minValue: 0, maxValue: 24, decimals: 0,
                                                            disabled: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            userCls: ' employeeinfo-label admin-label',
                                                            html: 'hour shift'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]

                                },

                            ]

                        },


                        {
                            xtype: 'toolbar',
                            ui: 'admin-tree',
                            userCls: 'no-background',
                            shadow: false,
                            items: [
                                {
                                    xtype: 'spacer',
                                    flex: 1,
                                },
                                {
                                    xtype: 'button',
                                    text: 'Save',
                                    ui: 'confirm alt',
                                    width: '175pt'
                                },

                                {
                                    xtype: 'spacer',
                                    width: '5pt',
                                },

                                {
                                    xtype: 'button',
                                    text: 'Save and Apply Punch Policy to Employees',
                                    ui: 'action',
                                    width: '275pt'
                                },
                                {
                                    xtype: 'spacer',
                                    flex: 1,
                                },

                            ]
                        },

                    ]
                },
            ]
        },

    ]
});