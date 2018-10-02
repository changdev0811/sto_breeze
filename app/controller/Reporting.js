/**
 * Extended version of Breeze base ViewController with extra functionality
 * specific for reporting
 * 
 * @class Reporting
 * @namespace Breeze.controller.Reporting
 * @extends Breeze.controller.Base
 */
Ext.define('Breeze.controller.Reporting', {
    extend: 'Breeze.controller.Base',
    

    //===[Action Button Default Handlers]===

    /**
     * Handle 'Print PDF' action button
     * Can be overridden in view controllers extending Reporting
     */
    onPrintPDF: function(c, e, eOpts){
        console.info('Print PDF Clicked');
    },

    /**
     * Handle 'Print Excel' action button
     * Can be overridden in view controllers extending Reporting
     */
    onPrintExcel: function(c, e, eOpts){
        console.info('Print Excel Clicked');
    },

    /**
     * Handle 'Print Word' action button
     * Can be overridden in view controllers extending Reporting
     */
    onPrintWord: function(c, e, eOpts){
        console.info('Print Word Clicked');
    },

    // ====[Tree Event Handlers]====

    /**
     * Cascade checked value of tree grid item to any children
     * @param {Object} cell Checked cell that was modified
     * @param {Boolean} checked New value for checked
     * @param {Object} node Tree node being targetted 
     */
    onTreeGridChecked: function(cell, index, checked, node, eOpts){
        console.info('Cascading tree checked change');
        node.cascadeBy(function(child){
            child.set('checked', checked);
        });
    },

    /**
     * Handle change to checked state of 'Check All' toolbar item
     * shown over departments and employees trees. Applies checked value
     * to all items in current tree
     * @param {Object} elem Checkbox element; active tree is determined 
     *  relative to this
     * @param {boolean} checked Checked value of source checkbox
     */
    onTreeGridCheckAllChange: function(elem, checked, eOpts){
        console.info('Check all changed');
        elem.parent.parent.getActiveItem().getRootNode().cascadeBy(function(child){
            child.set('checked', checked);
        });
    }
});