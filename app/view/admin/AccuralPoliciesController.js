/**
 * View Controller for AccrualPolicies Admin view
 * @class AccrualPoliciesController
 * @namespace Breeze.view.admin.AccrualPoliciesController
 * @alias controller.admin.accrualpolicies
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

        // load accrual policies
        // TODO: possibly replace with getAccrualPoliciesTree
        this.addStoreToViewModel(
            'Breeze.store.accrual.ScheduleList',
            'scheduleList',
            { load: true }
        );

        console.info('Accrual policies controller inited');
    },
    
    // === [Event Listeners] ===

    /**
     * Handle select event from policy list
     * Loads full policy details for selected item
     * @param {Object} list 
     * @param {Object} record 
     * @param {Object} eOpts 
     */
    onPolicySelect: function(list, record, eOpts){
        var vm = this.getViewModel();

        this.loadStore(
            'Breeze.store.accrual.Policy',
            { scheduleId: record.get('ID') }
        ).then((policy)=>{
            vm.set('policyData', policy.getAt(0));
            vm.set('shiftSegments', policy.getAt(0).shifts());
            vm.set('policyCategories', policy.getAt(0).Categories());
            console.info('Loaded policy');
        }).catch(()=>{
            console.warn('Unable to load policy information');
        });
    },

    onCategorySelect: function(list, record, eOpts){
        var vm = this.getViewModel();

        vm.set('selectedCategory', record.get('Category_Id'));
    }


    
});