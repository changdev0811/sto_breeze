/**
 * Employee Information View > Punch Policies Tab
 * @class PunchPolicy
 * @alias Breeze.view.employee.information.PunchPolicy
 */
Ext.define('Breeze.view.employee.information.PunchPolicy', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.punchpolicy',

    requires: [
        'Breeze.view.employee.information.PunchPolicyController'
    ],

    controller: 'employee.information.punchpolicy',

    layout: 'vbox',
    userCls: 'employee-info-outer-container',
    items: [
        {
            xtype: 'tabpanel',
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
                                        ui: 'employeeinfo-textfield'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            name: 'overtime_opt1',
                                            label: 'Overtime 1',
                                            ui: 'employeeinfo-checkbox',
                                            bodyAlign: 'stretch',
                                            bind: {
                                                checked: '{info.punchPolicy.Ot_Opt1}'
                                            },
                                            listeners: {
                                                change: 'onOvertime1Change'
                                            }
                                            
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'overtime_day1',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 24,
                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                            bind: '{overtime_day1}'
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'overtime_week1',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 168,
                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                            bind: '{overtime_week1}'
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'overtime_rate1',
                                            decimals: 2,
                                            bind: '{info.punchPolicy.Ot_Rate1}'
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
                                            xtype: 'checkbox',
                                            name: 'overtime_opt2',
                                            label: 'Overtime 2',
                                            bodyAlign: 'stretch',
                                            ui: 'employeeinfo-checkbox',
                                            bind: {
                                                checked: '{info.pucnPolicy.Ot_Opt2}'
                                            },
                                            listeners: {
                                                change: 'onOvertime2Change'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'overtime_day2',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 24,
                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                            bind: '{overtime_day2}'
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'overtime_week2',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 168,
                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                            bind: '{overtime_week2}'
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            decimals: 2,
                                            name: 'overtime_rate2',
                                            bind: '{info.punchPolicy.Ot_Rate2}'
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
                                            xtype: 'checkbox',
                                            name: 'overtime_opt3',
                                            bodyAlign: 'stretch',
                                            label: 'Overtime 3',
                                            ui: 'employeeinfo-checkbox',
                                            bind: {
                                                checked: '{info.punchPolicy.Ot_Opt3}'
                                            },
                                            listeners: {
                                                change: 'onOvertime3Change'
                                            }
                                            
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'overtime_day3',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 24,
                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                            bind: '{overtime_day3}'
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'overtime_week3',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 168,
                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                            bind: '{overtime_week3}'
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            decimals: 2,
                                            name: 'overtime_rate3',
                                            bind: '{info.punchPolicy.Ot_Rate3}'
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
                                            xtype: 'checkbox',
                                            name: 'overtime_opt4',
                                            bodyAlign: 'stretch',
                                            label: 'Overtime 4',
                                            ui: 'employeeinfo-checkbox',
                                            bind: {
                                                checked: '{info.punchPolicy.Ot_Opt4}'
                                            },
                                            listeners: {
                                                change: 'onOvertime4Change'
                                            }
                                            
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'overtime_day4',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 24,
                                            // bind: '{info.punchPolicy.Ot_Day1}'
                                            bind: '{overtime_day4}'
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'overtime_week4',
                                            decimals: 2,
                                            minValue: 0,
                                            maxValue: 168,
                                            // bind: '{info.punchPolicy.Ot_Week1}'
                                            bind: '{overtime_week4}'
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            decimals: 2,
                                            name: 'overtime_rate4',
                                            bind: '{info.punchPolicy.Ot_Rate4}'
                                        }
                                    ]    
                                },
                                {
                                    xtype: 'checkboxfield',
                                    label: 'Deduct Daily Overtime from Weekly Overtime',
                                    name: 'subtract_DayOt',
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
                                            html: 'Round punch to nearest',
                                            style: 'line-height: 1.5em'
                                        },
                                        {
                                            xtype: 'selectfield',
                                            store: 'PunchRoundingIncrements',
                                            name: 'rounding_inc',
                                            displayField: 'name',
                                            // label: 'Round punch to nearest increment of',
                                            valueField: 'value',
                                            // flex: 1,
                                            bind: '{info.punchPolicy.Round_Increment}',
                                            listeners: {
                                                change: 'onRoundingIncChange'
                                            }
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
                                            html: 'Offset rounding by',
                                            style: 'line-height: 1.5em'
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            store: 'PunchRoundingIncrements',
                                            name: 'rounding_off',
                                            // label: 'Minute(s)',
                                            inline: true,
                                            bind: '{info.punchPolicy.Round_Offset}',
                                            listeners: {
                                                change: 'onRoundingOffChange'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            html: 'minute(s)',
                                            style: 'line-height: 1.5em'
                                        }
                                    ]
                                },
                                {
                                    flex: 1,
                                    xtype: 'fieldset',
                                    layout: 'vbox',
                                    defaults: {
                                        userCls: 'employee-info-general-field',
                                        ui: 'employeeinfo-textfield'
                                    },
                                    items: [
                                        {
                                            xtype: 'component',
                                            reference: 'roundPrev1',
                                            html: 'Punches between 7 and 8 am round to 8 AM'
                                        },
                                        {
                                            xtype: 'component',
                                            reference: 'roundPrev2',
                                            html: 'Punches between 7 and 8 am round to 8 AM'
                                        },
                                        {
                                            xtype: 'component',
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
                    title: 'Punch Options'
                },
                //========[Deductions Tab]===========
                {
                    title: 'Deductions'
                }
            ]
        }
    ]

});