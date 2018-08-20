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
            xtype: 'dashboard.personal.fyi'
        },
        {
            xtype: 'dashboard.personal.information'
        }
    ]
});