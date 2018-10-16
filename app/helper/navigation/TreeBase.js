Ext.define('Breeze.helper.navigation.TreeBase', {
    extend: 'Breeze.helper.navigation.Base',

    config: {
        /**
         * Merging settings
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

    constructor: function(cfg){
        this.setConfig(cfg || {});
    },

    asTree: function () {
        return this.createTree(this.getData());
    },

    asTreeWithExtras: function (extras) {
        var tree = this.asTree(),
            extras = (Array.isArray(extras)) ? extras : [extras];
        
        extras.forEach((treeNS) => {
            var other = Ext.create(treeNS);
            tree = tree.mergeTree(
                tree,
                other.getData(),
                other.getTargetPath(),
                other.getMergeOptions()
            );
        });

        return tree;
    }

});