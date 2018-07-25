/**
 * Base class for scoped API call classes. Provides access to Api, Cookie and Auth helpers
 * @class Base
 * @alias Breeze.api.Base
 */
Ext.define('Breeze.api.Base', {
    requires: [
        'Breeze.helper.Api',
        'Breeze.helper.Cookie',
        'Breeze.helper.Auth'
    ],

    // Helper aliases
    api: Breeze.helper.Api,
    cookie: Breeze.helper.Cookie,
    auth: Breeze.helper.Auth
});