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
        var me = this;
        // Load User-Defined Categories list store
        me.addStoreToViewModel(
            'Breeze.store.category.List',
            'categoriesList',
            { load: true }
        );

        // load accrual policies
        // TODO: Replace store with one specific to accrual policy listing
        me.addStoreToViewModel(
            'Breeze.store.accrual.ScheduleList',
            'policiesList',
            { load: true, loadOpts: {
                callback: function(records, op, success){
                    this.lookup('policyList').getSelectable().setSelectedRecord(
                        records[0]
                    );
                },
                scope: me
            } }
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
        var vm = this.getViewModel(),
            me = this,
            cats = this.lookup('categoryList');        
        // this.loadStore(
        //     'Breeze.store.accrual.Policy',
        //     { scheduleId: record.get('ID') }
        // ).then((policy)=>{
        //     vm.set('policyData', policy.getAt(0));
        //     me.addLoadedStoreToViewModel({
        //         model: 'Breeze.model.accrual.policy.Category',
        //         data: policy.getAt(0).getData().Categories,
        //     }, 'policyCategories');
        //     me.addLoadedStoreToViewModel({
        //         model: 'Breeze.model.accrual.policy.ShiftSegment',
        //         data: policy.getAt(0).getData().shifts,
        //     }, 'policySegments');
        //     console.info('Loaded policy');
        // }).catch(function(){
        //     console.warn('Unable to load policy information');
        // });
        this.addStoreToViewModel(
            'Breeze.store.accrual.Policy',
            'policy',
            {
                createOpts: {
                    scheduleId: record.get('ID')
                },
                load: true,
                loadOpts: {
                    callback: function(success){
                        if(success){
                            var policy = vm.get('policy');
                            vm.set('policyData', policy.getAt(0));
                            me.addLoadedStoreToViewModel({
                                model: 'Breeze.model.accrual.policy.Category',
                                data: policy.getAt(0).getData().Categories,
                            }, 'policyCategories');
                            // policy.getAt(0).Categories().load();
                            // policy.getAt(0).Categories().each((c)=>{
                            //     c.accrualRules().setGroupField('ruleName');
                            // });
                            // vm.set('policyCategories', policy.getAt(0).Categories());
                            vm.get('policyCategories').each((c)=>{
                                // c.accrualRules().setGroupField('ruleName');
                            });
                            me.addLoadedStoreToViewModel({
                                model: 'Breeze.model.accrual.policy.ShiftSegment',
                                data: policy.getAt(0).shifts().getData(),
                            }, 'policySegments');
                            console.info('Loaded policy');
                        } else {
                            console.warn('Unable to load policy information');
                        }
                    }
                }
            }
        );
        // TODO: Auto select first category on policy select if none chosen
        // if(cats.getSelectionCount()==0){
        //     // If no category is selected, auto select the first one
        //     cats.getSelectable().setSelectedRecord(
        //         vm.get('categoriesList').getAt(0)
        //     );
        // }
    },

    onCategorySelect: function(list, record, eOpts){
        var vm = this.getViewModel();

        vm.set('categoryId', record.get('Category_Id'));
        this.lookup('accrualRuleGrid').runRefresh();
        // vm.set('selectedCategory', vm.get('policyCategories').query)
        console.info('Category Selected');
    },


    // TODO: Implement add policy handler

    onCreatePolicyButton: function(){
        this.lookup('createPolicyDialog').show();
    },

    /**
     * Handle 'cancel' button click event for 'Create Policy' dialog
     * @param {Object} comp Button firing event
     */
    onCreatePolicyDlgCancel: function(comp){
        var dlg = comp.getParent().getParent();
        dlg.hide();
        dlg.getComponent('policyName').clearValue();
    },

    // TODO: Implement delete policy handler
    onDeletePolicy: function(comp){

    },

    /**
     * Handle 'Save Accrual Policy' button click event
     */
    onSavePolicy: function(){
        console.info('Save policy clicked');
    }


    
});