/**
 * View Controller for Reporting selector view
 * @class SelectorController
 * @namespace Breeze.view.reporting.SelectorController
 * @alias controller.reporting.selector
 * @extends Breeze.controller.Base
 */
Ext.define('Breeze.view.reporting.SelectorController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.reporting.selector',
    /**
     * Called when the view is created
     */
    onInit: function () {

        let vm = this.getViewModel();

        // Load report selector tree
        this.addStoreToViewModel(
            'Breeze.store.reporting.Reports',
            'reportsList',
            { load: true }
        );

        // Load report routes
        this.addStoreToViewModel(
            'Breeze.store.reporting.Routes',
            'routes'
        );
    },

    /**
     * Handle select event from report list tree
     * @param {Object} tree Tree component firing event
     */
    onReportTreeSelect: function(tree){
        var routes = this.getViewModel().get('routes'),
            key = tree.getSelectable().getSelectedRecord().getData().data,
            url = routes.resolveKey(key);
        if(!Object.isUnvalued(url)){
            this.redirectTo(url);
        }
    },

    onCloseTool: function(){
        Ext.fireEvent('sidepanelclose',{});
    }
});