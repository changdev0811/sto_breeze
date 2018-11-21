/**
 * Model for department config
 * (from /DeptConfigInfo)
 * @class Department
 * @alias Breeze.model.company.config.Department
 */
Ext.define('Breeze.model.company.config.Department', {
    extend: 'Breeze.model.Base',
    alias: 'model.company.config.department',
    fields: [
        { name: 'ConflictLimit', type: 'integer' }
    ]
});