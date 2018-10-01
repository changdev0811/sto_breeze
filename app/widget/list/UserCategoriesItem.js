/**
 * User Categories list item control
 * @class UserCategories
 * @namespace Breeze.widget.list.UserCategories
 * @alias widget.breeze.list.usercategories
 * @xtype breeze-list-usercategories
 */
Ext.define('Breeze.widget.list.UserCategoriesItem', {
    extend: 'Ext.dataview.ListItem',
    alias: 'widget.breeze.list.usercategoriesitem',
    xtype: 'breeze-list-usercategoriesitem',
    
    config: {
        showIcon: false
    },

    items: [
        {
            itemId: 'body',
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'component',
                    itemId: 'icon'
                },
                {
                    xtype: 'component',
                    itemId: 'text',
                    html: 'Placeholder'
                }
            ]
        }
    ]

 });