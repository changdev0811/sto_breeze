/**
 * Custom category node; ported from Softtime.model.CatNode
 * @class Node
 * @namespace Breeze.model.category.Node
 * @alias model.category.node
 * @extends Breeze.model.Base
 */
Ext.define('Breeze.model.category.Node', {
    alias: 'model.category.node',
	// extend: 'Breeze.model.Base',
	extend: 'Ext.data.TreeModel',
	fields: [
		{name: 'text', type: 'string'},
		{name: 'type', type: 'string'},
		{name: 'icon', type: 'string'},
		{name: 'data', type: 'string'},
		{name: 'categoryData', calculate: function(data){
			if(data.data == null){
				return {};
			} else {
				try{
					return JSON.parse(data.data);
				} catch(ex){
					return {};
				}
			}
		}}
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