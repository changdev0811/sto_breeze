/**
 * Theme swapping helper class
 * 
 * Defines theme mode config params and has apply function which toggles
 * presence of body level night mode class, allowing view-specific SASS
 * code to provide night mode overrides. Dynamic loading of theme is handled
 * in lib/dynamic_theme.js
 */
Ext.define('Breeze.helper.Theme', {
    singleton: true,

    cookie: 'theme/mode',

    cssVars: {
        'night': 'night-mode'
    },

    modes: {
        'day': {
            id: 'day',
            theme: 'breeze-material',
            nightMode: false
        },
        'night': {
            id: 'night',
            theme: 'breeze-night-material',
            nightMode: true
        }
    },

    /**
     * Change current theme mode, then trigger a reload if it has changed
     * @param {String} mode Mode to change to (day or night)
     */
    swap: function(mode){
        var oven = Breeze.helper.Cookie,
            modeCookie = oven.get(this.cookie, {default: mode, create: null});
        if(modeCookie !== mode){
            oven.bake(this.cookie, mode, null);
            window.location.refresh();
        }
    },

    /**
    * Load theme mode cookie and set body night class on or off based
    * on current mode. Allows view specific CSS to use night-specific overrides
    * 
    * Theme stored night/day settings are handled by the microloader code in
    * index.html
    */
    apply: function() {
        var oven = Breeze.helper.Cookie,
            mode = oven.get('theme/mode', {default: 'day', create: null}),
            nightMode = Breeze.helper.Theme.modes[mode].nightMode;
        Ext.getBody().toggleCls(this.cssVars.night, nightMode);
    }
});