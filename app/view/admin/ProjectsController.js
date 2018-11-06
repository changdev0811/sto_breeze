/**
 * View Controller for Projects Admin view
 * @class ProjectsController
 * @namespace Breeze.view.admin.ProjectsController
 * @alias controller.admin.projects
 */
Ext.define('Breeze.view.admin.ProjectsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.projects',

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