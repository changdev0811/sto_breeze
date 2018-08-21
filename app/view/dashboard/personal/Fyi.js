/**
 * Personal Dashboard > FYI Widget
 * @class Fyi
 * @alias Breeze.view.dashboard.personal.Fyi
 */
Ext.define('Breeze.view.dashboard.personal.Fyi', {
    extend: 'Ext.Panel',
    alias: 'widget.dashboard.personal.fyi',

    layout: 'fit',

    title: 'FYI',

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