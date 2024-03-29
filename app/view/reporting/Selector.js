/**
 * Report Selector view class
 * @class Selector
 * @namespace Breeze.view.reporting.Selector
 * @alias widget.reporting.selector
 */
Ext.define('Breeze.view.reporting.Selector', {
    requires: [
        'Ext.Panel', 
        'Breeze.view.reporting.SelectorController',
        'Ext.grid.Tree'
    ],
    extend: 'Ext.Panel',
    alias: 'widget.reporting.selector',
    // xtype: 'breeze-reporting-selector',
    controller: 'reporting.selector',
    listeners: {
        initialize: 'onInit'
    },
    viewModel: {
        type: 'reporting.selector'
    },

    ui: 'reporting-selector',
    width: '300pt',
    layout: 'vbox',

    title: 'Reports',

    tools: {
        close: {
            iconCls: 'x-fas fa-times',
            handler: 'onCloseTool'
        }
    },

    items: [
        {
            xtype: 'tree',
            flex: 1,
            reference: 'reportsTree',
            ui: 'reporting-selector',
            userCls: 'reporting-selector-tree',
            expanderOnly: false,
            singleExpand: true,
            rootVisible: false,
            bind: {
                store: '{reportsList}'
            },
            listeners: {
                select: 'onReportTreeSelect'
            }
        }
    ]

});