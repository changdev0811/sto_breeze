/**
 * Accrual Policy category, used by accrual.Policy
 * @class Category
 * @namespace Breeze.model.accrual.policy.Category
 */
Ext.define('Breeze.model.accrual.policy.Category', {
    requires: [
        'Breeze.model.accrual.policy.Rule',
        'Breeze.model.accrual.policy.CarryOverRule',
    ],
    extend: 'Breeze.model.Base',
    fields: [
        {name: 'accrualCapAmount',	type: 'integer' },
        {name: 'accrualCapUnit',	type: 'integer' },
        // {name: 'accrualRules',	    type: 'auto' },
        {name: 'allowAccrual',	    type: 'boolean' },
        {name: 'balanceCapAmount',	type: 'integer' },
        {name: 'balanceCapUnit',	type: 'integer' },
        {name: 'calendarType',	    type: 'integer' },
        // {name: 'carryOverRules',	type: 'auto' },
        {name: 'categoryId',	    type: 'integer' },
        {name: 'categoryName',	    type: 'string' },
        {name: 'isAllowed',	        type: 'boolean' },
        {name: 'newRate',	    type: 'integer' },
        {name: 'newTime',	    type: 'integer' }
    ],

    hasMany: [
        { 
            model: 'Breeze.model.accrual.policy.Rule', 
            name: 'accrualRules' 
        },
        {
            model: 'Breeze.model.accrual.policy.CarryOverRule',
            name: 'carryOverRules'
        }
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'Categories'
        }
    }
});