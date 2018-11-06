/**
 * View Controller for Roles Admin view
 * @class ProjectsController
 * @namespace Breeze.view.admin.RolesController
 * @alias controller.admin.roles
 */
Ext.define('Breeze.view.admin.RolesController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.roles',

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