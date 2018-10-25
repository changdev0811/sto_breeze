/**
 * Model used for representing and displaying Supervisors
 * and Supervised Employees in Company tab of Employee Information
 * @class Person
 * @namespace Breeze.model.employee.company.Person
 * @alias model.employee.company.person
 */
Ext.define('Breeze.model.employee.company.Person', {
    extend: 'Breeze.model.Base',
    alias: 'model.employee.company.person',
    fields: [
        { name: 'personId', type: 'integer' },
        { name: 'displayName', type: 'string' },
    ]
});