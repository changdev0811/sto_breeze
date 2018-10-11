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
                sub: { text: '-', /*handler: 'onPrintPDF',*/ ui: 'action' },
                add: { text: '+', /*handler: 'onPrintPDF',*/ ui: 'action' },
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
                            items:[
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Duration',
                                    ui: 'admin admin-text',
                                },
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Years',
                                    ui: 'admin admin-text',
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