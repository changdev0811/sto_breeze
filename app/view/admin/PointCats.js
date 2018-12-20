/**
 * PointCats Admin view
 * @class PointCats
 * @namespace Breeze.view.admin.PointCats
 * @alias widget.admin.PointCats
 */
Ext.define('Breeze.view.admin.PointCats', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.pointcats',

    config: {
        crumbTitle: 'Point Categories'
    },

    requires: [
        // Plugin for editable grid
        'Ext.grid.plugin.CellEditing'
    ],

    // View Model
    viewModel: {
        type: 'admin.pointcats'
    },

    // Controller
    controller: 'admin.pointcats',
    listeners: {
        initialize: 'onInit'
    },


    // Action buttons shown at bottom of panel
    buttonAlign: 'right',
    buttons: {
        apply: { text: 'Save', handler: 'onSaveButton', ui: 'confirm alt', style:'width:125pt'},
    },

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',
    title: 'Point Categories',


            scrollable:true,

    // Body contents
    items: [


// Main horizontal arranging container
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',

            minHeight:'420pt',

            // +++ Allow h scroll when panel is too small +++
            items: [

                // Column 1
                {
                    xtype: 'fieldset',
                    userCls:'admin-fieldset no-padding',
                    flex: 1,

                    // +++ fixed width +++
                    minWidth:'150pt',
                    maxWidth:'200pt',
                    //minHeight:'420pt',

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
                                    handler: 'onPointCatAdd'
                                },
                                {
                                    xtype: 'button',
                                    iconCls:'x-fas fa-minus',
                                    ui: 'plain wtr-button',
                                    handler: 'onPointCatDelete'
                                },
                            ]
                        },
                        {
                            xtype: 'breeze-categories-list',
                            ui: 'admin-shift-grid',
                            userCls: 'admin-fieldset no-background no-margin no-border',
                            reference: 'pointCatsList',
                            fieldMode: 'none',
                            selectMode: 'single',
                            preventDeselect: true,
                            itemConfig: {
                                ui: 'admin-list-item-select',
                                templates: {
                                    radioValue: '{record.PointID}',
                                    itemData: { name: '{record.PointName} '},
                                    itemTpl: '{name}'
                                }
                            },
                            bind: {
                                store: '{pointCats}',
                            },
                            listeners: {
                                select: 'onPointCatSelect'
                            },
                            viewModel: true
                        }
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
                    //minHeight:'420pt',

                    layout: 'hbox',

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
                                            bind: {
                                                value:'{selectedPointCat.PointName}'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            userCls:'admin-fieldset no-border no-margin',
                                            layout:'hbox',
                                            hidden:true,
                                            bind:{
                                                hidden:'{hideDuration}'
                                            },
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
                                                    flex: 1,
                                                    style: 'padding-left: 4pt',
                                                    bind: {
                                                        value:'{selectedPointCat.DurAmt}'
                                                    }
                                                },
                                                {
                                                    xtype:'spacer',
                                                    width:'10pt',
                                                },
                                                {
                                                    xtype: 'selectfield',
                                                    flex: 1,
                                                    valueField: 'code',
                                                    value:60,
                                                    displayField: 'Description',
                                                    valueField: 'ID',
                                                    store:'DurationTypes',
                                                    bind: {
                                                        //Store DurTypeOptions
                                                        //getTypeCodeList 15
                                                        value:'{selectedPointCat.DurType}'
                                                    }
                                                },
                                            ]
                                        },
                                    ]
                                },

                                {
                                    xtype: 'fieldset',
                                    userCls:'admin-fieldset',
                                    title: 'Details',
                                    layout: 'fit',
                                    flex:1,
                                    minHeight:'100pt',
                                    items:[
                                        {
                                            xtype: 'textareafield',
                                            ui: 'admin admin-text',
                                            userCls:'admin-fieldset no-border no-margin',
                                            bind: {
                                                value:'{selectedPointCat.PointDetails}'
                                            }
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
                                                    html: 'Occurrence Values',
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
                                                    handler: 'onOccurrenceValueAdd'
                                                },
                                                // {
                                                //     xtype: 'button',
                                                //     itemId: 'remove',
                                                //     iconCls:'x-fas fa-minus',
                                                //     ui: 'plain wtr-button',
                                                // },
                                            ]
                                        },

                                        {
                                            xtype: 'grid',
                                            ui: 'admin-grid',
                                            reference: 'occurrenceValuesGrid',
                                            layout:'hbox',
                                            flex:1,
                                            sortable: false, columnResize: false,
                                            columnMenu: false, hideHeaders: false,
                                            bind: {
                                                store: '{occurrenceValues}'
                                            },
                                            defaults: {
                                                xtype: 'gridcolumn',
                                                userCls:'no-border',
                                            },
                                            // Plugin for editable grid
                                            plugins: {
                                                gridcellediting: true
                                            },

                                            columns: [
                                                {
                                                    text:'From',
                                                    itemId: 'from',
                                                    flex:1,
                                                    dataIndex:'occfrom',
                                                    menuDisabled:true,
                                                    align:'center',
                                                    editor:{
                                                        xtype:'spinnerfield',
                                                        decimals:0,
                                                        min:1,
                                                        required:true,
                                                        listeners:{
                                                            change: 'onOccurrenceFromChange'
                                                        }
                                                    }
                                                },
                                                {
                                                    text:'To',
                                                    itemId: 'through',
                                                    flex:1,
                                                    tpl: '{occto}',
                                                    tpl: [
                                                        '<tpl if="occto==0">&infin;</tpl>',
                                                        '<tpl if="occto!=0">{occto}</tpl>'
                                                    ],
                                                    dataIndex:'occto',
                                                    cell:{
                                                        encodeHtml:false,
                                                    },
                                                    menuDisabled:true,
                                                    align:'center',
                                                    editor:{
                                                        xtype:'spinnerfield',
                                                        decimals:0,
                                                        min:0,
                                                        required:true,
                                                        listeners:{
                                                            change: 'onOccurrenceThroughChange'
                                                        }
                                                    }
                                                },
                                                {
                                                    text:'Value',
                                                    itemId: 'value',
                                                    flex:1,
                                                    // force 2 decimal display
                                                    tpl: [
                                                        '{[this.rounded(values.occvalue)]}',
                                                        {
                                                            rounded: function(value){
                                                                return Math.round((value + 0.00001) * 100) / 100;
                                                            }
                                                        }

                                                    ],
                                                    dataIndex:'occvalue',
                                                    menuDisabled:true,
                                                    align:'center',
                                                    editor:{
                                                        xtype:'spinnerfield',
                                                        decimals:2,
                                                        required:true,
                                                    },
                                                    cell: {
                                                        toolDefaults: {
                                                            ui: 'admin-tool-delete',
                                                            zone: 'end'
                                                        },
                                                        tools: [
                                                            {
                                                                iconCls: 'x-fa fa-times',
                                                                handler: 'onOccurrenceValueRemove'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ],
                                            listeners:{
                                                beforeedit:'onOccurrenceValueBeforeEdit',
                                                edit: 'onOccurrenceValuePostEdit'
                                            }


                                        }



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