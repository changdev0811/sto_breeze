/**
 * Personal Dashboard view
 * @class Personal
 * @alias Breeze.view.dashboard.Personal
 */
Ext.define('Breeze.view.dashboard.Personal', {
    extend: 'Ext.Container',
    alias: 'widget.dashboard.personal',

    requires: [
        'Breeze.view.dashboard.PersonalController',
        'Breeze.view.dashboard.PersonalModel'
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
            

        },
    
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [
                {
                    xtype: 'dashboard.personal.fyi',
                    flex: 1
                },

                {
                    xtype: 'dashboard.personal.calendar',
                    flex: 1

                }
            ]
        }



    ]
});