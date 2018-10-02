/**
 * Base class extending Store with extra methods
 * @class Base
 * @namespace Breeze.store.Base
 * @extends Ext.data.Store
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
     * Append extra parameters without removing existing.
     * Attributes already defined will be replaced, new attributes will
     * be appended
     * @param {Object} params New parameter attributes
     */
    addExtraParams: function(params){
        var extras = this.getProxy().getExtraParams();
        var attrs = Object.keys(params);
        for(var i=0;i<attrs.length;i++){
            var key = attrs[i];
            extras[key] = params[key];
        }
        this.getProxy.setExtraParams(extras);
    },
    /**
     * Have proxy send parameters as JSON
     */
    useJsonParams: function(){
        this.getProxy().setParamsAsJson(true);
    }
});
