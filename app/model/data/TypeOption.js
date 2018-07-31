/**
 * Type Option (ported from model.TypeOption)
 * @class TypeOption
 * @alias Breeze.model.data.TypeOption
 */
Ext.define('Breeze.model.data.TypeOption', {
	extend: 'Breeze.model.Base',
	fields: [
		{name: 'ID',			type: 'integer'},
		{name: 'CodeTypeID',	type: 'integer'},
		{name: 'Description',	type: 'string' }
	]
});