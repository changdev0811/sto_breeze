/**
 * Misc Policy Report form
 * @class Policy
 * @namespace Breeze.view.reporting.misc.Policy
 * @alias widget.reporting.misc.policy
 */
Ext.define('Breeze.view.reporting.misc.Policy', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.misc.policy',

    config: {
        crumbTitle: 'Policy Report',
    },

    // View Model
    viewModel: {
        type: 'reporting.misc.policy'
    },
    
    // Controller
    controller: 'reporting.misc.policy',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Policy Report',

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
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            layout: 'vbox',
                            title: 'Policies',
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
                                            boxLabel: 'Check All',
                                            listeners: {
                                                change: 'onSelectListCheckAllChange'
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
                                    reference: 'policyList',
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
                                        store: '{policiesList}',
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
                            xtype: 'fieldset',
                            layout: 'vbox',
                            title: 'Report Options',
                            userCls: 'reporting-fieldset',

                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting',
                                xtype: 'breeze-checkbox'
                            },
                            items: [
                                {
                                    inline: true,
                                    label: '',
                                    boxLabel: 'Print Blank Policy Checklist',
                                    bind: '{reportParams.printBlank}'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});