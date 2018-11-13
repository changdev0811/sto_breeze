/**
 * Accrual Policy schedule record, used by getAccrualPolicy call
 * @class Policy
 * @namespace Breeze.model.accrual.Policy
 */
Ext.define('Breeze.model.accrual.Policy', {
    requires: [
        'Breeze.model.accrual.policy.ShiftSegment',
        'Breeze.model.accrual.policy.Category'
    ],
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'ID', type: 'integer' },
        { name: 'Baseline', type: 'integer' },
        { name: 'Name', type: 'string' },
        { name: 'ShiftTime', type: 'integer' },
        { name: 'recordingMode', type: 'integer' }
    ],

    hasMany: [
        { 
            model: 'Breeze.model.accrual.policy.ShiftSegment', 
            name: 'shifts' 
        },
        {
            model: 'Breeze.model.accrual.policy.Category',
            name: 'Categories'
        }
    ]
});