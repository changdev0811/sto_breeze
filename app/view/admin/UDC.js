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
                    xtype: 'fieldset',
                    userCls:'admin-fieldset no-padding',
                    flex: 1,
                    // +++ fixed width +++
                    minWidth:'150pt',
                    maxWidth:'200pt',


                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'toolbar',
                            ui:'admin-tree',
                            shadow: false,
                            items:[
                                { 
                                    xtype: 'component', 
                                    html: 'Categories',
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
                            xtype:'container',
                            flex:1,
                            layout:'vbox',
                            scrollable:'y',
                            items:[
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
                        }
                    ]
                },
                // Column 2
                {
                    xtype: 'panel',
                    ui: 'admin-sub',
                    userCls:'admin-fieldset no-border',
                    flex: 2,

                    // +++ fixed width +++
                    minWidth:'400pt',
                    maxWidth:'400pt',

                    layout: 'vbox',
                    buttons: {
                        save: { text: 'Save', /*handler: 'onPrintPDF',*/ ui: 'action', style:'width:175pt;' },
                    },
                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false
                    },
                    items:[
                        {
                            xtype:'fieldset',
                            ui: 'admin admin-text',
                            userCls:'admin-fieldset no-side-margin',
                            layout:'vbox',
                            items:[
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Category Name',
                                    //name: 'project_name',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset no-border no-margin',
                                },
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Abbreviation',
                                    //name: 'project_name',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset no-border no-margin',
                                },
                            ]
                        },
                        {
                            xtype:'fieldset',
                            userCls:'admin-fieldset no-side-margin no-padding',
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
                                    userCls:'admin-fieldset no-border',
                                    layout: 'hbox',
                                    defaults: {
                                        ui: 'admin admin-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'spinnerfield',
                                            ui: 'admin admin-text',
                                            userCls:'admin-fieldset no-border no-margin',
                                            //name: 'numConflictLimit',
                                            allowDecimals: false,
                                            minValue: 0,
                                            labelAlign:'left',
                                            labelWidth:'auto',
                                            label:'Leave Requested Minimum Use',
                                        },
                                        {
                                            xtype:'spacer',
                                            width:'10pt',
                                        },
                                        {
                                            xtype: 'combobox',
                                            ui: 'admin admin-text',
                                            userCls:'admin-fieldset no-border no-margin',

                                            flex: 2,
                                            //name: 'category_new_rate',
                                            allowBlank: false,
                                            editable: false,
                                            displayField: 'Description',
                                            forceSelection: true,
                                            queryMode: 'local',
                                            valueField: 'ID'
                                        },
                                        {
                                            xtype:'spacer',
                                            width:'5pt',
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    name: 'category_waiting_period_data',
                                    ui: 'admin-base',
                                    userCls:'admin-fieldset no-border',
                                    layout: 'hbox',
                                    defaults: {
                                        ui: 'admin admin-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'spinnerfield',
                                            ui: 'admin admin-text',
                                            userCls:'admin-fieldset no-border no-margin',
                                            //name: 'numConflictLimit',
                                            allowDecimals: false,
                                            minValue: 0,
                                            labelAlign:'left',
                                            labelWidth:'auto',
                                            label:'Leave Requested Minimum Use',
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype:'fieldset',
                            userCls:'admin-fieldset no-side-margin no-padding',
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
                            userCls:'admin-fieldset no-side-margin no-padding',
                            layout: 'vbox',
                            defaults:{
                                userCls:'admin-fieldset no-border no-padding',
                            },
                            items:[ 
                                {
                                    xtype:'spacer',
                                    width:'8pt',
                                },         
                                {
                                    xtype: 'fieldset',
                                    name: 'category_waiting_period_data',
                                    ui: 'admin-base',
                                    userCls:'admin-fieldset no-border',
                                    layout: 'hbox',
                                    defaults: {
                                        ui: 'admin admin-text'
                                    },
                                    items: [
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
                                            width:'20pt',
                                        },
                                        {
                                            xtype: 'combobox',
                                            ui: 'admin admin-text',
                                            userCls:'admin-fieldset no-border no-margin',
                                            label:'Category Color',
                                            labelAlign:'left',
                                            labelWidth:'auto',
                                            flex: 2,
                                            //name: 'category_new_rate',
                                            allowBlank: false,
                                            editable: false,
                                            displayField: 'Description',
                                            forceSelection: true,
                                            queryMode: 'local',
                                            valueField: 'ID'
                                        },
                                        {
                                            xtype:'spacer',
                                            width:'5pt',
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
            ]
        }
    ]
});