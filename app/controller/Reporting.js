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
    
    mixins: {
        options: 'Breeze.mixin.OptionsParameter'
    },

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
    },

    /**
     * Handles change event for 'Check All' checkbox connected to categories 
     * list.
     * 
     * @note Note: Source checkbox should be in a toolbar nested in a container
     *      also containing a categories list component with itemId set to 
     *      'categories' for this event handler to work correctly
     * 
     * @param {Object} elem Checkbox element event originates from; used
     *   as relative starting point for locating categories list
     * @param {Boolean} checked Whether checkbox is checked (true) or not
     */
    onCategoriesCheckAllChange: function(elem, checked){
        elem.getParent().getParent().getComponent('categories')
            .changeAllCheckboxes(checked);
    },

        
    /**
     * Handle change event for 'Check All' checkbox conneced
     * to a select-list component.
     * 
     * Copies checked state to all items in list
     * 
     * @note Note: Source checkbox should be in a toolbar nested in a container
     *      also containing a categories list component with itemId set to 
     *      'selectList' for this event handler to work correctly
     * 
     * @param {Object} elem Checkbox element event originated from
     * @param {Boolean} checked Checked state of checkbox
     */
    onSelectListCheckAllChange: function(elem, checked){
        elem.getParent().getParent()
            .getComponent('selectList')
            .changeAllCheckboxes(checked);
    },

    // ====[Data Collection Helpers]====

    /**
     * Get array of IDs of all checked items in a tree
     * @param {Object} tree Reference to Tree component instance
     * @param {Object} options Optional options object
     *      - nodeType: if set, limit ids to those of 
     *        checked nodes with data.type == filter
     *        (default null)  
     *      - forceInt: If true, ids are forced to be integers
     *        (default true)
     *  @return {Array} Array of the IDs of all checked tree items
     */
    checkedTreeItems: function(tree, options){
        var ids = [],
            options = this.resolveOptions(
                options,
                {
                    nodeType: null,
                    forceInt: true
                }
            ),
            eachFunction = function(node){
                if(node.data.checked){
                    if(
                        options.nodeType !== null &&
                        (node.data.type !== options.nodeType)
                    ){
                        // Node filter was set and didn't match node type,
                        // so don't collect it
                    } else {
                        // Collect ID
                        // Force format to int if options demand
                        var id = (options.forceInt)?
                            parseInt(node.data.data) :
                            node.data.data;
                        ids.push(id);
                    }
                }
                node.eachChild(eachFunction);
            };

        tree.getRootNode().eachChild(eachFunction);

        return ids;
    }
});