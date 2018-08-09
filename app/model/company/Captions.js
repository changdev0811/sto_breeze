/**
 * Model for captions stored in company config information
 * (from /Captions)
 * @class Captions
 * @alias Breeze.model.company.Captions
 */
Ext.define('Breeze.model.company.Captions', {
    extend: 'Breeze.model.Base',
    alias: 'model.company.captions',
    fields: [
        { name: 'EmployeeNumber', type: 'string' },
        { name: 'ProjectSingular', type: 'string' },
        { name: 'ProjectPlural', type: 'string' },
    ]
});