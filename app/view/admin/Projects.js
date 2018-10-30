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
                    name: 'project_name',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset-no-border',
                },
                {
                    xtype: 'breeze-textfield',
                    label: 'Description',
                    name: 'description',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset-no-border',
                },
                {
                    xtype: 'breeze-textfield',
                    label: 'Code',
                    name: 'project_code',
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
                            name: 'isWorktime',
                            id: 'radio1',
                            value: '20',
                            boxLabel: 'Counts as Time Worked',
                            bodyAlign: 'stretch',
                        },

                        {
                            xtype:'checkbox',
                            ui:'admin',
                            name: 'isOT',
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