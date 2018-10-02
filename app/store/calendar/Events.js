/**
 * Calendar events collection store
 * @class Events
 * @namespace Breeze.store.calendar.Events
 */
Ext.define('Breeze.store.calendar.Events', {
    extend: 'Ext.calendar.store.Events',
    alias: 'store.calendar.events',

    config: {
        eventType: null,
        lookup: null,
        startParam: 'start',
        endParam: 'end',
        UTCstart: null,
        UTCend: null
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
        // console.info('getting calendar params');
        this.getProxy().setExtraParams({
            cust_id: extras.cust,
            customer_id: parseInt(extras.cust),
            employee_id: parseInt(extras.emp),
            emp_id: extras.emp,
            hashcookie: extras.pass,
            UTCstart: this.getUTCstart(),
            UTCend: this.getUTCend()
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
            console.info('Before setting event params');
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.getProxy().extraParams.type = this.getEventType();
            this.getProxy().extraParams.lookup = this.getLookup();
        }
    },

    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('JSONCalendarEvents'),
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