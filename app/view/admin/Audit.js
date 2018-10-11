/**
 * Audit Report form
 * @class Audit
 * @namespace Breeze.view.admin.Audit
 * @alias widget.admin.audit
 */
Ext.define('Breeze.view.admin.Audit', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.audit',

    // Layout and base styles
    layout: 'vbox',
    ui: 'wtr-panel',

    title: 'Audit',



    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [
        {
            xtype: 'breeze-textfield',
            label: 'Search:',
            ui: 'admin admin-text',
            width:'50%',
            userCls:'admin-fieldset-no-border',

        },
        {
            xtype: 'container',
            userCls:'admin-fieldset',
            flex: 1,
            layout: 'vbox',
        },
    ]

});