Ext.define('Breeze.widget.dataview.UserCategoriesItem', {
   extend: 'Ext.dataview.ListItem',
   alias: 'widget.breeze.dataview.usercategoriesitem',
   xtype: 'breeze-dataview-usercategories-item',

   items: [
       {
           xtype: 'component',
           tpl: '<div class="legend-item-label"><div class="legend-item-dot" style="background-color:{Category_Color_HEX}"></div>{Category_Name}</div>'
       }
   ]
});