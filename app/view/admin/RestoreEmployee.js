/**
 * Restore Employee Admin view
 * @class RestoreEmployee
 * @namespace Breeze.view.admin.RestoreEmployee
 * @alias widget.admin.restoreemployee
 */
Ext.define('Breeze.view.admin.RestoreEmployee', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.restoreemployee',

    // Layout and base styles
    layout: 'vbox',
    ui: 'admin-base',

    title: 'Restore Employees',

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [
        {
            xtype: 'panel',
            ui: 'admin-sub',
            layout:'fit',
            buttons: {
                save: { text: 'Restore Employee', /*handler: 'onPrintPDF',*/ ui: 'action', },
            },
            buttonAlign: 'right',
            buttonToolbar: {
                xtype: 'toolbar',
                ui: 'admin-actions',
                shadow: false
            },
            items:[
                {
                    xtype: 'combobox',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset no-border',
                    labelAlign:'left',
                    labelWidth:'auto',
                    label:'Employee to Restore',
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
});