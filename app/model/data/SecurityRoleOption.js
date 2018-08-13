/**
 * Security Role Option model
 * @class SecurityRoleOption
 * @alias Breeze.model.data.SecurityRoleOption
 */
Ext.define('Breeze.model.data.SecurityRoleOption', {
    extend: 'Breeze.model.Base',
    alias: 'model.data.securityroleoption',
    fields: [
        { name: 'Role_Id', type: 'integer' },
        { name: 'Role_Name', type: 'string' }
    ]
});