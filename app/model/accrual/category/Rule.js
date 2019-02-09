/**
 * Model for my accrual policy view's category rules
 * @class Rule
 * @memberof Breeze.model.accrual.category
 */
Ext.define('Breeze.model.accrual.category.Rule', {
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'occurrences', type: 'integer' },
        { name: 'ruleAmount', type: 'integer' },
        { name: 'recording_mode', type: 'integer' },
        { name: 'ruleCount', type: 'string' },
        { name: 'ruleEnd', type: 'date' },
        { name: 'ruleStart', type: 'date' },
        { name: 'ruleModified', type: 'integer' },
        { name: 'ruleName', type: 'string' },
        { name: 'rulePer', type: 'integer' },
        { name: 'ruleUnit', type: 'integer' },
        { name: 'total', type: 'integer' }
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'rules'
        }
    }
});