/**
 * UDC Admin view
 * @class UDC
 * @namespace Breeze.view.admin.UDC
 * @alias widget.admin.udc
 */
Ext.define('Breeze.view.admin.UDC', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.udc',

    // View Model
    viewModel: {
        type: 'admin.udc'
    },

    // Controller
    controller: 'admin.udc',
    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',
    title: 'User Defined Categories',

    // Body contents
    items: [
        // Column 1
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
                            html: 'Roles',
                            userCls:'admin-title-toolbar', 
                        },
                        {
                            xtype:'spacer',
                            flex:1,
                        },
                        {
                            xtype: 'button',
                            iconCls:'x-fas fa-plus',
                            ui: 'plain wtr-button',                   
                        },
                        {
                            xtype: 'button',
                            iconCls:'x-fas fa-minus',
                            ui: 'plain wtr-button',                   
                        },
                    ]
                },
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
        // Column 2
        {
            xtype: 'panel',
            ui: 'admin-sub',
            userCls:'admin-fieldset no-border no-padding',
            flex: 2,
            layout: 'vbox',
            buttons: {
                save: { text: 'Save', /*handler: 'onPrintPDF',*/ ui: 'action' },
            },
            buttonToolbar: {
                xtype: 'toolbar',
                ui: 'admin-actions',
                shadow: false
            },
            items:[
                {
                    xtype: 'breeze-textfield',
                    label: 'Category Name',
                    //name: 'project_name',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset no-border',
                },
                {
                    xtype: 'breeze-textfield',
                    label: 'Abbreviation',
                    //name: 'project_name',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset no-border',
                },
                {
                    xtype:'fieldset',
                    userCls:'admin-fieldset',
                    layout: 'vbox',
                    defaults:{
                        userCls:'admin-fieldset no-border no-padding',
                    },
                    items:[          
                        {
                            xtype: 'toolbar',
                            ui:'admin-tree',
                            userCls:'admin-fieldset no-border no-padding no-margin',
                            shadow: false,
                            items:[
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    userCls:'tool-check-box',
                                    name: 'isWorktime',
                                    id: 'radio1',
                                    value: '20',
                                    boxLabel: 'Allowed Category',
                                    bodyAlign: 'stretch',
                                },
                            ]
                        },
                        
                        {
                            xtype: 'fieldset',
                            name: 'category_waiting_period_data',
                            ui: 'admin-base',
                            userCls:'admin-fieldset no-border no-margin',
                            layout: 'hbox',
                            //flex:1,
                            minHeight:'55pt',
                            maxHeight:'55pt',
                            defaults: {
                                ui: 'admin admin-text'
                            },
                            items: [
                                

                                { 
                                    xtype: 'component', 
                                    html: 'Leave Requested Minimum Use',
                                    userCls:'admin-title-toolbar', 
                                },
                                {
                                    xtype:'spacer',
                                    width:'10pt',
                                },


                                {
                                    xtype: 'spinnerfield',
                                    width:'50pt',
                                    style: 'padding-left: 4pt',
                                    //name: 'category_new_time',
                                    allowDecimals: false,
                                    minValue: 0 
                                },
                                {
                                    xtype:'spacer',
                                    width:'10pt',
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 2,
                                    //name: 'category_new_rate',
                                    allowBlank: false,
                                    editable: false,
                                    displayField: 'Description',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    valueField: 'ID'
                                },
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            name: 'category_waiting_period_data',
                            ui: 'admin-base',
                            userCls:'admin-fieldset no-border no-margin',
                            layout: 'hbox',
                            //flex:1,
                            minHeight:'55pt',
                            maxHeight:'55pt',
                            defaults: {
                                ui: 'admin admin-text'
                            },
                            items: [
                                

                                { 
                                    xtype: 'component', 
                                    html: 'Days Before Use',
                                    userCls:'admin-title-toolbar', 
                                },
                                {
                                    xtype:'spacer',
                                    width:'10pt',
                                },


                                {
                                    xtype: 'spinnerfield',
                                    width:'50pt',
                                    style: 'padding-left: 4pt',
                                    //name: 'category_new_time',
                                    allowDecimals: false,
                                    minValue: 0 
                                },

                            ]
                        },


                    ]
                },
                {
                    xtype:'fieldset',
                    userCls:'admin-fieldset',
                    layout: 'vbox',
                    defaults:{
                        userCls:'admin-fieldset no-border no-padding',
                    },
                    items:[
                        {
                            xtype: 'toolbar',
                            ui:'admin-tree',
                            userCls:'admin-fieldset no-border no-padding no-margin',
                            shadow: false,
                            items:[
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    userCls:'tool-check-box',
                                    name: 'isWorktime',
                                    id: 'radio2',
                                    value: '20',
                                    boxLabel: 'Paied Category',
                                    bodyAlign: 'stretch',
                                },
                            ]
                        },
                        {
                            xtype:'checkbox',
                            ui:'admin',
                            name: 'isWorktime',
                            id: 'radio3',
                            value: '20',
                            boxLabel: 'Count as OverTime',
                            bodyAlign: 'stretch',
                        },
                        {
                            xtype:'checkbox',
                            ui:'admin',
                            name: 'isWorktime',
                            id: 'radio4',
                            value: '20',
                            boxLabel: 'Count Toward Accruals',
                            bodyAlign: 'stretch',
                        },
                    ]
                },
                {
                    xtype:'fieldset',
                    userCls:'admin-fieldset no-border',
                    layout: 'hbox',
                    defaults:{
                         ui: 'admin admin-text',
                        userCls:'admin-fieldset no-border no-padding',
                    },
                    items:[
                        {
                            xtype:'checkbox',
                            ui:'admin',
                            name: 'isWorktime',
                            id: 'radio5',
                            value: '20',
                            boxLabel: 'Include in Leave Request',
                            bodyAlign: 'stretch',
                        },
                        {
                            xtype:'spacer',
                            width:'10pt',
                        },
                        {
                            xtype: 'combobox',
                            flex: 2,
                            label:'Category Color',
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
    ]
});