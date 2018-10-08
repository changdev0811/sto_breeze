/**
 * Department Daily Totals Report form
 * @class DailyTotals
 * @namespace Breeze.view.reporting.department.DailyTotals
 * @alias widget.reporting.department.dailytotals
 */
Ext.define('Breeze.view.reporting.department.DailyTotals', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.department.dailytotals',


    /* +++ Remove the requires;[], array  +++ */


    // View Model

    viewModel: {
        type: 'reporting.department.dailytotals'
    },
    
    // Controller

    controller: 'reporting.department.dailytotals',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Department Daily Totals Report',

    // Action buttons shown at bottom of panel
    /* +++ Updated buttons class / alignment  +++ */
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
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        // Tab panel containing departments and employees
                        {
                            xtype: 'tabpanel',
                            /* +++ New layout:{}, +++ */
                            layout: {
                                animation: 'fade'
                            },
                            /* +++ Update to ui: +++ */
                            ui: 'employeeInfoTabs', //'reporting-tabs',
                            /* +++ New tabBar:{}, +++ */
                            tabBar: {
                                defaultTabUI: 'employeeInfoTabs',
                                shadow: false,
                            },  
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
                                        /* +++ New shadow:false, property +++ */
                                        shadow: false,
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                /* +++ New ui property +++ */
                                                ui: 'reporting',
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
                                            /* +++ New ui: property +++ */
                                            ui: 'employeeinfo-shift-grid',
                                            /* +++ New userCls: property +++ */
                                            userCls:'employeeinfo-shift-grid',
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
                                                    /* +++ New cel:{} +++ */
                                                    cell:{
                                                        ui:'report-tree-column',
                                                    },
                                                    /* +++ New dataIndex +++ */
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
                                        /* +++ New shadot:false property +++ */
                                        shadow: false,
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                /* +++ New ui: property +++ */
                                                ui: 'reporting',
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
                                            /* +++ New ui: property +++ */
                                            ui: 'employeeinfo-shift-grid',
                                            /* +++ New user:Cls: property +++ */
                                            userCls:'employeeinfo-shift-grid',
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
                                                    /* +++ New cell:{} property +++ */
                                                    cell:{
                                                        ui:'report-tree-column',
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
                            checked: true,
                            bodyAlign: 'stretch',
                            ui: 'reporting'
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
                            /* +++  Updated userCls: property +++ */
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
                            /* +++  Updated userCls: property +++ */
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
                            xtype: 'checkbox',
                            labelAlign: 'top',
                            boxLabel: 'HH:MM Format',
                            bodyAlign: 'stretch',
                            ui: 'reporting',
                            checked: true,
                            name: 'time_format',
                            bind: '{reportParams.hhmm_format}'
                        }
                    ]
                },
                // Third Column Container
                // Container for User-Defined Categories list
                {
                    xtype: 'container',
                    // userCls: 'reporting-fieldset',
                    // title: 'Categories',
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
                        // User defined categories tree control
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
                },
                // Fourth Column Container
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        // Tab panel containing projects
                        {
                            xtype: 'tabpanel',
                            /* +++ New layout:{}, +++ */
                            layout: {
                                animation: 'fade'
                            },
                            /* +++ Update to ui: +++ */
                            ui: 'employeeInfoTabs', //'reporting-tabs',
                            /* +++ New tabBar:{}, +++ */
                            tabBar: {
                                defaultTabUI: 'employeeInfoTabs',
                                shadow: false,
                            },  
                            flex: 1,
                            items: [
                                // Projects tab
                                {
                                    xtype: 'panel',
                                    title: 'Projects',
                                    layout: 'fit',

                                    // Toolbar containing 'check all' toggle checkbox
                                    tbar: {
                                        xtype: 'toolbar',
                                        ui: 'reporting-tree',
                                        /* +++ New shadow:false, property +++ */
                                        shadow: false,
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                /* +++ New ui property +++ */
                                                ui: 'reporting',
                                                boxLabel: 'Check All',
                                                listeners: {
                                                    change: 'onTreeGridCheckAllChange'
                                                }
                                            }
                                        ]
                                    },

                                    items: [
                                        // Projects tree
                                        {
                                            xtype: 'tree',
                                            /* +++ New ui: property +++ */
                                            ui: 'employeeinfo-shift-grid',
                                            /* +++ New userCls: property +++ */
                                            userCls:'employeeinfo-shift-grid',
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
                                                    /* +++ New cel:{} +++ */
                                                    cell:{
                                                        ui:'report-tree-column',
                                                    },
                                                    /* +++ New dataIndex +++ */
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
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            title: 'Submission Type',
                            /* +++  Updated userCls: property +++ */
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

                    ]
                }
            ]
        }
    ]

});