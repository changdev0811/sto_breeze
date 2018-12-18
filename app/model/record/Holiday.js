/**
 * Holiday model, ported from Softime.model.Holiday
 * @class Holiday
 * @alias Breeze.model.record.Holiday
 */
Ext.define('Breeze.model.record.Holiday', {
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'holiday_Name', type: 'string' },
        { name: 'holiday_Date', type: 'date' },
        { name: 'float_Day', type: 'integer' },
        { name: 'float_Week', type: 'integer' },
        { name: 'percentage', type: 'numeric' },
        { name: 'unique_Number', type: 'integer' },
        { name: 'isMultiDay', type: 'boolean' }
    ]
});


