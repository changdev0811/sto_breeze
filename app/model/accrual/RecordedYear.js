/**
 * Recorded Year model
 * Ported from /RecYear.js
 * @class RecordedYear
 * @memberof Breeze.model.accrual
 */
Ext.define('Breeze.model.accrual.RecordedYear', {
    extend: 'Breeze.model.Base',

    fields: [
        { name: 'Year', type: 'integer' },
        { name: 'startDate', type: 'string' },
        { name: 'endDate', type: 'string' }
    ]
});