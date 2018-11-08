/**
 * Misc Supervisors Report form
 * @class Supervisors
 * @namespace Breeze.view.reporting.misc.Supervisors
 * @alias widget.reporting.misc.supervisors
 */
Ext.define('Breeze.view.reporting.misc.Supervisors', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.misc.supervisors',

    // View Model
    viewModel: {
        type: 'reporting.misc.supervisors'
    },

    // Controller
    controller: 'reporting.misc.supervisors',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Supervisors Report',

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
                    // +++ minWidth width to prevent truncating +++
                    minWidth: '200pt',
                    // +++ maxWidth width to prevent truncating +++
                    maxWidth: '300pt',
                    layout: 'vbox',
                    defaults: {
                        userCls: 'reporting-fieldset no-side-margin',
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            title: 'Header Options',
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
                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting',
                                xtype: 'breeze-checkbox'
                            },
                            items: [
                                {
                                    inline: true,
                                    label: '',
                                    boxLabel: 'Show Supervisors\' Employees',
                                    bind: '{reportParams.ShowEmps}'
                                },
                                {
                                    name: 'headerCompanyLogo',
                                    inline: true,
                                    label: '',
                                    boxLabel: 'List Super Admin',
                                    bind: '{reportParams.superAdminList}',
                                    reference: 'listSuperAdmin'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            hidden: true,
                            title: 'Sort By',
                            bind: {
                                hidden: '{!listSuperAdmin.checked}'
                            },
                            items: [
                                {
                                    xtype: 'containerfield',
                                    reference: 'sortType',
                                    layout: 'vbox',
                                    defaults: {
                                        bodyAlign: 'stretch',
                                        ui: 'reporting',
                                        xtype: 'radio'
                                    },
                                    bind: {
                                        values: {
                                            // Attribute should match name used on radio buttons
                                            sortType: '{reportParams.sort_type}'
                                        }
                                    },
                                    items: [

                                        {
                                            name: 'sortType',
                                            inline: true,
                                            label: '',
                                            boxLabel: 'Department Name',
                                            value: 1,
                                            bind: {
                                                groupValue: '{reportParams.sort_type}'
                                            }
                                        },
                                        {
                                            name: 'sortType',
                                            inline: true,
                                            label: '',
                                            boxLabel: 'Supervisor Name',
                                            value: 2,
                                            bind: {
                                                groupValue: '{reportParams.sort_type}'
                                            }
                                        },
                                        {
                                            name: 'sortType',
                                            inline: true,
                                            label: '',
                                            boxLabel: 'Supervisor Role',
                                            value: 3,
                                            bind: {
                                                groupValue: '{reportParams.sort_type}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                }
            ]
        }
    ]

});