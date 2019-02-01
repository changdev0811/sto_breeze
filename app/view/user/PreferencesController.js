/**
 * View Controller for Employee Information Report reporting criteria view
 * @class InformationController
 * @namespace Breeze.view.user.Preferences
 * @alias controller.user.preferences
 */
Ext.define('Breeze.view.user.PreferencesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user.preferences',



    onInit: function(component){
        this.theme = Breeze.helper.Theme;
        this.getViewModel().set('nightMode', (this.theme.getMode() == 'night') ? 1 : 0);
    },
    /**
     * handler for 'Apply' action button
     */
    onSave: function(c, e, eOpts){
        console.info('Apply Clicked');
        params = this.getViewModel().getData().params;
        console.info("user preferences info", params);
    },

    //onMenuNightModeChange: function(field, checked){
    onMenuNightModeChange: function(field, value){
        this.theme.swap((value == 1)? 'night' : 'day');
    },


});