(function(){
    /**
     * Cookie-related helper functions.
     * (Mostly cookie wrapping functions from old homemade.js)
     */
    Ext.define('Breeze.helper.Cookie', {
        singleton: true,
        /**
         * Create new cookie that expires at a certain time
         * @param name {String} cookie name
         * @param data {String} cookie data
         * @param lifeInMinutes {Number} life of cookie (in minutes; defaults
         *  to 10 if undefined) If null, cookie is considered a session cookie
         */
        bake: function(name, data, lifeInMinutes){
            var lifeInMinutes = defVal(lifeInMinutes, 10);
            if(lifeInMinutes == null){
                return Ext.util.Cookies.set(
                    name, data
                );
            } else {
                return Ext.util.Cookies.set(
                    name, data, new Date(
                        new Date().getTime() + (1000 * 60 * lifeInMinutes)
                    )
                );
            }
        },

        /**
         * Wrapper for Ext.util.Cookies.get function with extra capabilities
         * @param {String} name Cookie name
         * @param {Object} options Optional settings:
         *      - default: (String) String indicating value to return if
         *          cookie is null or undefined
         *      - create: (Number) If present and cookie is null/undefined,
         *          value is used as life in minutes for cookie created using default
         *          value (see bake function). Only used if default is defined
         */
        get: function(name, options) {
            var options = options || {};
            var value = Ext.util.Cookies.get(name);
            if(typeof value == 'undefined' || value == null){
                if(options.default){
                    if(typeof options.create !== 'undefined'){
                        this.bake(name, options.default, options.create);
                    }
                    return value;
                }
            } else {
                return value;
            }
        }

    });

    /** If a is undefined, return b, else return a 
     * (for handling undefined optional params) */
    var defVal = function(a,b){return"undefined"==typeof a?b:a};
})();