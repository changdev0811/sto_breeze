/**
 * Point Category model (from PointCat.js)
 * @class Category
 * @namespace Breeze.model.point.Category
 * @alias model.point.category
 * @extends Breeze.model.Base
 */
Ext.define('Breeze.model.point.Category', {
    extend: 'Breeze.model.Base',
    alias: 'model.point.category',
    fields: [
        { name: 'PointName', type: 'string' },
        { name: 'PointID', type: 'integer' },
        { name: 'PointVal', type: 'number' },
        { name: 'PointIOC', type: 'integer' },
        { name: 'DurAmt', type: 'integer' },
        { name: 'DurType', type: 'integer' },
        { name: 'AbsenceCats', type: 'string' },
        { name: 'PointDetails', type: 'string' }
    ]
});