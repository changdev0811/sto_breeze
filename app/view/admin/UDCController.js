/**
 * View Controller for UDC Admin view
 * @class UDCController
 * @namespace Breeze.view.admin.UDCController
 * @alias controller.admin.udc
 */
Ext.define('Breeze.view.admin.UDCController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.udc',

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