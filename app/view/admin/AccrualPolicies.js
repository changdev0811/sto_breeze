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
        save: { name: 'save_button', text: 'Save Accrual Policy', /* handler: 'onPrintPDF',*/ ui: 'action' },
        apply: { name: 'apply_button_container', text: 'Save and Apply to Employees', /* handler: 'onPrintExcel',*/ ui: 'action' },
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
            xtype:'container',
            flex:1,
            layout:'vbox',
            items:[
                {    
                    xtype: 'panel',
                    title: 'Policies',
                    ui: 'admin-sub' ,
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
                    xtype: 'breeze-textfield',
                    label: 'Setting Name',
                    name: 'setting_name_label',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset-no-border',

                },
                {
                    xtype: 'fieldset',
                    name: 'recording_mode',
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
                            name: 'recording_mode',
                            value: '20',
                            boxLabel: 'Days',
                        },
                        {
                            flex: 1,
                            name: 'recording_mode',
                            value: '21',
                            boxLabel: 'Weeks',
                        }
                    ]
                },
                {    
                    xtype: 'panel',
                    title:'Shift Information',
                    ui: 'admin-sub' ,
                    flex: 1,
                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'container',
                            userCls:'admin-fieldset',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'grid',
                                    height: '200px',
                                    ui: 'employeeinfo-shift-grid',
                                    reference: 'shiftSegmentGrid',
                                    //userCls: 'employee-info-grid',
                                    striped: true,
                                    sortable: false,
                                    columnResize: false,
                                    columnMenu: null,
                                    layout: 'hbox',
                                    // Plugin allowing editability
                                    plugins: [
                                        {
                                            pluginId: 'shiftEdit',
                                            type: 'gridcellediting'
                                        }
                                    ],
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            ui: 'employeeinfo-shift-grid',
                                            align: 'center',
                                            text: 'Start',
                                            dataIndex: 'StartTime',
                                            menuDisabled: true,
                                            flex: 1,
                                            
                                            //bind: { editable: '{!readOnly}' }
                                            
                                        },
                                        {
                                            xtype: 'templatecolumn',
                                            tpl: ['-'],
                                            align: 'center',
                                            width: '2em',
                                            menuDisabled: true
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            ui: 'employeeinfo-shift-grid',
                                            align: 'center',
                                            text: 'Stop',
                                            dataIndex: 'StopTime',
                                            menuDisabled: true,
                                            flex: 1
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
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
                            name: 'category_recording_year_type',
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
                                    name: 'recording_year_type',
                                    boxLabel: 'Anniversary',
                                },
                                {
                                    flex: 1,
                                    name: 'recording_year_type',
                                    boxLabel: 'Calendar',
                                },
                                {
                                    flex: 1,
                                    name: 'recording_year_type',
                                    boxLabel: 'Fiscal',
                                }
                            ]



                        },
                        {
                            xtype: 'fieldset',
                            name: 'category_waiting_period_data',
                            userCls:'admin-fieldset',
                            title: 'Start Accruing After',
                            layout: 'hbox',
                            flex:1,
                            defaults: {
                                ui: 'reporting reporting-text'
                            },
                            items: [
                                {
                                    xtype: 'spinnerfield',
                                    flex: 1,
                                    style: 'padding-left: 4pt',
                                    name: 'category_new_time',
                                    allowDecimals: false,
                                    minValue: 0 
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 2,
                                    name: 'category_new_rate',
                                    allowBlank: false,
                                    editable: false,
                                    displayField: 'Description',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    valueField: 'ID'
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
                            name: 'category_accrual_cap_data',
                            userCls:'admin-fieldset',
                            title: 'Cap Accruals At',
                            layout: 'hbox',
                            flex:1,

                            defaults: {
                                ui: 'reporting reporting-text'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    name: 'category_accrual_cap_amount',
                                    decimalPrecision: 2,
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    name: 'category_accrual_cap_unit',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['code', 'description'],
                                        data: [
                                            { "code": 48, "description": "Days" },
                                            { "code": 49, "description": "Hours" },
                                            { "code": 50, "description": "Minutes" }

                                        ]
                                    }),
                                    valueField: 'code',
                                    displayField: 'description'


                                },
                            ]



                        },
                        {
                            xtype: 'fieldset',
                            name: 'category_balance_cap_data',
                            userCls:'admin-fieldset',
                            title: 'Cap Balance At',
                            layout: 'hbox',
                            flex:1,


                            defaults: {
                                ui: 'reporting reporting-text'
                            },
                            items: [
                                {
                                    xtype: 'spinnerfield',
                                    name: 'category_balance_cap_amount',
                                    flex: 1,
                                    style: 'padding-left: 4pt',
                                    decimalPrecision: 2,
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 2,
                                    name: 'category_balance_cap_unit',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['code', 'description'],
                                        data: [
                                            { "code": 48, "description": "Days" },
                                            { "code": 49, "description": "Hours" },
                                            { "code": 50, "description": "Minutes" }

                                        ]
                                    }),
                                    valueField: 'code',
                                    displayField: 'description'
                                },
                            ]



                        },

                    ]

                },
                {
                    xtype: 'fieldset',
                    userCls:'admin-fieldset',
                    title: '',
                    height:'45pt',
                    layout: 'hbox',
                    flex:1
                },
                {
                    xtype: 'fieldset',
                    userCls:'admin-fieldset',
                    title: '',
                    height:'45pt',
                    layout: 'hbox',
                    flex:1
                },
            ]
        },

    ]

});