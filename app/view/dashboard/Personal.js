/**
 * Personal Dashboard view
 * @class Personal
 * @alias Breeze.view.dashboard.Personal
 */
Ext.define('Breeze.view.dashboard.Personal', {
    extend: 'Ext.Container',
    alias: 'widget.dashboard.personal',

    layout: 'vbox',

    items: [
        {
            xtype: 'dashboard.personal.information'
        }
    ]
});