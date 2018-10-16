Ext.define('Breeze.helper.navigation.Base', {

    /**
     * Wrao array of tree nodes inside a tree store structure
     * @param {Array} baseData Array of tree nodes
     * @return {Object} Nodes wrapped in tree store structure
     */
    createTree: function (baseData) {
        return {
            root: {
                children: baseData
            }
        };
    },

    /**
     * Merge tree data into an existing tree
     * @param {Object} existing Existing tree object (from createTree)
     * @param {Object|Array} newData Data to merge into tree, either returned
     *      from createTree, or an array of nodes
     * @param {String} path Path of ids joined by '/' specifying where merge
     *      is to occur
     * @param {Object} options Optional options:
     *      - child: If true, merge data is appended to child attribute
     *          of node targeted by path, unless node has no children 
     *          attribute. (Ignored if node has no children attr)
     *          If false, merge data is inserted into target node's
     *          parent, relative to target's position. Default
     *          false
     *      - before: If child is false, true will cause values
     *          to be inserted before target node, false means after.
     *          default false
     *      - replace: If true, merge data replaces content of target node,
     *          if child is true, all children are replace. If
     *          child is false, all items in target's parent are
     *          replaced. Default false
     * @return {Object} Tree resulting from merge passed through
     *      createTree method to wrap it inside a tree store object
     */
    mergeTree: function (existing, newData, path, options) {
        var base = existing.root.children.slice(0),
            // Accept table store format or array of child nodes
            addition = (Array.isArray(newData))? newData.slice(0) :
                newData.root.children.slice(0),
            // provide default values for options not defined
            options = { 
                child: (options && options.children)? 
                    options.children : false,
                before: (options && options.before)?
                    options.before : false,
                replace: (options && options.replace)?
                    options.replace : false
            },
            target = this.resolvePath(base, path);
        
        if(options.child && target.children){
             // children mode && target has .children attribute
             if(options.replace){
                // replace all children
                target.children = addition;
            } else {
                target.children = target.children.concat(addition);
            }
        } else {
            //either not children mode, or target doesn't have
            // a .children attribute
            var targetContainer = this.resolvePath(base, path, true);

            if(options.replace){
                // replace contents
                targetContainer = addition;
            } else {
                // insert contents relative to path target
                targetContainer.insertAtValue(
                    target,
                    addition,
                    options.before
                );
            }
        }

        return this.createTree(base);
    },

    /**
     * Find node in tree by its path and id
     * @param {Array|Object} tree Tree to traverse to resolve path
     * @param {String} path Path of target, consisting of IDs separated by '/'
     * @param {Boolean} parentOnly Optional bool that when true causes
     *      the node containing the target to be returned. If containing
     *      node has .children, the value of .children is returned. Default
     *      false
     * @return {Object} Reference to node at desired path, or null if
     *      path fails to resolve
     */
    resolvePath: function (tree, path, parentOnly) {
        // ensure tree is array of nodes
        var nodes = (Array.isArray(tree)) ? tree : tree.root.children,
            parentOnly = parentOnly || false,
            pathSteps = path.split('/'),
            depth = 0;

        // find first node
        var loc = nodes.find((n) => { return n.id == pathSteps[depth] });
        depth++;

        if (!loc) {
            // failed to find first node
            return null;
        } else {
            if(parentOnly && depth == pathSteps.length){
                return nodes;
            }
        }

        while (depth < pathSteps.length) {
            // while depth is < step count, look for next id in path
            // inside previously found node's children attribute
            if (!loc.children) {
                // node doesn't have a children attribute, fail
                return null;
            }

            var next = loc.children.find((n) => { return (n.id == pathSteps[depth]) });
            if (next) {
                // found id in children, increment depth
                depth++;

                if(depth == pathSteps.length && parentOnly){
                   return loc.children;
                } else {
                    loc = next;
                }
                
            } else {
                // didn't find child with id, fail
                return null;
            }
        }

        // return final location
        return loc;
    }
});