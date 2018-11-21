/**
 * Extended version of Ext.list.Tree with specific functionality 
 * for SideNav
 * 
 * Config properties:
 * - itemRouteDataAttribute - name of data attribue expected to contain associated route
 * 
 * @class NavTree
 * @namespace Breeze.widget.navBar.NavTree
 * @alias widget.breeze.navbar.navtree
 * @extends Ext.list.Tree
 * @xtype breeze-navtree
 */
Ext.define('Breeze.widget.navBar.NavTree', {
    extend: 'Ext.list.Tree',
    alias: 'widget.breeze.navbar.navtree',
    xtype: 'breeze-navtree',

    config: {
        /* Attribute used by getItemByRoute as route value */
        itemRouteDataAttribute: 'routeRef',
        /* If events should be fired on click */
        eventsOnClick: true
    },

    initialize: function(){
        this.callParent(arguments);
        if(this.getEventsOnClick()){
            // Attach item click listener
            this.on('itemclick', this.handleItemClick);
        }
    },

    /**
     * Returns reference to selected item, if it is 
     * expanded. Otherwise, returns a null
     * @return {Object} selected item if expanded, else null
     */
    getExpandedSelection: function(){
        var selected = this.getSelection();
        if(selected && selected.isLeaf()){
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
    },

    /**
     * Attempt to look up a tree item by the route string associated with it.
     * Relies on the config property itemRouteDataAttribute to know the name
     * of the data attribute to compare to the given route.
     * @param {String} route Route string to look for
     * @return {Node|Object} Matched node, or null if no matching items found
     */
    getNodeByRoute: function(route){
        var keys = Object.keys(this.itemMap);
        var routeAttr = this.getItemRouteDataAttribute();
        for(var i = 0; i < keys.length; i++){
            var item = this.itemMap[keys[i]].getNode();
            var data = item.getData();
            if(data[routeAttr] && data[routeAttr] == route){
                return item;
            }
        }
        return null;
    },

    handleItemClick: function(tree, info, eOpts){
        console.info('click handled');
        if(
            !Object.isUnvalued(tree.getSelection()) &&
            info.node.id == tree.getSelection().id
        ){
            if(
                info.node.getData()['routeEvent'] ||
                info.node.getData()['routeReclick']
            ){
                console.info('Updating selected tree node');
                tree.setSelection(null);
                tree.setSelection(info.node);
            }
        } else {
            // Force other areas to collapse
            if(info.item.getNode().childNodes.length == 0){
                this.onNodeExpand(info.item.getNode());
            }
        }
    },

    privates: {
        // onClick: function(e){
        //     var item = e.getTarget('[data-recordId]'),
        //         id;
        //     console.info('navtree onclick');
        //     if (item) {
        //         id = item.getAttribute('data-recordId');
        //         item = this.itemMap[id];
        //         if (item) {
        //             item.onClick(e);
        //         }
        //     }
        // },
        onToolStripClick: function(e) {
            var item = e.getTarget('[data-recordId]'),
                id;
            console.info('toolstrip click');
            if (item) {
                id = item.getAttribute('data-recordId');
                item = this.itemMap[id];
                if (item) {
                    if (item === this.activeFloater) {
                        this.unfloatAll();
                    } else {
                        this.floatItem(item, false);
                    }
                }
            }
        },
    }

});