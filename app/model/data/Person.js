/**
 * Person model; used by several stores
 * (from models/Person)
 * @class Person
 * @alias model.data.Person
 */
Ext.define('Breeze.model.data.Person', {
    extend: 'Breeze.model.Base',
    alias: 'model.data.person',
    fields: [
        { name: 'id', type: 'integer' },
        { name: 'fullName', type: 'string' },
        { name: 'displayName', type: 'string' },
        { name: 'departmentId', type: 'string' },
        { name: 'terminated', type: 'boolean' }
    ]
});