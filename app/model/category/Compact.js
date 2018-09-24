/**
 * Compact Category record; created for use with getCategoryMap
 * @class Compact
 * @namespace Breeze.model.category.Compact
 * @alias model.category.compact
 * @extends Breeze.model.Base
 */
Ext.define('Breeze.model.category.Compact', {
    alias: 'model.category.compact',
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'Category_Code', type: 'string' },
        { name: 'Category_Color_RGB', type: 'string' },
        { name: 'Category_Color_HEX', type: 'string' },
        { name: 'Category_Name', type: 'string' },
        { name: 'Picture_Path', type: 'string' },
        { name: 'Category_ID', type: 'integer' }

    ]
});