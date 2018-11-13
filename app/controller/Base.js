/**
 * Extended version of ViewController with extras
 * @class Base
 * @namespace Breeze.controller.Base
 */
Ext.define('Breeze.controller.Base', {
    extend: 'Ext.app.ViewController',

    /**
     * Add a new instance of a store to controller's view model, optionally
     * loading it with a callback
     * @param {String} storeNamespace Namespace/path/alias of store
     * @param {String} storeName name to give store in view model
     * @param {Object} options Optional options:
     *  - load: boolean indicating if store should be loaded
     *  - createOpts: object to pass to create call (options)
     *  - loadOpts: object to pass to load call, can include callback
     *      e.g. callback: function(success, records, op)
     */
    addStoreToViewModel: function(storeNamespace, storeName, options){
        var vm = this.getViewModel();
        var options = (typeof options == 'undefined')? {} : options;
        var stores = {};
        stores[storeName] = Ext.create(
            storeNamespace, 
            (typeof options.createOpts == 'undefined')? {} : options.createOpts
        );
        vm.setStores(stores);
        if(options.load){
            if(options.loadOpts){
                vm.getStore(storeName).load(options.loadOpts);
            } else {
                vm.getStore(storeName).load();
            }
        }
    },

    /**
     * Add copy of previously loaded store to controller's view model
     * 
     * @param {String|Object} store ID under which target store is registered,
     *      or actual store object
     * @param {String} storeName The name to use for the store in the View 
     *      Model
     * @return {Boolean} Returns true if store is successfully added, 
     *      false otherwise
     */
    addLoadedStoreToViewModel: function(store, storeName){
        var me = this,
            vm = me.getViewModel(),
            stores = {};
        var sourceStore = null;
        
        if(typeof store == 'string'){
            // Store parameter was an ID
            try {
                sourceStore = Ext.getStore(storeId);
            } catch (ex) {
                console.warn(
                    'Encountered exception while trying to get existing ' +
                    'store to add to VM: ', ex
                );
            }
        } else {
            // Store parameter was a store instance
            sourceStore = store
        }

        if(sourceStore !== null){
            // Got store successfully
            stores[storeName] = sourceStore;
            vm.setStores(stores);
            return true;
        } else {
            // Failed to get store
            return false;
        }
    },

    /**
     * Loads a store and returns the result
     * @param {String} store Store name
     * @param {Object} args Parameters to pass to store constructor
     * @return {Promise} Promise resolving with store or rejecting on error
     */
    loadStore: function(store, args){
        var args = Object.defVal(args, {});
        return new Promise((resolve, reject)=>{
            var s = Ext.create(store, args).load({
                callback: (records, ops, success)=>{
                    if(success){
                        resolve(s);
                    } else {
                        reject(null);
                    }
                }
            });
        });
    },

    //=== [Shared Tool Behaviors] ===
    
    /**
     * Handle refresh tool button click
     * 
     * Override in extending controllers to replace default behavior
     */
    onRefreshTool: function(c, t, eOpts){
        console.info('Refresh tool');
        if(this.onInit){
            this.onInit(this.getView());
        } else {
            console.warn('Default refresh tool handler (controller base) can\'t find onInit method');
        }
    },

    /**
     * Handle print tool button click
     * 
     * Override in extending controllers to replace default behavior
     */
    onPrintTool: function(c, t, eOpts){
        console.info('Print tool');
        var me = this;
        var el = me.getView().element.dom;

        Breeze.helper.Printing.printElement(el).then(
            function(win){
                console.info('Print ok?', win);
            }
        ).catch(
            function(err){
                console.warn('Print failed: ', err);
            }
        )
    }
    
});