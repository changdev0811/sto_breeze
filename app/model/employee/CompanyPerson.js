/**
 * Model used for representing and displaying Supervisors
 * and Supervised Employees in Company tab of Employee Information
 * @class CompanyPerson
 * @namespace Breeze.model.employee.CompanyPerson
 * @alias model.employee.companyperson
 */
Ext.define('Breeze.model.employee.CompanyPerson', {
    extend: 'Breeze.model.Base',
    alias: 'model.employee.companyperson',
    fields: [
        { name: 'personId', type: 'integer' },
        { name: 'displayName', type: 'string' },
    ]
});