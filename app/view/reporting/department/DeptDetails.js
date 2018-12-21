/**
 * Department Department Details Report form
 * @class DeptDetails
 * @namespace Breeze.view.reporting.department.DeptDetails
 * @alias widget.reporting.department.deptdetails
 */
Ext.define('Breeze.view.reporting.department.DeptDetails', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.department.deptdetails',

    config: {
        crumbTitle: 'Department Details Report',
    },
    
    // View Model
    viewModel: {
        type: 'reporting.department.deptdetails'
    },
    
    // Controller
    controller: 'reporting.department.deptdetails',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Department Details Report',

    // Action buttons shown at bottom of panel
    buttonAlign: 'left',
    buttons: {
        pdf: { text: 'PDF', handler: 'onPrintPDF', ui: 'action', userCls:'report-action-button' },
        excel: { text: 'Excel', handler: 'onPrintExcel', ui: 'action', userCls:'report-action-button' },
        word: { text: 'Word', handler: 'onPrintWord', ui: 'action', userCls:'report-action-button' },
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
            // +++ Added inline and width +++
            inline:true,
            width: '50%',
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
            // +++ Allow h scroll when panel is too small +++
            scrollable:'x',
            items: [
                // First column in horizontal container
                {
                    xtype: 'container',
                    // docked: 'left',
                    flex: 1,
                    // +++ maxWidth to prevent expanding beyond tab selector +++
                    maxWidth:'298pt',
                    // +++ minWidth reasonable width to prevent most truncating +++
                    minWidth:'200pt',
                    layout: 'vbox',
                    items: [
                        // Tab panel containing departments and employees
                        {
                            xtype: 'tabpanel',
                            // == New reference to identify this tab panel easily
                            reference: 'employeeSelectTabs',
                            layout: {
                                animation: 'fade'
                            },
                            ui: 'employeeInfoTabs', //'reporting-tabs',
                            tabBar: {
                                defaultTabUI: 'employeeInfoTabs',
                                shadow: false,
                            },
                            flex: 1,
                            items: [
                                // Departments tab
                                {
                                    xtype: 'panel',
                                    // == Item ID for each tab to allow us to see which is active
                                    itemId: 'departments',
                                    title: 'Departments',
                                    layout: 'fit',
                                    ui: 'reporting-tab-panel',
                                    // Toolbar containing 'check all' toggle checkbox
                                    tbar: {
                                        xtype: 'toolbar',
                                        ui: 'reporting-tree',
                                        /* +++ Added reporting-toolbar userCls +++ */
                                        userCls:'reporting-toolbar',

                                        shadow: false,
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                ui: 'reporting',
                                                // +++ Departments +++
                                                boxLabel: 'Check All Departments',
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
                                            // == Item ID to make finding tree in panel easier
                                            itemId: 'tree',
                                            ui: 'employeeinfo-shift-grid',
                                            /* +++ New userCls +++ */
                                            userCls: 'employeeinfo-shift-grid',
                                            layout: 'hbox',
                                            hideHeaders: true,
                                            rootVisible: false,
                                            columns: [
                                                {
                                                    xtype: 'checkcolumn',
                                                    /* +++ Style update +++ */
                                                    cell: {
                                                        ui: 'report-tree-column reporting-tree-item',
                                                    },
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
                                                    /* +++ Style update +++ */
                                                    cell: {
                                                        ui: 'report-tree-column reporting-tree-item',
                                                    },
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
                                    // == Item ID for panel 
                                    itemId: 'employees',
                                    layout: 'fit',
                                    ui: 'reporting-tab-panel',
                                    // Toolbar containing 'check all' toggle checkbox
                                    tbar: {
                                        xtype: 'toolbar',
                                        ui: 'reporting-tree',
                                        /* +++ Added reporting-toolbar userCls +++ */
                                        userCls:'reporting-toolbar',
                                        shadow: false,
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                ui: 'reporting',
                                                /* +++ Employees +++ */
                                                boxLabel: 'Check All Employees',
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
                                            // == Item ID to make finding tree in panel easier
                                            itemId: 'tree',

                                            ui: 'employeeinfo-shift-grid',
                                            /* +++ New userCls +++ */
                                            userCls: 'employeeinfo-shift-grid',
                                            layout: 'hbox',
                                            hideHeaders: true,
                                            expanderFirst: false,
                                            rootVisible: false,
                                            columns: [
                                                {
                                                    xtype: 'checkcolumn',
                                                    /* +++ Style update +++ */
                                                    cell: {
                                                        ui: 'report-tree-column reporting-tree-item',
                                                    },
                                                    dataIndex: 'checked',
                                                    minWidth: '2em',
                                                    width: 'auto',
                                                    padding: 0
                                                },
                                                {
                                                    xtype: 'treecolumn',
                                                    /* +++ Style update +++ */
                                                    cell: {
                                                        ui: 'report-tree-column reporting-tree-item',
                                                    },
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
                            bodyAlign: 'stretch',
                            ui: 'reporting',
                            bind: '{reportParams.GroupByDept}'
                        }
                    ]
                },
                // Second column container
                {
                    xtype: 'container',
                    flex: 1,
                    // +++ minWidth width to prevent truncating +++
                    minWidth:'180pt',
                    // +++ maxWidth width to prevent truncating +++
                    maxWidth:'200pt',
                    layout: 'vbox',
                    defaults: {
                        userCls: 'report-section-padding',
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            title: 'Header Options',
                            userCls: 'reporting-fieldset',
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
                            layout: 'vbox',
                            title: 'Extra Options',
                            userCls: 'reporting-fieldset',

                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting',
                                xtype: 'breeze-checkbox'
                            },
                            items: [
                               
                                {
                                    name: 'ShowChart',
                                    inline: true,
                                    label: '',
                                    boxLabel: 'Show Chart',
                                    bind: '{reportParams.ShowChart}'
                                }
                            ]
                        }
                    ]
                },
                // Third Column Container
                {
                    // +++ New Field Set +++
                    xtype: 'fieldset',

                    // +++ added reporting-fieldset no-padding +++
                    userCls: 'reporting-fieldset no-padding',
                    
                    // +++ Categories +++
                    title: 'Recording Year',
                    flex: 1,

                    // +++ fixed width +++
                    minWidth:'150pt',
                    maxWidth:'200pt',

                    // docked: 'right',
                    layout: {
                        type: 'vbox',
                        alignment: 'stretch'
                    },
                    height: '95%',
                    width: '100%',
                    items: [
                        // ++Update++
                        // Updated toolbar alignment
                        {
                            xtype: 'toolbar',
                            ui: 'reporting-tree',
                            userCls:'no-background',
                            shadow: false,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'selectfield',
                                    bodyAlign: 'stretch',
                                    ui: 'reporting reporting-text reporting-date',
                                    name: 'year',
                                    label: 'Recording Year',
                                    labelWidth: 'auto',
                                    labelAlign: 'left',
                                    store: 'Years',
                                    bind: { value: '{reportParams.recyear}' },
                                    displayField: 'Year',
                                    valueField: 'Year',
                                    flex: 1
                                }
                            ]
                        },
                        // ++New 11/5++
                        // 'Check All' option for Years list
                        {
                            xtype: 'toolbar',
                            ui: 'reporting-tree',
                            userCls:'no-background',
                            shadow: false,
                            bind: {
                                // Hide until a recording year is selected
                                hidden: '{reportParams.recyear==null}'
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    ui: 'reporting',
                                    boxLabel: 'Check All',
                                    listeners: {
                                        change: 'onSelectListCheckAllChange'
                                    }
                                }
                            ]
                        },
                        // ++New 11/5++
                        // Selector list control for Recording Year
                        {
                            xtype: 'breeze-select-list',
                            ui: 'employeeinfo-shift-grid',
                            flex: 1,
                            // Reference name and itemID needed for 
                            // reading data and check all listener
                            reference: 'recordingMonthList',
                            itemId: 'selectList',
                            fieldMode: 'check',
                            itemConfig: {
                                ui: 'reporting-list-item',
                                templates: {
                                    radioValue: '{record.value}',
                                    itemData: { month: '{record.name}' },
                                    itemTpl: '<div class="breeze-dataview-select-item-label">{month}</div>'
                                }
                            },
                            bind: {
                                store: '{monthList}',
                                // Hide until recording year has been chosen
                                hidden: '{reportParams.recyear==null}'
                            },
                            viewModel: true
                        }
                    ]
                },
                // Fourth Column Container
                // Container for User-Defined Categories list
                {
                    xtype: 'fieldset',
                    userCls: 'reporting-fieldset no-padding',
                    title: 'Categories',
                    flex: 1,
                    minWidth:'150pt',
                    maxWidth:'200pt',
                    layout: {
                        type: 'vbox',
                        alignment: 'stretch'
                    },
                    height: '95%',
                    width: '100%',
                    reference: 'udcContainer',
                    items: [
                        {
                            xtype: 'toolbar',
                            ui: 'reporting-tree',
                            userCls:'no-background',
                            shadow: false,
                            items: [
                                {
                                    xtype: 'checkbox',
                                    ui: 'reporting',
                                    boxLabel: 'Check All',
                                    listeners: {
                                        change: 'onCategoriesCheckAllChange'
                                    }
                                }
                            ]
                        },
                        // User defined category selector
                        // === Replacement category selector
                        {
                            xtype: 'breeze-categories-list',
                            ui: 'employeeinfo-shift-grid',
                            flex: 1,
                            reference: 'categoryList',
                            // used by 'check all' listener
                            itemId: 'categories',
                            fieldMode: 'check',
                            itemConfig: {
                                ui: 'reporting-list-item'
                            },
                            bind: {
                                store: '{categoriesList}',
                            },
                            viewModel: true
                        }
                    ]
                }
            ]
        }
    ]

});