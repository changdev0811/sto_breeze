/**
 * Company Project (ported from model.Project)
 * @class Project
 * @namespace Breeze.model.company.Project
 * @alias model.company.project
 */
Ext.define('Breeze.model.company.Project', {
    extend: 'Breeze.model.Base',
    alias: 'model.company.project',

    // requires: [
    //     'Ext.data.field.Field'
    // ],

    // idProperty: 'path',
    fields: [
        {
            name: 'Name'
        },
        {
            name: 'Description'
        },
        {
            name: 'Parent_ID'
        },
        {
            name: 'ID'
        },
        {
            name: 'CustomerId'
        },
        {
            name: 'Code'
        },
        {
            name: 'IsWorktime', type: 'bool'
        },
        {
            name: 'IsOT', type: 'bool'
        },
        {
            name: 'Hourly_Comp', type: 'number'
        }
    ]
});