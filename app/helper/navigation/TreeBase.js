/**
 * Base class for Navigation tree part classes. Provides definition of expected
 * config properties, and some helper methods for quickly converting tree parts
 * into tree stores, optionally with other tree parts merged in.
 * Defines settings for how parts merge with other tree parts
 * @class TreeBase
 * @namespace Breeze.helper.navigation.TreeBase
 * @extends Breeze.helper.navigation.Base
 */
Ext.define('Breeze.helper.navigation.TreeBase', {
    extend: 'Breeze.helper.navigation.Base',

    config: {
        /**
         * Definition of how part is merged into a parent tree
         */
        // NameSpace of expected parent (optional, not currently used)
        // TODO: decide if attr is necessary
        parentTree: null,
        // Path tree should be merged at
        targetPath: null,
        // Merge options
        mergeOptions: {
            child: false,
            before: false,
            replace: false
        },

        // Tree nodes
        data: [],
    },

    /**
     * Constructor
     * @param {Object} cfg Config attributes provided by classes extending
     *  TreeBase so overrides get combined with default config attributes
     */
    constructor: function(cfg){
        this.setConfig(cfg || {});
    },

    /**
     * Shorthand access to Base class's createTree, specifically using
     * owning instance's data
     * @see Breeze.helper.navigation.Base.createTree
     */
    asTree: function () {
        return this.createTree(this.getData());
    },

    /**
     * Creates instance of tree using createTree with owning instance's
     * data, merging in any other parts specified based on their merge
     * config property values
     * @param {Array|String} extras NameSpaces(s) of other classes extending
     *  TreeBase to automerge with calling tree
     * @see Breeze.helper.navigation.Base.createTree
     * @see Breeze.helper.navigation.Base.mergeTree
     */
    asTreeWithExtras: function (extras) {
        var tree = this.getData(),
            extras = (Array.isArray(extras)) ? extras : [extras];
        
        extras.forEach((treeNS) => {
            var other = Ext.create(treeNS);
            tree = this.mergeTree(
                tree,
                other.getData(),
                other.getTargetPath(),
                other.getMergeOptions()
            );
        });

        return tree;
    }

});