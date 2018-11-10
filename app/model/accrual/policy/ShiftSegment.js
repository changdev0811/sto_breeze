/**
 * Accrual Policy shift segment, used by accrual.Policy
 * @class ShiftSegment
 * @namespace Breeze.model.accrual.policy.ShiftSegment
 */
Ext.define('Breeze.model.accrual.policy.ShiftSegment', {
    extend: 'Breeze.model.Base',
    fields: [
        {name: 'StartTime',	type: 'string' },
        {name: 'StopTime',	type: 'string' },
        {name: 'StopSegment',	type: 'integer'},
		{name: 'StartSegment',	type: 'integer'}
    ]
});