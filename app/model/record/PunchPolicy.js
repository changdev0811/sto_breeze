/**
 * Punch Policy model
 * 
 * ported from /PunchPolicy.js
 * @class PunchPolicy
 * @alias Breeze.model.record.PunchPolicy
 */
Ext.define('Breeze.model.record.PunchPolicy', {
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'ID', type: 'integer' },
        { name: 'Name', type: 'string' }
    ]
});