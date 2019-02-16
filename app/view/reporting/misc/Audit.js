/**
 * Misc Audit Report form
 * @class Audit
 * @namespace Breeze.view.reporting.misc.Audit
 * @alias widget.reporting.misc.audit
 */
Ext.define('Breeze.view.reporting.misc.Audit', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.misc.audit',

    config: {
        crumbTitle: 'Audit Report',
    },

    // View Model
    viewModel: {
        type: 'reporting.misc.audit'
    },
    
    // Controller
    controller: 'reporting.misc.audit',

    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'reporting-base',

    title: 'Audit Report',

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
                    flex: 1,
                    // +++ minWidth width to prevent truncating +++
                    minWidth:'200pt',
                    // +++ maxWidth width to prevent truncating +++
                    maxWidth:'300pt',
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
                                    bind: '{reportParams.dStart}'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'finish',
                                    label: 'To',
                                    bind: '{reportParams.dEnd}'
                                }

                            ]
                        },
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            title: 'Optional Parameters',
                            defaults: {
                                bodyAlign: 'stretch'
                            },
                            items: [
                                // ++New 11/5++ Search string field
                                {
                                    label: 'Search String',
                                    inline: true,
                                    ui: 'reporting reporting-text',
                                    xtype: 'breeze-textfield',
                                    bind: {
                                        value: '{reportParams.searchString}'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});