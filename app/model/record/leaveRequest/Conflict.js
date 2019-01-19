/**
 * Ported from old RequestConflict.js
 * @class Conflict
 * @namespace Breeze.model.record.leaveRequest.Conflict
 */
Ext.define('Breeze.model.record.leaveRequest.Conflict', {
    extend: 'Breeze.model.Base',
    fields: [
		{name: 'Amount',			type: 'number'	},
		{name: 'ConflictDate',		type: 'string'	},
		{name: 'EmpDepartment',		type: 'string'	},
		{name: 'EmpName',			type: 'string'	},
		{name: 'Percentage',		type: 'number'	},
		{name: 'recording_mode',	type: 'integer'	}
	]	
});