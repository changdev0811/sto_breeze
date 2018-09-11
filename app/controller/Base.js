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
    }
    
});