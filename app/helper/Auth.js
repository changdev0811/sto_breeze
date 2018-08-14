Ext.define('Breeze.helper.Auth', {

    requires: [
        'Breeze.helper.Cookie'
    ],

    /*
    
    STOPASS     SecureHashCookie
    STOCUST     SecureCustId
    STOEMP      SecureEmpId
    */

    statics: {
        
        /**
         * Constant cookie field names
         */
        fields: {
            // pass: 'SecureHashCookie',
            // cust: 'SecureCustId',
            // emp: 'SecureEmpId',
            pass: 'STOPASS',
            cust: 'STOCUST',
            emp: 'STOEMP'
        },

        /**
         * Create/update auth related cookies
         */
        setCookies: function(pass, cust, emp){
            var c = Breeze.helper.Cookie;
            c.bake(this.fields.pass, pass, 7);
            c.bake(this.fields.cust, cust, 7);
            c.bake(this.fields.emp, emp, 7);
        },

        /**
         * Get 3 auth-related cookies
         */
        getCookies: function() {
            var c = Breeze.helper.Cookie;
            return {
                pass:   c.get(this.fields.pass),
                cust:   c.get(this.fields.emp),
                emp:    c.get(this.fields.emp)
            };
        },

        /**
         * rewrite cookies with new expirations
         */
        reloadCookies: function(minutes){
            var c = Breeze.helper.Cookie;
            var old = this.getCookies();
            c.bake(this.fields.pass, old.pass, minutes);
            c.bake(this.fields.cust, old.cust, minutes);
            c.bake(this.fields.emp, old.emp, minutes);
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


    /**
     * Verify cookie authentication using isAuthenticated call
     * Ported from homemade.js/checkAuthentication
     * @param {Boolean} forceReload if True, reload window when authentication
     */
    authenticate: function(forceReload){
        // TODO: Implement 'checkAuthentication' from 'homemade.js'
        var api = Breeze.helper.Api;
        var auth = this;
        Breeze.helper.Api.serviceRequest(
            'isAuthenticated', {}, true, function(response){
                var resp = api.decodeJsonResponse(response);
                if(!resp.success){
                    auth.reloadCookies(-234);
                    Breeze.helper.Cookie.bake(
                        'STOTimeout', 'Not Authenticated', 60
                    );
                    if(forceReload){
                        window.location.reload();
                    }
                }
            }
        )
    }

});