/**
 * Recorded accrual policy category years store
 * from /FYI.js
 * @class RecordedYears
 * @memberof Breeze.store.accrual.RecordedYears
 * @api getRecYears
 */
Ext.define('Breeze.store.accrual.RecordedYears', {
    extend: 'Breeze.store.Base',
    model: 'Breeze.model.accrual.RecordedYear',
    autoLoad: false,
    alias: 'store.accrual.recordedyears',

    config: {
        employeeId: null,
        categoryId: null
    },

    listeners: {
        beforeload: function() {
            this.provideAuthCookieToProxy();
            this.useJsonParams();
            this.addExtraParams({
                lookup: this.getEmployeeId(),
                category_id: this.getCategoryId()
            })
        }
    },

    proxy: {
        type: 'ajax',
        // TODO: Add API URL
        url: Breeze.helper.Store.api.url('getRecYears'),
        headers: { 'Content-Type': 'application/json' },
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'd.Years'
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