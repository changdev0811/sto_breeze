/**
 * Department QuickList Report form
 * @class QuickList
 * @namespace Breeze.view.reporting.misc.QuickList
 * @alias widget.reporting.misc.quicklist
 */
Ext.define('Breeze.view.reporting.misc.QuickList', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.misc.quicklist',

    config: {
        crumbTitle: 'QuickList Report',
    },

    // View Model
    viewModel: {
        type: 'reporting.misc.quicklist'
    },
    
    // Controller
    controller: 'reporting.misc.quicklist',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'QuickList Report',

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
                },

                // Third column container
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
                        },
                        {
                            xtype: 'selectfield',
                            ui: 'reporting reporting-text reporting-date',
                            label: 'Recording Year',
                            labelWidth: 'auto',
                            labelAlign: 'left',
                            store: 'Years',
                            displayField: 'Year', valueField: 'Year',
                            bind: { value: '{reportParams.recyear}' }
                        },
                        {
                            xtype: 'datefield',
                            name: 'finish',
                            label: '',
                            picker: {
                                xtype: 'datepicker',
                                title: 'As of Date'
                            },
                            bind: '{reportParams.sDate}'
                        }
                    ]
                },

                // Third Column Container
                // Weeks / Date Range
                {
                    xtype: 'container',
                    width: '220pt',
                    // flex: 1,
                    layout: 'vbox',
                    userCls: 'report-section-padding',
                    items: [
                        // ++New 11/5++ Placed mini calendar and range fields
                        // Inside a tab panel control
                        {
                            xtype: 'tabpanel',
                            // == New reference to identify this tab panel easily
                            reference: 'dateTabs',
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
                                // Week Range Tab
                                {
                                    xtype: 'panel', ui: 'reporting-tab-panel',
                                    // data for tab, used to set 'date_type'
                                    data: {
                                        type: 'weeks'
                                    },
                                    title: 'Week Range',
                                    layout: 'vbox',
                                    ui: 'reporting-panel',
                                    items: [
                                        {
                                            xtype: 'panel.minicalendar',
                                            reference: 'weekSelector',
                                            ui: 'light-minicalendar',//'wtr-small',
                                            tools: {
                                                previousMonth: {
                                                    ui: 'light-minicalendar'
                                                },
                                                nextMonth: {
                                                    ui: 'light-minicalendar'
                                                }
                                            },
                                            // collapsed: true,
                                            flex: 1,
                                            width: '100%',
                                            margin: '2pt 1pt 0pt 1pt',
                                            listeners: {
                                                dateselect: 'onWeekSelect',
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            flex: 1,
                                            layout: { type: 'fit', align: 'stretch' },
                                            title: 'Weeks Selected',
                                            userCls: 'reporting-fieldset no-margin',
                                            defaults: {
                                                bodyAlign: 'stretch',
                                                ui: 'reporting',
                                                xtype: 'breeze-checkbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    layout: 'hbox',
                                                    ui: 'employeeinfo-shift-grid',
                                                    columnResize: false,
                                                    hideHeaders: true,
                                                    sortable: false,
                                                    columnMenu: false,
                                                    bind: { store: '{selectedWeeks}' },
                                                    columns: [
                                                        {
                                                            dataIndex: 'startText',
                                                            menuDisabled: true,
                                                            flex: 1,
                                                            // Remove tool button
                                                            cell: {
                                                                toolDefaults: {
                                                                    ui: 'employeeinfo-grid-tool',
                                                                    zone: 'end',
                                                                },
                                                                tools: [
                                                                    {
                                                                        iconCls: 'x-fa fa-times',
                                                                        handler: 'onWeekRemoveTool'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                // Date Range Tab
                                {
                                    xtype: 'panel', ui: 'reporting-tab-panel',
                                    title: 'Date Range',
                                    // data for tab, used to set 'date_type'
                                    data: {
                                        type: 'date_range'
                                    },
                                    layout: 'vbox',
                                    ui: 'reporting-panel',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            layout: 'vbox',
                                            itemId: 'fields',
                                            // title: 'Submission Type',
                                            userCls: 'reporting-fieldset no-margin employeeinfo-shift-grid',

                                            defaults: {
                                                bodyAlign: 'stretch',
                                                ui: 'reporting reporting-text reporting-date',
                                                xtype: 'datefield'
                                            },
                                            items: [
                                                {
                                                    label: 'From',
                                                    picker: {
                                                        xtype: 'datepicker',
                                                        title: 'From Date'
                                                    },
                                                    bind: '{reportParams.dStart}',
                                                    //required: true
                                                },
                                                {
                                                    label: 'To',
                                                    picker: {
                                                        xtype: 'datepicker',
                                                        title: 'To Date'
                                                    },
                                                    bind: '{reportParams.dEnd}',
                                                    //required: true
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                    ]
                    /*
                    items: [
                        {
                            xtype: 'panel.minicalendar',
                            reference: 'weekSelector',
                            ui: 'light-minicalendar',//'wtr-small',
                            tools: {
                                previousMonth: {
                                    ui: 'light-minicalendar'
                                },
                                nextMonth: {
                                    ui: 'light-minicalendar'
                                }
                            },
                            // collapsed: true,
                            flex: 1,
                            width: '100%',
                            margin: '0pt 10pt 0pt 10pt',
                            listeners: {
                                dateselect: 'onWeekSelect',

                            }
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            layout: { type: 'fit', align: 'stretch' },
                            title: 'Weeks Selected',
                            userCls: 'reporting-fieldset',
                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting',
                                xtype: 'breeze-checkbox'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    layout: 'hbox',
                                    ui: 'employeeinfo-shift-grid',
                                    columnResize: false,
                                    hideHeaders: true,
                                    sortable: false,
                                    columnMenu: false,
                                    bind: { store: '{selectedWeeks}' },
                                    columns: [
                                        {
                                            dataIndex: 'startText',
                                            menuDisabled: true,
                                            flex: 1,
                                            // Remove tool button
                                            cell: {
                                                toolDefaults: {
                                                    ui: 'employeeinfo-grid-tool',
                                                    zone: 'end',
                                                },
                                                tools: [
                                                    {
                                                        iconCls: 'x-fa fa-times',
                                                        handler: 'onWeekRemoveTool'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        },

                    ]
                    */
                }
            ]
        }
    ]

});