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
        injectTools: true,
        // Tell toolable to inject tools into panel component w/ itemId 'form'
        commonToolsContainer: { itemId: 'form' }
    },

    /**
     * Called when the view is created
     */
    onInit: function (component) {
        var me = this;
        this.api = Ext.create('Breeze.api.admin.AccrualPolicies');

        // Load User-Defined Categories list store
        me.addStoreToViewModel(
            'Breeze.store.category.List',
            'categoriesList',
            { load: true }
        );

        // Empty store for policy categories
        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.accrual.policy.Category',
            data: []
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

        // Empty store for Save+Apply Employee targets
        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.accrual.apply.Employee',
            data: []
        }, 'applyEmployeeTargets');

        // Empty store for Save+Apply category targets
        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.data.InfoObj',
            data: []
        }, 'applyCategoryTargets');

        // load accrual policies
        this.loadPolicies();

    },

    loadPolicies: function (policyId = null) {
        var me = this,
            vm = this.getViewModel();

        // disable removing policies until load finishes
        vm.set('disabled.deletePolicy', true);

        this.addStoreToViewModel(
            'Breeze.store.accrual.ScheduleListAPI',
            'policiesList',
            {
                load: true,
                loadOpts: {
                    callback: function (records, op, success) {
                        if (success) {
                            var record = records[0];
                            if (policyId !== null) {
                                record = vm.get('policiesList').queryRecords("data", policyId.toString())[0];
                            }
                            this.lookup('policyList').getSelectable().setSelectedRecord(
                                record
                            );
                            // re-enable deleting policies
                            this.getViewModel().set('disabled.deletePolicy',false);
                        }
                    },
                    scope: me
                }
            }
        )
    },

    //===[Dialog display and event handlers]===

    //--[Create Policy]--

    showCreatePolicyDialog: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            dialog = this.createPolicyDialog;

        if (!dialog) {
            dialog = Ext.apply({
                ownerCmp: view
            }, view.createPolicyDialog);
            this.createPolicyDialog = dialog = Ext.create(dialog);
        }

        dialog.getComponent('createOption').setValues({option:1});
        dialog.getComponent('policySource').setValue(vm.get('policyData.ID'));

        dialog.show();
    },

    /**
     * Handle 'cancel' button click event for 'Create Policy' dialog
     * @param {Object} comp Button firing event
     */
    onCreatePolicyDialogCancel: function (comp) {
        var dlg = comp.getParent().getParent();
        dlg.hide();
        let name = dlg.getComponent('policyName');
        name.clearValue();
        name.clearInvalid();
    },

    //--[Add Shift]--

    /**
     * Display the dialog used for creating new shift segments
     */
    showCreateShiftSegmentDialog: function () {
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
    onCreateShiftSegmentDialogCancel: function (dlg) {
        let start = dlg.getComponent('start'),
            stop = dlg.getComponent('stop');
        start.clearValue();
        stop.clearValue();
        start.setError(null);
        stop.setError(null);
    },

    onCreateShiftSegmentDialogSave: function (btn) {
        let dlg = btn.getParent().getParent(),
            start = dlg.getComponent('start'),
            stop = dlg.getComponent('stop'),
            segments = this.getViewModel().get('policySegments');
        start.validate();
        stop.validate();
        if (start.isValid() && stop.isValid()) {
            if (this.validateShiftSegment(start.getValue(), stop.getValue(), null, true)) {
                // Segment is valid, update store with new item
                let startT = BreezeTime.resolve(start.getValue()),
                    stopT = BreezeTime.resolve(stop.getValue());
                segments.loadData([{
                    StartTime: startT.asTime(),
                    StartSegment: startT.asMinutes(),
                    StopTime: stopT.asTime(),
                    StopSegment: stopT.asMinutes()
                }], true);
                segments.commitChanges();
                dlg.hide();
                this.onCreateShiftSegmentDialogCancel(dlg);
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
    showCreateAccrualRuleDialog: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            dialog = this.addAccrualRuleDialog;

        if (!dialog) {
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
    onCreateAccrualRule: function () {
        var dlg = this.addAccrualRuleDialog,
            nameCmp = dlg.getComponent('ruleName'),
            name = nameCmp.getValue(),
            vm = this.getViewModel(),
            rules = vm.get('selectedCategoryAccrualRules');

        var valid = nameCmp.validate(),
            unique = true,
            validChars,
            errors = ['Unable to add rule'];

        if (valid) {
            unique = !rules.getData().items.map((r) => { return r.get('ruleName'); }).includes(name.trim());
            validChars = !name.includes('|') && !name.includes(',');
        }

        // if(!unique){
        nameCmp.markInvalid(`${name} is already a rule for category`);
        errors.push(`Category already has a rule named '${name}'`)
        // }

        if (!validChars) {
            nameCmp.markInvalid(`Cannot include | or ,`);
            errors.push('Rule name can\'t contain the \'|\' or \',\' characters.');
        }

        if (valid && unique && validChars) {
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
            nameCmp.clearInvalid();
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
    onCreateAccrualRuleDialogCancel: function () {
        this.addAccrualRuleDialog.hide();
    },


    //--[Add Accrual Interval Dialog]--

    /**
     * Display the 'add accrual interval' dialog
     */
    showCreateAccrualIntervalDialog: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            rules = vm.get('selectedCategoryAccrualRules'),
            dialog = this.addAccrualIntervalDialog;

        var ruleOptions = Ext.Array.unique(rules.getData().items.map((r) => {
            return r.get('ruleName');
        })).map((n) => {
            return { name: n, value: n };
        });

        if (ruleOptions.length == 0) {
            // Show warning message and abort
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'Unable to add Interval. <br> There are currently no Accrual Rules to add an Interval to.',
                timeout: 'error'
            });
            return;
        }

        if (!dialog) {
            dialog = Ext.apply({
                ownerCmp: view
            }, view.addAccrualIntervalDialog);
            this.addAccrualIntervalDialog = dialog = Ext.create(dialog);
        }

        dialog.show();

        var names = dialog.getComponent('ruleName');

        // Add rule name options
        names.setValue(null);
        names.setOptions(ruleOptions);
    },

    /**
     * Event handler for 'save' button in create new accrual policy dialog
     */
    onCreatePolicy: function () {
        var me = this,
            dlg = this.createPolicyDialog,
            nameCmp = dlg.getComponent('policyName'),
            name = nameCmp.getValue(),
            option = dlg.getComponent('createOption').getValues().option,
            sourcePolicy = dlg.getComponent('policySource').getValue(),
            vm = this.getViewModel(),
            policies = vm.get('policiesList');

        var valid = nameCmp.validate();

        if(!valid){
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'Accrual Policy must have a name',
                timeout: ['warn',2]
            });
            return null;
        }

        // check if name is unique
        if(policies.query('text',name.trim()).length > 0){
            nameCmp.markInvalid('Name already in use');
            Ext.toast({
                type: Ext.Toast.WARN,
                message: `An Accrual Policy named ${name} already exists`,
                timeout: ['warn',2]
            });
            return null;
        }

        // make api call
        var copiedId = 0;
        if(option == 2){
            copiedId = sourcePolicy;
        }

        this.api.create(name,copiedId).then((mewPolicyId)=>{
            Ext.toast({
                type: Ext.Toast.INFO,
                message: 'Successfully created new Accrual Policy',
                timeout: 'info'
            });
            dlg.hide();
            nameCmp.clearValue();
            nameCmp.clearInvalid();
            me.loadPolicies(newPolicyId);
        }).catch((err)=>{
            Ext.toast({
                type: Ext.Toast.ERROR,
                message: 'Unable to create policy',
                // list: [err],
                timeout: 'error'
            });
        })
    },

    /**
     * Event handler for 'add' button in new accrual interval dialog
     */
    onCreateAccrualInterval: function () {
        var dlg = this.addAccrualIntervalDialog,
            ruleCmp = dlg.getComponent('ruleName'),
            rule = ruleCmp.getValue(),
            vm = this.getViewModel(),
            rules = vm.get('selectedCategoryAccrualRules');

        dlg.hide();

        // Get last rule in named group
        var { lastIndex: lastRuleIndex } = this.collectAccrualRuleInfo(rule);
        
        var lastRuleData = rules.getAt(lastRuleIndex).getData(),
            durationEnd = lastRuleData.svcFrom;
        if (durationEnd == 0) { durationEnd = 1; }

        rules.getAt(lastRuleIndex).set({
            svcTo: durationEnd
        }, { commit: true });

        rules.add({
            accformDay: lastRuleData.accformDay,
            accformInc: lastRuleData.accformInc,
            accformPer: lastRuleData.accformPer,
            accformUnit: lastRuleData.accformUnit,
            ruleName: lastRuleData.ruleName.trim(),
            svcFrom: durationEnd + 1,
            svcTo: 0,
            accrualChanged: false,
            msMonth: lastRuleData.msMonth,
            msDay: lastRuleData.msDay
        });

        rules.commitChanges();

        Ext.toast({
            type: Ext.Toast.INFO,
            message: 'Successfully added Accrual Rule Interval',
            timeout: 'info'
        });
    },

    /**
     * Event handler for add accrual interval dialog cancel button
     */
    onCreateAccrualIntervalDialogCancel: function () {
        this.addAccrualIntervalDialog.hide();
    },

    onAccrualRuleInfoChange: function (comp, newVal, oldVal) {
        var itemId = comp.getItemId(),
            infoFc = this.lookup('accrualRuleGrid')
                .getColumnForField('accrualChanged').getEditor().getAt(0);
        // Helper for hiding multiple fields within info field container
        multiHide = (itemIds) => {
            for (var i = 0; i < itemIds.length; i++) {
                infoFc.getComponentInItems(itemIds[i]).setHidden(true);
            }
        };
        // Helper for showing multiple fields within info field container
        multiShow = (itemIds) => {
            for (var i = 0; i < itemIds.length; i++) {
                infoFc.getComponentInItems(itemIds[i]).setHidden(false);
            }
        };

        // console.info('Accrual Rule Info Change:', itemId);

        // ==[Logic for accformOn change event]==
        // ==[from AccrualInformationEditor.selectAccrualRuleOn]==
        if (itemId == 'accformOn') {
            if (newVal == 51) {
                // Show Weekly options
                multiHide([
                    'monthlySpecialOn', 'onBiWeekly', 'monthly31',
                    'monthly30', 'monthly28', 'onAnnually', 'onAnniversary'
                ]);
                multiShow(['onWeekly']);
            } else if (newVal == 52) {
                // Show Bi-Weekly options
                multiHide([
                    'monthlySpecialOn', 'onWeekly', 'monthly31',
                    'monthly30', 'monthly28', 'onAnnually', 'onAnniversary'
                ]);
                multiShow(['onBiWeekly']);
            } else if (newVal == 53) {
                // Show Monthly options
                multiHide([
                    'monthlySpecialOn', 'onWeekly', 'onBiWeekly', 'onAnnually',
                    'onAnniversary'
                ]);
                multiShow(['monthly31']);
            } else if (newVal == 54 || newVal == 55) {
                // Show Quarterly or Semi-Annually options (none?)
                multiHide([
                    'monthlySpecialOn', 'onWeekly', 'onBiWeekly', 'monthly31',
                    'monthly30', 'monthly28', 'onAnnually', 'onAnniversary'
                ]);
            } else if (newVal == 114) {
                // Show Annually options
                multiHide([
                    'monthlySpecialOn', 'onWeekly', 'onBiWeekly',
                    'monthly31', 'monthly30', 'monthly28', 'onAnniversary'
                ]);
                multiShow(['onAnnually']);
            } else if (newVal == 100) {
                // Show Annually (Anniversary) options
                multiHide([
                    'monthlySpecialOn', 'onWeekly', 'onBiWeekly',
                    'monthly31', 'monthly30', 'monthly28', 'onAnnually'
                ]);
                multiShow(['onAnniversary']);
            } else if (newVal == 56) {
                // Show Monthly special options
                multiHide([
                    'monthlySpecialOn', 'onWeekly', 'onBiWeekly',
                    'onAnnually', 'onAnniversary'
                ]);

                // Day option choices based off month
                let msChoice = infoFc.getComponentInItems('monthlySpecialOn').getValue();

                if (msChoice == '2') {
                    // Feburary - 28 days
                    multiHide(['monthly31', 'monthly30']);
                    multiShow(['monthly28']);
                } else if (['4', '6', '9', '11'].includes(msChoice)) {
                    // April/June/Sept/Nov - 30 days
                    multiHide(['monthly31', 'monthly28']);
                    multiShow(['monthly30']);
                } else {
                    // All others - 31 days
                    multiHide(['monthly30', 'monthly28']);
                    multiShow(['monthly31']);
                }

                multiShow(['monthlySpecialOn']);
            }
        }

        // ==[logic fpr onPer change event]==
        // ==[from AccrualInformationEditor.selectOnPer]==
        if (itemId == 'onPer') {
            if (newVal == 1) {
                // On
                multiHide([
                    'perX', 'accformPer', 'monthlySpecialPer',
                    'msOn', 'monthly31'
                ]);
                multiShow(['accformOn']);
                // Determine options to show
                let afOnVal = infoFc.getComponentInItems('accformOn').getValue();
                if (afOnVal == 51) {
                    // Weekly
                    multiShow(['onWeekly']);
                } else if (afOnVal == 52) {
                    // Bi-Weekly
                    multiShow(['onBiWeekly']);
                } else if (afOnVal == 53) {
                    // Monthly
                    multiShow(['monthly31']);
                } else if (afOnVal == 114) {
                    // Annually
                    multiShow(['onAnnually']);
                } else if (afOnVal == 100) {
                    // Annually (Anniversary)
                    multiShow(['onAnniversary']);
                } else if (afOnVal == 56) {
                    // Monthly special
                    multiShow(['monthlySpecialOn']);

                    // Day option choices based off month
                    let msChoice = infoFc.getComponentInItems('monthlySpecialOn').getValue();

                    if (msChoice == '2') {
                        // Feburary - 28 days
                        multiShow(['monthly28']);
                    } else if (['4', '6', '9', '11'].includes(msChoice)) {
                        // April/June/Sept/Nov - 30 days
                        multiShow(['monthly30']);
                    } else {
                        // All others - 31 days
                        multiShow(['monthly31']);
                    }
                }
            } else {
                // Per
                multiHide([
                    'accformOn', 'onWeekly', 'onBiWeekly', 'monthly31',
                    'monthly30', 'monthly28', 'onAnnually', 'onAnniversary',
                    'monthlySpecialOn', 'msOn'
                ]);
                multiShow(['accformPer']);

                // Determine which options to show
                let afPer = infoFc.getComponentInItems('accformPer');

                // console.info('afPer', afPer.getValue());

                // TODO: confirm this is correct
                if (!afPer.getValue()) {
                    afPer.setValue(117);
                }
                if (afPer.getValue() == 119) {
                    // Monthly Special
                    multiShow(['monthlySpecialPer', 'msOn', 'monthly31']);
                } else {
                    // Everything else
                    multiHide(['monthlySpecialPer']);
                    multiShow(['perX']);
                }
            }
        }

        // ==[logic for accformPer change event]==
        // ==[from AccrualInformationEditor.selectAccruaRulePer]
        if (itemId == 'accformPer') {
            if (newVal == 119) {
                // Monthly Special
                multiHide(['perX']);
                multiShow(['monthlySpecialPer', 'msOn', 'monthly31']);
            } else {
                // Everything else
                multiHide(['monthlySpecialPer', 'msOn', 'monthly31']);
                multiShow(['perX']);
            }
        }

        // ==[logic for monthlySpecialOn change event]==
        if (itemId == 'monthlySpecialOn') {
            // Day option choices based on month
            if (newVal == '2') {
                // Feb - 28 days
                multiHide(['monthly31', 'monthly30']);
                multiShow(['monthly28']);
            } else if (['4', '6', '9', '11'].includes(newVal)) {
                // April/June/Sept/Nov - 30 days
                multiHide(['monthly31', 'monthly28']);
                multiShow(['monthly30']);
            } else {
                // Others - 31 days
                multiHide(['monthly30', 'monthly28']);
                multiShow(['monthly31']);
            }
        }

    },

    /**
     * Constructs an arrual rule record from the current data state of the
     * info column's editor
     * @param {Object} containerField Reference to info column editor's main child
     * @return {Object} Newly constructed Accrual Rule record
     */
    accrualRuleFromInfoEditor: function (containerField) {
        var fieldNames = [
            'accformInc', 'accformUnit', 'accformOn', 'onPer',
            'onWeekly', 'onBiWeekly', 'monthly31', 'monthly30',
            'monthly28', 'monthlySpecialOn', 'monthlySpecialPer',
            'onAnnually', 'perX', 'accformPer'
        ];

        var fields = {},
            accrualRule = {};

        for (var i = 0; i < fieldNames.length; i++) {
            let name = fieldNames[i];
            fields[name] = containerField.getComponentInItems(name);
        }

        accrualRule = {
            accformInc: fields.accformInc.getValue(),
            accformUnit: fields.accformUnit.getValue(),
            // Default month and day to 0 unless monthly special
            msMonth: '0',
            msDay: '0'
        };

        if (fields.onPer.getValue() == 1) {
            // On
            if (fields.accformOn.getValue() == 100) {
                accrualRule.accformPer = 114;
                accrualRule.accformDay = 'ANNIVERSARY';
            } else {
                accrualRule.accformPer = fields.accformOn.getValue();
            }
            // Determine which ruleCount to use
            if (fields.accformOn.getValue() == 51) {
                // Weekly
                accrualRule.accformDay = fields.onWeekly.getValue();
            } else if (fields.accformOn.getValue() == 52) {
                // Bi-Weekly
                accrualRule.accformDay = fields.onBiWeekly.getValue();
            } else if (fields.accformOn.getValue() == 53) {
                // Monthly
                accrualRule.accformDay = fields.monthly31.getValue();
            } else if (fields.accformOn.getValue() == 56) {
                // Monthly Special
                let msChoice = fields.monthlySpecialOn.getValue();
                accrualRule.asMonth = msChoice;
                // Day option based on month
                if (msChoice == '2') {
                    // Feb - 28 days
                    accrualRule.accformDay = `${msChoice}-${fields.monthly28.getValue()}`;
                    accrualRule.msDay = fields.monthly28.getValue();
                } else if (['4', '6', '9', '11'].includes(msChoice)) {
                    // April/June/Sept/Nov - 30 days
                    accrualRule.accformDay = `${msChoice}-${fields.monthly30.getValue()}`;
                    accrualRule.msDay = fields.monthly30.getValue();
                } else {
                    // Others - 31 days
                    accrualRule.accformDay = `${msChoice}-${fields.monthly31.getValue()}`;
                    accrualRule.msDay = fields.monthly31.getValue();
                }
            } else if (fields.accformOn.getValue() == 114) {
                // Annually
                if (Object.isUnvalued(fields.onAnnually.getValue())) {
                    accrualRule.accformDay = 'ANNIVERSARRY';
                } else {
                    accrualRule.accformDay = fields.onAnnually.getValue();
                }
            } else if (fields.accformOn.getValue !== 100) {
                accrualRule.accformDay = ' ';
            }
        } else {
            // Per
            accrualRule.accformPer = fields.accformPer.getValue();
            if (fields.accformPer.getValue == 119) {
                accrualRule.accformDay = `${fields.monthlySpecialPer.getValue}-${fields.monthly31.getValue()}`;
                accrualRule.msMonth = fields.monthlySpecialPer.getValue();
                accrualRule.msDay = fields.monthly31.getValue();
            } else {
                accrualRule.accformDay = fields.perX.getValue();
            }
        }

        return accrualRule;

    },



    /**
     * Event handler for add carry over rule tool button.
     * Automatically adds new carry over rule, adjusting previous
     * last record if exists
     */
    onCreateCarryOverRule: function () {
        var me = this,
            vm = me.getViewModel(),
            ruleStore = vm.get('selectedCategoryCarryOverRules');

        // success toast message function
        var successToast = () => {
            Ext.toast({
                type: Ext.Toast.INFO,
                message: 'New Carry Over Rule successfully added.',
                timeout: 'info'
            });
        };

        // console.info('add carry over rule');

        if (ruleStore.last()) {
            // rule store has at least 1 record
            let lastRec = ruleStore.last(),
                durationEnd = lastRec.get('svcFrom');
            if (durationEnd == 0) {
                // set end duration to 1 if last record's svcFrom is 0
                durationEnd = 1;
            }
            // update svcTo of last record
            lastRec.set({
                svcTo: durationEnd
            }, { commit: true });
            // Add new rule
            let newRule = ruleStore.add({
                allowCarry: lastRec.get('allowCarry'),
                carryMax: lastRec.get('carryMax'),
                carryOver: lastRec.get('carryOver'),
                perAmount: lastRec.get('perAmount'),
                perUnit: lastRec.get('perUnit'),
                svcFrom: durationEnd,
                svcTo: 0,
                expChanged: false
            })[0]; // add returns an array, so pull out the first item
            /*  
                svcFrom is incremented after adding rule in original code, so 
                doing the same thing here 
            */
            newRule.set({ svcFrom: durationEnd + 1 }, { commit: true });
            successToast();
        } else {
            // No carry over rules exist, so create a new generic one
            ruleStore.add({
                allowCarry: false,
                carryMax: false,
                carryOver: -1,
                perAmount: 0,
                perUnit: 59,
                svcFrom: 0,
                svcTo: 0,
                expChanged: false
            });
            successToast();
        }
    },

    // === [Validators] ===

    /**
     * Checks validity of shift info time value
     * @param {String} value Time string
     * @return {Boolean} True if valid, false otherwise
     */
    validateShiftTime: function (value) {
        if (typeof value == 'number') {
            // If value is a number, its from the dropdown and is thus valid
            return true;
        }
        return (BreezeTime.isValidFormat(value)) ?
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
    validateShiftSegment: function (start, stop, record = null, inDialog = false) {
        var resolve = (v) => {
            return (typeof v == 'number') ?
                BreezeTime.fromMinutes(v) :
                BreezeTime.parse(v);
        },
            vm = this.getViewModel(),
            segments = vm.get('policySegments');

        var source = (inDialog) ? this.addShiftSegmentDialog : this.lookup('shiftGrid');

        // Create Validation rule set
        var validRuleSet = Ext.create('Breeze.helper.data.ValidationRuleSet', {
            rules: {
                differentTimes: {
                    fn: (get) => {
                        return (get('start').asMinutes() !== get('stop').asMinutes());
                    },
                    passFn: (get, name) => {
                        console.info(name, ' passed');
                    },
                    failFn: (get, name) => {
                        console.warn(name, ' failed');
                        // errors.push('Start and stop times must be different');
                        return 'Start and stop times must be different';
                    }
                },
                noOverlap: {
                    fn: (get) => {
                        var ok = true,
                            otherSegs = get('segments').queryRecordsBy(
                                (r) => { return r !== get('record'); }
                            ).map((r) => {
                                return [r.get('StartSegment'), r.get('StopSegment')];
                            }),
                            // Function for overlap checking
                            overlaps = (v, r) => {
                                return (v >= r[0] && v <= r[1]);
                            };
                        otherSegs.push([get('start').asMinutes(), get('stop').asMinutes()]);

                        otherSegs.forEach((r, i) => {
                            otherSegs.forEach((r2, i2) => {
                                if (i !== i2) {
                                    r.forEach((v) => {
                                        ok &= !overlaps(v, r2);
                                    })
                                }
                            })
                        });

                        return ok;
                    },
                    passFn: (get, name) => {
                        console.info(name, ' passed');
                    },
                    failFn: (get, name) => {
                        console.warn(name, ' failed');
                        // errors.push('Shift cannot overlap with existing shifts');
                        return 'Shift cannot overlap with existing shifts';
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

        if (validRuleSet.allPassed(res)) {
            return true;
        } else {
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'Please correct the following issues before saving',
                list: validRuleSet.getErrors(),
                timeout: ['warn', 5000]
            });
            return false;
        }

        console.info('Validate shift segment');
    },

    /**
     * Validate changes to Carry Over 'from' field in editor
     * 
     * If validation fails, displays warning toast
     * 
     * @param {Object} location Object with grid and record info
     * @param {Object} val New field value
     * @return {Boolean} True if valid, false otherwise
     */
    validateCarryOverFrom: function (location, val) {
        var record = location.record, store = record.store;
        let valid = true,
            errors = [],
            toVal = record.get('svcTo'),
            // Shorthand for adding error message and syncing valid
            addErr = (msg) => {
                valid = false;
                errors.push(msg);
            };


        if (location.recordIndex == 0) {
            /*
                Record is first rule
            */
            if (val == 0) {
                // Expects 'from' value to be 0 for first item
            } else {
                // First item's from value != 0, so add error
                addErr('Service must be from 0 (hire) for the first interval');
            }
        } else if (toVal !== 0 && val > toVal) {
            /*
                svcTo isn't 0 and svcFrom is > svcTo
            */
            addErr('The service from year can\'t be after the service through year');
        } else if (location.recordIndex == 1) {
            /*
                Record is second rule
            */
            if (val < 2) {
                addErr('This interval can\'t completely overwrite the first interval');
            }
        } else if (location.recordIndex > 1) {
            /*
                Record is 3rd+ rule
            */
            let prevRec = store.getAt(location.recordIndex - 1);
            if (val <= prevRec.get('svcFrom')) {
                /*
                    Previous record's svcFrom value is >= this
                    record's svcFrom value
                */
                addErr('This interval can\'t completely overwrite the previous interval');
            }
        }

        if (!valid) {
            // If not valid (1 or more errors)


            // Show warning toast for duration of error + 4 seconds
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'Unable to update Carry Over Rule \'From\' value:',
                list: errors,
                timeout: ['error', 4]
            });
        }

        return valid;
    },

    /**
     * Validate changes to Carry Over 'through' field in editor
     * 
     * If validation fails, displays warning toast
     * 
     * @param {Object} location Object with grid and record info
     * @param {Object} val New field value
     * @return {Boolean} True if valid, false otherwise
     */
    validateCarryOverThrough: function (location, val) {
        var record = location.record, store = record.store;
        let valid = true,
            errors = [],
            fromVal = record.get('svcFrom'),
            // Shorthand for adding error message and syncing valid
            addErr = (msg) => {
                valid = false;
                errors.push(msg);
            };
        console.info('carry over through valid: ', valid);

        if (location.recordIndex == store.getCount() - 1) {
            /*
                Record is the last in the list
            */
            if (val !== 0) {
                /*
                    svcTo value != 0
                */
                addErr('Service must be through 0 (infinity) for the last interval');
            }
        } else if (val < fromVal) {
            /*
                Record's svcTo value < its svcFrom value
            */
            addErr('The service through year can\'t be before the service from year');
        } else if (location.recordIndex < store.getCount() - 2) {
            /*
                Record is before second to last rule
            */
            let nextRec = store.getAt(location.recordIndex + 1);
            if (val >= nextRec.get('svcTo')) {
                /*
                    Record's svcTo value >= svcTo value of next rule
                */
                addErr('This interval can\'t completely overwrite the next interval');
            }
        }

        if (!valid) {
            // Not valid, one or more errors

            // Show warning toast for duration of error + 4 seconds
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'Unable to update Carry Over Rule \'Through\' value:',
                list: errors,
                timeout: ['error', 4]
            });
        }

        return valid;
    },

    /**
     * Multi-field validation method for grid editor fired before edit completes
     * @param {Object} location Object with grid cell and data location info
     * @param {Object} editor Reference to active editor component
     * @param {Object} val Current field value
     * @param {Object} oldVal Field value prior to edit
     * @return {Boolean} True if validation succeeds, false otherwise
     */
    validateCarryOverBeforeComplete: function (location, editor, val, oldVal) {
        var record = location.record,
            columnItemId = location.column.getItemId();

        // console.info('Carry over before edit complete');

        // ==[Logic specific to 'Carry Over Expiration' column]==
        if (columnItemId == 'expiration') {
            let editorComp = editor.getComponent('expirationField'),
                amount = editorComp.getComponentInItems('amount'),
                unit = editorComp.getComponentInItems('unit'),
                amountVal = amount.getValue(),
                unitVal = unit.getValue();

            // Check if amount or unit changed
            if (amountVal !== record.get('perAmount') || unitVal !== record.get('perUnit')) {
                // If change occured, update record
                record.set({
                    perAmount: amountVal,
                    perUnit: unitVal,
                    expChanged: true
                }, { commit: true });
            }
        }

        // ==[Logic specific to 'from' column]==
        if (columnItemId == 'from') {
            let passed = this.validateCarryOverFrom(location, val);
            console.info('before edit complete carry over [from]');
            if (!passed) {
                // If validation fails, revert to previous value
                editor.getComponent('fromField').setValue(oldVal);
            }
            return passed;
        }

        // ==[Logic specific to 'through' column]==
        if (columnItemId == 'through') {
            let passed = this.validateCarryOverThrough(location, val);
            console.info('before edit complete carry over [through]');
            if (!passed) {
                // If validation fails, revert to previous value
                editor.getComponent('throughField').setValue(oldVal);
            }
            return passed;
        }

        // default return true
        return true;
    },

    /**
     * Validate changes to Accrual Rule 'from' field in editor
     * 
     * If validation fails, displays warning toast
     * 
     * @param {Object} location Object with grid and record info
     * @param {Object} store Reference to store containing record
     * @param {Object} val New field value
     * @return {Boolean} True if valid, false otherwise
     */
    validateAccrualRuleFrom: function (location, store, val) {
        var record = location.record,
            rowData = location.row.getData();
        valid = true,
            errors = [],
            toVal = record.get('svcTo'),
            // Shorthand for adding error message and syncing valid
            addErr = (msg) => {
                valid = false;
                errors.push(msg);
            };

        rowData = (Object.isUnvalued(rowData)) ? {} : rowData;

        console.info('validate accrual rule [form] row data:', rowData);

        if (location.recordIndex == rowData.firstRuleIndex) {
            if (val !== 0) {
                /*
                    Record is first rule in named group and svcFrom isn't 0
                */
                addErr('Service must be from 0 (hire) for the first interval');
            }
        } else if (toVal !== 0 && val > toVal) {
            /*
                Record's svcTo !== 0 and svcFrom > svcTo
            */
            addErr('The service from year can\'t be after the service to year');
        } else if (location.recordIndex == rowData.firstRuleIndex + 1) {
            if (val < 2) {
                /*
                    Record is second rule in named group, and svcFrom < 2
                */
                addErr('This interval can\'t completely overwrite the first interval');
            }

        } else if (location.recordIndex > rowData.firstRuleIndex + 1) {
            /*
                Record is 3rd+ rule in named group
            */
            let prevRecord = store.getAt(location.recordIndex - 1);
            if (val <= prevRecord.get('svcFrom')) {
                /*
                    Record's svcFrom value <= previous rule's svcFrom value
                */
                addErr('This interval can\'t completely overwrite the previous interval');
            }
        }

        if (!valid) {
            // If not valid (1 or more errors)


            // Show warning toast for duration of error + 4 seconds
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'Unable to update Accrual Rule \'From\' value:',
                list: errors,
                timeout: ['error', 4]
            });
        }

        return valid;
    },

    /**
     * Validate changes to Accrual Rule 'through' field in editor
     * 
     * If validation fails, displays warning toast
     * 
     * @param {Object} location Object with grid and record info
     * @param {Object} store Reference to store containing record
     * @param {Object} val New field value
     * @return {Boolean} True if valid, false otherwise
     */
    validateAccrualRuleThrough: function (location, store, val) {
        var record = location.record,
            valid = true,
            errors = [],
            fromVal = record.get('svcFrom'),
            // Shorthand for adding error message and syncing valid
            addErr = (msg) => {
                valid = false;
                errors.push(msg);
            },
            rowData = location.row.getData();

        rowData = (Object.isUnvalued(rowData)) ? {} : rowData;

        if (location.recordIndex == rowData.lastRuleIndex) {
            /*
                Record is last rule in named group
            */
            if (val !== 0) {
                addErr('Service must be though 0 (infinity) for the last interval');
            }
        } else if (val < fromVal) {
            /*
                Record's svcTo value is before its svcFrom value
            */
            addErr('The service through year can\'t be before the service from year');
        } else if (location.recordIndex < rowData.lastRuleIndex - 1) {
            /*
                Record comes before last two rules in named group
            */
            let nextRecord = store.getAt(location.recordIndex + 1);
            if (val >= nextRecord.get('svcTo')) {
                /*
                     This record's svcTo valie >= the next rule's svcTo value
                */
                addErr('This interval can\'t completely overwrite the next interval');
            }
        }

        if (!valid) {
            // If not valid (1 or more errors)


            // Show warning toast for duration of error + 4 seconds
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'Unable to update Accrual Rule \'Through\' value:',
                list: errors,
                timeout: ['error', 4]
            });
        }

        return valid;
    },

    /**
     * Multi-field validation method for grid editor fired before edit completes
     * @param {Object} location Object with grid cell and data location info
     * @param {Object} store Reference to store containing record
     * @param {Object} editor Reference to active editor component
     * @param {Object} val Current field value
     * @param {Object} oldVal Field value prior to edit
     * @return {Boolean} True if validation succeeds, false otherwise
     */
    validateAccrualRuleBeforeComplete: function (location, store, editor, val, oldVal) {
        var record = location.record,
            columnItemId = location.column.getItemId();

        // ==[Logic specific to 'from' column]==
        if (columnItemId == 'from') {
            let passed = this.validateAccrualRuleFrom(location, store, val);
            // console.info('before edit complete carry over [from]');
            if (!passed) {
                // If validation fails, revert to previous value
                editor.getComponent('fromField').setValue(oldVal);
            }
            return passed;
        }

        // ==[Logic specific to 'through' column]==
        if (columnItemId == 'through') {
            let passed = this.validateAccrualRuleThrough(location, store, val);
            console.info('before edit complete carry over [through]');
            if (!passed) {
                // If validation fails, revert to previous value
                editor.getComponent('throughField').setValue(oldVal);
            }
            return passed;
        }

        // Default to passing
        return true;
    },

    // === [Event Listeners] ===

    /**
     * Fires before entering edit mode for cell in Carry Over Rules grid
     * Allows editor to be disabled conditionally for specific cells
     * @param {Object} location Object containing location data for targeted cell
     * @param {Object} editor Reference to active editor instance
     * @return {Boolean} Boolean indicating whether edit can take place
     */
    onCarryOverBeforeEdit: function (location, editor) {
        var record = location.record,
            store = record.store,
            columnItemId = location.column.getItemId();

        // Function to pass into `getItems().findBy()` to find by itemId
        var findItemById = (item, id) => {
            return (item.getItemId() == id);
        };

        // clear old temp data stored on row
        // location.row.setData(null);

        // ==[Logic specific to 'From' column]==
        if (columnItemId == 'from') {

            console.info('before carry over edit [from]');

            // disable editing from for first carry over rule
            if (location.recordIndex == 0) {
                return false;
            }
            if (location.recordIndex == -1) {
                return true;
            }
            // else if (record.get('svcFrom') !== 0 &&
            //     (record.get('svcFrom') > record.get('svcTo'))) {
            //     // TODO: Handle svc from > svc to
            //     console.warn('svcFrom > svcTo');
            // }
        }

        // ==[Logic specific to 'Through' column]==
        // TODO: Finish 'through' column logic
        if (columnItemId == 'through') {

            console.info('before carry over edit [through]');

            //disable editing through if last cary over rule
            if (record.store.getCount() - 1 == location.recordIndex) {
                return false;
            }
        }

        // ==[Logic specific to 'Carry Over' column]==
        if (columnItemId == 'allow') {
            return true; // always enabled
        }

        // ==[Logic specific to 'Carry Max' column]==
        if (columnItemId == 'max') {

            console.info('before carry over edit [max]');

            // Don't allow editing if allowCarry is false
            if (!record.get('allowCarry')) {
                editor.getComponent('maxField').setValue(0);
                return false;
            } else {
                return true;
            }
        }

        // ==[Logic specific to 'Carry Over Expiration' column]==
        if (columnItemId == 'expiration') {

            // Don't allow editing if carry over/allow carry isn't checked
            if (!record.get('allowCarry')) {
                return false;
            }

            // Get references to container field items and sub fields
            let containerItems = editor.getComponent('expirationField').getItems(),
                amount = containerItems.findBy((i) => { return findItemById(i, 'amount'); }),
                unit = containerItems.findBy((i) => { return findItemById(i, 'unit'); });

            // Update amount and unit field values from record
            amount.setValue(record.get('perAmount'));
            unit.setValue(record.get('perUnit'));

            // TODO: Implement logic for carry over expiration editor
            console.info('expiration fieldset');
            return true;
        }
    },

    /**
     * Fires when exiting cell editor for Carry Over Rules grid
     * 
     * Contains logic for auto adjusting From/Through values of records
     * surrounding the record that was just edited
     * 
     * Performs tidy logic only if validation call succeeds
     * 
     * @param {Object} location Object with grid cell and data location info
     * @param {Object} editor Reference to active editor component
     * @param {Object} val Current field value
     * @param {Object} oldVal Field value prior to edit
     */
    onCarryOverBeforeEditComplete: function (location, editor, val, oldVal) {
        var record = location.record,
            recIdx = location.recordIndex,
            store = record.store;
        // columnItemId = location.column.getItemId(),
        // editorComp = editor.getParent();

        // Perform validation
        var valid = this.validateCarryOverBeforeComplete(location, editor, val, oldVal);

        if (valid) {
            /*
                If there is at least one record, make sure the first
                starts with an svcFrom value of 0
            */
            if (store.getCount() > 0) {
                store.getAt(0).set({
                    svcFrom: 0
                }, { commit: true });
                // Set last record's svcTo to 0
                store.getAt(store.getCount() - 1).set({
                    svcTo: 0
                }, { commit: true });
            }

            /*
                If record isn't first, make sure previous record's
                svcTo value is 1 less than this record's svcFrom value
            */
            if (recIdx > 0) {
                let prevRecord = store.getAt(recIdx - 1),
                    // resolve svcFrom from val if current cell is in from 
                    // column, else pull from record
                    svcFrom = (location.column.getItemId() == 'from') ?
                        val : record.get('svcFrom');
                prevRecord.set({
                    svcTo: svcFrom - 1
                    // svcTo: record.get('svcFrom')
                }, { commit: true });
            }

            /*
                If record isn't last, make sure following record's
                svcFrom value is 1 greater than this record's svcTo value
            */
            if (recIdx < store.getCount() - 1) {
                let nextRecord = store.getAt(recIdx + 1),
                    // resolve svcTo from val if current cell is in through 
                    // column, else pull from record
                    svcTo = (location.column.getItemId() == 'through') ?
                        val : record.get('svcTo');
                nextRecord.set({
                    svcFrom: svcTo + 1
                }, { commit: true });
            }
        }

        // Hide editor
        // editorComp.onEditComplete(false, false);
    },

    /**
     * Change event handler for Carry Over Rules expiration amount editor field.
     * When value is 0, unit select field is disabled
     * @param {Object} comp Field component firing event
     * @param {Number} newValue New field value
     * @param {Number} oldValue Previous field value
     * @param {Object} eOpts Event options object
     */
    onCarryOverExpirationAmountChange: function (comp, newValue, oldValue, eOpts) {
        var unitField = comp.getParent().getComponent('unit');
        // Conditionally disable unit field based on value of source field
        if (newValue == 0) {
            unitField.setDisabled(true);
        } else {
            unitField.setDisabled(false);
        }
    },

    /**
     * Fires before entering edit mode for cell in Accrual Rules grid
     * Allows editor to be disabled conditionally for specific cells
     * @param {Object} location Object containing location data for targeted cell
     * @param {Object} editor Reference to active editor instance
     * @return {Boolean} Boolean indicating whether edit can take place
     */
    onAccrualRuleBeforeEdit: function (location, editor) {

        var record = location.record,
            store = record.store,
            columnItemId = location.column.getItemId();

        // Calculate rule index info
        var ruleInfo = this.collectAccrualRuleInfo(record.get('ruleName'));
        // Pull values out of returned object via destructuring
        var {
            firstIndex: firstRuleIndex,
            lastIndex: lastRuleIndex,
            count: ruleCount
        } = ruleInfo;

        lastRuleIndex = firstRuleIndex + (ruleCount - 1);

        // Store rule index info in table row's data object
        location.row.setData({
            firstRuleIndex: firstRuleIndex,
            ruleCount: ruleCount,
            lastRuleIndex: lastRuleIndex
        });

        console.info('rule indexes calculated');

        // ==[Logic specific to 'info' column]==
        if (columnItemId == 'info') {
            this.onAccrualRuleInfoBeforeEdit(location, editor);
            return true;
        }
    },

    /**
     * Extracted portion of onAccrualRuleBeforeEdit specific to the 'info' column
     */
    onAccrualRuleInfoBeforeEdit: function (location, editor) {
        var record = location.record,
            store = record.store,
            container = editor.getComponent('infoField');

        let accformInc = container.getComponentInItems('accformInc'),
            accformUnit = container.getComponentInItems('accformUnit'),
            accformOn = container.getComponentInItems('accformOn'),
            onPer = container.getComponentInItems('onPer'),
            onWeekly = container.getComponentInItems('onWeekly'),
            onBiWeekly = container.getComponentInItems('onBiWeekly'),
            monthly31 = container.getComponentInItems('monthly31'),
            monthly30 = container.getComponentInItems('monthly30'),
            monthly28 = container.getComponentInItems('monthly28'),
            monthlySpecialPer = container.getComponentInItems('monthlySpecialPer'),
            monthlySpecialOn = container.getComponentInItems('monthlySpecialOn'),
            onAnnually = container.getComponentInItems('onAnnually'),
            perX = container.getComponentInItems('perX'),
            accformPer = container.getComponentInItems('accformPer'),
            msOnLabel = container.getComponentInItems('msOn'),
            onAnniversaryLabel = container.getComponentInItems('onAnniversary');

        var multiHide = (items) => {
            for (var i = 0; i < items.length; i++) {
                items[i].setHidden(true);
            }
        }, multiShow = (items) => {
            for (var i = 0; i < items.length; i++) {
                items[i].setHidden(false);
            }
        };

        // Set default values
        accformOn.setValue(53);
        onPer.setValue(1);
        onWeekly.setValue('6');
        onBiWeekly.setValue('13');
        monthly31.setValue('1');
        monthly30.setValue('1');
        monthly28.setValue('1');
        monthlySpecialOn.setValue('1');
        monthlySpecialPer.setValue('1');
        onAnnually.setValue('01/01');
        perX.setValue(1);
        accformPer.setValue(117);

        console.info('loaded accrual rule record');

        // Set loaded values
        accformInc.setValue(record.get('accformInc'));
        accformUnit.setValue(record.get('accformUnit'));

        let accformPerVal = record.get('accformPer');

        if (accformPerVal < 115) {

            multiHide([
                perX, accformPer, monthlySpecialOn,
                monthlySpecialPer, monthly31, monthly30,
                monthly28, msOnLabel
            ]);

            onPer.setValue(1);
            if (
                accformPerVal == 114 &&
                record.get('accformDay') == 'ANNIVERSARY'
            ) {
                accformOn.setValue(100);
            } else {
                accformOn.setValue(accformPerVal);
            }
            accformOn.show();
            if (accformPerVal == 51) {
                /* == Weekly == */
                onWeekly.setValue(record.get('accformDay'));
                onWeekly.setHidden(false);

                multiHide([
                    onBiWeekly, monthly31, monthly30, monthly28,
                    onAnnually, onAnniversaryLabel
                ]);
            } else if (accformPerVal == 52) {
                /* == Bi-Weekly == */
                onBiWeekly.setValue(record.get('accformDay'));
                onBiWeekly.setHidden(false);

                multiHide([
                    onWeekly, monthly31, monthly30, monthly28,
                    onAnnually, onAnniversaryLabel
                ]);
            } else if (accformPerVal == 53) {
                /* == Monthly == */
                monthly31.setValue(record.get('accformDay'));
                monthly31.setHidden(false);

                multiHide([
                    onWeekly, onBiWeekly, monthly30, monthly28,
                    onAnnually, onAnniversaryLabel
                ]);
            } else if (accformPerVal == 114) {
                /* == Annually == */
                if (record.get('accformDay') == 'ANNIVERSARY') {
                    onAnniversaryLabel.setHidden(false);
                    onAnnually.setHidden(true);
                } else {
                    onAnnually.setValue(record.get('accformDay'));
                    onAnnually.setHidden(false);
                    onAnniversaryLabel.setHidden(true);
                }

                multiHide([
                    onWeekly, onBiWeekly, monthly30, monthly31, monthly28
                ]);
            } else if (accformPerVal == 56) {
                /* == Monthly Special == */

                let accformDayVal = record.get('accformDay'),
                    msChoice = accformDayVal.split('-')[0];

                monthlySpecialOn.setValue(msChoice);
                monthlySpecialOn.setHidden(false);

                // Day options based on month

                // Feb - 28 days
                if (msChoice == '2') {
                    multiHide([monthly31, monthly30]);
                    monthly28.setValue(accformDayVal.split('-')[1]);
                    monthly28.setHidden(false);
                }
                // April, June, Sept, Nov - 30 days
                else if (['4', '6', '9', '11'].includes(msChoice)) {
                    multiHide([monthly31, monthly28]);

                    monthly30.setValue(accformDayVal.split('-')[1]);
                    monthly30.setHidden(false);
                }
                // All others - 31 days
                else {
                    multiHide([monthly30, monthly28]);

                    monthly31.setValue(accformDayVal.split('-')[1]);
                    monthly31.setHidden(false);
                }
            }
        } else {
            multiHide([
                accformOn, onWeekly, onBiWeekly,
                monthly31, monthly30, monthly28,
                onAnnually, onAnniversaryLabel
            ]);

            onPer.setValue(2);
            accformPer.setValue(accformPerVal);
            accformPer.setHidden(false);

            let accformDayVal = record.get('accformDay');

            // Determine shown options
            if (accformPerVal == 119) {
                /* == Monthly Special == */

                monthlySpecialPer.setValue(accformDayVal.split('-')[0]);
                monthly31.setValue(accformDayVal.split('-')[1]);

                multiShow([
                    monthlySpecialPer, monthly31, msOnLabel
                ]);
            } else {
                /* == Everything else == */
                multiHide([
                    monthlySpecialPer, monthly31, msOnLabel
                ]);

                perX.setValue(accformDayVal);
                perX.setHidden(false);
            }
        }

        console.info('On accrual rule before edit');
    },

    /**
     * Fires when exiting cell editor for Accrual Rules grid
     * 
     * Contains logic for auto adjusting From/Through values of records
     * surrounding the record that was just edited
     * 
     * Performs tidy logic only if validation call succeeds
     * 
     * @param {Object} location Object with grid cell and data location info
     * @param {Object} editor Reference to active editor component
     * @param {Object} val Current field value
     * @param {Object} oldVal Field value prior to edit
     */
    onAccrualRuleBeforeEditComplete: function (location, editor, val, oldVal) {
        var record = location.record,
            recIdx = location.recordIndex,
            store = record.store;

        if (location.column.getItemId() == 'info') {
            var updatedRecordData = this.accrualRuleFromInfoEditor(
                location.column.getEditor().getAt(0)
            );
            record.set(updatedRecordData, {commit: true});
            console.info('accrual rule before edit complete');
        } else {
            // Perform validation
            var valid = this.validateAccrualRuleBeforeComplete(location, store, editor, val, oldVal);

            if (valid) {
                let rowData = location.row.getData();

                rowData = (Object.isUnvalued(rowData)) ? {} : rowData;

                /*
                    If there is at least one record, make sure the first has an
                    svcFrom value of 0 and the last has an svcTo of 0
                */
                if (store.getCount() > 0) {
                    store.getAt(0).set({
                        svcFrom: 0
                    }, { commit: true });
                    store.getAt(rowData.lastRuleIndex).set({
                        svcTo: 0
                    }, { commit: true });
                }

                /*
                    Record is not the first rule in the named group.
                    Change previous rule's svcTo value to 1 less than the 
                    current record's svcFrom
                */
                if (rowData['firstRuleIndex'] && recIdx > rowData.firstRuleIndex) {
                    let prevRecord = store.getAt(recIdx - 1);
                    prevRecord.set({
                        svcTo: record.get('svcFrom') - 1
                    }, { commit: true });
                }

                /*
                    Record is not the last rule in the named group.
                    Change next rule's svcFrom value to 1 more than the 
                    current record's svcTo
                */
                if (rowData['lastRuleIndex'] && recIdx < rowData.lastRuleIndex) {
                    let nextRecord = store.getAt(recIdx + 1);
                    nextRecord.set({
                        svcFrom: record.get('svcTo') + 1
                    }, { commit: true });
                }

                console.info('onAccrualRuleBeforeEditComplete');
            }
        }
    },

    /**
     * Handle select event from policy list
     * Loads full policy details for selected item
     * @param {Object} list 
     * @param {Object} record 
     * @param {Object} eOpts 
     */
    onPolicySelect: function (list, record, oOpts) {
        var vm = this.getViewModel(),
            me = this,
            cats = this.lookup('categoryList');
        if (vm.getStore('policy')) {
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
                    callback: function (records, op, success) {
                        if (success) {
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
                                Ext.clone(policyRecord.shifts().getData().items.map((i) => { return i.getData(); }))
                            );
                            // Select first category if none selected, else restore
                            // previously selected category
                            if (cats.getSelectable().getSelectionCount() == 0) {
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

    onCategorySelect: function (list, record, eOpts) {
        var vm = this.getViewModel(),
            policyCats = vm.get('policyCategories'),
            recId = parseInt(record.get('Category_Id')),
            policyId = vm.get('policyData').ID,
            me = this;
        this.api.policyCategory(policyId, recId).then((data)=>{
            me.copyRecordToViewModel(
                data, 'selectedCategory'
                // ,'Breeze.model.accrual.policy.Category'
            );
            vm.get('selectedCategoryAccrualRules').loadData(Ext.clone(data.accrualRules));
            // load selected category's carry over rules
            vm.get('selectedCategoryCarryOverRules').loadData(Ext.clone(data.carryOverRules));
            vm.get('selectedCategoryCarryOverRules').sort('svcFrom', 'ASC');
        }).catch((e)=>{
            console.warn('Unable to load category data!');
        });
        // vm.set('categoryId', Ext.clone(record.get('Category_Id')));
        // this.lookup('accrualRuleGrid').runRefresh();
        // // vm.set('selectedCategory', vm.get('policyCategories').query)
        // console.info('Category Selected');
        // var rec = policyCats.queryRecords('categoryId', recId)[0];
        // this.copyRecordToViewModel(
        //     rec.getData(), 'selectedCategory'
        //     // ,'Breeze.model.accrual.policy.Category'
        // );
        // // load selected category's accrual rules
        // vm.get('selectedCategoryAccrualRules').loadData(Ext.clone(rec.getData().accrualRules));
        // // load selected category's carry over rules
        // vm.get('selectedCategoryCarryOverRules').loadData(Ext.clone(rec.getData().carryOverRules));
        // vm.get('selectedCategoryCarryOverRules').sort('svcFrom', 'ASC');
    },

    onDeleteAccrualInterval: function(grid, info){
        var store = grid.getStore(),
            record = info.record,
            recordIndex = store.indexOf(record);
        
        // Get range info for named group of accrual rules
        var { 
            firstIndex: firstRuleIndex, 
            ruleCount: count
        } = this.collectAccrualRuleInfo(record.get('ruleName'));

        /*  Was used to disable add interval button if last rule,
            instead this should automatically get applied by binding and 
            formula in view model
        if(store.getCount() == 1){
            
        }*/

        // If more than one interval exists for rule
        if(count > 1){
            /*
                If deleted interval is first in rule, set the second
                interval's svcFrom to 0. Else, set the previous interval's
                svcTo to match the svcTo value of the interval being deleted
            */
            if(recordIndex == firstIndex){
                // set second interval's from to 0
                let second = store.getAt(recordIndex + 1);
                second.set({
                    svcFrom: 0
                }, { commit: true });
            } else {
                // set previous rule's To to match that of the interval being deleted
                let prev = store.getAt(recordIndex - 1);
                prev.set({
                    svcTo: record.get('svcTo')
                }, { commit: true });
            }
        }

        // Delete interval record
        store.remove(record);

        Ext.toast({
            type: Ext.Toast.INFO,
            message: 'Accrual Rule Interval successfully deleted',
            timeout: 'info'
        });
    },

    /**
     * Event handler for delete ('x') tool on Carry Over Rules grid rows
     * @param {Component} grid Grid to which tool firing event belongs to
     * @param {Object} info Object containing record, event, and source 
     *      tool references
     */
    onDeleteCarryOverRule: function (grid, info) {
        var store = grid.getStore(),
            record = info.record,
            recordIndex = store.indexOf(record);

        if (store.getCount() > 1) {
            // Store contains more than 1 rule records
            if (recordIndex == 0) {
                /* 
                    Record is first, so set svcFrom of second record to 0
                */
                store.getAt(1).set({
                    svcFrom: 0
                }, { commit: true });
            } else {
                /*
                    Record isn't first, so set svcTo of previous record to
                    this record's svcTo value
                */
                let prevRecord = store.getAt(recordIndex - 1);
                prevRecord.set({
                    svcTo: record.get('svcTo')
                }, { commit: true });
            }

            // Remove record selected for deletion
            store.remove(record);
            store.commitChanges();
        } else {
            /* 
                Store contains 1 or fewer rule records
                Keep single record in place, but update its values
            */
            // Old code directly modifies first record, not target, so duplicating here
            let rec = store.getAt(0);
            rec.set({
                allowCarry: false,
                carryOver: -1,
                perAmount: 0,
                perUnit: 59
            }, { commit: true });
        }
    },

    /**
     * Event handler for delete ('x') tool on Shift Segment grid rows
     * @param {Component} grid Grid to which tool firing event belongs to
     * @param {Object} info Object containing record, event, and source 
     *      tool references
     */
    onDeleteShiftSegment: function (grid, info) {
        var store = grid.getStore();

        store.remove([info.record]);
        store.commitChanges();

        Ext.toast({
            type: Ext.Toast.INFO,
            message: 'Shift segment successfully deleted',
            timeout: 'info'
        });
    },

    onShiftTimeChange: function (cmp, newVal, oldVal) {
        cmp.validate();
        if (cmp.isValid() && BreezeTime.resolve(newVal) !== null) {
            cmp.setError(null);
            var record = cmp.getParent().ownerCmp.getRecord(),
                start = record.get('StartTime'),
                stop = record.get('StopTime');
            if (cmp.getItemId() == 'start') {
                start = newVal;
            } else {
                stop = newVal;
            }
            var ok = this.validateShiftSegment(start, stop, record, false);
            if (ok) {
                var staT = BreezeTime.resolve(start),
                    stoT = BreezeTime.resolve(stop);
                record.set({
                    StartTime: staT.asTime(), StartSegment: staT.asMinutes(),
                    StopTime: stoT.asTime(), StopSegment: stoT.asMinutes()
                }, { commit: true });
            }
            console.info('valid');
            cmp.getParent().cancelEdit();
        }
        console.info('shift change');
    },

    onDeletePolicy: function (comp) {
        var me = this,
            policyId = this.getViewModel().get('policyData').ID;
        
        this.api.canDelete(policyId).then((policyName)=>{
            
            Ext.Msg.themedConfirm(
                'Delete Accrual Policy',
                `Are you sure you want to delete: ${policyName}?<br>
                This action can't be undone!`,
                (choice) => {
                    if(choice == 'yes'){
                        // user picked yes, so move forward
                        me.api.delete(policyId).then((msg)=>{
                            // Show success message
                            Ext.toast({
                                type: Ext.Toast.INFO,
                                message: 'Accrual Policy successfully deleted.',
                                timeout: ['info',2]
                            });
                            // Reload policies
                            me.loadPolicies();
                        }).catch((errMsg)=>{
                            // Show error message
                            Ext.toast({
                                type: errMsg.type,
                                message: errMsg.message,
                                timeout: 'error'
                            });
                            // Nothing else to do, will exit method
                        });
                    }
                    // if user answered no, dialog closes and abort
                },
                'dark-themed-dialog',
                me
            )
        }).catch((err)=>{
            // Show error toast
            // Try to make useful by showing error message, if any
            Ext.toast({
                type: err.type,
                message: err.message,
                timeout: 'error'
            });
        })
    },

    presaveFieldUpdate: function(){
        var vm = this.getViewModel();
        vm.set('policyData.recordingMode', this.lookup('recordingMode').getValues().recMode);
        vm.set('selectedCategory.calendarType',this.lookup('recordingYear').getValues().yearType);
        
    },

    /**
     * Handle 'Save Accrual Policy' button click event
     */
    onSavePolicy: function () {
        this.presaveFieldUpdate();
        var vm = this.getViewModel(),
            params = vm.saveParameters(),
            me = this,
            id = vm.get('policyData').ID;

        this.api.save(params).then((r)=>{
            // Show success message
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 'info'
            });
            // Reload policies, selecting saved policy
            // me.loadPolicies(parseInt(r.policyId));
            me.loadPolicies(id);
        }).catch((err)=>{
            // Show error message
            Ext.toast({
                type: err.type,
                message: err.message,
                timeout: 'error'
            });
        });  
    },

    onShowSavePolicyAndApply: function(){
        var me = this,
            vm = this.getViewModel(),
            employees = this.lookup('applyEmployeesList'),
            categories = this.lookup('applyCategoriesList'),
            policy = vm.get('policyData');
        
        // hide progress bar
        vm.set('saveAndApply.progress',-1);


        // Prepare and display apply view
        var showApplyView = () => {
            // Prepare Apply view
            this.api.employeesAndCategoriesForApply(policy.ID).then((r)=>{
                let employeeTargets = vm.get('applyEmployeeTargets'),
                    categoryTargets = vm.get('applyCategoryTargets');
                
                // clear any checked values
                employees.changeAllCheckboxes(false);
                categories.changeAllCheckboxes(false);

                // Replace employee targets
                employeeTargets.loadData(Ext.clone(r.employees));
                // Replace category targets
                categoryTargets.loadData(Ext.clone(r.categories));

                // Show apply form
                me.getView().setActiveItem(
                    me.getView().getComponent('applyForm')
                );
            }).catch((err)=>{
                console.warn('Encountered error with getAccrualPolicyEmployeesAndCategoies call', err);
            });
        };

        // Save
        this.api.save(vm.saveParameters()).then((r) => {
            // Show success message
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 'info'
            });
            // Prepare apply view and switch
            showApplyView();
        }).catch((err) => {
            // Show error message
            Ext.toast({
                type: err.type,
                message: err.message,
                timeout: 'error'
            });
        });
    },

    onSavePolicyAndApply: function(){
        console.info('SavePolicy and Apply');
        var me = this,
            vm = this.getViewModel(),
            applyOptions = vm.get('saveAndApply.options'),
            employees = this.lookup('applyEmployeesList'),
            categories = this.lookup('applyCategoriesList'),
            scheduleId = vm.get('policyData').ID;

        var employeeIds = employees.gatherSelected().map((r)=>{return r.get('id')}).join(',');
        var categoryIds = categories.gatherSelected().map((r)=>{return r.get('data')}).join(',');

        /**
         * Function called when save and apply is done
         * Shows success message and returns view to main form
         */
        var finish = () => {
            // Show success message
            Ext.toast({
                type: Ext.Toast.INFO,
                message: 'Accrual Policy successfully applied',
                timeout: 'info'
            });
            updateProgressBar(1);
            // Switch back to regular form
            this.getView().setActiveItem(
                this.getView().getComponent('form')
            );
            // Reload policies, selecting saved policy
            me.loadPolicies(parseInt(scheduleId));
        };

        var updateProgressBar = (progress) => {
            vm.set('saveAndApply.progress', progress);
        };
        
        /**
         * Recurisve function that calls apply api method
         * Calls itself over until progress is 1.
         * When finished, calls finish()
         * @param {Number} progress Progress value. 0 = start, 1 = done
         */
        var doApply = (progress) => {
            this.api.apply(
                scheduleId,
                employeeIds,
                categoryIds,
                applyOptions.applyPast,
                applyOptions.changeUserShifts,
                applyOptions.changeUserCategories,
                progress
            ).then((r)=>{
                if(r.done){
                    finish();
                } else {
                    // fire method that updates progress display
                    updateProgressBar(r.progress);
                    doApply(r.iteration);
                }
            }).catch((err)=>{
                // Fail
                Ext.toast({
                    type: Ext.Toast.ERROR,
                    message: 'Unable to connect to the server',
                    timeout: 'error'
                });
            });
        };

        updateProgressBar(0);
        doApply(0);

    },

    onSavePolicyAndApplyCancelButton: function(){
        this.getView().setActiveItem(
            this.getView().getComponent('form')
        );
    },

    /**
     * Event listener shared by both 'check all' checkboxes on the save and 
     * apply view. Makes use of data attribute on checkboxes to find list to update
     * @param {Object} field Source checkbox
     * @param {Boolean} checked Checked state
     */
    onSavePolicyAndApplyCheckAllChange: function(field, checked){
        var list = this.lookup(field.getData().list);
        list.changeAllCheckboxes(checked);
    },

    // ====[Others]====

    /**
     * Return range info for accrual intervals based on rule name
     * 
     * Logic is used enough to make it worthwhile to put it in its own function
     * 
     * @param {String} groupName Group name (rule name) of rules to get range of
     * @return {Object} Object specifying firstIndex, lastIndex and count
     */
    collectAccrualRuleInfo: function(groupName){
        var rules = this.getViewModel().get('selectedCategoryAccrualRules');
        var info = {firstIndex: Number.POSITIVE_INFINITY, lastIndex: -1, count: 0};

        for(var i=0; i<rules.getCount(); i++){
            let rec = rules.getAt(i);
            if(rec.get('ruleName') == groupName){
                if(i<info.firstIndex){
                    // update first occurrence
                    info.firstIndex = i;
                }
                // Increase count
                info.count++;
            }
        }

        // Calculate last index
        info.lastIndex = info.firstIndex + info.count - 1;

        return info;
    },

    /**
     * Counts uniquely named rules out of currently loaded accrual rules
     * for the selected category
     * @return {Number} Number of accrual rule names
     */
    countAccrualRules: function(){
        var rules = this.getViewModel().get('selectedCategoryAccrualRules')
            .getData().items,
            names = [];
        
        rules.forEach((r)=>{
            let name = r.get('ruleName');
            if(!names.includes(name)){ names.push(name); }
        });

        return names.length;
    },



});