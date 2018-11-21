/**
 * MOTD Admin view
 * @class MOTD
 * @namespace Breeze.view.admin.MOTD
 * @alias widget.admin.motd
 */
Ext.define('Breeze.view.admin.MOTD', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.motd',

    // Layout and base styles
    layout: 'vbox',
    ui: 'admin-base',

    title: 'Record Message of the Day',

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttons: {
        save: { text: 'Submit', /*handler: 'onPrintPDF',*/ ui: 'action', style:'width:125pt;' },
    },

    buttonAlign: 'right',
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


    ]

});