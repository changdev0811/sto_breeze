/**
 * Personal Dashboard > Employee Information Widget
 * @class Information
 * @alias Breeze.view.dashboard.personal.Information
 */
Ext.define('Breeze.view.dashboard.personal.Information', {
    extend: 'Ext.Panel',
    alias: 'widget.dashboard.personal.information',

    layout: 'fit',

    title: 'Employee Info',

    tools: [
        {
            iconCls: 'x-fas fa-angle-right'
        }
    ],

    items: [
        {
            xtype: 'list',
            height: '200px',
            flex: 1,
            layout: 'vbox',
            itemConfig: {
                xtype: 'employee.fyi.accrualItem'
            },
            reference: 'fyiDashList',
            ui: 'employeefyi-accrual-list',
            bind: {
                store: '{fyi}'
            }
        },
    ]

});