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
        'Breeze.mixin.CommonToolable',
        'Breeze.helper.data.ValidationRuleSet'
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
     * for shift segment dialog cancel button; resets field values and
     * clears validation error indicators
     * @param {Object} dlg dialog reference
     */
    onAddShiftSegmentDialogCancel: function(dlg){
        let start = dlg.getComponent('start'),
            stop = dlg.getComponent('stop');
        start.clearValue();
        stop.clearValue();
        start.setError(null);
        stop.setError(null);
    },

    onAddShiftSegmentDialogSave: function(btn){
        let dlg = btn.getParent().getParent(),
            start = dlg.getComponent('start'),
            stop = dlg.getComponent('stop'),
            segments = this.getViewModel().get('policySegments');
        start.validate();
        stop.validate();
        if(start.isValid() && stop.isValid()){
            if(this.validateShiftSegment(start.getValue(), stop.getValue(), null, true)){
                // Segment is valid, update store with new item
                let startT = BreezeTime.resolve(start.getValue()),
                    stopT = BreezeTime.resolve(stop.getValue());
                segments.loadData([{
                    StartTime: startT.asTime(),
                    StartMin: startT.asMinutes(),
                    StopTime: stopT.asTime(),
                    StopMin: stopT.asMinutes()
                }], true);
                segments.commitChanges();
                dlg.hide();
                this.onAddShiftSegmentDialogCancel(dlg);
                Ext.toast({
                    type: Ext.Toast.INFO,
                    message: 'Shift segment added successfully',
                    timeout: 'info'
                });
            };
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

        // if(!unique){
            nameCmp.markInvalid(`${name} is already a rule for category`);
            errors.push(`Category already has a rule named '${name}'`)
        // }

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

    /**
     * Runs validation tests for new or modified shift values against
     * all other shift segments
     * @param {(Number|String)} start 
     * @param {(Number|String)} stop 
     * @param {Object} record Optional record of updated segment to avoid self-conflict
     * @param {boolean} inDialog Set to true to indicate source is dialog (not used)
     */
    validateShiftSegment: function(start, stop, record=null, inDialog=false){
        var resolve = (v)=>{
            return (typeof v == 'number')?
            BreezeTime.fromMinutes(v) :
            BreezeTime.parse(v);},
            vm = this.getViewModel(),
            segments = vm.get('policySegments');
        
        var source = (inDialog)? this.addShiftSegmentDialog : this.lookup('shiftGrid');

        var errors = [];

        // Create Validation rule set
        var validRuleSet = Ext.create('Breeze.helper.data.ValidationRuleSet', {
            rules: {
                differentTimes: {
                    fn: (get)=>{
                        return (get('start').asMinutes() !== get('stop').asMinutes());
                    },
                    passFn: (get, name)=>{
                        console.info(name, ' passed');
                    },
                    failFn: (get, name)=>{
                        console.warn(name, ' failed');
                        errors.push('Start and stop times must be different');
                    }
                },
                noOverlap: {
                    fn: (get)=>{
                        var ok = true,
                            otherSegs = get('segments').queryRecordsBy(
                                (r)=>{ return r !== get('record'); }
                            ).map((r)=>{
                                return [r.get('StartSegment'), r.get('StopSegment')];
                            }),
                            // Function for overlap checking
                            overlaps = (v,r) => {
                                return (v >= r[0] && v <= r[1]);
                            };
                        otherSegs.push([get('start').asMinutes(), get('stop').asMinutes()]);

                        otherSegs.forEach((r,i)=>{
                            otherSegs.forEach((r2,i2)=>{
                                if(i !== i2){
                                    r.forEach((v)=>{
                                        ok &= !overlaps(v,r2);
                                    })
                                }
                            })
                        });

                        return ok;
                    },
                    passFn: (get,name)=>{
                        console.info(name, ' passed');
                    },
                    failFn: (get, name)=>{
                        console.warn(name, ' failed');
                        errors.push('Shift cannot overlap with existing shifts');
                    }
                }
            }
        });

        // Put data to be given to rule set into an object
        let data = {
            start: resolve(Ext.clone(start)),
            stop: resolve(Ext.clone(stop)),
            segments: segments,
            record: record
        };


        // Run all validation checks
        var res = validRuleSet.runAll(data);

        if(validRuleSet.allPassed(res)){
            return true;
        } else {
            Ext.toast({
                type: Ext.Toast.WARN,
                message: [
                    'Please correct the following issues before saving',
                    '<ul>' + errors.map((i)=>{return `<li>${i}</li>`}) + '</ul>'
                ].join('<br>'),
                timeout: ['warn', 5000]
            });
            return false;
        }

        console.info('Validate shift segment');
    },

    // === [Event Listeners] ===

    // onShiftTimeChange: function(cmp, newVal, oldVal){
    //     if(cmp.validate()){
    //         // valid
    //         console.info('Valid time')
    //     } else {

    //     }
    // },

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

    onDeleteShiftSegment: function(grid, info){
        var store = grid.getStore();

        store.remove([info.record]);
        store.commitChanges();

        Ext.toast({
            type: Ext.Toast.INFO,
            message: 'Shift segment successfully deleted',
            timeout: 'info'
        });
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