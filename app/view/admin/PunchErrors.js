/**
 * PunchErrors Admin view
 * @class PunchErrors
 * @namespace Breeze.view.admin.PunchErrors
 * @alias widget.admin.puncherrors
 */
Ext.define('Breeze.view.admin.PunchErrors', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.puncherrors',

    // Layout and base styles
    layout: 'vbox',
    ui: 'admin-base',

    title: 'Punch Errors',



    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [

        {
            xtype: 'container',
            userCls:'admin-fieldset',
            flex: 1,
            layout: 'vbox',
        },
        {
            xtype: 'panel',
            ui: 'admin-sub',
            buttons: {
                remove: { text: 'Remove Punch Errors', /*handler: 'onPrintPDF',*/ ui: 'action', style:'width:175pt;' },
                reprocess: { text: 'Re-Process', /*handler: 'onPrintPDF',*/ ui: 'action', style:'width:175pt;' },
            },

            buttonAlign: 'right',
            buttonToolbar: {
                xtype: 'toolbar',
                ui: 'admin-actions',
                shadow: false
            },
        },

    ]

});