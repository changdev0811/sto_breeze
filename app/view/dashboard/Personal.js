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
            reference:'infoDash'

        },
    
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [
                {
                    xtype: 'dashboard.personal.fyi',
                    reference:'fyiDash',
                    flex: 1
                },

                {
                    xtype: 'dashboard.personal.calendar',
                    reference:'calDash',
                    flex: 1

                }
            ]
        }



    ]
});