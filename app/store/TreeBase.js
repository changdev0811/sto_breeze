/**
 * Base class extending TreeStore with extra methods
 * @class TreeBase
 * @alias Breeze.store.TreeBase
 */
Ext.define('Breeze.store.TreeBase', {
    extend: 'Ext.data.TreeStore',
    requires: [],
    /**
     * Helper method that handles providing auth cookie params to
     * store's proxy
     */
    provideAuthCookieToProxy: function(){
        var extras = Breeze.helper.Auth.getCookies();
        // this.getProxy().extraParams.cust_id = extras.cust;
        // this.getProxy().extraParams.emp_id = extras.emp;
        // this.getProxy().extraParams.hashcookie = extras.pass;
        this.getProxy().setExtraParams({
            cust_id: extras.cust,
            emp_id: extras.emp,
            hashcookie: extras.pass
        });
    },
    /**
     * Have proxy send parameters as JSON
     */
    useJsonParams: function(){
        this.getProxy().setParamsAsJson(true);
    }
});