/**
 * Store helper class
 * @class Store
 * @alias Breeze.helper.Store
 */
Ext.define('Breeze.helper.Store', {
    requires: ['Breeze.helper.Api', 'Breeze.helper.DummyApi'],
    statics: {
        /**
         * Reference to API helper, used by stores for request urls
         */
        api: Breeze.helper.DummyApi
        // api: Breeze.helper.Api
    }
});
