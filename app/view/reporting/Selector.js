/**
 * Report Selector view class
 * @class Selector
 * @namespace Breeze.view.reporting.Selector
 * @alias widget.reporting.selector
 */
Ext.define('Breeze.view.reporting.Selector', {
    extend: 'Ext.Container',
    alias: 'widget.reporting.selector',
    xtype: 'breeze-reporting-selector',

    controller: 'reporting.selector',
    listeners: {
        initialize: 'onInit'
    },
    viewModel: {
        type: 'reporting.selector'
    },

    userCls: 'reporting-selector-panel',
    width: '300pt',
    layout: 'vbox',

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