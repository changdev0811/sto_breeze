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

        // load accrual policies
        this.loadPolicies();

    },

    loadPolicies: function (policyId = null) {
        var me = this,
            vm = this.getViewModel();

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

        dialog.show();
    },

    /**
     * Handle 'cancel' button click event for 'Create Policy' dialog
     * @param {Object} comp Button firing event
     */
    onCreatePolicyDialogCancel: function (comp) {
        var dlg = comp.getParent().getParent();
        dlg.hide();
        dlg.getComponent('policyName').clearValue();
    },

    //--[Add Shift]--

    showAddShiftSegmentDialog: function () {
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
    onAddShiftSegmentDialogCancel: function (dlg) {
        let start = dlg.getComponent('start'),
            stop = dlg.getComponent('stop');
        start.clearValue();
        stop.clearValue();
        start.setError(null);
        stop.setError(null);
    },

    onAddShiftSegmentDialogSave: function (btn) {
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
    showAddAccrualRuleDialog: function () {
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
    onAddAccrualRule: function () {
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
    onAddAccrualRuleDialogCancel: function () {
        this.addAccrualRuleDialog.hide();
    },


    //--[Add Accrual Interval Dialog]--

    /**
     * Display the 'add accrual interval' dialog
     */
    showAddAccrualIntervalDialog: function () {
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

        var names = dialog.getComponent('ruleNames');

        // Add rule name options
        names.setValue(null);
        names.setOptions(ruleOptions);
    },

    /**
     * Event handler for add accrual interval dialog cancel button
     */
    onAddAccrualIntervalDialogCancel: function () {
        this.addAccrualIntervalDialog.hide();
    },


    /**
     * Event handler for add carry over rule tool button.
     * Automatically adds new carry over rule, adjusting previous
     * last record if exists
     */
    onAddCarryOverRule: function () {
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

        var errors = [];

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
                        errors.push('Start and stop times must be different');
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

        if (validRuleSet.allPassed(res)) {
            return true;
        } else {
            Ext.toast({
                type: Ext.Toast.WARN,
                message: [
                    'Please correct the following issues before saving',
                    '<ul>' + errors.map((i) => { return `<li>${i}</li>` }) + '</ul>'
                ].join('<br>'),
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
    validateCarryOverFrom: function(location, val){
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
    validateCarryOverThrough: function(location, val){
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
            store = record.store,
            columnItemId = location.column.getItemId();
        
        console.info('Carry over before edit complete');

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
        if(columnItemId == 'from'){
            let passed = this.validateCarryOverFrom(location, val);
            console.info('before edit complete carry over [from]');
            if(!passed){
                // If validation fails, revert to previous value
                editor.getComponent('fromField').setValue(oldVal);
            }
            return passed;
        }

        // ==[Logic specific to 'through' column]==
        if(columnItemId == 'through'){
            let passed = this.validateCarryOverThrough(location, val);
            console.info('before edit complete carry over [through]');
            if(!passed){
                // If validation fails, revert to previous value
                editor.getComponent('throughField').setValue(oldVal);
            }
            return passed;
        }

        // default return true
        return true;
    },

    validateAccrualRuleFrom: function(location, val){

    },

    validateAccrualRuleThrough: function(location, val){

    },

    validateAccrualRuleBeforeComplete: function(location, editor, val, oldVal){

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
    onCarryOverExpirationAmountChange: function(comp, newValue, oldValue, eOpts){
        var unitField = comp.getParent().getComponent('unit');
        // Conditionally disable unit field based on value of source field
        if(newValue == 0){
            unitField.setDisabled(true);
        } else {
            unitField.setDisabled(false);
        }
    },

    onAccrualRuleBeforeEdit: function(location, editor){
        var record = location.record,
            store = record.store,
            container = editor.getComponent('infoField');

        console.info('On accrual rule before edit');

        let accformInc = container.getComponentInItems('accformInc'),
            accformUnit = container.getComponentInItems('accformUnit'),
            accformOn = container.getComponentInItems('accformOn'),
            onPer = container.getComponentInItems('onPer'),
            onWeekly = container.getComponentInItems('onWeekly'),
            onBiWeekly = container.getComponentInItems('onBiWeekly'),
            monthly31 = container.getComponentInItems('monthy31'),
            monthly30 = container.getComponentInItems('monthy30'),
            monthly28 = container.getComponentInItems('monthy28'),
            monthlySpecialPer = container.getComponentInItems('monthlySpecialPer'),
            monthlySpecialOn = container.getComponentInItems('monthlySpecialOn'),
            onAnnually = container.getComponentInItems('onAnnually'),
            perX = container.getComponentInItems('perX'),
            accformPer = container.getComponentInItems('accformPer'),
            msOnLabel = container.getComponentInItems('msOn'),
            onAnniversaryLabel = container.getComponentInItems('onAnniversary');

        var multiHide = (items)=>{
            for(var i=0;i<items.length;i++){
                items[i].hide();
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
        
        // Set loaded values
        accformInc.setValue(record.get('accformInc'));
        accformUnit.setValue(record.get('accformUnit'));

        if(record.get('accformPer') < 15){
            
            let accformPerVal = record.get('accformPer');
            
            multiHide([
                perX, accformPer, monthlySpecialOn,
                monthlySpecialPer, monthly31, monthly30,
                monthly28, msOnLabel
            ]);
            
            onPer.setValue(1);
            if(
                accformPerVal == 114 && 
                record.get('accformDay') == 'ANNIVERSARY'
            ){ 
                accformOn.setValue(100);
            } else {
                accformOn.setValue(accformPerVal);
            }
            accformOn.show();
            if(accformPerVal == 51){
                /* == Weekly == */
                onWeekly.setValue(record.get('accformDay'));
                onWeekly.show();

                multiHide([
                    onBiWeekly, monthly31, monthly30, monthly28,
                    onAnnually, onAnniversaryLabel
                ]);
            } else if (accformPerVal == 52){
                /* == Bi-Weekly == */
                onBiWeekly.setValue(record.get('accformDay'));
                onBiWeekly.show();

                multiHide([
                    onWeekly, monthly31, monthly30, monthly28,
                    onAnnually, onAnniversaryLabel
                ]);
            } else if (accformPerVal == 53){
                /* == Monthly == */
                monthly31.setValue(record.get('accformDay'));
                monthly31.show();

                multiHide([
                    onWeekly, onBiWeekly, monthly30, monthly28,
                    onAnnually, onAnniversaryLabel
                ]);
            }
        }

    },

    onAccrualRuleBeforeEditComplete: function(location, editor, val, oldVal){

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
        vm.get('selectedCategoryCarryOverRules').sort('svcFrom','ASC');
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
            if(recordIndex == 0){
                /* 
                    Record is first, so set svcFrom of second record to 0
                */
                store.getAt(1).set({
                    svcFrom: 0
                }, {commit: true});
            } else {
                /*
                    Record isn't first, so set svcTo of previous record to
                    this record's svcTo value
                */
                let prevRecord = store.getAt(recordIndex - 1);
                prevRecord.set({
                    svcTo: record.get('svcTo')
                }, {commit: true});
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
            }, {commit: true});
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
                    StartTime: staT.asTime(), StartMin: staT.asMinutes(),
                    StopTime: stoT.asTime(), StopMin: stoT.asMinutes()
                }, { commit: true });
            }
            console.info('valid');
            cmp.getParent().cancelEdit();
        }
        console.info('shift change');
    },


    // TODO: Implement delete policy handler
    onDeletePolicy: function (comp) {

    },

    /**
     * Handle 'Save Accrual Policy' button click event
     */
    onSavePolicy: function () {
        console.info('Save policy clicked');
    }



});