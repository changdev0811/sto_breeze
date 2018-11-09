/**
 * Report Selector view class
 * @class Selector
 * @namespace Breeze.view.reporting.Selector
 * @alias widget.reporting.selector
 */
Ext.define('Breeze.view.reporting.Selector', {
    extend: 'Ext.Panel',
    alias: 'widget.reporting.selector',

    controller: 'reporting.selector',
    listeners: {
        initialize: 'onInit'
    },
    viewModel: {
        type: 'reporting.selector'
    },

    title: 'Reports',
    ui: 'reporting-selector-panel',
    // ui: 'reporting-base',

    layout: 'hbox',

    items: [
        {
            xtype: 'tree',
            flex: 1,
            reference: 'reportsTree',
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