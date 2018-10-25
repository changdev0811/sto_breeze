/**
 * MOTD Report form
 * @class STIMessage
 * @namespace Breeze.view.admin.STIMessage
 * @alias widget.admin.stimessage
 */
Ext.define('Breeze.view.admin.STIMessage', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.stimessage',

    // Layout and base styles
    layout: 'vbox',
    ui: 'wtr-panel',

    title: 'SoftTime Online Release Notes',



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

    ]

});