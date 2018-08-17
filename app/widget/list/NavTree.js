/**
 * Extended version of Ext.list.Tree with specific functionality 
 * for SideNav
 * @class NavTree
 * @namespace Breeze.widget.list.NavTree
 * @alias widget.breeze.list.navtree
 * @extends Ext.list.Tree
 * @xtype breeze-treelist
 */
Ext.define('Breeze.widget.list.NavTree', {
    extend: 'Ext.list.Tree',
    alias: 'widget.breeze.list.navtree',
    xtype: 'breeze-treelist',


    /**
     * Returns reference to selected item, if it is 
     * expanded. Otherwise, returns a null
     * @return {Object} selected item if expanded, else null
     */
    getExpandedSelection: function(){
        var selected = this.getSelection();
        if(selected.isLeaf()){
            selected = selected.parentNode;
        }
        if(selected && selected.isExpanded()){
            return selected;
        } else {
            return null;
        }
    },

    /**
     * Returns a named data attribute from the currently
     * selected tree item, if it is expanded
     * @return {Object} Data value, or null if not found or no matching item
     */
    getExpandedSelectionData: function(attrName){
        var selected = this.getExpandedSelection();
        if(selected && selected.data && selected.data[attrName]){
            return selected.data[attrName];
        } else {
            return null;
        }
    }

});