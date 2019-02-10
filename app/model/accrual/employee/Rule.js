/**
 * Model for my accrual policy view's employee accrual rules
 * @class Rule
 * @memberof Breeze.model.accrual.employee
 */
Ext.define('Breeze.model.accrual.employee.Rule', {
    extend: 'Breeze.model.Base',
    fields: [
        {name: 'accformDay',	type: 'string'	},
		{name: 'accformInc',	type: 'number'	},
		{name: 'accformPer',	type: 'integer'	},
		{name: 'accformUnit',	type: 'integer'	},
		{name: 'ruleName',		type: 'string'	},
		{name: 'ruleStart',		type: 'string'	},
		{name: 'ruleEnd',		type: 'string'	},
		{name: 'ruleModified',	type: 'integer'	},
		{name: 'accrualChanged',type: 'boolean'	},
		{name: 'occurrences',	type: 'integer'	},
		{name: 'total',			type: 'number'	},
		{name: 'recordingMode',	type: 'integer'	},
		// Place holders for monthly special values to display in the TPL grid
		{name: 'msMonth',		type: 'string'	},
		{name: 'msDay',			type: 'string'	}
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'rules'
        }
    }
});