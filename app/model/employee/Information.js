/**
 * Employee Information model (ported from model.EmployeeInfo)
 * @class Information
 * @alias Breeze.model.employee.Information
 */
Ext.define('Breeze.model.employee.Information', {
	extend: 'Breeze.model.Base',
	fields: [
		{name: 'ID',				type: 'integer'					},
		{name: 'FirstName',			type: 'string'					},
		{name: 'LastName',			type: 'string'					},
		{name: 'Middle',			type: 'string'					},
		{ name: 'BirthDate',        type: 'string'                  },
		{ name: 'HireDate',         type: 'string'                  },
		{name: 'Email',				type: 'string'					},
		{name: 'Notes',				type: 'string'					},
		{name: 'RecordingMode',		type: 'integer'					},
		{name: 'SSN',				type: 'string'					},
		{name: 'Department',	 	type: 'integer'					},
		{name: 'StartUpSettings',	type: 'integer'					},
		{name: 'TerminationDate',	type: 'string'                  },
		{name: 'Gender',			type: 'integer'					},
		{name: 'EmployeeNumber',	type: 'string'					},
		{name: 'Payroll',			type: 'string'					},
		{name: 'Badge',				type: 'string'					},
		{name: 'EmployeeNumber',	type: 'string'					},
		{name: 'CompRate',			type: 'number'					},
		{name: 'CompPer',			type: 'integer'					},
		{name: 'ShiftStartTimes',	type: 'auto'					},
		{name: 'ShiftStopTimes',	type: 'auto'					},
		{name: 'ShiftStartSegments',type: 'auto'					},
		{name: 'ShiftStopSegments',	type: 'auto'					},
		{name: 'PhotoFlag',			type: 'boolean'					},
		{name: 'Photo',         	type: 'string'					},
		{name: 'Username',			type: 'string'					},
		{name: 'Access',			type: 'integer'					},
		{name: 'DepartmentAcces',	type: 'integer'					}
    ],
    // TODO: Add Validation
    /*
    validators: {

    }
    */
});