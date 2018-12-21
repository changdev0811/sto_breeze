/**
 * MOTD Admin view
 * @class STIMessage
 * @namespace Breeze.view.admin.STIMessage
 * @alias widget.admin.stimessage
 */
Ext.define('Breeze.view.admin.STIMessage', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.stimessage',


    config: {
        crumbTitle: 'Release Notes'
    },


    // Layout and base styles
    layout: 'fit',
    ui: 'admin-base',

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
            xtype: 'panel',
            userCls: 'admin-fieldset',
            scroll: 'both',
            items: [
                {
                    id: 'iframe',
                    scroll: "vertical",
                    layout: 'fit',
                    width: '100%',
                    height: '100%',
                    html: '<iframe style="position:absolute; width:100%; height:100%; left:0; top:0;"  src="/resources/ReleaseNotes.pdf"></iframe>'
                }
            ]
        },
    ]

});