/**
 * Grid control for Employee FYI View
 * @class Grid
 * @alias Breeze.view.employee.fyi.Grid
 */
Ext.define('Breeze.view.employee.fyi.Grid', {
    extend: 'Ext.grid.Grid',
    alias: 'widget.employee.fyi.grid',

    requires: [
        'Ext.grid.column.Column',
        'Ext.XTemplate'
    ],
    scrollable: true,
    width: '100%',
    // height: '100%',
    sortable: false,
    minHeight: '50vh',
    // Columns: Color | Description | Allowed | Recorded | Remaining
    
    columns: [
        {
            // Category color box preview
            xtype: 'gridcolumn',
            width: 25,
            tpl:  
                '<div style="background-color:{CatColor}"><p style="color:{CatColor}">T</p></div>',
            dataIndex: 'CatColor',
            text: '',
            // cell: {
            //     xtype: 'widgetcell',
            //     bodyStyle: 'background-color: {CatColor}',
            //     value: 'T'
            // }
            cell: {
                xtype: 'gridcell',
                encodeHtml: false
            }
        }, {
            // Category description text
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'CatDesc',
            text: 'Category'
        }, {
            // Allowed
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'CatAllowed',
            text: 'Allowed'
        }, {
            // Recorded
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'CatAllowed',
            text: 'Allowed'
        }, {
            // Allowed
            // If value is < 0 then uses class .fyi-category-column-negative
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'CatRemaining',
            tpl: [
                '<tpl if="CatRemaining &lt; 0">',
                '   <p class="fyi-category-column-negative">{CatRemaining}</p>',
                '<tpl else>',
                '   <p>{CatRemaining}</p>',
                '</tpl>'
            ],
            text: 'Remaining',
            cell: {
                type: 'gridcell',
                encodeHtml: false
            }
        }, 
    ]

});