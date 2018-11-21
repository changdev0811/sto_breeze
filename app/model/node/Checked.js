/**
 * Checked tree node model; ported from Softtime.model.CheckedNodeModel.js
 * @class Checked
 * @namespace Breeze.model.node.Checked
 * @alias model.node.checked
 * @extends Ext.data.TreeModel
 */
Ext.define('Breeze.model.node.Checked', {
	// extend: 'Breeze.model.Base',
	extend: 'Ext.data.TreeModel',
	fields: [
		{name: 'text', type: 'string'},
		{name: 'type', type: 'string'},
		{name: 'iconCls', type: 'string'},
		{name: 'data', type: 'string'},
		{name: 'checked', type: 'boolean'}
	],
	/**
	 * returns parsed object form of JSON data from data attribute
	 */
	dataObject: function(){
		if(this.get('data') == null){
			return {};
		} else {
			return JSON.parse(this.get('data'));
		}
	}
});