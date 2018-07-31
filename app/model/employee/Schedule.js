/**
 * Employee Schedule Model (ported from model.Schedule)
 * @class Schedule
 * @alias Breeze.model.employee.Schedule
 */
Ext.define('Breeze.model.employee.Schedule', {
    extend: 'Breeze.model.Base',
    fields: [
        {name: 'ID',				type: 'integer'	},
		{name: 'Name',				type: 'string'	},
		{name: 'RecordingMode',		type: 'integer'	},
		{name: 'Baseline',			type: 'integer'	},
		{name: 'ShiftTime',			type: 'integer'	},
		{name: 'ShiftStartTimes',	type: 'auto'	},
		{name: 'ShiftStopTimes',	type: 'auto'	},
		{name: 'ShiftStartSegments',type: 'auto'	},
		{name: 'ShiftStopSegments',	type: 'auto'	}
    ]
});