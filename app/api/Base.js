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
    api: Breeze.helper.Base.api,
    cookie: Breeze.helper.Cookie,
    auth: Breeze.helper.Auth,
    /**
     * Alias for $breeze.defVal
     */
    defVal: $breeze.defVal
});