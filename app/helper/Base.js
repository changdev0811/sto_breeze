/**
 * Base helper class, singleton
 * Referenced to determine which API helper to use
 * 
 * @class Base
 * @namespace Breeze.helper.Base
 */
Ext.define('Breeze.helper.Base', {
   singleton: true,

    /***********************************************************
     * Swap which of the following two lines are commented out
     * to go from dev mode (using local dummy api) to production
     * (using live server api)
     ***********************************************************/
    // api: Breeze.helper.Api,
    api: Breeze.helper.DummyApi,


    /*******************************************
     * Control 'test' mode (skip login screen)
     * Used by Application.js
     *******************************************/
    devTestMode: true,

    /**
     * Method used by Application.js to determine if test mode should be
     * used. Only true when using dummy api AND devTestMode = true
     * @return {Boolean} Boolean indicating whether to use test mode
     */
    isTestMode: function(){
        return (this.api == Breeze.helper.DummyApi) && this.devTestMode;
    }

});