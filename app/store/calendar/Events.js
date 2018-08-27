/**
 * Calendar events collection store
 * @class Events
 * @namespace Breeze.store.calendar.Events
 */
Ext.define('Breeze.store.calendar.Events', {
    extend: 'Ext.calendar.store.Events',
    alias: 'store.calendar.events',

    config: {
        categoryId: null
    },

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
    },

    model: 'Breeze.model.calendar.Event',

    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.getProxy().extraParams.category_id = this.getCategoryId();
        }
    },

    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('getCalendarEventsForCategory'),
        // url: Breeze.helper.Api.url('getDepartmentList'),
        headers: { 'Content-Type': 'application/json' },
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'd.Rows'
        },
    }

});