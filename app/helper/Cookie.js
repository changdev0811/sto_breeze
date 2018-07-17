(function(){
    /**
     * Cookie-related helper functions.
     * (Mostly cookie wrapping functions from old homemade.js)
     */
    Ext.define('Breeze.app.helper.Cookie', {

        statics: {
            /**
             * Create new cookie that expires at a certain time
             * @param name {String} cookie name
             * @param data {String} cookie data
             * @param lifeInMinutes {Number} life of cookie (in minutes; defaults
             *  to 10 if undefined)
             */
            bake: function(name, data, lifeInMinutes){
                var lifeInMinutes = defVal(lifeInMinutes, 10);
                return Ext.util.Cookies.set(
                    name, data, new Date(
                        new Date().getTime() + (1000 * 60 * lifeInMinutes)
                    )
                );
            },

            /**
             * Alias of Ext.util.Cookies.get function
             * @param {String} name Cookie name
             */
            get: Ext.util.Cookies.get
        }

    });

    /** If a is undefined, return b, else return a 
     * (for handling undefined optional params) */
    var defVal = function(a,b){return"undefined"==typeof a?b:a};
})();