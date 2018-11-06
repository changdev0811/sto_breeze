/**
 * View Controller for Point Categories Admin view
 * @class PointCatsController
 * @namespace Breeze.view.admin.PointCatsController
 * @alias controller.admin.pointcats
 */
Ext.define('Breeze.view.admin.PointCatsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.pointcats',

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