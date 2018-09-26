/**
 * Intercepts microloader in order to override which manifest
 * is loaded based on the value found in theme mode cookie
 */
(function(){
    /* Helper for reading cookie value, since Breeze helpers
    haven't been loaded yet */
    var getCookie = function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    var Ext = Ext || {};
    Ext.beforeLoad = function(){
        var mode = getCookie('theme/mode');
        console.info('Dynamic Theme: ', mode);
        // only update manifest if mode isn't null and devMode boolean isn't set
        if(mode !== "" && !Ext.devMode){
            Ext.manifest = (mode == 'day')? 'standard' : 'night';
        }
    };
})();