/**
 * Company Project (ported from model.Project)
 * @class Project
 * @alias Breeze.model.company.Project
 */
Ext.define('Breeze.model.company.Project', {
    extend: 'Breeze.model.Base',
    alias: 'model.company.project',

    requires: [
        'Ext.data.field.Field'
    ],

    idProperty: 'path',
    fields: [
        {
            name: 'Name'
        },
        {
            name: 'Description'
        },
        {
            name: 'Parent_Id'
        },
        {
            name: 'Id'
        },
        {
            name: 'CustomerId'
        },
        {
            name: 'Code'
        },
        {
            name: 'isWorkTime', type: 'bool'
        },
        {
            name: 'isOT', type: 'bool'
        },
        {
            name: 'hourly_comp', type: 'number'
        }
    ]
});