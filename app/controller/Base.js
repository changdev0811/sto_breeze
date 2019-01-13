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
        // if(vm.getStore(storeName) !== null){
        //     vm.get(storeName).destroy();
        // }
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
     * Load store without saving in viewmodel, so result can be used in callback
     * loading it with a callback
     * @param {String} storeNamespace Namespace/path/alias of store
     * @param {Object} options Optional options:
     *  - load: boolean indicating if store should be loaded
     *  - createOpts: object to pass to create call (options)
     *  - loadOpts: object to pass to load call, can include callback
     *      e.g. callback: function(success, records, op)
     */
    loadStoreForViewModel: function(storeNamespace, options){
        var vm = this.getViewModel();
        var options = (typeof options == 'undefined')? {} : options;
        var store = null;
        store = Ext.create(
            storeNamespace,
            (typeof options.createOpts == 'undefined')? {} : options.createOpts
        );
        // vm.setStores(stores);
        if(options.load){
            if(options.loadOpts){
                store.load(options.loadOpts);
            } else {
                store.load();
            }
        }
    },

    /**
     * Copy data from object or existing record directly to named data item
     * in view model, optionally cloning to decouple
     * 
     * @param {(Ext.data.Record|Object)} recordSource Data record source (model record
     *      or regular object)
     * @param {String} dataName Name to use for storage in viw model
     */
    copyRecordToViewModel: function(recordSource, dataName){
        // var replace = Object.defVal(replace, true),
        //     clone = Object.defVal(clone, true),
        //     // default to using getData
        //     data = true,
        //     vm = this.getViewModel();

        // // decide whether getData should be used based on recordSource
        // // data type
        // if(
        //     recordSource.__proto__['alternateClassName'] &&
        //     recordSource.__proto__.alternateClassName == 'Ext.data.Record'
        // ) {
        //     data = true;
        // } else {
        //     data = false;
        // }

        // // Data to be written, either direct object or using .getData()
        // var srcData = (data)? recordSource.getData() : recordSource
        
        // if(!replace && !Object.isUnvalued(vm.get(dataName))){
        //     return false;
        // } else {
        //     var dataVal = (clone)? Ext.clone(srcData) : srcData;
        //     vm.set(dataName, dataVal);
        //     return true;
        // }
        this.getViewModel().set(
            dataName,
            Ext.clone(recordSource)
        );
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