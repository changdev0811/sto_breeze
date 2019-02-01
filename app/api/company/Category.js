/**
 * API Calls for Company Categories; extends Breeze.api.Base, 
 * giving access to helper classes. 
 * @class Category
 * @alias Breeze.api.company.Category
 */
Ext.define('Breeze.api.company.Category', {
    extend: 'Breeze.api.Base',
    singleton: true,

    /** Default names for shared category stores */
    storeIds: {
        compactList: 'compactCategoryListStore'
    },

    /**
     * Get a shared Category store by the alias in storeIds defining
     * the target store's ID
     * 
     * @param {String} id Alias attribute of store id from storeIds object
     * @return {Object} Store if loaded, otherwise null
     */
    getNamedStore: function(id){
        var store = null;

        try {
            store = Ext.getStore(this.storeIds[id]);
        } catch (ex) {
            console.info('Caught exception trying to get named store: ', ex);
        }

        if(store == null || typeof store == 'undefined'){
            // Store failed to load, return null
            return null;
        } else {
            return store
        }

    },

    /**
     * Load CompactList categories store and save it with
     * an ID so it is available throughout the app
     * @param {Function} callback Optional callback function fired on
     *      store load. (function(success:bool, storeId:str, store:object))
     * @param {Object} options Optional option object (only valid option
     *      is storeId, used to override the id given to loaded
     *      store)
     */
    loadCompactListStore: function(callback, options){
        // get defaults for options, falling back on default store id
        var options = Object.defVal(options, {}),
            callback = Object.defVal(callback, null);
        options.storeId = Object.defVal(options.storeId, this.storeIds.compactList);
        
        var store = Ext.create('Breeze.store.category.CompactList', {
            storeId: options.storeId
        }).load({callback: function(records,o,success){
            if(callback !== null){
                // If callback was defined, use it
                if(success){
                    // Load succeeded, callback gets true and the
                    // id of the store, and the store itself
                    callback(
                        true,
                        options.storeId,
                        Ext.getStore(options.storeId)
                    );
                } else {
                    // Load failed, callback gets false
                    callback(
                        false
                    );
                }
            }
        }});
    }

});