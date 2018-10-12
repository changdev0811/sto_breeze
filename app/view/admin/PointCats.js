/**
 * PointCats Report form
 * @class PointCats
 * @namespace Breeze.view.admin.PointCats
 * @alias widget.admin.PointCats
 */
Ext.define('Breeze.view.admin.PointCats', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.pointcats',

    // Layout and base styles
    layout: 'hbox',
    ui: 'wtr-panel',
    title: 'Point Categories',

    // Body contents
    items: [
        {
            xtype: 'panel',
            ui: 'admin-sub',
            flex: 1,
            layout: 'vbox',
            buttonAlign: 'right',
            buttons: {
                sub: { iconCls:'x-fas fa-plus'  /* userCls:'NEED NEW CLASS FOR THESE '*/},
                add: { iconCls:'x-fas fa-minus' /* userCls:'NEED NEW CLASS FOR THESE '*/},
            },
            buttonToolbar: {
                xtype: 'toolbar',
                ui: 'admin-actions',
                shadow: false
            },
            items:[
                {
                    xtype: 'container',
                    userCls:'admin-fieldset',
                    flex: 1,
                    layout: 'vbox',
                },
            ]
        },
        {
            xtype: 'panel',
            ui: 'admin-sub',
            flex: 2,
            layout: 'hbox',
            buttons: {
                apply: { text: 'Apply', /*handler: 'onPrintPDF',*/ ui: 'action' },
            },
            buttonToolbar: {
                xtype: 'toolbar',
                ui: 'admin-actions',
                shadow: false
            },
            items:[
                {
                    xtype:'container',
                    userClass:'admin-fieldset-no-border',
                    flex: 1,
                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'breeze-textfield',
                            label: 'Name',
                            ui: 'admin admin-text',
                            userCls:'admin-fieldset-no-border',
                        },
                        {
                            xtype: 'container',
                            userCls:'admin-fieldset-no-border',
                            layout:'hbox',
                            defaults: {
                                ui: 'reporting reporting-text'
                            },
                            items: [
                                {
                                    xtype: 'spinnerfield',
                                    label:'Duration',
                                    labelAlign:'left',
                                    labelWidth:'auto',
                                    name: 'duration_amount',
                                    flex: 1,
                                    style: 'padding-left: 4pt',
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







                        {
                            xtype: 'panel',
                            title: 'Details',
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

                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'Occurrence Value',
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
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Tie to Absence',
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

                    ]
                },
            ]
        },
    ]
});