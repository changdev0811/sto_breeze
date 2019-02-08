/**
 * Personal Dashboard > MOTD Widget
 * @class Fyi
 * @alias Breeze.view.dashboard.personal.motd
 */
Ext.define('Breeze.view.dashboard.personal.MOTD', {
    extend: 'Ext.Panel',
    alias: 'widget.dashboard.personal.motd',

    userCls:'employee-motd-dashboard',
    ui: 'employee-motd-dashboard',

    layout: 'fit',

    title: {
      userCls:'headerCursor',
      text:'Message of the Day'
    },

    header:{
      userCls:'headerCursor',
    },
    
    /* Probably not needed */
    
    tools: [
        {
            iconCls: 'x-fas fa-angle-right',
            handler: 'onMOTDNavClick'
        }
    ],
    

    items: [



        {
            xtype: 'fieldset',
            userCls: 'admin-fieldset no-padding no-border',
            maxHeight:'100pt',
            padding:'0pt 8pt 0pt 0pt',
            scrollable:'y',

            //flex: 1,
            //layout: 'vbox',
            items: [

                {
                    xtype: 'component',
                    userCls: 'employee-motd-label admin-label',


                    bind: {
                        html: '{motd}'
                    }

                },

            ]
        }






    ]

});