/**
 * Department Overtime Check Report form
 * @class OvertimeCheck
 * @namespace Breeze.view.reporting.department.OvertimeCheck
 * @alias widget.reporting.department.overtimecheck
 */
Ext.define('Breeze.view.reporting.department.OvertimeCheck', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.department.overtimecheck',

    config: {
        crumbTitle: 'Overtime Check Report',
    },

    // View Model
    viewModel: {
        type: 'reporting.department.overtimecheck'
    },
    
    // Controller
    controller: 'reporting.department.overtimecheck',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Overtime Check Report',

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
                    minWidth:'200pt',
                    // +++ maxWidth width to prevent truncating +++
                    maxWidth:'300pt',
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
                            xtype: 'checkbox',
                            labelAlign: 'top',
                            boxLabel: 'HH:MM Format',
                            bodyAlign: 'stretch',
                            ui: 'reporting',
                            name: 'time_format',
                            bind: '{reportParams.hhmm_format}'
                        },
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        ui: 'reporting reporting-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            flex: 2,
                                            bodyAlign: 'stretch',
                                            inline: true,
                                            name: 'valType',
                                            value: 1,
                                            boxLabel: 'Daily Hours',
                                            reference: 'dailyHours',
                                            bind: {
                                                groupValue: '{valType}'
                                            },
                                            listeners: {
                                                change: 'radioChange'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            flex: 1,
                                            name: 'daily_hours',
                                            decimals: 2,
                                            stepValue: 0.5,
                                            bind: {
                                                // readOnly and disabled change based on
                                                // checked state of radio with reference
                                                // dailyHours
                                                readOnly: '{!dailyHours.checked}',
                                                disabled: '{!dailyHours.checked}',
                                                value: '{ot_hours_daily}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        ui: 'reporting reporting-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            flex: 2,
                                            bodyAlign: 'stretch',
                                            name: 'valType',
                                            value: 2,
                                            boxLabel: 'Weekly Hours',
                                            reference: 'weeklyHours',
                                            bind: {
                                                groupValue: '{valType}'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            flex: 1,
                                            name: 'weekly_hours',
                                            decimals: 2,
                                            stepValue: 0.5,
                                            bind: {
                                                readOnly: '{!weeklyHours.checked}',
                                                disabled: '{!weeklyHours.checked}',
                                                value: '{ot_hours_weekly}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },

                // Third Column Container
                {
                    xtype: 'container',
                    width: '220pt',
                    // flex: 1,
                    layout: 'vbox',
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
                }
            ]
        }
    ]

});