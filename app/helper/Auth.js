Ext.define('Breeze.helper.Auth', {

    requires: [
        'Breeze.helper.Cookie'
    ],

    statics: {
        /**
         * Create/update auth related cookies
         */
        setCookies: function(pass, cust, emp){
            var c = Breeze.helper.Cookie;
            c.bake('STOPASS', pass, 7);
            c.bake('STOCUST', cust, 7);
            c.bake('STOEMP', emp, 7);
        },

        /**
         * Get 3 auth-related cookies
         */
        getCookies: function() {
            var c = Breeze.helper.Cookie;
            return {
                pass:   c.get('STOPASS'),
                cust:   c.get('STOCUST'),
                emp:    c.get('STOEMP')
            };
        },

        /**
         * rewrite cookies with new expirations
         */
        reloadCookies: function(minutes){
            var c = Breeze.helper.Cookie;
            var old = this.getCookies();
            c.bake('STOPASS', old.pass, minutes);
            c.bake('STOCUST', old.cust, minutes);
            c.bake('STOEMP', old.emp, minutes);
        },

        /**
         * Check authorization cookies, optionally reloading if not okay
         * (Ported from homemade.js/auth)
         * @param {Boolean} forceReload if true, reload if invalid cookies (default false)
         * @return {Boolean} True if authorized, false otherwise
         */
        isAuthorized: function(forceReload){
            var cookies = Breeze.helper.Cookie;
            var vals = this.getCookies();
            var okay = (
                vals.pass !== null &&
                vals.cust !== null &&
                vals.emp !== null
            );
            if(!okay && forceReload){
                window.location.reload();
                return false;
            }
            return okay;
        }
    },

    authenticate: function(forceReload){
        // TODO: Implement 'checkAuthentication' from 'homemade.js'
    }

});