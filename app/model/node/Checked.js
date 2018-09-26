/**
 * Checked tree node model; ported from Softtime.model.CheckedNodeModel.js
 * @class Checked
 * @namespace Breeze.model.node.Checked
 * @alias model.node.checked
 * @extends Breeze.model.Base
 */
Ext.define('Breeze.model.node.Checked', {
	extend: 'Breeze.model.Base',
	fields: [
		{name: 'text', type: 'string'},
		{name: 'type', type: 'string'},
		{name: 'iconCls', type: 'string'},
		{name: 'data', type: 'string'},
		{name: 'checked', type: 'boolean'}
	]
});