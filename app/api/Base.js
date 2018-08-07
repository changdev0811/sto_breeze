/**
 * Base class for scoped API call classes. Provides access to Api, Cookie and Auth helpers
 * @class Base
 * @alias Breeze.api.Base
 */
Ext.define('Breeze.api.Base', {
    requires: [
        'Breeze.helper.Api',
        'Breeze.helper.DummyApi',
        'Breeze.helper.Cookie',
        'Breeze.helper.Auth'
    ],

    // Helper aliases
    // TODO: Replace DummyApi ref with Api when done testing
    api: Breeze.helper.Api,
    // api: Breeze.helper.DummyApi,
    cookie: Breeze.helper.Cookie,
    auth: Breeze.helper.Auth,
    /**
     * Return a unless undefined, in which case return b
     * @param {Object} a Value to return if defined
     * @param {Object} b Value to return if a is undefined
     * @return {Object} a unless a is undefined, in which case b
     */
    defVal: function(a,b){return"undefined"==typeof a?b:a}
});