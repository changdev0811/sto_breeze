/**
 * Override for default list tree item, enhanced for side nav use
 * @class NavTreeItem
 * @namespace Breeze.widget.list.NavTreeItem
 * @alias widget.breeze.list.navtreeitem
 * @extends Ext.list.TreeItem
 * @xtype breeze-navtreeitem
 */
Ext.define('Breeze.widget.list.NavTreeItem', {
    extend: 'Ext.list.TreeItem',
    alias: 'widget.breeze.list.navtreeitem',
    xtype: 'breeze-navtreeitem',

    // Name of extra item attribute field
    extraAttr: 'extra',


    updateNode: function(node, oldNode){
        var me = this;
        if(node && node.data){
            // console.info(node.data);
            if(node.data[this.extraAttr]){
                var extra = node.data[this.extraAttr];
                var tool = me.getToolElement();
                var navSelection = me.getParent().getExpandedSelectionData('id');
                
                /* If node has a parent attribute, only show it
                    if the tree has a selected expanded item and its
                    id matches the parent attribute's value
                */
                if(navSelection !== null && extra.parent && 
                    (extra.parent == navSelection)
                ) {
                    tool.dom.style.display = 'block';
                } else {
                    tool.dom.style.display = 'none';       
                }
                
                if(extra.size){
                    tool.dom.style.fontSize = extra.size;
                } else {
                    tool.dom.style.fontSize = '';
                }
            } else {
                // me.element.dom.style = '';
            }
        }
        this.callParent([node, oldNode]);
        // console.info('UpdateNode parent call finished');
        // console.info('Tool element:', me.getToolElement());
    }
});