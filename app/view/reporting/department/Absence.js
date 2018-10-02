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

    // View Model

    viewModel: {
        type: 'reporting.department.absence'
    },
    
    // Controller

    controller: 'reporting.department.absence',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Department Absence Report',

    // Action buttons shown at bottom of panel
    buttons: {
        pdf: { text: 'PDF (Print)', handler: 'onPrintPDF' },
        excel: { text: 'Excel (Print)', handler: 'onPrintExcel' },
        word: { text: 'Word (Print)', handler: 'onPrintWord' },
    },

    // Body contents
    items: [
        // Form Title Text field
        {
            xtype: 'breeze-textfield',
            label: 'Report Title',
            name: 'reportTitle'
        },
        // Main horizontal arranging container
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [
                // First column in horizontal container
                {
                    xtype: 'container',
                    // docked: 'left',
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        // Tab panel containing departments and employees
                        {
                            xtype: 'tabpanel',
                            flex: 1,
                            items: [
                                // Departments tab
                                {
                                    xtype: 'panel',
                                    title: 'Departments',
                                    layout: 'fit',
                                    // Toolbar containing 'check all' toggle checkbox
                                    tbar: {
                                        xtype: 'toolbar',
                                        ui: 'reporting-tree',
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                boxLabel: 'Check All',
                                                listeners: {
                                                    change: 'onTreeGridCheckAllChange'
                                                }
                                            }
                                        ]
                                    },
                                    items: [
                                        // Departments tree
                                        {
                                            xtype: 'tree',
                                            layout: 'hbox',
                                            hideHeaders: true,
                                            rootVisible: false,
                                            columns: [
                                                {
                                                    xtype: 'checkcolumn',
                                                    dataIndex: 'checked',
                                                    minWidth: '2em',
                                                    width: 'auto',
                                                    padding: 0,
                                                    listeners: {
                                                        checkChange: 'onTreeGridChecked'
                                                    }
                                                },
                                                {
                                                    xtype: 'treecolumn',
                                                    dataIndex: 'text',
                                                    flex: 1,
                                                    layout: {
                                                        alignment: 'stretch'
                                                    }
                                                }
                                            ],
                                            reference: 'departmentTree',
                                            bind: '{departmentsTree}'
                                        }
                                    ]
                                },
                                // Employees Tab
                                {
                                    xtype: 'panel',
                                    title: 'Employees',
                                    layout: 'fit',
                                    // Toolbar containing 'check all' toggle checkbox
                                    tbar: {
                                        xtype: 'toolbar',
                                        ui: 'reporting-tree',
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                boxLabel: 'Check All',
                                                listeners: {
                                                    change: 'onTreeGridCheckAllChange'
                                                }
                                            }
                                        ]
                                    },
                                    items: [
                                        // Employees selector tree
                                        {
                                            xtype: 'tree',
                                            layout: 'hbox',
                                            hideHeaders: true,
                                            expanderFirst: false,
                                            rootVisible: false,
                                            columns: [
                                                {
                                                    xtype: 'checkcolumn',
                                                    dataIndex: 'checked',
                                                    minWidth: '2em',
                                                    width: 'auto',
                                                    padding: 0
                                                },
                                                {
                                                    xtype: 'treecolumn',
                                                    dataIndex: 'text',
                                                    flex: 1,
                                                    layout: {
                                                        alignment: 'stretch'
                                                    }
                                                }
                                            ],
                                            reference: 'employeeTree',
                                            bind: '{employeesTree}'
                                        }
                                    ]
                                }
                            ]
                        },
                        // Shared checkbox
                        {
                            xtype: 'checkbox',
                            labelAlign: 'top',
                            boxLabel: 'Group by Department',
                            bodyAlign: 'stretch'
                        }
                    ]
                },
                // Fieldset column container
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    defaults: {
                        userCls: 'report-section-padding',
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            title: 'Header Options',
                            userCls: 'report-section-padding',
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
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            name: 'conditionType',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'conditionValue',
                                            label: '',
                                            flex: 1,
                                            style: 'padding-left: 4pt'
                                        }
                                    ]
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
                // Container for User-Defined Categories list
                {
                    xtype: 'fieldset',
                    title: 'Categories',
                    flex: 1,
                    // docked: 'right',
                    layout: {
                        type: 'fit',
                        alignment: 'stretch'
                    },
                    height: '100%',
                    width: '100%',
                    reference: 'udcContainer',
                    items: [
                        {
                            xtype: 'breeze.tree.usercategories',
                            bind: '{categoriesTree}',
                            reference: 'udcTree',
                            flex: 1,
                            
                        }
                    ]
                }
            ]
        }
    ]

});