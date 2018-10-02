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
        pdf: { text: 'PDF (Print)', handler: 'onPrintPDF', ui: 'action' },
        excel: { text: 'Excel (Print)', handler: 'onPrintExcel', ui: 'action' },
        word: { text: 'Word (Print)', handler: 'onPrintWord', ui: 'action' },
    },

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'reporting-actions',
        shadow: false
    },

    // Body contents
    items: [
        // Form Title Text field
        {
            xtype: 'breeze-textfield',
            label: 'Report Title',
            name: 'reportTitle',
            bind: '{reportParams.ReportTitle}',
            ui: 'reporting reporting-text'
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
                            ui: 'reporting-tabs',
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
                                            // ui: 'reporting-tree',
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
                                            // ui: 'reporting-tree',
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
                            userCls: 'report-section-padding reporting-fieldset',
                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting',
                                xtype: 'breeze-checkbox'
                            },
                            items: [
                                {
                                    name: 'headerCompanyLogo',
                                    inline: true,
                                    label: '',
                                    boxLabel: 'Company Logo in Header',
                                    bind: '{reportParams.LogoInHeader}'
                                },
                                {
                                    name: 'headerCompanyName',
                                    label: '',
                                    labelMinWidth: 0,
                                    boxLabel: 'Company Name in Title',
                                    bind: '{reportParams.NameInHeader}'
                                },
                                {
                                    name: 'headerSignature',
                                    label: '',
                                    boxLabel: 'Signature Line in Footer',
                                    bind: '{reportParams.RepSignature}'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'report-section-padding reporting-fieldset',
                            title: 'Date Range',
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'start',
                                    label: 'From',
                                    picker: {
                                        xtype: 'datepicker',
                                        title: 'Start Date'
                                    },
                                    bind: '{reportParams.dStart}'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'finish',
                                    label: 'To',
                                    picker: {
                                        xtype: 'datepicker',
                                        title: 'End Date'
                                    },
                                    bind: '{reportParams.dEnd}'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'report-section-padding reporting-fieldset',
                            title: 'Condition',
                            items: [
                                {
                                    xtype: 'container',
                                    reference: 'conditionValue',
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
                                    reference: 'conditionType',
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
                                            boxLabel: 'Days',
                                            bind: '{reportParams.conditional_type}'
                                        },
                                        {
                                            xtype: 'radio',
                                            flex: 1,
                                            name: 'conditionValueType',
                                            value: '21',
                                            boxLabel: 'Weeks',
                                            bind: '{reportParams.conditional_type}'
                                            // bind: {
                                            //     checked: '{reportOptions.conditionalValueType == 21}'
                                            // }
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
                            bind: {
                                store: '{categoriesTree}'
                            },
                            reference: 'udcTree',
                            flex: 1,
                            ui: 'reporting-tree'
                        }
                    ]
                }
            ]
        }
    ]

});