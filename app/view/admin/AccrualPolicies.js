/**
 * AccrualPolicies Report form
 * @class AccrualPolicies
 * @namespace Breeze.view.admin.AccrualPolicies
 * @alias widget.admin.AccrualPolicies
 */
Ext.define('Breeze.view.admin.AccrualPolicies', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.accrualpolicies',

    // Layout and base styles
    layout: 'hbox',
    ui: 'wtr-panel',

    title: 'Accrual Policies',

    // Action buttons shown at bottom of panel
    buttonAlign: 'center',
    buttons: {
        pdf: { text: 'Save Accrual Policy', /* handler: 'onPrintPDF',*/ ui: 'action' },
        excel: { text: 'Save and Apply to Employees', /* handler: 'onPrintExcel',*/ ui: 'action' },
    },

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [
        {    
            xtype: 'panel',
            title: 'Policies',
            ui: 'admin-sub',
            flex: 1,
            layout: 'vbox',
            items:[
                {
                    xtype: 'container',
                    userCls:'admin-fieldset',
                    flex: 1,
                    layout: 'vbox',
                },
                {


                    xtype: 'breeze-textfield',
                    label: 'Setting Name',
                    name: 'reportTitle',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset-no-border',

                },
                {
                    xtype: 'fieldset',
                    userCls:'admin-fieldset',
                    title: 'Recording Model',
                    height:'45pt',
                    layout: 'hbox',

                    defaults: {
                        bodyAlign: 'stretch',
                        ui: 'admin',
                        xtype: 'radio'
                    },
                    items: [
                        {
                            flex: 1,
                            name: 'condType',
                            id: 'radio1',
                            value: '20',
                            boxLabel: 'Days',
                        },
                        {
                            flex: 1,
                            name: 'condType',
                            id: 'radio2',
                            value: '21',
                            boxLabel: 'Weeks',
                        }
                    ]



                },
                {
                    xtype: 'fieldset',
                    userCls:'admin-fieldset',
                    title: 'Shift Information',
                    height:'60pt',
                    layout: 'vbox',
                },
            ]
        },
        {
            
            xtype: 'panel',
            title: 'List of Categories',
            ui: 'admin-sub',
            flex: 1,
            layout: 'vbox',
            items:[
                {

                    xtype: 'container',
                    userCls:'admin-fieldset',
                    flex: 1,
                    layout: 'vbox',
                }
            ]
        },
        {
            xtype: 'panel',
            title: 'Illness Information',
            ui: 'admin-sub',
            flex: 2,
            layout: 'vbox',
            items:[
                
                {
                    xtype: 'container',
                    layout: 'hbox',
                    height:'55pt',
                    items:[
                        {
                            xtype: 'fieldset',
                            userCls:'admin-fieldset',
                            title: 'Recording Year Type',
                            layout: 'hbox',
                            flex:1,

                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'reporting',
                                xtype: 'radio'
                            },
                            items: [
                                {
                                    flex: 1,
                                    name: 'condType',
                                    id: 'radio3',
                                    boxLabel: 'Anniversary',
                                },
                                {
                                    flex: 1,
                                    name: 'condType',
                                    id: 'radio4',
                                    boxLabel: 'Calendar',
                                },
                                {
                                    flex: 1,
                                    name: 'condType',
                                    id: 'radio5',
                                    boxLabel: 'Fiscal',
                                }
                            ]



                        },
                        {
                            xtype: 'fieldset',
                            userCls:'admin-fieldset',
                            title: 'Start Accruing After:',
                            layout: 'hbox',
                            flex:1,
                            defaults: {
                                ui: 'reporting reporting-text'
                            },
                            items: [
                                {
                                    xtype: 'spinnerfield',
                                    name: 'saa1',
                                    label: '',
                                    flex: 1,
                                    style: 'padding-left: 4pt',
                                    //bind: '{reportParams.conditional_amt}'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'saa2',
                                    flex: 2,
                                    //bind: '{reportParams.conditional}'
                                },
                            ]
                        },

                    ]

                },

                {
                    xtype: 'container',
                    layout: 'hbox',
                    height:'55pt',
                    items:[
                        {
                            xtype: 'fieldset',
                            userCls:'admin-fieldset',
                            title: 'Cap Accruals At:',
                            layout: 'hbox',
                            flex:1,

                            defaults: {
                                ui: 'reporting reporting-text'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    name: 'ca1',
                                    flex: 2,
                                    //bind: '{reportParams.conditional}'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'ca2',
                                    flex: 2,
                                    //bind: '{reportParams.conditional}'
                                },
                            ]



                        },
                        {
                            xtype: 'fieldset',
                            userCls:'admin-fieldset',
                            title: 'Cap Balance At:',
                            layout: 'hbox',
                            flex:1,


                            defaults: {
                                ui: 'reporting reporting-text'
                            },
                            items: [
                                {
                                    xtype: 'spinnerfield',
                                    name: 'cb1',
                                    label: '',
                                    flex: 1,
                                    style: 'padding-left: 4pt',
                                    //bind: '{reportParams.conditional_amt}'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'cb2',
                                    flex: 2,
                                    //bind: '{reportParams.conditional}'
                                },
                            ]



                        },

                    ]

                },
                {
                    xtype: 'fieldset',
                    userCls:'admin-fieldset',
                    title: 'Recording Model',
                    height:'45pt',
                    layout: 'hbox',
                    flex:1
                },
                {
                    xtype: 'fieldset',
                    userCls:'admin-fieldset',
                    title: 'Recording Model',
                    height:'45pt',
                    layout: 'hbox',
                    flex:1
                },
            ]
        },

    ]

});