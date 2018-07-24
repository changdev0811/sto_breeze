/**
 * Employee Information View
 * @class Information
 * @namespace Breeze.view.employee
 * @alias Breeze.view.employee.Information
 */
Ext.define('Breeze.view.employee.Information', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information',

    requires: [
        'Ext.tab.Panel'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'tabpanel',
            flex: 1,
            items: [
                // containers with title and items containing body
                {
                    xtype: 'container',
                    title: 'Employee'
                }
            ]
        }
    ]
})