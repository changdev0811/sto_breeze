/**
 * User Categories list control
 * @class UserCategories
 * @namespace Breeze.widget.list.UserCategories
 * @alias widget.breeze.list.usercategories
 * @xtype breeze-list-usercategories
 */
Ext.define('Breeze.widget.list.UserCategories', {
    extend: 'Ext.dataview.List',
    alias: 'widget.breeze.list.usercategories',
    xtype: 'breeze-list-usercategories',
    scroll: 'vertical',
    
    config: {
        showIcons: false
    },

    // Use custom item type
    itemConfig: {
        xtype: 'breeze.list.usercategoriesitem'
    }
    
 });