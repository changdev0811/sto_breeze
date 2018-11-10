/**
 * Accrual Policy category, used by accrual.Policy
 * @class Category
 * @namespace Breeze.model.accrual.policy.Category
 */
Ext.define('Breeze.model.accrual.policy.Category', {
    extend: 'Breeze.model.Base',
    fields: [
        {name: 'accrualCapAmount',	type: 'integer' },
        {name: 'accrualCapUnit',	type: 'integer' },
        {name: 'accrualRules',	    type: 'auto' },
        {name: 'allowAccrual',	    type: 'boolean' },
        {name: 'balanceCapAmount',	type: 'integer' },
        {name: 'balanceCapUnit',	type: 'integer' },
        {name: 'calendarType',	    type: 'integer' },
        {name: 'carryOverRules',	type: 'auto' },
        {name: 'categoryId',	    type: 'integer' },
        {name: 'categoryName',	    type: 'string' },
        {name: 'isAllowed',	        type: 'boolean' },
        {name: 'newRate',	    type: 'integer' },
        {name: 'newTime',	    type: 'integer' }
    ]
});