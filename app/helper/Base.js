/**
 * Base helper class, singleton
 * Referenced to determine which API helper to use
 */
Ext.define('Breeze.helper.Base', {
   singleton: true,

    // Referenced elsewhere for single location to toggle 
    // between dummy and live api helpers
    // api: Breeze.helper.Api
    api: Breeze.helper.DummyApi

});