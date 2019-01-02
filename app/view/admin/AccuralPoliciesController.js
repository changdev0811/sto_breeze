/**
 * View Controller for AccrualPolicies Admin view
 * @class AccrualPoliciesController
 * @namespace Breeze.view.admin.AccrualPoliciesController
 * @alias controller.admin.accrualpolicies
 */
Ext.define('Breeze.view.admin.AccrualPoliciesController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.accrualpolicies',

    requires: [
        'Breeze.api.admin.AccrualPolicies',
        'Breeze.mixin.DialogCancelable',
        'Breeze.mixin.CommonToolable'
    ],

    mixins: {
        commonToolable: 'Breeze.mixin.CommonToolable',
        dialogCancelable: 'Breeze.mixin.DialogCancelable'
    },

    config: {
        // Make common tool icons available
        injectTools: true
    },


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

        // Empty store for policy categories
        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.accrual.policy.Category',
            data:[]
        }, 'policyCategories');

        // Empty store for policy segments
        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.accrual.policy.ShiftSegment',
            data: [],
        }, 'policySegments');

        // Empty store for accrual rules
        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.accrual.policy.Rule',
            data: [],
        }, 'selectedCategoryAccrualRules');

        // Empty store for carry over rules
        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.accrual.policy.CarryOverRule',
            data: [],
        }, 'selectedCategoryCarryOverRules');

        // load accrual policies
        this.loadPolicies();
        
    },

    loadPolicies: function(policyId = null){
        var me = this,
            vm = this.getViewModel();

        this.addStoreToViewModel(
            'Breeze.store.accrual.ScheduleListAPI',
            'policiesList',
            {
                load: true,
                loadOpts: {
                    callback: function(records, op, success){
                        if(success){
                            var record = records[0];
                            if(policyId !== null){
                                record = vm.get('policiesList').queryRecords("ID", policyId)[0];
                            }
                            this.lookup('policyList').getSelectable().setSelectedRecord(
                                record
                            );
                        }
                    },
                    scope: me
                }
            }
        )
    },

    //===[Dialog display and event handlers]===

    //--[Create Policy]--

    showCreatePolicyDialog: function(){
        var view = this.getView(),
            vm = this.getViewModel(),
            dialog = this.createPolicyDialog;
        
        if(!dialog){
            dialog = Ext.apply({
                ownerCmp: view
            }, view.createPolicyDialog);
            this.createPolicyDialog = dialog = Ext.create(dialog);
        }

        dialog.show();
    },

    /**
     * Handle 'cancel' button click event for 'Create Policy' dialog
     * @param {Object} comp Button firing event
     */
    onCreatePolicyDialogCancel: function(comp){
        var dlg = comp.getParent().getParent();
        dlg.hide();
        dlg.getComponent('policyName').clearValue();
    },

    //--[Add Shift]--

    showAddShiftSegmentDialog: function(){
        var view = this.getView(),
            vm = this.getViewModel(),
            dialog = this.addShiftSegmentDialog;

        if (!dialog) {
            dialog = Ext.apply({
                ownerCmp: view
            }, view.addShiftSegmentDialog);
            this.addShiftSegmentDialog = dialog = Ext.create(dialog);
        }

        dialog.show();
    },

    /**
     * Method called by dialog cancelable mixin's onDialogCancel method
     * for shift segment dialog cancel button; resets field values
     * @param {Object} dlg dialog reference
     */
    onAddShiftSegmentDialogCancel: function(dlg){
        dlg.getComponent('start').clearValue();
        dlg.getComponent('stop').clearValue();
        dlg.setError(null);
    },

    onAddShiftSegmentDialogSave: function(btn){
        let dlg = btn.getParent().getParent(),
            start = dlg.getComponent('start'),
            stop = dlg.getComponent('stop');
        start.validate();
        stop.validate();
        if(start.isValid() && stop.isValid()){
            // both fields are valid
        } else {
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'Please fix field errors and try again.',
                timeout: 'warn'
            });
        }
    },

    //--[Add Accrual Rule]--

    /**
     * Display the 'add accrual rule' dialog
     */
    showAddAccrualRuleDialog: function(){
        var view = this.getView(),
            vm = this.getViewModel(),
            dialog = this.addAccrualRuleDialog;

        if(!dialog){
            dialog = Ext.apply({
                ownerCmp: view
            }, view.addAccrualRuleDialog);
            this.addAccrualRuleDialog = dialog = Ext.create(dialog);
        }

        dialog.show();
    },

    /**
     * Event handler for 'add' button in new accrual rule dialog
     */
    onAddAccrualRule: function(){
        var dlg = this.addAccrualRuleDialog,
            nameCmp = dlg.getComponent('ruleName'),
            name = nameCmp.getValue(),
            vm = this.getViewModel(),
            rules = vm.get('selectedCategoryAccrualRules');

        nameCmp.clearInvalid();

        var valid = nameCmp.validate(),
            unique = true,
            validChars,
            errors = ['Unable to add rule'];

        if(valid){
            unique = !rules.getData().items.map((r)=>{return r.get('ruleName');}).includes(name.trim());
            validChars = !name.includes('|') && !name.includes(',');
        }

        if(!unique){
            nameCmp.markInvalid(`${name} is already a rule for category`);
            errors.push(`Category already has a rule named '${name}'`)
        }

        if(!validChars){
            nameCmp.markInvalid(`Cannot include | or ,`);
            errors.push('Rule name can\'t contain the \'|\' or \',\' characters.');
        }

        if(valid && unique && validChars){
            rules.add({
                accformDay: 1,
                accformInc: 0,
                accformPer: 53,
                accformUnit: (vm.get('policyData.recordingMode') * 1) + 28,
                ruleName: name.trim(),
                svcFrom: 0,
                svcTo: 0,
                accrualChanged: false,
                asMonth: 0,
                asDay: 0
            });
            dlg.hide();
            nameCmp.setValue("");
        } else {
            Ext.toast({
                type: Ext.Toast.WARN,
                message: errors.join('<br>'),
                timeout: 'error'
            });
        }

    },

    /**
     * Event handler for add accrual rule dialog cancel button
     */
    onAddAccrualRuleDialogCancel: function(){
        this.addAccrualRuleDialog.hide();
    },


    //--[Add Accrual Interval Dialog]--

    /**
     * Display the 'add accrual interval' dialog
     */
    showAddAccrualIntervalDialog: function(){
        var view = this.getView(),
            vm = this.getViewModel(),
            rules = vm.get('selectedCategoryAccrualRules'),
            dialog = this.addAccrualIntervalDialog;

        var ruleOptions = Ext.Array.unique(rules.getData().items.map((r)=>{
            return r.get('ruleName');
        })).map((n)=>{
            return {name: n, value: n};
        });

        if(ruleOptions.length == 0){
            // Show warning message and abort
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'Unable to add Interval. <br> There are currently no Accrual Rules to add an Interval to.',
                timeout: 'error'
            });
            return;
        }

        if(!dialog){
            dialog = Ext.apply({
                ownerCmp: view
            }, view.addAccrualIntervalDialog);
            this.addAccrualIntervalDialog = dialog = Ext.create(dialog);
        }
        
        dialog.show();

        var names = dialog.getComponent('ruleNames');
        
        // Add rule name options
        names.setValue(null);
        names.setOptions(ruleOptions);
    },

    /**
     * Event handler for add accrual interval dialog cancel button
     */
    onAddAccrualIntervalDialogCancel: function(){
        this.addAccrualIntervalDialog.hide();
    },


    // === [Validators] ===

    /**
     * Checks validity of shift info time value
     * @param {String} value Time string
     * @return {Boolean} True if valid, false otherwise
     */
    validateShiftTime: function(value){
        if(typeof value == 'number'){
            // If value is a number, its from the dropdown and is thus valid
            return true;
        }
        return (BreezeTime.isValidFormat(value))?
            true : 'Expected format: Hour:Minute(AM/PM';
    },

    // === [Event Listeners] ===

    onShiftTimeChange: function(cmp, newVal, oldVal){
        if(cmp.validate()){
            // valid
            console.info('Valid time')
        } else {

        }
    },

    /**
     * Handle select event from policy list
     * Loads full policy details for selected item
     * @param {Object} list 
     * @param {Object} record 
     * @param {Object} eOpts 
     */
    onPolicySelect: function(list, record, oOpts){
        var vm = this.getViewModel(),
            me = this,
            cats = this.lookup('categoryList');
        if(vm.getStore('policy')){
            vm.getStore('policy').destroy();
        }
        // cats.getSelectable().deselectAll(true);
        this.addStoreToViewModel(
            'Breeze.store.accrual.Policy',
            'policy',
            {
                createOpts: {
                    scheduleId: record.get('data')
                },
                load: true,
                loadOpts: {
                    callback: function(records, op, success){
                        if(success){
                            var policy = vm.get('policy'),
                                policyRecord = policy.getAt(0);
                            // store policy record
                            this.copyRecordToViewModel(
                                policyRecord.getData(), 'policyData'
                            );
                            // store policy category data
                            vm.get('policyCategories').loadData(
                                Ext.clone(policyRecord.getData().Categories)
                            );
                            // store policy segments
                            vm.get('policySegments').loadData(
                                Ext.clone(policyRecord.shifts().getData().items.map((i)=>{return i.getData();}))
                            );
                            // Select first category if none selected, else restore
                            // previously selected category
                            if(cats.getSelectable().getSelectionCount()==0){
                                cats.getSelectable().setSelectedRecord(
                                    vm.get('categoriesList').getAt(0)
                                );
                            } else {
                                var rec = cats.getSelectable().getSelectedRecord();
                                cats.getSelectable().deselectAll(true);
                                cats.getSelectable().setSelectedRecord(
                                    rec
                                );
                            }
                        } else {
                            console.warn('Unable to load selected policy information')
                        }
                    },
                    scope: me
                }
            }
        );
    },

    onCategorySelect: function(list, record, eOpts){
        var vm = this.getViewModel(),
            policyCats = vm.get('policyCategories'),
            recId = parseInt(record.get('Category_Id'));

        // vm.set('categoryId', Ext.clone(record.get('Category_Id')));
        // this.lookup('accrualRuleGrid').runRefresh();
        // // vm.set('selectedCategory', vm.get('policyCategories').query)
        // console.info('Category Selected');
        var rec = policyCats.queryRecords('categoryId', recId)[0];
        this.copyRecordToViewModel(
            rec.getData(), 'selectedCategory'
        );
        // load selected category's accrual rules
        vm.get('selectedCategoryAccrualRules').loadData(Ext.clone(rec.getData().accrualRules));
        // load selected category's carry over rules
        vm.get('selectedCategoryCarryOverRules').loadData(Ext.clone(rec.getData().carryOverRules));
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