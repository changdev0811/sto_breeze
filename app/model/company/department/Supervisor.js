/**
 * Model for department supervisor
 * @class Supervisor
 * @namespace Breeze.model.company.department.Supervisor
 */
Ext.define('Breeze.model.company.department.Supervisor', {
    extend: 'Breeze.model.Base',
    alias: 'model.company.department.supervisor',
    fields: [
        { name: 'supervisorId', type: 'integer' },
        { name: 'Name', type: 'string'},
        { name: 'roleId', type: 'integer' },
        { name: 'Role_Name', type: 'string' },
    ]
});