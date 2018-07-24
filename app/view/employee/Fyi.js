/**
 * Employee FYI View
 */
Ext.define('Breeze.view.employee.Fyi',{
    extend: 'Ext.Container',
    alias: 'widget.employee.fyi',

    requires: [
        'Breeze.view.employee.FyiController',
        'Ext.field.Display',
        'Ext.field.Date',
        'Ext.picker.Date'
    ],

    controller: 'employee.fyi',

    layout: 'vbox',

    items: [
        
        // info panel at top
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'displayfield',
                    label: 'Employee Name'
                },
                {
                    xtype: 'displayfield',
                    label: 'Department'
                },
                {
                    xtype: 'displayfield',
                    label: 'Hire Date'
                }
            ]
        }

    ]



});