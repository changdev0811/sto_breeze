/**
 * Base class for Navigation tree part classes. Provides definition of expected
 * config properties, and some helper methods for quickly converting tree parts
 * into tree stores, optionally with other tree parts merged in.
 * Defines settings for how parts merge with other tree parts
 * @class TreeBase
 * @memberof Breeze.helper.navigation
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
        mergeChild: false,
        mergeBefore: false,
        mergeReplace: false,
        // Tree nodes
        data: [],
    },

    /**
     * Constructor
     * @constructor
     * @param {Object} cfg Config attributes provided by classes extending
     *  TreeBase so overrides get combined with default config attributes
     */
    constructor: function(cfg){
        // this.callParent([cfg]);
        this.initConfig();
    },

    /**
     * Shorthand access to Base class's createTree, specifically using
     * owning instance's data
     * @member
     * @function
     * @see Breeze.helper.navigation.Base.createTree
     * @memberof Breeze.helper.navigation.TreeBase
     */
    asTree: function () {
        return this.createTree(this.getData());
    },

    /**
     * Combines merge option config properties into a single object
     * @return {Object} Object containing child, before, and replace properties
     * @memberof Breeze.helper.navigation.TreeBase
     */
    getMergeOptions: function(){
        return {
            child: this.getMergeChild(),
            before: this.getMergeBefore(),
            replace: this.getMergeReplace()
        }
    },

    /**
     * Creates instance of tree using createTree with owning instance's
     * data, merging in any other parts specified based on their merge
     * config property values
     * @param {Array|String} extras NameSpaces(s) of other classes extending
     *  TreeBase to automerge with calling tree
     * @see Breeze.helper.navigation.Base.createTree
     * @see Breeze.helper.navigation.Base.mergeTree
     * @memberof Breeze.helper.navigation.TreeBase
     */
    asTreeWithExtras: function (extras) {
        var tree = this.getData(),
            extras = (Array.isArray(extras)) ? extras : [extras],
            me = this,
            combined = null;
        
        for(var i=0; i<extras.length; i++){
            var other = Ext.create(extras[i]);
            combined = this.mergeNodes(
                tree,
                other.getData(),
                other.getTargetPath(),
                other.getMergeOptions()
            );
            tree = combined;
        }

        return this.createTree(combined);
    }

});