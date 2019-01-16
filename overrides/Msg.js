/**
 * Adds 'themedConfirm' function to Ext.Msg
 */
Ext.define('Breeze.overrides.Msg', {
   override: 'Ext.MessageBox',

   statics: {
       uis: {
           // Default dialog UI theme
           default: 'light-themed-dialpg'
       }
   },

   /**
    * Wrapper for confirm method accepting a theme 
    * @param {*} title Message title
    * @param {*} message Message body
    * @param {*} handler Handler function
    * @param {*} extraOptions UI name, scope, or both (ui name then scope)
    */
   themedConfirm: function(title, message, handler, ...extraOptions){
       var [ui = Ext.MessageBox.uis.default, scope = undefined] = extraOptions;
       var confirm = this.confirm(title, message, handler, scope);
       confirm.setUi(ui);
       return confirm;
   }
});