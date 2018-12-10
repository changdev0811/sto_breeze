/**
 * View Controller for UDC Admin view
 * @class UDCController
 * @namespace Breeze.view.admin.SAOptionsController
 * @alias controller.admin.saoptions
 */
Ext.define('Breeze.view.admin.SAOptionsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.saoptions',

    stores: [
        // 'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        // Load User-Defined Categories list store
        this.addStoreToViewModel(
            'Breeze.store.category.List',
            'categoriesList',
            { load: true }
        );

   
    },

  


    
});