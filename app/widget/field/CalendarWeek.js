Ext.define('Breeze.widget.field.CalendarWeek', {
    extend: 'Ext.Container',
    alias: 'widget.field.calendarweek',
    xtype: 'breeze-calendarweek',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Label',
        'Ext.grid.Grid',
        'Ext.grid.column.Column'
    ],

    data: {
        month: 'August',
        year: 2018
    },

    layout: 'vbox',

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-caret-left',
                    text: ''
                },
                {
                    xtype: 'component',
                    flex: 1,
                    style: 'text-align: center',
                    bind: {
                        html: '{month} {year}'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-caret-right',
                    text: ''
                }
            ]
        },
        {
            xtype: 'grid',
            height: '100%',
            width: '100%',
            scrollable: false,
            layout: 'hbox',
            striped: false,
            columnResize: false,
            sortable: false,
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    width: 80,
                    text: 'S',                
                    menuDisabled: true
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    width: 80,
                    text: 'M',
                    menuDisabled: true
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    width: 80,
                    text: 'T',
                    menuDisabled: true
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    width: 80,
                    text: 'W',
                    menuDisabled: true
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    width: 80,
                    text: 'T',
                    menuDisabled: true
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    width: 80,
                    text: 'F',
                    menuDisabled: true
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    width: 80,
                    text: 'S',
                    menuDisabled: true
                }
            ]
        }
    ]

});