/**
 * Minimal model for employee data returned by getAccrualPolicyEmployeesAndCategories
 * in accrual policies
 * @class Employee
 * @namespace Breeze.model.accrual.apply.Employee
 * @extends Breeze.model.Base
 */
Ext.define('Breeze.model.accrual.apply.Employee', {
    extend: 'Breeze.model.Base',
    alias: 'breeze.model.accrual.apply.employee',
    fields: [
           { name: 'id', type: 'string' },
           { name: 'fullName', type: 'string' },
           { name: 'displayName', type: 'string' },
           { name: 'departmentId', type: 'string' },
           { name: 'terminated', type: 'boolean' }
        ]
});