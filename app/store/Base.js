/**
 * Base class extending Store with extra methods
 * @class Base
 * @alias Breeze.store.Base
 */
Ext.define('Breeze.store.Base', {
    extend: 'Ext.data.Store',
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