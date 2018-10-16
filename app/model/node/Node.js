/**
 * Tree node model; ported from Softtime.model.Node.js
 * @class Node
 * @namespace Breeze.model.node.Node
 * @alias model.node.node
 * @extends Ext.data.TreeModel
 */
Ext.define('Breeze.model.node.Node', {
	// extend: 'Breeze.model.Base',
	extend: 'Ext.data.TreeModel',
	fields: [
        {name: 'text', type: 'string'},
		{name: 'type', type: 'string'},
		{name: 'iconCls', type: 'string'},
		{name: 'data', type: 'string'},
		{name: 'fullName', type: 'string'},
		{ name: 'qtip', type: 'string' },
        { name: 'tag', type: 'string' }
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