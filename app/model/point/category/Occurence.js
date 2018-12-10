Ext.define('Breeze.model.point.category.Occurence', {
    extend: 'Breeze.model.Base',
    fields: [
        {name:'occfrom',    type:'integer'},
        {name:'occto',      type:'integer'},
        {name:'occvalue',   type:'integer'}
    ],
    proxy:{
        type: 'memory',
        reader: {
            type:'json',
            rootProperty: 'Occurences'
        }
    }
});