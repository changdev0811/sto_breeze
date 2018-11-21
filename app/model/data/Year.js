/**
 * Year data model. Ported from /Year.js
 * @class Year
 * @namespace Breeze.model.data.Year
 * @alias model.data.year
 * @extends Breeze.model.Base
 */
Ext.define('Breeze.model.data.Year', {
    extend: 'Breeze.model.Base',
    alias: 'model.data.year',
    fields: [
        {
            name: 'Year', type: 'integer'
        }
    ]
});