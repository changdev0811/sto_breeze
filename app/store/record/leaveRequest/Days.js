/**
 * Leave Request Days store
 * 
 * Ported from store declared in old LeaveRequestSlidePanel.js
 * 
 * @class Days
 * @namespace Breeze.store.record.leaveRequest.Days
 * @api getLeaveRequestDays
 */
Ext.define('Breeze.store.record.leaveRequest.Days', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.record.leaveRequest.Day',

    config: {
        lookup: null,
        requestId: null
    },

    autoLoad: false,

    listeners: {
        beforeload: function(){
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            if(this.getLookup() == null){
                this.addExtraParams({lookup: Breeze.helper.Auth.getCookies().emp});
            } else {
                this.addExtraParams({lookup: this.getLookup()});
            }
            this.addExtraParams({
                request_id: this.getRequestId()
            });
        }
    },

    proxy: {
        type: 'ajax',
        url: Breeze.helper.Store.api.url('getLeaveRequestDays'),
        headers: { 'Content-Type': 'application/json' },
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'd'
        },
        pageParam: undefined,
        startParam: undefined
    }
    /*
    Uncomment to use a specific model class
    model: 'User',
    */
    /*
    Fields can also be declared without a model class:
    fields: [
        {name: 'firstName', type: 'string'},
        {name: 'lastName',  type: 'string'},
        {name: 'age',       type: 'int'},
        {name: 'eyeColor',  type: 'string'}
    ]
    */
    /*
    Uncomment to specify data inline
    data : [
        {firstName: 'Ed',    lastName: 'Spencer'},
        {firstName: 'Tommy', lastName: 'Maintz'},
        {firstName: 'Aaron', lastName: 'Conran'}
    ]
    */
});