/**
 * Employee Details Report form
 * @class Details
 * @namespace Breeze.view.reporting.employee.Details
 * @alias widget.reporting.employee.details
 */
Ext.define('Breeze.view.reporting.employee.Details', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.employee.details',

    config: {
        crumbTitle: 'Employee Details Report',
    },

    // View Model
    viewModel: {
        type: 'reporting.employee.details'
    },
    
    // Controller
    controller: 'reporting.employee.details',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Employee Details Report',

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
            scrollable: 'x',
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
                            // +++ Added active item to select default tab (0 = departments, 1 = employees, activeItem:INDEX,) +++
                            activeItem: 1,
                            flex: 1,
                            items: [
                                // Departments tab
                                {
                                    xtype: 'panel', ui: 'reporting-tab-panel',
                                    // == Item ID for each tab to allow us to see which is active
                                    itemId: 'departments',
                                    title: 'Departments',
                                    layout: 'fit',

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
                                    xtype: 'panel', ui: 'reporting-tab-panel',
                                    title: 'Employees',
                                    // == Item ID for panel 
                                    itemId: 'employees',
                                    layout: 'fit',
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
                    maxWidth: '200pt',
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
                                ui: 'reporting reporting-no-padding',
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
                            title: 'Report Options',
                            userCls: 'reporting-fieldset',

                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting reporting-no-padding',
                                xtype: 'breeze-checkbox'
                            },
                            items: [
                                {
                                    name: 'ShowAdjust',
                                    inline: true,
                                    label: '',
                                    boxLabel: 'Show Adjustments',
                                    bind: '{reportParams.showadjust}'
                                },
                                {
                                    name: 'ShowNotes',
                                    label: '',
                                    labelMinWidth: 0,
                                    boxLabel: 'Show Notes',
                                    bind: '{reportParams.shownotes}'
                                },
                                {
                                    name: 'ShowNotesOnly',
                                    label: '',
                                    boxLabel: 'Show Notes Only',
                                    bind: '{reportParams.notesonly}'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'reporting-fieldset',
                            title: 'Date Range',
                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting reporting-text reporting-date'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'start',
                                    label: 'From',
                                    // picker: {
                                    //     xtype: 'datepicker',
                                    //     title: 'Start Date'
                                    // },
                                    bind: '{reportParams.sdate}'
                                    // bind: '{reportParams.dStart}'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'finish',
                                    label: 'To',
                                    // picker: {
                                    //     xtype: 'datepicker',
                                    //     title: 'End Date'
                                    // },
                                    bind: '{reportParams.edate}'
                                    // bind: '{reportParams.dEnd}'
                                }

                            ]
                        }
                    ]
                },
                // Third Column Container
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
                },
                // Fourth Column Container
                // Projects Form Fields
                {
                    xtype: 'container',
                    flex: 1,
                    // +++ fixed width +++
                    minWidth:'180pt',
                    maxWidth:'220pt',
                    layout: 'vbox',
                    items: [
                        // Tab panel containing projects
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            layout: 'vbox',
                            // ++New++ Bind config caption for 'Projects' to title
                            // Removed explicit 'title' text
                            bind: {
                                title: '{captions.projectPlural}'
                            },
                            userCls: 'reporting-fieldset no-padding',

                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting',
                                xtype: 'breeze-checkbox'
                            },
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
                                                change: 'onSelectListCheckAllChange'
                                            }
                                        }
                                    ]
                                },
                                // Projects list
                                {
                                    xtype: 'breeze-categories-list',
                                    ui: 'employeeinfo-shift-grid',
                                    flex: 1,
                                    reference: 'projectList',
                                    // used by 'check all' listener
                                    itemId: 'selectList',
                                    fieldMode: 'check',
                                    itemConfig: {
                                        ui: 'reporting-list-item',
                                        templates: {
                                            radioValue: '{record.ID}',
                                            itemData: { name: '{record.Name}' },
                                            itemTpl: '<div class="breeze-dataview-select-item-label">{name}</div>'
                                        }
                                    },
                                    bind: {
                                        store: '{projectsList}',
                                    },
                                    viewModel: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            title: 'Submission Type',
                            userCls: 'reporting-fieldset',

                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting',
                                xtype: 'breeze-checkbox'
                            },
                            items: [
                                {
                                    name: 'approved_option',
                                    inline: true,
                                    label: '',
                                    checked: true,
                                    boxLabel: 'Approved Time',
                                    bind: '{reportParams.submit_approve}'
                                },
                                {
                                    name: 'submitted_option',
                                    label: '',
                                    labelMinWidth: 0,
                                    boxLabel: 'Submitted Time',
                                    bind: '{reportParams.submit_submit}'
                                },
                                {
                                    name: 'unsubmitted_option',
                                    label: '',
                                    boxLabel: 'Un-Submitted Time',
                                    bind: '{reportParams.submit_unsubmit}'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});