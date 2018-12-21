/**
 * Audits Admin view
 * @class Aduit
 * @namespace Breeze.view.admin.Audit
 * @alias widget.admin.Audit
 */
Ext.define('Breeze.view.admin.Audit', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.audit',

    config: {
        crumbTitle: 'Audit'
    },


    // View Model
    viewModel: {
        type: 'admin.audit'
    },

    // Controller
    controller: 'admin.audit',
    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'admin-base',

    tools: [
        {
            iconCls: 'x-fa fa-sync',
            handler: 'onRefreshTool'  
        },
        {
            iconCls: 'x-fa fa-print',
            handler: 'onPrintTool'
        }
    ],

    title: 'Audit',

    // Body contents
    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            ui: 'admin-actions',
            shadow: false,
            items: [
                {
                    xtype: 'searchfield',
                    placeholder: 'Search',
                    ui: 'solo',
                    flex: 1,
                    listeners: {
                        change: 'onSearchTextChange'
                    }
                }
            ]
        },
        {
            xtype: 'component',
            html: 'Showing most recent records.<br>Run "Audit" report for more detail.',
            userCls: 'admin-audit-caption'
        },
        // History data view
        {
            xtype: 'dataview',
            flex: 1, ui: 'admin-audit-history',
            layout: 'vbox',
            itemTpl: [
                '<div class="admin-audit">',
                '<div class="admin-audit-item" data-content="date">{AuditDate}</div>',
                '<div class="admin-audit-item" data-content="message">{AuditMessage}',
                '</div>'
            ],
            bind: {
                store: '{auditHistory}'
            }
        }
    ]
});