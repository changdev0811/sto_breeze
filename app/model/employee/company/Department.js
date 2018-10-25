/**
 * Model used for representing and displaying departments 
 * in Company tab of Employee Information
 * @class Department
 * @namespace Breeze.model.employee.company.Department
 * @alias model.employee.company.department
 */
Ext.define('Breeze.model.employee.company.Department', {
    extend: 'Breeze.model.Base',
    alias: 'model.employee.company.department',
    fields: [
        { name: 'departmentId', type: 'integer' },
        { name: 'departmentName', type: 'string' },
        { name: 'roleId', type: 'integer' },
        { name: 'roleName', type: 'string' }
    ]
});