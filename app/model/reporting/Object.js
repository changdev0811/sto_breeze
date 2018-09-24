/**
 * Model for Report objects. Ported from models/RecordObj
 * @class Object
 * @namespace Breeze.model.reporting.Object
 * @alias model.reporting.object
 * @extends Breeze.model.Base
 */
Ext.define('Breeze.model.reporting.Object', {
    extend: 'Breeze.model.Base',
    alias: 'model.reporting.object',
    fields: [
        { name: 'CurrentPage', type: 'integer' },
        { name: 'CurrentPageContent', type: 'string' },
        { name: 'CurrentPageURL', type: 'string'},
        { name: 'TotalPages', type: 'integer' }
    ]
});