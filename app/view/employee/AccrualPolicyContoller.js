/**
 * Controller for Employee AccrualPolicy View
 */
Ext.define('Breeze.view.employee.AccrualPolicyController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.employee.accrualpolicy',

    requires: [
        'Breeze.api.Employee',
        'Breeze.api.employee.AccrualPolicy',
        'Breeze.store.category.CompactList',
        'Breeze.model.accrual.employee.Rule'
    ],

    onInit: function(component, eOpts){
        // load / reference API classes
        this.api = {
            employee: Ext.create('Breeze.api.Employee'),
            accrual: Breeze.api.employee.AccrualPolicy
        };

        var me = this,
            vm = this.getViewModel();

        // If a specific employee is given, use that as target,
        // else get target from current user's id
        if(Object.isUnvalued(component.getData().targetEmployee,true)){
            vm.set('targetEmployee', vm.get('userId'));
        }
        // Parse category id so it is an integer
        vm.set('categoryId', parseInt(component.getData().categoryId));

        //  TODO: Determine if needed
        // this.addStoreToViewModel(
        //     'Breeze.store.accrual.RecordedYears',
        //     'recordedYears', {load: false}
        // );

        this.addStoreToViewModel(
            'Breeze.store.category.CompactList',
            'categories', {load: true}
        );

        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.accrual.employee.Rule',
            groupField: 'ruleName',
            data: []
        }, 'categoryRules');

        console.info('Controller ready');
        
        // Initial API Calls
        this.loadAdjustInfo(
            vm.get('categoryId'),
            new Date(),
            vm.get('showScheduled')
        );
        this.loadPoint(
            vm.get('categoryId'),
            new Date(),
            vm.get('showScheduled')
        );
    },

    /**
     * Load adjustment information for current category
     * Writes result to view model object 'categoryAdjust', and updates 'categoryRules' store
     */
    loadAdjustInfo: function(category, date, showScheduled){
        var vm = this.getViewModel(),
            me = this;
        this.api.accrual.categoryAdjustInfo(
            vm.get('targetEmployee'),
            category,
            date,
            showScheduled
        ).then((r)=>{
            // var viewDateField = me.lookup('viewDateField'),
            //     recordingYearField = me.lookup('recordingYearField');
            // viewDateField.suspendEvents(false);
            // recordingYearField.suspendEvents(false);
            me.copyRecordToViewModel(r,'categoryAdjust','Breeze.model.accrual.employee.Adjust');
            // viewDateField.suspendEvents(false);
            // recordingYearField.resumeEvents();
            // viewDateField.resumeEvents();
            var vm = me.getViewModel();
            vm.get('categoryRules').loadData(r.rules);
            var info = vm.get('categoryAdjust');
            // Update activeDay to match returned viewDate
            // vm.set('activeDay', info.get('viewDate'));
            // vm.set('recordingYear', info.recordingYear);
            // Set initial carry over option select field and carry over checkbox values
            // based on loaded carrymax value. See view model formulas for full behavior
            vm.set('carryOverSettings.enabled', info.get('carryOver'));
            if(info.get('carryMax') < 0){
                info.set('carryOverSettings.enabled', false);
                vm.set('carryOverSettings.option', 0);
            } else {
                if(info.get('carryMax') !== 0){
                    vm.set('carryOverSettings.option', 1);
                } else {
                    vm.set('carryOverSettings.option', 0);
                }
            }
            if(info.get('carryExpires' !== '1/1/1990')){
                vm.set('carryOverOptions.expires', true);
            } else {
                vm.set('carryOverOptions.expires', false);
            }
            console.info('adjust loaded');
        }).catch((e)=>{
            console.warn('error!',e);
        });
    },

    /**
     * Load category point in time info for current category and dates
     */
    loadPoint: function(category, date, showScheduled){
        var me = this,
            vm = me.getViewModel();
        this.api.accrual.categoryPointInTime(
            vm.get('targetEmployee'),
            category,
            date,
            showScheduled
        ).then((r) => {
            me.copyRecordToViewModel(
                r, 'categoryPoint'
            );
            console.info('category point updated');
        }).catch((err) => {
            console.info('Error loading category point in time', err);
        });
    },

    //==[Renderers]==
    /**
     * Renderer for ledger values; determines sign and color
     * @param {String} value Ledger value
     * @param {Object} field Display field
     */
    renderLedgerValue: function (value, field) {

        var actualValue = parseFloat(value),
            negative = (actualValue < 0),
            data = field.getData();
        // Base color, small, and force negative off data atributes on field
        var color = (data.color),
            small = data.small,
            forceNegative = data.negative;

        if(forceNegative){
            negative = true;
        }
        
        return [
            `<div class="employee-accrual-policy-ledger ${(small)? 'small' : ''}">`,
            `<div class="sign">${(negative) ? '-' : '+'}</div>`,
            `<div class="value ${(negative && color) ? 'negative' : ''}">${value}</div>`,
            '</div>'
        ].join('');
    },

    //==[Event Handlers]==

    onShowScheduledTimeChange: function(cmp, newValue, oldValue){
        var vm = this.getViewModel(),
            cat = vm.get('categoryId'),
            date = vm.get('categoryAdjust.viewDate');
        this.loadPoint(cat, date, newValue);
    },

    onCategorySelect: function (cmp) {
        var vm = this.getViewModel(),
            date = new Date(vm.get('categoryAdjust.viewDate').setYear(cmp.getValue())),
            scheduled = vm.get('showScheduled');
        if(cmp.getValue() == vm.get('categoryId')){
            return null;
        }
        this.loadAdjustInfo(cmp.getValue(), date, scheduled);
        this.loadPoint(cmp.getValue(), date, scheduled);
    },

    onRecordingYearSelect: function(cmp){
        var vm = this.getViewModel(),
            cat = vm.get('categoryId'),
            date = new Date(vm.get('categoryAdjust.viewDate').setYear(cmp.getValue())),
            scheduled = vm.get('showScheduled');
        // if(cmp.getValue() == vm.get('categoryAdjust.recordingYear')){
        //     return null;
        // }
        this.loadAdjustInfo(cat, date, scheduled);
        this.loadPoint(cat, date, scheduled);
    },

    onViewDateChange: function(cmp, newValue, oldValue){
        var vm = this.getViewModel(),
            cat = vm.get('categoryId'),
            date = newValue,
            scheduled = vm.get('showScheduled');
        if(newValue == vm.get('categoryAdjust.viewDate')){
            return null;
        }
        this.loadAdjustInfo(cat, date, scheduled);
        this.loadPoint(cat, date, scheduled);
    },

    onPrevYearButton: function(){
        console.info('prev');
    },
    onNextYearButton: function(){
        console.info('next');
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

    // == Other ==

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

    save: function(){
        var vm = this.getViewModel();
        console.info('save');
    }

});