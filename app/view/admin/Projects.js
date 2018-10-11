/**
 * Projects Report form
 * @class Projects
 * @namespace Breeze.view.admin.Projects
 * @alias widget.admin.Projects
 */
Ext.define('Breeze.view.admin.Projects', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.projects',

    // Layout and base styles
    layout: 'hbox',
    ui: 'wtr-panel',
    title: 'Projects',

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
            layout: 'vbox',
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
                    xtype: 'breeze-textfield',
                    label: 'Name',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset-no-border',
                },
                {
                    xtype: 'breeze-textfield',
                    label: 'Description',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset-no-border',
                },
                {
                    xtype: 'breeze-textfield',
                    label: 'Code',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset-no-border',
                },


                {
                    xtype:'container',
                    userCls:'admin-fieldset-no-border',
                    layout: 'vbox',
                    items:[
                        {
                            xtype:'checkbox',
                            ui:'admin',
                            name: 'condType',
                            id: 'radio1',
                            value: '20',
                            boxLabel: 'Counts as Time Worked',
                            bodyAlign: 'stretch',


                        },

                        {
                            xtype:'checkbox',
                            ui:'admin',
                            name: 'condType',
                            id: 'radio2',
                            value: '20',
                            boxLabel: 'Counts as Overtime',
                            bodyAlign: 'stretch',


                        },


                    ]

                }














            ]
        },
    ]
});