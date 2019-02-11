/**
 * Adds 'themedConfirm' function to Ext.Msg
 */
Ext.define('Breeze.overrides.Msg', {
    override: 'Ext.MessageBox',

    statics: {
        OK: {
            handler: 'me.onClick',
            ui: 'action alt'
        },
        OKCANCEL: {
            ok: {
                handler: 'me.onClick',
                ui: 'confirm alt',
                weight: 1
            },
            cancel: {
                handler: 'me.onClick',
                ui: 'decline alt',
                weight: 2,
                style: 'margin-left: 6pt'
            }
        },
        YESNO: {
            yes: {
                handler: 'me.onClick',
                ui: 'confirm alt',
                weight: 1
            },
            no: {
                handler: 'me.onClick',
                ui: 'decline alt',
                weight: 2,
                style: 'margin-left: 6pt'
            }
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
        var ui = 'dark-themed-dialog', scope = undefined;
        // get params
        var [xArg1 = undefined, xArg2 = undefined] = extraOptions;
        // allow either scope or ui or both to be given based on type
        // if both, ui should be first
        if (typeof xArg1 == 'string') {
            ui = xArg1
        } else if (!Object.isUnvalued(xArg1)) {
            scope = xArg1
        }
        if (!Object.isUnvalued(xArg2)) {
            scope = xArg2
        }
        var confirm = this.confirm(title, message, handler, scope);
        confirm.setUi(ui);
        return confirm;
    },

    /**
    * Wrapper for prompt method accepting a theme 
    * @param {*} title Message title
    * @param {*} message Message body
    * @param {*} handler Handler function
    * @param {*} extraOptions UI name, scope, or both (ui name then scope)
    */
    themedPrompt: function (title, message, handler, ...extraOptions) {
        var ui = 'dark-themed-dialog', scope = undefined;
        // get params
        var [xArg1 = undefined, xArg2 = undefined] = extraOptions;
        // allow either scope or ui or both to be given based on type
        // if both, ui should be first
        if (typeof xArg1 == 'string') {
            ui = xArg1
        } else if (!Object.isUnvalued(xArg1)) {
            scope = xArg1
        }
        if (!Object.isUnvalued(xArg2)) {
            scope = xArg2
        }

        var prompt = this.prompt(title, message, handler, scope);

        prompt.setUi(ui);
        return prompt;
    },

    /**
    * Wrapper for alert method accepting a theme 
    * @param {*} title Message title
    * @param {*} message Message body
    * @param {*} handler Handler function
    * @param {*} extraOptions UI name, scope, or both (ui name then scope)
    */
    themedAlert: function (title, message, handler, ...extraOptions) {
        var ui = 'dark-themed-dialog', scope = undefined;
        // get params
        var [xArg1 = undefined, xArg2 = undefined] = extraOptions;
        // allow either scope or ui or both to be given based on type
        // if both, ui should be first
        if (typeof xArg1 == 'string') {
            ui = xArg1
        } else if (!Object.isUnvalued(xArg1)) {
            scope = xArg1
        }
        if (!Object.isUnvalued(xArg2)) {
            scope = xArg2
        }

        var prompt = this.alert(title, message, handler, scope);

        prompt.setUi(ui);
        return prompt;
    },

});