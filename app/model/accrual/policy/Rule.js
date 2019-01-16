/**
 * Accrual Policy Category rule, used by accrual.Policy
 * @class Rule
 * @namespace Breeze.model.accrual.policy.Rule
 */
Ext.define('Breeze.model.accrual.policy.Rule', {
    extend: 'Breeze.model.Base',
    fields: [
        {name: 'ruleName',	type: 'string' },
        {name: 'svcFrom',	type: 'integer' },
        {name: 'svcTo',	    type: 'integer' },
        {name: 'accformDay',	    type: 'string' },
        {name: 'accformInc',	type: 'number' },
        {name: 'accformPer',	type: 'integer' },
        {name: 'accformUnit',	    type: 'integer' },
        {name: 'accrualChanged',	type: 'boolean' },
        {name: 'msDay',	    type: 'string' },
        {name: 'msMonth',	    type: 'string' }
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'accrualRules',
            groupRootProperty: 'ruleName'
        }
    }
});