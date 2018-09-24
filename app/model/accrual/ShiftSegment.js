/**
 * Accrual Shift Segment (ported from model.ShiftSegment)
 * @class ShiftSegment
 * @alias Breeze.model.accrual.ShiftSegment
 */
Ext.define('Breeze.model.accrual.ShiftSegment', {
    extend: 'Breeze.model.Base',
    alias: 'model.accrual.shiftsegment',
	fields: [
		{name: 'StartTime',	type: 'string' },
		{name: 'StopTime',	type: 'string' },
		{name: 'StartMin',	type: 'integer'},
		{name: 'StopMin',	type: 'integer'}
	]
});