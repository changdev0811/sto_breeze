/**
 * View Controller for Employee Information Report reporting criteria view
 * @class InformationController
 * @namespace Breeze.view.user.Preferences
 * @alias controller.user.preferences
 */
Ext.define('Breeze.view.user.PreferencesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user.preferences',

    /**
     * handler for 'Apply' action button
     */
    onApply: function(c, e, eOpts){
        console.info('Apply Clicked');
        params = this.getViewModel().getData().params;
        console.info("user preferences info", params);
    }
});