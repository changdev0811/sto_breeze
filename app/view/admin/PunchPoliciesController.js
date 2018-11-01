/**
 * View Controller for Punch Policies Admin view
 * @class PunchPoliciesController
 * @namespace Breeze.view.admin.PunchPoliciesController
 * @alias controller.admin.punchpolicies
 */
Ext.define('Breeze.view.admin.PunchPoliciesController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.punchpolicies',

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