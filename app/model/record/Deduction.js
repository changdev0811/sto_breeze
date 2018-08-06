/**
 * Deduction model, ported from Softime.model.Deduction
 * @class Deduction
 * @alias Breeze.model.record.Deduction
 */
Ext.define('Breeze.model.record.Deduction', {
    extend: 'Breeze.model.Base',
    fields: [

        { name: 'id', type: 'integer' },
		{ name: 'deduction_date', type: 'date', dateFormat: 'MS' },
		{ name: 'deduction_amount', type: 'integer' },
		{ name: 'deduction_desc', type: 'string' },
        { name: 'worktime_id', type: 'integer' }
    ]

});


