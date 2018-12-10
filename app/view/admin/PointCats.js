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


    // Action buttons shown at bottom of panel
    buttonAlign: 'right',
    buttons: {
        apply: { text: 'Save', /*handler: 'onPrintPDF',*/ ui: 'confirm alt', style:'width:125pt'},
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
                            reference: 'pointCatsList',
                            fieldMode: 'none',
                            itemConfig: {
                                ui: 'admin-list-item-select',
                                templates: {
                                    radioValue: '{record.PintID}',
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
                                            xtype: 'grid',
                                            ui: 'admin-grid',
                                            layout:'hbox',
                                            flex:1,
                                            sortable: false, columnResize: false,
                                            columnMenu: false, hideHeaders: false,
                                            bind: {
                                                store: '{occurenceValues}'
                                            },
                                            defaults: {
                                                xtype: 'gridcolumn',                                                
                                            },
                                            columns: [
                                                {
                                                    text:'From',
                                                    flex:1,
                                                    dataIndex:'occfrom',
                                                    menuDisabled:true,
                                                    align:'center'
                                                },
                                                {
                                                    text:'Through',
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
                                                    align:'center'
                                                },
                                                {
                                                    text:'Value',
                                                    flex:1,
                                                    dataIndex:'occvalue',
                                                    menuDisabled:true,
                                                    align:'center'
                                                }
                                            ]
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