/**
 * Extended version ViewModel class
 * @class Base
 * @namespace Breeze.viewModel.Base
 * @extends Ext.app.ViewModel
 */
Ext.define('Breeze.viewModel.Base', {
   extend: 'Ext.app.ViewModel',

   /**
    * Assign the same value to multiple data attributes at once
    * @param {(Array|String)} names Destination data field name (string) or
    *       names (Array)
    * @param {Object} value Value to assign to all targets
    */
   setMultiple: function(names, value){
       var names = Array.wrap(names);
       for(var i=0,n=names[0];i<names.length;i++,n=names[i]){
           this.set(n, value);
       }
   }
});