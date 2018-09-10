/**
 * Personal Dashboard > FYI Widget
 * @class Fyi
 * @alias Breeze.view.dashboard.personal.Fyi
 */
Ext.define('Breeze.view.dashboard.personal.Fyi', {
    extend: 'Ext.Panel',
    alias: 'widget.dashboard.personal.fyi',

    userCls:'employee-fyi-dashboard',
    ui: 'employee-fyi-dashboard',

    layout: 'fit',

    title: 'FYI',

    tools: [
        {
            iconCls: 'x-fas fa-angle-right',
            handler: 'onFyiNavClick'
        }
    ],

    items: [
        {
            xtype: 'list',
            flex: 1,
            layout: 'vbox',
            ui: 'fyi-accrual-list',
            itemConfig: {
                xtype: 'employee.fyi.accrualItem'
            },
            reference: 'fyiDashList',
            bind: {
                store: '{fyi}'
            }
        },
    ]


});