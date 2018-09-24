/**
 * Company Project (Flat) (ported from model.FlatProject)
 * @class FlatProject
 * @alias Breeze.model.company.FlatProject
 */
Ext.define('Breeze.model.company.FlatProject', {
    extend: 'Breeze.model.Base',
    alias: 'model.company.flatproject',

    fields: [
        {name: 'ID',				type: 'integer'	},
		{name: 'Name',				type: 'string'	},
	    {name: 'Code',				type: 'string'	}
    ]
});