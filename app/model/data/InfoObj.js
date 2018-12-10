/**
 * Info Obj model used by various new API list responses in place of trees
 * @class InfoObj
 * @namespace Breeze.model.data.InfoObj
 * @alias model.data.infoobj
 */
Ext.define('Breeze.model.data.InfoObj', {
    extend: 'Breeze.model.Base',
    alias: 'model.data.infoobj',
    fields: [
        {
            name: 'text', type: 'string'
        },
        {
            name: 'data', type: 'string'
        },
        {
            name: 'type', type: 'string'
        },
        {
            name: 'checked', type: 'boolean'
        }
    ]
});