/**
 * Employee EmployeeAccrualPolicy View
 * @class Breeze.view.employee.AccrualPolicy
 */
Ext.define('Breeze.view.employee.AccrualPolicy', {
    extend: 'Ext.Panel',
    alias: 'widget.employee.accrualpolicy',

    config: {
        crumbTitle: 'My Accrual Policy',
    },


    requires: [
        // 'Breeze.view.employee.FyiController',
        // 'Breeze.view.employee.FyiModel',
        // 'Breeze.view.employee.fyi.AccrualItem',
        'Breeze.view.employee.AccrualPolicyController',
        'Ext.field.Display',
        'Ext.field.Date',
        'Ext.picker.Date'
    ],

    viewModel: {
        type: 'employee.accrualpolicy'
    },
    controller: 'employee.accrualpolicy',

    listeners: {
        initialize: 'onInit'
    },


    //==[Start of Panel Setup/Styling]====
    tools: [
        {
            iconCls: 'x-fa fa-sync',
            handler: 'onRefreshTool'
        },
        {
            iconCls: 'x-fa fa-print',
            handler: 'onPrintTool'
        }
    ],


    title: 'Employee Accrual Policy',
    bind: {
        title: 'Employee Accrual Policy - {adjustInfo.categoryName}'
    },
    ui: 'employee-accrual-policy-base',
    layout: 'hbox',
    userCls: 'employee-fyi-container',
    scrollable: true,
    // Action buttons shown at bottom of panel
    buttonAlign: 'right',
    buttons: [
        { 
            text: 'Save', /* handler: 'onPrintExcel',*/
            ui: 'confirm alt', style: 'width:125pt',
            bind: { hidden: '{isRestricted}' }
        }
    ],
    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'employee-fyi-actions',
        shadow: false,
    },
    items: [

        {
            xtype: 'container',
            flex: 2,
            layout: 'vbox',
            items: [
                // row 1
                {
                    xtype: 'selectfield',
                    ui: 'fyi fyi-text',
                    userCls: 'fyi-fieldset no-side-margin no-border',
                    value: 'Max',
                    label: 'Category:',
                    valueField: 'Category_ID',
                    displayField: 'Category_Name',
                    labelAlign: 'left',
                    labelWidth: 'auto',
                    // Formats items with category color dot
                    itemTpl: [
                        '<div class="usercategories-widget-legend-item-label">',
                        '<div class="legend-item-dot" style="background-color:{Category_Color_HEX}"></div>',
                        '{Category_Name}</div>'
                    ],
                    bind: {
                        value: '{adjustInfo.categoryId}',
                        store: '{categories}'
                    }
                },

                // row 2
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'displayfield',
                            ui: 'fyi-display-field',
                            userCls: 'fyi-fieldset no-side-margin no-border',

                            label: 'Year Type:',
                        },
                        {
                            xtype: 'spacer',
                            width: '10pt',
                        },
                        {
                            xtype: 'containerfield',
                            userCls: 'fyi-fieldset no-side-margin',
                            layout: 'hbox',
                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'fyi',
                                xtype: 'radio',
                                style: 'padding-right: 8pt; padding-left: 8pt',
                                bind: {
                                    disabled: '{isRestricted}',
                                }
                            },
                            reference: 'calendarType',
                            bind: {
                                values: {
                                    yearType: '{adjustInfo.calendarType}'
                                },
                            },
                            items: [
                                {
                                    name: 'yearType',
                                    boxLabel: 'Anniversary',
                                    value: 45,
                                    bind: {
                                        groupValue: '{calendarType.yearType}'
                                    }
                                },
                                {
                                    name: 'yearType',
                                    boxLabel: 'Calendar',
                                    value: 46,
                                    bind: {
                                        groupValue: '{calendarType.yearType}'
                                    }
                                },
                                {
                                    name: 'yearType',
                                    boxLabel: 'Fiscal',
                                    value: 45,
                                    bind: {
                                        groupValue: '{calendarType.yearType}'
                                    }
                                }
                            ]
                        },
                    ]
                },


                // row 3
                {
                    xtype: 'container',
                    //userCls: 'fyi-fieldset no-side-margin no-border',
                    layout: 'hbox',
                    //flex: 1,
                    items: [
                        {
                            xtype: 'datefield',
                            userCls: 'fyi-fieldset no-side-margin no-padding no-border',
                            ui: 'fyi fyi-text',
                            //name: 'viewdate_field',
                            width: '170pt',
                            label: 'View Date:',
                            labelAlign: 'left',
                            labelWidth: 'auto',
                            reference: 'viewDate',
                            picker: {
                                xtype: 'datepicker',
                                title: 'Select Date'
                            },
                            bind: {
                                value: '{activeDay}'
                            }
                            //listeners: {
                            //    change: 'onViewDateChanged'
                            //}
                        },

                        {
                            xtype: 'spacer',
                            width: '5pt',
                        },

                        {
                            xtype: 'selectfield',
                            ui: 'fyi fyi-text', userCls: 'fyi-fieldset no-padding no-border',
                            width: '160pt',
                            label: 'Recording Year:',
                            labelAlign: 'left', labelWidth: 'auto',
                            store: 'Years',
                            displayField: 'Year', valueField: 'Year',
                            bind: {
                                value: '{adjustInfo.recordingYear}'
                            }
                        },
                        {
                            xtype: 'spacer',
                            width: '5pt',
                        },
                        {
                            xtype: 'component',
                            userCls: 'employee-accrual-policy-duration',
                            bind: {
                                html: '({adjustInfo.recordingYearStart} - {adjustInfo.recordingYearEnd})'
                            }
                        }
                    ]
                },

                // row 4
                {
                    xtype: 'fieldset',
                    userCls: 'fyi-fieldset no-side-margin no-padding',
                    layout: 'vbox',
                    flex: 1,
                    items: [

                        {
                            xtype: 'toolbar',
                            ui: 'employee-fyi-tree',
                            shadow: false,
                            items: [
                                {
                                    xtype: 'checkbox',
                                    ui: 'reporting',
                                    boxLabel: 'Accrual Rules'
                                },

                                { xtype: 'spacer', flex: 1 },

                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-plus',
                                    ui: 'plain wtr-button',
                                    bind: {
                                        hidden: '{isRestricted}'
                                    }
                                },
                            ]
                        },

                        // Accrual Rules grid
                        {
                            xtype: 'grid',
                            // == Item ID to make finding tree in panel easier
                            itemId: 'grid',

                            ui: 'employee-fyi-grid', userCls: 'employee-fyi-grid',

                            flex: 1,
                            userCls: 'no-background',
                            layout: 'hbox',
                            hideHeaders: true,
                            rootVisible: false,

                            defaults: {
                                cell: {
                                    ui: 'employee-fyi-grid employee-fyi-tree-item',
                                },
                                userCls: 'no-border',

                            },

                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    text: 'From',
                                    dataIndex: 'text',
                                    flex: 2,
                                },

                                {
                                    xtype: 'gridcolumn',
                                    text: 'To',
                                    dataIndex: 'text',
                                    flex: 2,
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'Accrual Information',
                                    dataIndex: 'text',
                                    flex: 8,
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'Occurrences',
                                    dataIndex: 'text',
                                    flex: 4,
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'Total Time',
                                    dataIndex: 'text',
                                    flex: 4,
                                },
                            ],
                            //reference: 'departmentTree',
                            //bind: '{departmentsTree}'
                        }

                    ]
                },

                // row 5
                {
                    xtype: 'fieldset',
                    userCls: 'fyi-fieldset no-side-margin',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'displayfield',
                        ui: 'fyi-display-field',
                    },
                    items: [
                        // sub row 1
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            flex: 1,
                            defaults: {
                                xtype: 'displayfield',
                                //ui: 'fyi-display-field',

                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    ui: 'fyi',
                                    boxLabel: 'Carry Over',
                                    reference: 'carryOverCheckbox',
                                    minWidth: '64pt',
                                    bodyAlign: 'stretch',

                                    bind: {
                                        disabled: '{isRestricted}',
                                        checked: '{adjustInfo.carryOver}'
                                    }
                                },
                                {
                                    xtype: 'spacer',
                                    width: '10pt',
                                },
                                {
                                    xtype: 'selectfield',
                                    ui: 'reporting fyi-text',
                                    value: 'Max',
                                    options: [
                                        { text: 'No Max', value: 1 },
                                        { text: 'Max', value: 2 },
                                    ],
                                    bind: {
                                        value: '{adjustInfo.carryMax}',
                                        readOnly: '{isRestricted}'
                                    }//<-- this should probably be in the model.js
                                },
                                {
                                    xtype: 'spacer',
                                    width: '10pt',
                                },
                                {
                                    xtype: 'breeze-textfield',
                                    ui: 'fyi fyi-text',
                                    flex: 1
                                },
                            ]
                        },
                        // sub row 2
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            flex: 1,
                            defaults: {
                                xtype: 'displayfield',
                                //ui: 'fyi-display-field',
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    ui: 'fyi',
                                    boxLabel: 'Expires',
                                    minWidth: '64pt',
                                    bodyAlign: 'stretch',
                                    bind: {
                                        readOnly: '{isRestricted}'
                                    }
                                },
                                {
                                    xtype: 'spacer',
                                    width: '10pt',
                                },
                                {
                                    xtype: 'datefield',
                                    userCls: 'fyi-fieldset no-padding no-border',
                                    ui: ['dark-textfield', 'fyi-field', 'fyi-textfield'],
                                    //reference: 'viewDate',
                                    picker: {
                                        xtype: 'datepicker',
                                        title: 'Select Date'
                                    },
                                    bind: {
                                        readOnly: '{isRestricted}'
                                    }
                                },
                            ]
                        },
                    ]
                },
            ]
        },
        // column 2
        {
            xtype: 'container',
            width: '220pt',
            layout: 'vbox',
            items: [
                {
                    xtype: 'fieldset',
                    userCls: 'fyi-fieldset',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'displayfield',
                        ui: 'employee-accrual-policy-display-field',
                        labelWidth: '96pt'
                    },
                    items: [
                        {
                            label: 'Employee',
                            labelAlign: 'left',
                            // labelWidth: 'auto',
                            bind: { value: '{adjustInfo.employeeName}' },
                        },
                        {
                            label: 'Department',
                            labelAlign: 'left',
                            // labelWidth: 'auto',
                            bind: { value: '{adjustInfo.departmentName}' },
                        },
                        {
                            label: 'Hire Date',
                            labelAlign: 'left',
                            // labelWidth: 'auto',
                            bind: { value: '{adjustInfo.hire_date}' },
                        }
                    ]
                },
                {
                    xtype: 'datefield',
                    userCls: 'fyi-fieldset no-padding no-border',
                    ui: 'fyi fyi-text',
                    //name: 'viewdate_field',
                    label: 'Start accruing on:',
                    labelAlign: 'left',
                    labelWidth: 'auto',
                    reference: 'startDate',
                    picker: {
                        xtype: 'datepicker',
                        title: 'Select Date'
                    },
                    //listeners: {
                    //    change: 'onViewDateChanged'
                    //}
                },
                {
                    xtype: 'fieldset',
                    userCls: 'fyi-fieldset',
                    layout: 'vbox',
                    flex: 1,
                    defaults: {
                        xtype: 'displayfield',
                        ui: 'employee-accrual-policy-display-field',
                        width: '100%',
                        bodyAlign: 'end',

                    },
                    items: [
                        {
                            label: 'Carried Over',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { value: '+ {carriedOver}' },
                            encodeHtml: false
                        },
                        {
                            ui: [
                                'employee-accrual-policy-display-field',
                                'employee-accrual-policy-display-field-inner'
                            ],
                            userCls: 'employee-accrual-policy-carryover-negative',
                            label: 'Carry Over Expired',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: {
                                value: '{carryOverExpired}'
                            }
                        },
                        {
                            label: 'Accrued',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { value: '+ {accrued}' },
                        },
                        {
                            label: 'Adjustments',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { value: '+ {adjustments}' },
                        },
                        {
                            label: ' ',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { value: '--------------------' },
                        },
                        {
                            label: 'Allowed',
                            labelAlign: 'left',
                            labelWidth: '115pt',

                            bind: { value: '{allowed}' },
                        },
                        {
                            label: 'Recorded',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { value: '- {recorded}' },
                        },
                        {
                            label: ' ',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { value: '--------------------' },
                        },
                        {
                            xtype: 'checkbox',
                            ui: 'fyi',
                            boxLabel: 'Show scheduled time',
                            bodyAlign: 'stretch',
                            bind: {
                                checked: '{showScheduled}'
                            },
                            listeners: {
                                change: 'onShowScheduledTimeChange'
                            }
                        },
                        {
                            label: 'Remaining',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { value: '{remaining}' },
                        },

                    ]
                },
            ]
        }
        //     ]
        // }
    ]
});