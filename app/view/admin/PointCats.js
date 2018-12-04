/**
 * PointCats Admin view
 * @class PointCats
 * @namespace Breeze.view.admin.PointCats
 * @alias widget.admin.PointCats
 */
Ext.define('Breeze.view.admin.PointCats', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.pointcats',

    // View Model
    viewModel: {
        type: 'admin.pointcats'
    },

    // Controller
    controller: 'admin.pointcats',
    listeners: {
        initialize: 'onInit'
    },




    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',
    title: 'Point Categories',

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
                                    html: 'Point Categories',
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

                // Column 2
                {
                    xtype: 'panel',
                    ui: 'admin-sub',
                    flex: 2,

                    // +++ fixed width +++
                    minWidth:'500pt',
                    maxWidth:'500pt',

                    layout: 'hbox',
                    buttons: {
                        apply: { text: 'Save', /*handler: 'onPrintPDF',*/ ui: 'confirm alt', style:'width:125pt'},
                    },
                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false
                    },
                    items:[
                        {
                            xtype:'container',
                            userClass:'admin-fieldset',
                            flex: 1,
                            layout: 'vbox',
                            items:[
                                
                                {
                                    xtype:'fieldset',
                                    userCls:'admin-fieldset',
                                    layout: 'vbox',
                                    items:[
                                        {
                                            xtype: 'breeze-textfield',
                                            label: 'Name',
                                            ui: 'admin admin-text',
                                            userCls:'admin-fieldset no-border no-margin',
                                        },
                                        {
                                            xtype: 'container',
                                            userCls:'admin-fieldset no-border no-margin',
                                            layout:'hbox',
                                            defaults: {
                                                ui: 'admin admin-text'
                                            },
                                            items: [
                                                {
                                                    xtype: 'spinnerfield',
                                                    ui: 'admin admin-text',
                                                    label:'Duration',
                                                    labelAlign:'left',
                                                    labelWidth:'auto',
                                                    name: 'duration_amount',
                                                    flex: 1,
                                                    style: 'padding-left: 4pt',
                                                },
                                                {
                                                    xtype:'spacer',
                                                    width:'10pt',
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    name: 'duration_unit',
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
                                    title: 'Details',
                                    layout: 'hbox',
                                    flex:1,
                                    items:[
                                        {
                                            xtype: 'container',
                                            userCls:'admin-fieldset no-border no-margin',
                                            flex: 1,
                                            layout: 'vbox',
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
                                                    html: 'Occurrence Value',
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
                        { 
                            xtype: 'fieldset',
                            title: 'Tie to Absence',
                            userCls:'admin-fieldset no-padding',

                            flex: 1,
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
                                    fieldMode: 'check',
                                    itemConfig: {
                                        ui: 'admin-list-item'
                                    },
                                    bind: {
                                        store: '{categoriesList}',
                                    },
                                    viewModel: true
                                }
                            ]
                        },
                    ]
                },

            ]
        }

    ]
});