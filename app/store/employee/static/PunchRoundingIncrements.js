/**
 * Store containing Punch Pounding increment values used by Employee Info
 * @class PunchRoundingIncrements
 * @alias Breeze.store.employee.static.PunchRoundingIncrements
 */
Ext.define('Breeze.store.employee.static.PunchRoundingIncrements', {
    extend: 'Ext.data.Store',
    alias: 'store.employee.static.punchroundingincrements',
    autoLoad: true,
    storeId: 'PunchRoundingIncrements',
    fields: ['name', 'value'],
    data:[
        {name: '1', value: 1},
        {name: '2', value: 2},
        {name: '3', value: 3},
        {name: '5', value: 5},
        {name: '6', value: 6},
        {name: '10', value: 10},
        {name: '15', value: 15},
        {name: '20', value: 20},
        {name: '30', value: 30}
    ]
});