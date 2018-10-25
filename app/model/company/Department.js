/**
 * Company Department (ported from model.Department)
 * @class Department
 * @alias Breeze.model.company.Department
 */
Ext.define('Breeze.model.company.Department', {
	extend: 'Breeze.model.Base',
	idProperty: 'Id',
	fields: [
		{name: 'Id',		  type: 'integer'},
		{name: 'Name',		  type: 'string' },
		{name: 'Description', type: 'string' }
	]
});