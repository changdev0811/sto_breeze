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
    themedConfirm: function (title, message, handler, ...extraOptions) {
        //    var [ui = Ext.MessageBox.uis.default, scope = undefined] = extraOptions;
        var ui = Ext.MessageBox.uis.default, scope = undefined;
        ui = 'dark-themed-dialog';
        // get params
        var [xArg1 = undefined, xArg2 = undefined] = extraOptions;
        // allow either scope or ui or both to be given based on type
        // if both, ui should be first
        if (typeof xArg1 == 'string'){
            ui = xArg1
        } else if (!Object.isUnvalued(xArg1)){
            scope = xArg1
        }
        if(!Object.isUnvalued(xArg2)){
            scope = xArg2
        }
            var confirm = this.confirm(title, message, handler, scope);
        confirm.setUi(ui);
        return confirm;
    }
});