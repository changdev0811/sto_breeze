/**
 * Employee Time Activity Report form
 * @class TimeActivity
 * @namespace Breeze.view.reporting.employee.TimeActivity
 * @alias widget.reporting.employee.timeactivity
 */
Ext.define('Breeze.view.reporting.employee.TimeActivity', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.employee.timeactivity',

    // View Model
    viewModel: {
        type: 'reporting.employee.timeactivity'
    },
    
    // Controller
    controller: 'reporting.employee.timeactivity',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Employee Time Activity Report',

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
                // Second column
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
                            userCls: 'reporting-fieldset',
                            title: 'Date Range',
                            defaults: {
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
                        }
                    ]
                },
                // Third column
                {
                // Container for User-Defined Categories list
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
                                store: '{categoriesList}'
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