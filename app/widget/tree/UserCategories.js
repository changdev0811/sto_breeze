/**
 * User Categories list control (ported from UDCTree.js)
 * @class UserCategories
 * @namespace Breeze.widget.tree.UserCategories
 * @alias widget.breeze.tree.usercategories
 * @xtype breeze-tree-usercategories
 */
Ext.define('Breeze.widget.tree.UserCategories', {
    extend: 'Ext.grid.Tree',
    alias: 'widget.breeze.tree.usercategories',
    xtype: 'breeze-tree-usercategories',
    scroll: 'vertical',

    hideHeaders: true,
    rootVisible: false,
    columns: [
        {
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1,
            layout: {
                alignment: 'stretch'
            },
            bind: {
                style: 'color: {data.HexColor}'
            },
            style: 'font-weight: bold',
            renderer: function(value,node,dataIdx,cell,column){
                console.info('Rendering udc');
                cell.el.dom.style.color = node.data.categoryData.HexColor;
                return value;
            }
        }
    ]

});