/**
 * Misc Accrual Policies Details Report form
 * @class AccrualPolicies
 * @namespace Breeze.view.reporting.misc.AccrualPolicies
 * @alias widget.reporting.misc.accrualpolicies
 */
Ext.define('Breeze.view.reporting.misc.AccrualPolicies', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.misc.accrualpolicies',

    config: {
        crumbTitle: 'Accrual Policies Report',
    },

    // View Model
    viewModel: {
        type: 'reporting.misc.accrualpolicies'
    },

    // Controller
    controller: 'reporting.misc.accrualpolicies',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Accrual Policies Report',

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
        pdf: { text: 'PDF', handler: 'onPrintPDF', ui: 'action', userCls: 'report-action-button' },
        excel: { text: 'Excel', handler: 'onPrintExcel', ui: 'action', userCls: 'report-action-button' },
        word: { text: 'Word', handler: 'onPrintWord', ui: 'action', userCls: 'report-action-button' },
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
            inline: true,
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
                    flex: 1,
                    // +++ fixed width +++
                    minWidth: '200pt',
                    maxWidth: '300pt',
                    layout: 'vbox',
                    items: [
                        // Tab panel containing projects
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            layout: 'vbox',
                            title: 'Accrual Policies',

                            // +++ added 'no-margin' to userCls
                            userCls: 'reporting-fieldset no-padding no-margin',

                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting',
                                xtype: 'breeze-checkbox'
                            },

                            items: [
                                // ++New 11/5++
                                // 'Check All' option for Accrual Policy list
                                {
                                    xtype: 'toolbar',
                                    ui: 'reporting-tree',
                                    userCls: 'no-background',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            ui: 'reporting',
                                            boxLabel: 'Check All Policies',
                                            listeners: {
                                                // New event listener added to Controller
                                                change: 'onSelectListCheckAllChange'
                                            }
                                        }
                                    ]
                                },
                                // ++New 11/5++
                                // Selector list control for Accrual Policies
                                {
                                    xtype: 'breeze-select-list',
                                    ui: 'employeeinfo-shift-grid',
                                    flex: 1,
                                    // Reference name and itemID needed for 
                                    // reading data and check all listener
                                    reference: 'accrualPolicyList',
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
                                        store: '{policyList}'
                                    },
                                    viewModel: true
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
                    minWidth: '200pt',
                    // +++ maxWidth width to prevent truncating +++
                    maxWidth: '300pt',
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
                    ]
                }
            ]
        }
    ]

});