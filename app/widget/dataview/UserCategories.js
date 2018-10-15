Ext.define('Breeze.widget.dataview.UserCategories', {
   extend: 'Ext.dataview.List',
   alias: 'widget.breeze.dataview.usercategories',
   xtype: 'breeze-dataview-usercategories',

   config: {
       checkboxes: false,
       maximumSelectionCount: 1
   },

   // Override default dataview item control
   itemConfig: {
       xtype: 'breeze.dataview.usercategoriesitem'
   },

   constructor: function(cfg){
       var me = this;
       console.info('UserCategories dataview constructor', cfg);
       me.callParent(arguments);
   },

   initialize: function(){
        var me = this;

        console.info('UserCategories dataview initialize', this.getConfig());

        me.callParent();
   }


});