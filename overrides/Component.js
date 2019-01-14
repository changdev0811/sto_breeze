/**
 * Override class adding appendData method to Components
 * @class Component
 * @namespace Breeze.overrides.Component
 * @overrides Ext.Component
 */
Ext.define('Breeze.overrides.Component', {
   override: 'Ext.Component',

   /**
    * Merges given object with existing data object in component,
    * overwriting existing values included in newData while preserving
    * existing values not explicitly named in newData; safe for targeting
    * specific nested attributes
    * @param {Object} newData New data object
    */
   appendData: function(newData){
       var data = Ext.clone(this.getData());
       if(Object.isUnvalued(data)){
           data = {};
       }
       Ext.Object.merge(data, newData);
       this.setData(data);
   }
});