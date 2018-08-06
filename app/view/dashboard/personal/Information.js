/**
 * Personal Dashboard > Employee Information Widget
 * @class Information
 * @alias Breeze.view.dashboard.personal.Information
 */
Ext.define('Breeze.view.dashboard.personal.Information', {
    extend: 'Ext.Container',
    alias: 'widget.dashboard.personal.information',


    layout: 'hbox',

    items: [
        // image
        {
            xtype: 'container'
        },
        {
            xtype: 'container',
            layout: 'vbox',
            items: [
                {
                    xtype: 'component',
                    html: 'Employee Name'
                }
            ]
        }
    ]

});