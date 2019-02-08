/**
 * Personal Dashboard view
 * @class Personal
 * @alias Breeze.view.dashboard.Personal
 */
Ext.define('Breeze.view.dashboard.Personal', {
    extend: 'Ext.Container',
    alias: 'widget.dashboard.personal',
    userCls:'personal-content',

    config: {
        crumbTitle: 'Personal'
    },

    requires: [
        'Breeze.view.dashboard.PersonalController',
        'Breeze.view.dashboard.PersonalModel',
    ],

    controller: 'dashboard.personal',
    viewModel: {
        type: 'dashboard.personal'
    },

    listeners: {
        initialize: 'onInit'
    },

    layout: 'vbox',

    items: [

        {
            
            xtype: 'dashboard.personal.information',
            reference:'infoDash'

        },
    
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'dashboard.personal.motd',
                            reference:'motdDash',                    
                            hidden: true,
                            bind: {
                                hidden: '{hideMotd}'
                            },
                        },
                        {
                            xtype: 'dashboard.personal.fyi',
                            reference:'fyiDash',
                            flex: 1
                        },
                    ]
                },
                {
                    xtype: 'dashboard.personal.calendar',
                    reference:'calDash',
                    flex: 1
                }
            ]
        },

        {
            xtype: 'dialog',
            ui:'dark-themed-dialog',
            reference: 'MOTDDialog',
            minWidth: '300pt',
            minHeight: '300pt',
            layout: 'fit',
            title:{
                text:'Message of the Day',
                ui:'dark-themed-dialog'
            },
            tools: [
                //{
                //    iconCls: 'x-fa fa-times',
                //    ui: 'dark-themed-dialog',
                //    handler: 'onCloseNotesDialog'
                //}
            ],
            items:[
                {
                    xtype:'component',
                    scrollable:'y',
                    flex: 1,
                    userCls:'employeeinfo-notes-text',        
                    bind: {
                        html: '{motd}'
                    }
                }

            ],
            buttons: [
                {
                    text: 'Close',
                    ui: 'action alt',
                    handler: 'onCloseMOTDDialog'
                }  
            ]
        },






    ]
});