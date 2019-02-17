/**
 * Department Security Report form
 * @class Security
 * @namespace Breeze.view.reporting.department.Deptprofile
 * @alias widget.reporting.department.security
 */
Ext.define('Breeze.view.reporting.department.Security', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.department.security',

    config: {
        crumbTitle: 'Security Report',
    },

    // View Model
    viewModel: {
        type: 'reporting.department.security'
    },
    
    // Controller
    controller: 'reporting.department.security',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Security Report',

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
                // +++ Single Tab Tree Solution ()
                {
                    xtype: 'container',
                    flex: 1,
                    // +++ fixed width +++
                    // +++ maxWidth to prevent expanding beyond tab selector +++
                    maxWidth:'298pt',
                    // +++ minWidth reasonable width to prevent most truncating +++
                    minWidth:'200pt',
                    layout: 'vbox',
                    items: [
                        // fieldset containing toolbar & departments
                        {
                            xtype: 'fieldset',
                            reference: 'departments',
                            flex: 1,
                            layout: 'vbox',
                            title: 'Departments',
                            userCls: 'reporting-fieldset no-padding no-margin',

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
                                            boxLabel: 'Check All Departments',
                                            listeners: {
                                               change: 'onCheckAllChange'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tree',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'tree',
                                    flex:1,
                                    ui: 'employeeinfo-shift-grid',
                                    //userCls:'employeeinfo-shift-grid',
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    expanderFirst: true,
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
                                    reference: 'departmentsTree',
                                    // TODO: Update binding once projects API call is available
                                    bind: { 
                                        store: '{departmentsList}'
                                    }

                                }
                            ]
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
                        }
                    ]
                }
            ]
        }
    ]

});