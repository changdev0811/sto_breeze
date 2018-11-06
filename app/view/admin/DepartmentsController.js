/**
 * View Controller for Departments Admin view
 * @class DepartmentsController
 * @namespace Breeze.view.admin.AccrualPoliciesController
 * @alias controller.admin.departments
 */
Ext.define('Breeze.view.admin.DepartmentsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.departments',

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