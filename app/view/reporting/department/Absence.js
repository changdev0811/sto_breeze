/**
 * Department Absence Report form
 * @class Absence
 * @namespace Breeze.view.reporting.department.Absence
 * @alias widget.reporting.department.absence
 */
Ext.define('Breeze.view.reporting.department.Absence', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.department.absence',

    requires: [
        'Ext.tab.Panel',
        'Ext.list.Tree',
        'Ext.form.FieldSet',
        'Ext.field.Date',
        'Ext.picker.Date',
        'Ext.field.ComboBox',
        'Ext.field.Spinner',
        'Ext.field.Radio'
    ],

    controller: 'reporting.department.absence',

    viewModel: {
        type: 'reporting.department.absence'
    },
    
    layout: 'vbox',
    title: 'Department Absence Report',

    items: [
        {
            xtype: 'breeze-textfield',
            label: 'Report Title',
            name: 'reportTitle'
        },
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [
                {
                    xtype: 'container',
                    // docked: 'left',
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'tabpanel',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    title: 'Departments',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'treelist',
                                            reference: 'departmentTree'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    title: 'Employees',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'treelist',
                                            reference: 'employeeTree'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'checkbox',
                            labelAlign: 'top',
                            boxLabel: 'Group by Department',
                            bodyAlign: 'stretch'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            title: 'Header Options',
                            defaults: {
                                bodyAlign: 'stretch',
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    name: 'headerCompanyLogo',
                                    inline: true,
                                    label: '',
                                    boxLabel: 'Company Logo in Header'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'headerCompanyName',
                                    label: '',
                                    labelMinWidth: 0,
                                    boxLabel: 'Company Name in Title'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'headerSignature',
                                    label: '',
                                    boxLabel: 'Signature Line in Footer'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Date Range',
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'start',
                                    label: 'From',
                                    picker: {
                                        xtype: 'datepicker',
                                        title: 'My Panel'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'finish',
                                    label: 'To',
                                    picker: {
                                        xtype: 'datepicker',
                                        title: 'My Panel'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Condition',
                            items: [
                                {
                                    xtype: 'combobox',
                                    name: 'conditionType'
                                },
                                {
                                    xtype: 'spinnerfield',
                                    name: 'conditionValue',
                                    label: ''
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        bodyAlign: 'stretch',
                                    },
                                    items: [
                                        {
                                            xtype: 'radio',
                                            flex: 1,
                                            name: 'conditionValueType',
                                            value: '20',
                                            boxLabel: 'Days'
                                        },
                                        {
                                            xtype: 'radio',
                                            flex: 1,
                                            name: 'conditionValueType',
                                            value: '21',
                                            boxLabel: 'Weeks'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    // docked: 'right',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'breeze.tree.usercategories'
                        }
                    ]
                }
            ]
        }
    ]

});