/**
 * Accrual 'New Rate' option store
 *
 * Ported from homemade.js/checkAccrualOptionStores
 * 
 * @model Breeze.data.TypeOption
 * @storeId accrualNewRate
 * @class NewRate
 * @alias Breeze.store.accrual.static.NewRate
 * @todo TODO: Indicate where store is used
 */
Ext.define('Breeze.store.accrual.static.NewRate', {
    extend: 'Ext.data.Store',
    model: 'Breeze.model.data.TypeOption',
    alias: 'store.accrual.static.newrate',
    storeId: 'accrualNewRate',
    
    autoLoad: true,
    data: [
        { ID: 42, CodeTypeID: 11, Description: 'Day(s)' },
        { ID: 43, CodeTypeID: 11, Description: 'Weeks(s)' },
        { ID: 44, CodeTypeID: 11, Description: 'Month(s)' }
    ]
});