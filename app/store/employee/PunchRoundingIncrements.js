Ext.define('Breeze.store.employee.PunchRoundingIncrements', {
    extend: 'Ext.data.Store',
    alias: 'store.employee.punchroundingincrements',
    autoLoad: true,
    storeId: 'PunchRoundingIncrements',
    fields: ['name', 'value'],
    data:[
        {name: '1 minute', value: 1},
        {name: '2 minutes', value: 2},
        {name: '3 minutes', value: 3},
        {name: '5 minutes', value: 5},
        {name: '6 minutes', value: 6},
        {name: '10 minutes', value: 10},
        {name: '15 minutes', value: 15},
        {name: '20 minutes', value: 20},
        {name: '30 minutes', value: 30}
    ]
});