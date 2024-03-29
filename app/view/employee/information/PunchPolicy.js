/**
 * Employee Information View > Punch Policies Tab
 * @class PunchPolicy
 * @namespace Breeze.view.employee.information.PunchPolicy
 * @alias widget.employee.information.punchpolicy
 * @todo TODO: Clean up logic used to display/hide overtime punch policies
 */
Ext.define('Breeze.view.employee.information.PunchPolicy', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.punchpolicy',
    
    padding:'8pt',

    requires: [
        'Breeze.view.employee.information.PunchPolicyController'
    ],

    controller: 'employee.information.punchpolicy',

    layout: 'vbox',
    userCls: 'employee-info-outer-container',

    listeners: {
        initialize: 'onInit'
    },

    plugins: {
        readOnlyPlug: {
            type: 'breeze.form.readonly',
            recursive: true,
            expression: 'readOnly'
        }
    },

    items: [
        {
            xtype: 'tabpanel',

    padding:'8pt 0pt 0pt 0pt',


            layout: {
                animation: 'fade'
            },
            flex: 3,
            ui: 'employeeInfoTabs',
            tabBar: {
                defaultTabUI: 'employeeInfoTabs',
                shadow: false
            },
            defaults: {
                userCls: 'employee-info-tab-container'
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
                                            userCls: 'employee-info-general-field',
                                            ui: 'employeeinfo-textfield'
                                        },
                                        {
                                            xtype: 'label',
                                            html: 'Weekly Overtime',
                                            userCls: 'employee-info-general-field',
                                            ui: 'employeeinfo-textfield'
                                        },
                                        {
                                            xtype: 'label',
                                            html: 'Rate',
                                            userCls: 'employee-info-general-field',
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
                                            name: 'overtime_opt1',
                                            boxLabel: 'Overtime 1',
                                            labelWidth: 'auto',
                                            ui: 'employeeinfo-checkbox',
                                            bodyAlign: 'stretch',
                                            reference: 'otCheck1',
                                            checked: false, // default to unchecked
                                            bind: {
                                                checked: '{overtime1Checked}'
                                            }
                                            // listeners: {
                                            //     change: 'onOvertime1Change'
                                            // }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            itemId: 'overtime_day1',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 24,
                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                            bind: {
                                                value: '{overtime_day1}',
                                                hidden: '{!otCheck1.checked}'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            itemId: 'overtime_week1',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 168,
                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                            bind: { 
                                                value: '{overtime_week1}',
                                                hidden: '{!otCheck1.checked}'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            itemId: 'overtime_rate1',
                                            decimals: 2,
                                            bind: { 
                                                value: '{info.punchPolicy.Ot_Rate1}',
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
                                            itemId: 'overtime_opt2',
                                            boxLabel: 'Overtime 2',
                                            labelWidth: 'auto',
                                            bodyAlign: 'stretch',
                                            ui: 'employeeinfo-checkbox',
                                            reference: 'otCheck2',
                                            checked: false, // default to unchecked
                                            bind: {
                                                checked: '{overtime2Checked}',
                                                disabled: '{!overtime2Enabled}'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            itemId: 'overtime_day2',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 24,
                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                            bind: {
                                                value: '{overtime_day2}',
                                                hidden: '{!otCheck2.checked}',
                                                disabled: '{!otCheck2.checked}'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            itemId: 'overtime_week2',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 168,
                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                            bind: {
                                                value: '{overtime_week2}',
                                                hidden: '{!otCheck2.checked}',
                                                disabled: '{!otCheck2.checked}'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            decimals: 2,
                                            itemId: 'overtime_rate2',
                                            bind: {
                                                value: '{info.punchPolicy.Ot_Rate2}',
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
                                            itemId: 'overtime_opt3',
                                            bodyAlign: 'stretch',
                                            boxLabel: 'Overtime 3',
                                            labelWidth: 'auto',
                                            ui: 'employeeinfo-checkbox',
                                            reference: 'otCheck3',
                                            checked: false, // default to unchecked
                                            bind: {
                                                checked: '{overtime3Checked}',
                                                disabled: '{!overtime3Enabled}'
                                            }
                                            
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            itemId: 'overtime_day3',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 24,
                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                            bind: {
                                                value: '{overtime_day3}',
                                                hidden: '{!otCheck3.checked}',
                                                disabled: '{!otCheck3.checked}'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            itemId: 'overtime_week3',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 168,
                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                            bind: { 
                                                value: '{overtime_week3}',
                                                hidden: '{!otCheck3.checked}',
                                                disabled: '{!otCheck3.checked}'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            decimals: 2,
                                            itemId: 'overtime_rate3',
                                            bind: {
                                                value: '{info.punchPolicy.Ot_Rate3}',
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
                                            itemId: 'overtime_opt4',
                                            bodyAlign: 'stretch',
                                            boxLabel: 'Overtime 4',
                                            labelWidth: 'auto',
                                            ui: 'employeeinfo-checkbox',
                                            reference: 'otCheck4',
                                            bind: {
                                                checked: '{policyData.Ot_Opt4}',
                                                disabled: '{!otCheck3.checked}'
                                            },
                                            
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            itemId: 'overtime_day4',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 24,
                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                            bind: { value: '{overtime_day4}',
                                            hidden: '{!otCheck4.checked}',
                                            disabled: '{!otCheck4.checked}' }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            itemId: 'overtime_week4',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 168,
                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                            bind: { 
                                                value: '{overtime_week4}',
                                                hidden: '{!otCheck4.checked}',
                                                disabled: '{!otCheck4.checked}'
                                             }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            decimals: 2,
                                            itemId: 'overtime_rate4',
                                            bind: { 
                                                value: '{info.punchPolicy.Ot_Rate4}' ,
                                                hidden: '{!otCheck4.checked}',
                                                disabled: '{!otCheck4.checked}'
                                            }
                                        }
                                    ]    
                                },
                                {
                                    xtype: 'breeze-checkbox',
                                    label: 'Deduct Daily Overtime from Weekly Overtime',
                                    itemId: 'subtract_DayOt',
                                    labelAlign: 'right',
                                    labelWidth: 'auto',
                                    flex: 1,
                                    ui: 'employeeinfo-checkbox',
                                    bind: {
                                        checked: '{info.punchPolicy.Subtract_DayOt}'
                                    }
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
                            //userCls: 'employee-info-fieldset',
                            userCls: 'employee-info-fieldset no-side-margin',
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
                                            userCls: 'employeeinfo-label',
                                            html: 'Round punch to nearest',
                                        },
                                        {
                                            xtype: 'selectfield',
                                            store: 'PunchRoundingIncrements',
                                            itemId: 'rounding_inc',
                                            displayField: 'name',
                                            // label: 'Round punch to nearest increment of',
                                            valueField: 'value',
                                            // flex: 1,
                                            bind: '{info.punchPolicy.Round_Increment}',
                                            listeners: {
                                                change: 'onRoundingIncChange'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            userCls: 'employeeinfo-label',
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
                                            userCls: 'employeeinfo-label',
                                            html: 'Offset rounding by',
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            store: 'PunchRoundingIncrements',
                                            itemId: 'rounding_off',
                                            // label: 'Minute(s)',
                                            inline: true,
                                            bind: { value: '{info.punchPolicy.Round_Offset}' },
                                            listeners: {
                                                change: 'onRoundingOffChange'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            userCls: 'employeeinfo-label',
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
                                            userCls: 'employeeinfo-label',
                                            reference: 'roundPrev1',
                                            html: 'Punches between 7 and 8 am round to 8 AM'
                                        },
                                        {
                                            xtype: 'component',
                                            userCls: 'employeeinfo-label',
                                            reference: 'roundPrev2',
                                            html: 'Punches between 7 and 8 am round to 8 AM'
                                        },
                                        {
                                            xtype: 'component',
                                            userCls: 'employeeinfo-label',
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
                            //userCls: 'employee-info-fieldset',
                            userCls: 'employee-info-fieldset no-side-margin',
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
                                            itemId: 'allow_punch_regular',
                                            bodyAlign:'stretch',
                                            flex: 1,
                                            boxLabel: 'Allow Regular Punch In/Out',
                                            bind: {
                                                checked: '{info.punchPolicy.Allow_RegularPunch}'
                                            }
                                        },
                                        {
                                            xtype: 'checkbox',
                                            ui: 'employeeinfo-checkbox',
                                            itemId: 'allow_punch_quick',
                                            bodyAlign:'stretch',
                                            flex: 1,
                                            boxLabel: 'Allow Quick Punch In/Out',
                                            bind: {
                                                checked: '{info.punchPolicy.Allow_QuickPunch}'
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
                                            userCls: 'employeeinfo-label',
                                            html: 'Maximum shift length',
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            itemId: 'auto_close_shift',
                                            minValue: 0, maxValue: 24, value: 1,
                                            bind: { value: '{info.punchPolicy.Auto_Close_Shift}' }
                                        },
                                        {
                                            xtype: 'label',
                                            userCls: 'employeeinfo-label',
                                            html: 'hour(s)',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            //userCls: 'employee-info-fieldset',
                            userCls: 'employee-info-fieldset no-side-margin',
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
                                            itemId: 'can_adjust_punches',
                                            bodyAlign:'stretch',
                                            boxLabel: 'Can adjust time records',
                                            bind: {
                                                checked: '{info.punchPolicy.Can_Adjust_Punches}'
                                            }
                                        },
                                        {
                                            xtype: 'checkbox',
                                            ui: 'employeeinfo-checkbox',
                                            itemId: 'can_add_notes',
                                            bodyAlign:'stretch',
                                            boxLabel: 'Can add notes to punches',
                                            bind: {
                                                checked: '{info.punchPolicy.Can_Add_Notes}'
                                            }
                                        },
                                        {
                                            xtype: 'checkbox',
                                            ui: 'employeeinfo-checkbox',
                                            itemId: 'can_use_timesheets',
                                            bodyAlign:'stretch',
                                            boxLabel: 'Can use time sheets',
                                            bind: {
                                                checked: '{info.punchPolicy.Can_Use_TimeSheets}'
                                            }
                                        },
                                        {
                                            xtype: 'checkbox',
                                            ui: 'employeeinfo-checkbox',
                                            itemId: 'InOut_punch',
                                            bodyAlign:'stretch',
                                            boxLabel: 'In/Out board punching without recording time',
                                            hidden: true,
                                            bind: {
                                                checked: '{info.punchPolicy.InOut_Opt}'
                                            }
                                        },
                                        {
                                            xtype: 'checkbox',
                                            ui: 'employeeinfo-checkbox',
                                            itemId: 'can_add_projects',
                                            bodyAlign:'stretch',
                                            boxLabel: 'Can add Projects',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'checkbox',
                                            ui: 'employeeinfo-checkbox',
                                            itemId: 'can_edit_notes',
                                            bodyAlign:'stretch',
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
                            //userCls: 'employee-info-fieldset',
                            userCls: 'employee-info-fieldset no-side-margin',
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
                                            itemId: 'punch_out_lunch',
                                            bodyAlign:'stretch',
                                            flex: 1,
                                            boxLabel: 'Punch Out for lunch',
                                            listeners: {
                                                change: 'onPunchForLunchChange'
                                            },
                                            bind: {
                                                checked: '{info.punchPolicy.Auto_LunchPunch}'
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
                                            userCls: 'employeeinfo-label',
                                            html: 'Automaticly subtract ',
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            maxWidth:'6em',
                                            itemId: 'lunch_minutes',
                                            bind: {
                                                // TODO: Confirm bind is correct
                                                // value: '{info.punchPolicy.LunchPunch_Hours}'
                                                value: '{info.punchPolicy.LunchPunch_Seg}'
                                            },
                                            minValue: 0, maxValue: 999,
                                            decimals: 0, label: null,
                                            inline: true,
                                            disabled: true
                                        },
                                        {
                                            xtype: 'label',
                                            userCls: 'employeeinfo-label',
                                            html: ' minutes if employee works a '
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            maxWidth:'6em',
                                            itemId: 'lunch_seg',
                                            bind: {
                                                // TODO: Confirm this bind is right
                                                // value: '{info.punchPolicy.LunchPunch_Seg}'
                                                value: '{info.punchPolicy.LunchPunch_Hours}'
                                            },
                                            minValue: 0, maxValue: 24, decimals: 0,
                                            disabled: true
                                        },
                                        {
                                            xtype: 'label',
                                            userCls: ' employeeinfo-label',
                                            html: 'hour shift'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]

                }
            ]
        }
    ]

});