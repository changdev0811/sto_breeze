/**
 * Plugin for Grid Tree that makes it so expanderOnly: false
 * doesn't prevent node from being selected on click if expansion occurs
 * @class ExpandSelect
 * @namespace Breeze.plugin.grid.ExpandSelect
 * @extends Ext.plugin.Abstract
 * @alias plugin.breeze.grid.expandselect
 */
Ext.define('Breeze.plugin.grid.ExpandSelect', {
   extend: 'Ext.plugin.Abstract',
   alias: 'plugin.breeze.grid.expandselect',

    /**
     * Initialize plugin
     * @param {Object} treeComponent Tree component plugin is attached to
     */
    init: function(treeComponent){
        var me = this;
        treeComponent.setExpanderOnly(false);
        treeComponent.on('nodeexpand', me.onExpandChange);
        treeComponent.on('nodecollapse', me.onExpandChange);
    },

    // ===[Event Handlers]===
    
    /**
     * Handle node expand/collapse
     * @param {Object} row ?
     * @param {Object} record Selected item record
     * @param {Object} eOpts Event options
     */
    onExpandChange: function(row, record, eOpts){
        var tree = record.getOwnerTree(),
            selectable = tree.getSelectable();
        
        selectable.deselectAll(true);
        selectable.setSelectedRecord(record);
    }
});