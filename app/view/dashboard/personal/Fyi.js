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
            iconCls: 'x-fa fa-sync'  
        },
        {
            iconCls: 'x-fa fa-print'
        },
        {
            iconCls: 'x-fas fa-angle-right'
        }
    ],

    items: [
        {
            xtype: 'list',
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