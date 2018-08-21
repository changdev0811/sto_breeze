/**
 * Detailed Category record; from old CategoryInfo
 * @class Detail
 * @namespace Breeze.model.category.Detail
 * @alias model.category.detail
 * @extends Breeze.model.Base
 */
Ext.define('Breeze.model.category.Detail', {
    alias: 'model.category.detail',
    extend: 'Breeze.model.Base',
    fields: [
        { name: 'Category_Id', type: 'string' },
        { name: 'Category_Name', type: 'string' },
        { name: 'Category_Abbreviated', type: 'string' },
        { name: 'Category_Order', type: 'integer' },
        { name: 'Category_Code', type: 'string' },
        { name: 'HexColor', type: 'string' },
        { name: 'Picture_Path', type: 'string' },
        { name: 'Picture_Abbreviated', type: 'string' },
        { name: 'isAllowed', type: 'boolean' },
        { name: 'isActive', type: 'boolean' },
        { name: 'minUse_Amount', type: 'decimal' },
        { name: 'minUse_Unit', type: 'integer' },
        { name: 'minUse_waitDays', type: 'integer' },
        { name: 'ShowName', type: 'boolean' },
        { name: 'isLeaveRequest', type: 'boolean' },
        { name: 'isPaid', type: 'boolean' },
        { name: 'isOverTime', type: 'boolean' },
        { name: 'isAccrued', type: 'boolean' },
        { name: 'color_red', type: 'integer' },
        { name: 'color_green', type: 'integer' },
        { name: 'color_blue', type: 'integer' }
    ]
});