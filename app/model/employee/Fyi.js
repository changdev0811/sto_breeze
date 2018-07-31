/**
 * FYI Information model (ported from model.FYIInfo)
 * @class Fyi
 * @alias Breeze.model.employee.Fyi
 */
Ext.define('Breeze.model.employee.Fyi', {
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'CatID', type: 'string' },
        { name: 'CatColor', type: 'string' },
        { name: 'CatDesc', type: 'string' },
        { name: 'CatRecorded', type: 'string' },
        { name: 'CatAllowed', type: 'string' },
        { name: 'CatRemaining', type: 'string' },
        { name: 'IsAllowed', type: 'boolean' }
    ]
});