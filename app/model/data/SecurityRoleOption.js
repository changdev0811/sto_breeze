/**
 * Security Role Option model
 * @class SecurityRoleOption
 * @alias Breeze.model.data.SecurityRoleOption
 */
Ext.define('Breeze.model.data.SecurityRoleOption', {
    extend: 'Breeze.model.Base',
    alias: 'model.data.securityroleoption',
    idProperty: 'Role_Id',
    fields: [
        { name: 'Role_Id', type: 'integer' },
        { name: 'Role_Name', type: 'string' },
        { name: 'Add_Employeer', type: 'boolean' },
        { name: 'Delete_Employee', type: 'boolean' },
        { name: 'Edit_Employee', type: 'boolean' },
        { name: 'View_SSN', type: 'boolean' },
        { name: 'View_Compensation', type: 'boolean' }
    ]
});