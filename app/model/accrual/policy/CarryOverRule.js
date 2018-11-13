/**
 * Accrual Policy category carry over rule, used by accrual.Policy
 * @class CarryOverRule
 * @namespace Breeze.model.accrual.policy.CarryOverRule
 */
Ext.define('Breeze.model.accrual.policy.CarryOverRule', {
    extend: 'Breeze.model.Base',
    fields: [
        {name: 'carryOver',	    type: 'integer' },
        {name: 'carryMax',	        type: 'boolean' },
        {name: 'allowCarry',	        type: 'boolean' },
        {name: 'expChanged',	        type: 'boolean' },
        {name: 'perAmount',	    type: 'integer' },
        {name: 'perUnit',	    type: 'integer' },
        {name: 'svcFrom',	type: 'integer' },
        {name: 'svcTo',	    type: 'integer' },
    ]
});