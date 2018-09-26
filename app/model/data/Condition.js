/**
 * Model representing conditions; ported from ConditionalModel
 * @class Condition
 * @namespace Breeze.model.data.Condition
 * @alias model.data.condition
 * @extends Breeze.model.Base
 */
Ext.define('Breeze.model.data.Condition', {
	extend: 'Breeze.model.Base',
	fields: [
		{name: 'text', type: 'string'},
		{name: 'data', type: 'string'},
	]
});