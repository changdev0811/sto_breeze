/**
 * AccrualPolicies Admin view
 * @class AccrualPolicies
 * @namespace Breeze.view.admin.AccrualPolicies
 * @alias widget.admin.AccrualPolicies
 */
Ext.define('Breeze.view.admin.AccrualPolicies', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.accrualpolicies',

    // View Model
    viewModel: {
        type: 'admin.accrualpolicies'
    },

    // Controller
    controller: 'admin.accrualpolicies',
    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',

    title: 'Accrual Policies',

    // Action buttons shown at bottom of panel
    buttonAlign: 'center',
    buttons: {
        save: { name: 'save_button', text: 'Save Accrual Policy', /* handler: 'onPrintPDF',*/ ui: 'action', style:'width:200pt' },
        apply: { name: 'apply_button_container', text: 'Save and Apply to Employees', /* handler: 'onPrintExcel',*/ ui: 'action', style:'width:200pt' },
    },

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [

        // Main horizontal arranging container
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            // +++ Allow h scroll when panel is too small +++
            scrollable:'x',
            items: [

                // Column 1
                {
                    xtype:'container',
                    flex:1,

                    // +++ fixed width +++
                    minWidth:'150pt',
                    maxWidth:'200pt',

                    layout:'vbox',
                    items:[
                        {    
                            xtype: 'fieldset',
                            userCls:'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items:[
                                {
                                    xtype: 'toolbar',
                                    ui:'admin-tree',
                                            shadow: false,

                                    items:[

                                        { 
                                            xtype: 'component', 
                                            html: 'Policies',
                                            userCls:'admin-title-toolbar', 
                                        },

                                        {
                                            xtype:'spacer',
                                            flex:1,

                                        },
                    
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls:'x-fas fa-plus',
                                            ui: 'plain wtr-button',                   
                                        },

                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls:'x-fas fa-minus',
                                            ui: 'plain wtr-button',                   

                                        },
                                    ]
                                },

                                {
                                    xtype: 'tree',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'tree',
                                    ui: 'employeeinfo-shift-grid',
                                    userCls: 'employeeinfo-shift-grid no-border no-background',
                                    flex:1,
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'checkcolumn',
                                            cell: {
                                                ui: 'admin-tree-column admin-tree-item',
                                            },
                                            dataIndex: 'checked',
                                            minWidth: '2em',
                                            width: 'auto',
                                            padding: 0,
                                            //listeners: {
                                            //    checkChange: 'onTreeGridChecked'
                                            //}
                                        },
                                        {
                                            xtype: 'treecolumn',
                                            cell: {
                                                ui: 'admin-tree-column admin-tree-item',
                                            },
                                            dataIndex: 'text',
                                            flex: 1,
                                            layout: {
                                                alignment: 'stretch'
                                            }
                                        }
                                    ],

                                    bind: '{departmentsTree}'
                                },



                            ]
                        },
                        {
                            xtype: 'breeze-textfield',
                            label: 'Setting Name',
                            name: 'setting_name_label',
                            ui: 'admin admin-text',
                            userCls:'admin-fieldset no-border',

                        },
                        {
                            xtype: 'fieldset',
                            name: 'recording_mode',
                            userCls:'admin-fieldset',
                            title: 'Recording Model',
                            height:'45pt',
                            layout: 'vbox',
                            flex:1,
                            minHeight:'55pt',
                            maxHeight:'55pt',


                            items: [
                                {
                                    xtype: 'containerfield',
                                    reference: 'recordingMode',
                                    layout: 'hbox',
                                    defaults: {
                                        bodyAlign: 'stretch',
                                        ui: 'admin',
                                        xtype: 'radio'
                                    },
                                    bind: {
                                        values: {
                                            recMode: '{policy.recMode}'
                                        }
                                    },
                                    items: [
                                        {
                                            flex: 1,
                                            name: 'recMode',
                                            boxLabel: 'Days',
                                            value: '20',
                                            bind: {
                                                groupValue: '{recordingMode.recMode}'
                                            }
                                        },
                                        {
                                            flex: 1,
                                            name: 'recMode',
                                            boxLabel: 'Hours',
                                            value: '21',
                                            bind: {
                                                groupValue: '{recordingMode.recMode}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },



                        {    
                            xtype: 'fieldset',
                            userCls:'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items:[
                                {
                                    xtype: 'toolbar',
                                    ui:'admin-tree',
                                    shadow: false,
                                    items:[

                                        { 
                                            xtype: 'component', 
                                            html: 'Shift Information',
                                            userCls:'admin-title-toolbar', 
                                        },

                                        {
                                            xtype:'spacer',
                                            flex:1,

                                        },
                    
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls:'x-fas fa-plus',
                                            ui: 'plain wtr-button',                   
                                        },

                                    ]
                                },

                                {
                                    xtype: 'tree',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'tree',
                                    ui: 'employeeinfo-shift-grid',
                                    userCls: 'employeeinfo-shift-grid no-border no-background',
                                    flex:1,
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'checkcolumn',
                                            cell: {
                                                ui: 'admin-tree-column admin-tree-item',
                                            },
                                            dataIndex: 'checked',
                                            minWidth: '2em',
                                            width: 'auto',
                                            padding: 0,
                                            //listeners: {
                                            //    checkChange: 'onTreeGridChecked'
                                            //}
                                        },
                                        {
                                            xtype: 'treecolumn',
                                            cell: {
                                                ui: 'admin-tree-column admin-tree-item',
                                            },
                                            dataIndex: 'text',
                                            flex: 1,
                                            layout: {
                                                alignment: 'stretch'
                                            }
                                        }
                                    ],

                                    bind: '{departmentsTree}'
                                },



                            ]
                        },
                    ]
                },
                // Column 2
                { 
                    xtype: 'fieldset',
                    title: 'List of Categories',
                    userCls:'admin-fieldset no-padding',

                    flex: 1,
                    // +++ fixed width +++
                    minWidth:'150pt',
                    maxWidth:'200pt',


                    layout: {
                        type: 'fit',
                        alignment: 'stretch'
                    },
                    items: [
                        // User defined category selector
                        // === Replacement category selector
                        {
                            xtype: 'breeze-categories-list',
                            ui: 'admin-shift-grid',
                            userCls: 'admin-fieldset no-background no-margin no-border',
                            reference: 'categoryList',
                            fieldMode: 'none',
                            itemConfig: {
                                ui: 'admin-list-item-select'
                            },
                            bind: {
                                store: '{categoriesList}',
                            },
                            viewModel: true
                        }
                    ]
                },
                // Column 3
                {
                    xtype: 'panel',
                    title: 'Illness Information',
                    

                       


                    ui: 'admin-sub',


                    flex: 2,

                    // +++ fixed width +++
                    minWidth:'400pt',
                    maxWidth:'400pt',

                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'container',
                            userCls: 'admin-fieldset no-border',
                            layout: 'hbox',
                            flex:1,
                            maxHeight:'55pt',
                            minHeight:'55pt',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    name: 'category_recording_year_type',
                                    userCls:'admin-fieldset no-margin',
                                    title: 'Recording Year Type',
                                    layout: 'hbox',
                                    flex:3,

                                    defaults: {
                                        bodyAlign: 'stretch',
                                        ui: 'admin',
                                        xtype: 'radio'
                                    },
                                    items: [
                                        {
                                            flex: 1.25,
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
                                    ui: 'admin-base',
                                    userCls:'admin-fieldset',
                                    title: 'Start Accruing After',
                                    layout: 'hbox',
                                    flex:2,
                                    minHeight:'55pt',
                                    maxHeight:'55pt',
                                    defaults: {
                                        ui: 'admin admin-text'
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
                                            xtype:'spacer',
                                            width:'10pt'
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
                            userCls: 'admin-fieldset no-border',
                            layout: 'hbox',
                            flex:1,
                            maxHeight:'55pt',
                            minHeight:'55pt',
                            items:[
                                {
                                    xtype: 'fieldset',
                                    name: 'category_accrual_cap_data',
                                    ui: 'admin-base',
                                    userCls:'admin-fieldset no-margin',
                                    title: 'Cap Accruals At',
                                    layout: 'hbox',
                                    flex:3,
                                    minHeight:'55pt',
                                    maxHeight:'55pt',
                                    defaults: {
                                        ui: 'admin admin-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'spinnerfield',
                                            flex: 1,
                                            style: 'padding-left: 4pt',
                                            name: 'category_accrual_cap_amount',
                                            allowDecimals: false,
                                            minValue: 0 
                                        },
                                        {
                                            xtype:'spacer',
                                            width:'10pt'
                                        },
                                        {
                                            xtype: 'selectfield',
                                            flex: 2,
                                            name: 'category_accrual_cap_unit',
                                            // allowBlank: false,
                                            // editable: false,
                                            displayField: 'description',
                                            valueField: 'code',
                                            bind: {
                                                store: '{accrualCapUnit}'
                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    name: 'category_balance_cap_data',
                                    ui: 'admin-base',
                                    userCls:'admin-fieldset',
                                    title: 'Cap Balance At',
                                    layout: 'hbox',
                                    flex:2,
                                    minHeight:'55pt',
                                    maxHeight:'55pt',
                                    defaults: {
                                        ui: 'admin admin-text'
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
                                            xtype:'spacer',
                                            width:'10pt'
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
                            userCls:'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items:[
                                {
                                    xtype: 'toolbar',
                                    ui:'admin-tree',
                                    shadow: false,
                                    items:[
                                        {
                                            xtype: 'checkbox',
                                            ui: 'reporting',
                                            boxLabel: 'Illness Accrual Rules',
                                            //listeners: {
                                            //    change: 'onCategoriesCheckAllChange'
                                            //}
                                        },

                                        {
                                            xtype:'spacer',
                                            flex:1,

                                        },
                    
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls:'x-fas fa-plus',
                                            ui: 'plain wtr-button',                   
                                        },

                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls:'x-fas fa-clock',
                                            ui: 'plain wtr-button',                   

                                        },
                                    ]
                                },

                                {
                                    xtype: 'tree',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'tree',
                                    ui: 'employeeinfo-shift-grid',
                                    userCls: 'employeeinfo-shift-grid no-border no-background',
                                    flex:1,
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'checkcolumn',
                                            cell: {
                                                ui: 'admin-tree-column admin-tree-item',
                                            },
                                            dataIndex: 'checked',
                                            minWidth: '2em',
                                            width: 'auto',
                                            padding: 0,
                                            //listeners: {
                                            //    checkChange: 'onTreeGridChecked'
                                            //}
                                        },
                                        {
                                            xtype: 'treecolumn',
                                            cell: {
                                                ui: 'admin-tree-column admin-tree-item',
                                            },
                                            dataIndex: 'text',
                                            flex: 1,
                                            layout: {
                                                alignment: 'stretch'
                                            }
                                        }
                                    ],

                                    bind: '{departmentsTree}'
                                },
                            ]
                        },


                        {    
                            xtype: 'fieldset',
                            userCls:'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items:[
                                {
                                    xtype: 'toolbar',
                                    ui:'admin-tree',
                                    shadow: false,
                                    items:[
                                        { 
                                            xtype: 'component', 
                                            html: 'Illness Carry Over Rules',
                                            userCls:'admin-title-toolbar', 
                                        },
                                        {
                                            xtype:'spacer',
                                            flex:1,

                                        },
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls:'x-fas fa-plus',
                                            ui: 'plain wtr-button',                   
                                        },
                                    ]
                                },
                                {
                                    xtype: 'tree',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'tree',
                                    ui: 'employeeinfo-shift-grid',
                                    userCls: 'employeeinfo-shift-grid no-border no-background',
                                    flex:1,
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'checkcolumn',
                                            cell: {
                                                ui: 'admin-tree-column admin-tree-item',
                                            },
                                            dataIndex: 'checked',
                                            minWidth: '2em',
                                            width: 'auto',
                                            padding: 0,
                                            //listeners: {
                                            //    checkChange: 'onTreeGridChecked'
                                            //}
                                        },
                                        {
                                            xtype: 'treecolumn',
                                            cell: {
                                                ui: 'admin-tree-column admin-tree-item',
                                            },
                                            dataIndex: 'text',
                                            flex: 1,
                                            layout: {
                                                alignment: 'stretch'
                                            }
                                        }
                                    ],
                                    bind: '{departmentsTree}'
                                },
                            ]
                        },





                    ]
                },

            ]
        }
    ]
});