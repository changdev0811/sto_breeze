/**
 * View Controller for AccrualPolicies reporting criteria view
 * @class AccrualPoliciesController
 * @namespace Breeze.view.admin.AccrualPoliciesController
 * @alias controller.admin.accrualpoliciescontroller
 */
Ext.define('Breeze.view.admin.AccrualPoliciesController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.accrualpolicies',

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