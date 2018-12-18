/**
 * MOTD Admin view
 * @class MOTD
 * @namespace Breeze.view.admin.MOTD
 * @alias widget.admin.motd
 */
Ext.define('Breeze.view.admin.MOTD', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.motd',


    // View Model
    viewModel: {
        type: 'admin.motd'
    },

    // Controller
    controller: 'admin.motd',
    listeners: {
        initialize: 'onInit'
    },


    // Layout and base styles
    layout: 'vbox',
    ui: 'admin-base',

    title: 'Record Message of the Day',

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttons: {
        save: { text: 'Save', handler: 'onSaveButton', ui: 'confirm alt', style:'width:125pt;' },
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
            xtype: 'fieldset',
            userCls:'admin-fieldset',
            flex: 1,
            layout: 'vbox',
            items:[
                {
                    xtype: 'textareafield',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset',
                    flex:1,
                    userCls:'admin-fieldset no-border no-margin',
                    bind:{
                        value:'{motd}'
                    }

                },

            ]
        },


    ]

});