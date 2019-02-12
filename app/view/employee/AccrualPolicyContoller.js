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
        'Breeze.model.accrual.employee.Rule',
        'Breeze.store.accrual.RecordedYears'
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
        this.addStoreToViewModel(
            'Breeze.store.accrual.RecordedYears',
            'recordedYears', 
            {load: false, createOpts: { employeeId: vm.get('targetEmployee') }}
        );

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
        
        // // Initial API Calls
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
     * @param {Number} category Category ID
     * @param {Date} date Active date
     * @param {boolean} showScheduled Show scheduled time
     */
    loadAdjustInfo: function(category, date, showScheduled){
        var vm = this.getViewModel(),
            me = this;
        var category = Object.defVal(category, vm.get('categoryId')),
            date = Object.defVal(date, vm.get('categoryAdjust.viewDate')),
            showScheduled = Object.defVal(showScheduled, vm.get('showScheduled'));
        this.api.accrual.categoryAdjustInfo(
            vm.get('targetEmployee'),
            category,
            date,
            showScheduled
        ).then((r)=>{
            me.copyRecordToViewModel(r,'categoryAdjust','Breeze.model.accrual.employee.Adjust');
            
            var vm = me.getViewModel(),
                years = vm.get('recordedYears'),
                recYearField = this.lookup('recordingYearField');
            recYearField.suspendEvents(false);
            years.setCategoryId(vm.get('categoryId'));
            years.updateProxy();
            years.load({callback: function(){
                recYearField.resumeEvents(true);
            }});

            // vm.get('categoryRules').loadData(r.rules);
            this.processRules(r.rules);
            var info = vm.get('categoryAdjust');
            // Set initial carry over option select field and carry over checkbox values
            // based on loaded carrymax value. See view model formulas for full behavior
            vm.set('carryOverSettings.enabled', true);
            if(info.get('carryMax') < 0){
                vm.set('carryOverSettings.enabled', false);
                vm.set('carryOverSettings.option', 0);
            } else {
                if(info.get('carryMax') !== 0){
                    vm.set('carryOverSettings.option', 1);
                } else {
                    vm.set('carryOverSettings.option', 0);
                }
            }
            if(info.get('carryExpires' == '1/1/1990')){
                vm.set('carryOverSettings.expires', false);
            } else {
                vm.set('carryOverSettings.expires', true);
            }


            console.info('adjust loaded');
        }).catch((e)=>{
            console.warn('error!',e);
        });
    },

    /**
     * Load category point in time info for current category and dates
     * @param {Number} category Category ID
     * @param {Date} date Active date
     * @param {boolean} showScheduled Show scheduled time
     */
    loadPoint: function(category, date, showScheduled){
        var me = this,
            vm = me.getViewModel();
            category = Object.defVal(category, vm.get('categoryId')),
            date = Object.defVal(date, vm.get('categoryAdjust.viewDate')),
            showScheduled = Object.defVal(showScheduled, vm.get('showScheduled'));
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

    /**
     * Process rule records before loading into store,
     * adding calculated attribute3s
     * @param {Array} data 
     */
    processRules: function(data){
        var vm = this.getViewModel(),
            processed = [],
            ruleStore = vm.get('categoryRules'),
            map = {
                accformDay: 'ruleCount',
                accformInc: 'ruleAmount',
                accformPer: 'rulePer',
                accformUnit: 'ruleUnit',
                ruleName: 'ruleName',
                ruleStart: 'ruleStart',
                ruleEnd: 'ruleEnd',
                occurrences: 'occurrences',
                total: 'total',
                recordingMode: 'recording_mode',
                ruleModified: 'ruleModified'
            };
        for(var i = 0; i < data.length; i++){
            var rDat = data[i],
                msMonth = '1',
                msDay = '1';
            if(rDat.ruleCount.split('-').length > 1){
                [msMonth, msDay] = rDat.ruleCount.split('-');
            }

            var nDat = vm.mapFromRecord(map, rDat, true);
            nDat.msMonth = msMonth;
            nDat.msDay = msDay;
            nDat.accrualChanged = false;
            processed.push(nDat);
        }

        ruleStore.loadData(processed);
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
            date = new Date(vm.get('categoryAdjust.viewDate')),
            scheduled = vm.get('showScheduled');
        if(cmp.getValue() == vm.get('categoryId')){
            return null;
        }
        this.loadAdjustInfo(cmp.getValue(), date, scheduled);
        this.loadPoint(cmp.getValue(), date, scheduled);
    },

    onCategoryChange: function(cmp, newVal, oldVal){
        if(newVal !== oldVal){
            var vm = this.getViewModel(),
                date = new Date(vm.get('categoryAdjust.viewDate')),
                scheduled = vm.get('showScheduled');
            this.loadAdjustInfo(newVal, date ,scheduled)
            this.loadPoint(newVal, date ,scheduled)
        }
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

    // onPrevYearButton: function(){
    //     console.info('prev');
    // },
    // onNextYearButton: function(){
    //     console.info('next');
    // },

    /**
     * Handle rule add button click ('+')
     */
    onAccrualRuleAdd: function(){
        var me = this,
            vm = this.getViewModel(),
            rules = vm.get('categoryRules'),
            category = vm.get('categoryAdjust');
        
        // Check if name contains special characters
        var hasSpecialCharacters = function(s){
            return (s.indexOf('|') + s.indexOf(',') > -2);
        };
        /**
         * Check if name is in use
         * @param {String} n 
         * @return {Boolean}
         */
        var nameIsInUse = (n)=>{
            let nNorm = n.toLowerCase().trim(),
                cat = vm.get('categoryAdjust'),
                start = new Date(cat.get('active_yos_start')).toDateString(),
                end = new Date(cat.get('active_yos_end')).toDateString(),
                count = 0;
            for(var i=0;i<rules.getCount();i++){
                let rule = rules.getAt(i);
                if(
                    rule.get('ruleName').toLowerCase().trim() == nNorm &&
                    new Date(rule.get('ruleStart')).toDateString() == start &&
                    new Date(rule.get('ruleEnd')).toDateString() == end
                ){
                    count++;
                }
            }
            return (count > 0);
        };

        Ext.Msg.themedPrompt(
            'Add Accrual Rule',
            'Enter a name for the new Accrual Rule',
            (button, name) => {
                if(button == 'ok'){
                    if(hasSpecialCharacters(name)){
                        Ext.Msg.themedAlert(
                            'Unable to Add Rule',
                            'Rule name cannot contain the \'|\' or \',\' characters.'
                        );
                    } else if(nameIsInUse(name)){
                        Ext.Msg.themedAlert(
                            'Unable to Add Rule',
                            `${name} is already a rule of the active year of service for ${category.get('categoryName')}.`
                        );
                    } else {
                        rules.loadData([{
                            accformDay: 1,
                            accformInc: 0,
                            accformPer: 53,
                            accformUnit: 48,
                            ruleName: name.trim(),
                            ruleStart: category.get('active_yos_start'),
                            ruleEnd: category.get('active_yos_end'),
                            accrualChanged: false,
                            occurrences: -1,
                            total: 0,
                            msMonth: 0,
                            msDay: 0
                        }], true);
                        rules.commitChanges();
                        Ext.toast({
                            type: 'info',
                            message: 'Accrual Rule successfully added',
                            timeout: 'info'
                        });
                    }
                }
            }
        );
    },

    /**
     * Event handler for accrual rule delete icon ('x')
     * @param {*} grid Accrual rule grid
     * @param {*} info Record info
     */
    onAccrualRuleDelete: function(grid, info){
        var store = grid.getStore(),
            record = info.record,
            vm = this.getViewModel();
        
        var start = new Date(record.get('ruleStart')),
            end = new Date(record.get('ruleEnd')),
            activeDate = this.lookup('viewDateField').getValue();
        
        if(start <= activeDate && activeDate <= end){
            store.remove(record);

            Ext.toast({
                type: 'info',
                message: 'Accrual Rule successfully deleted',
                timeout: 'info'
            });
        } else {
            // TODO: What should happen here?
            console.info('date out of range');
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
     * Event handler for accrual rule editor
     * @param {*} comp 
     * @param {*} newVal 
     * @param {*} oldVal 
     */
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
     * Event handler for save button. Triggers appropiate save call based on settings
     */
    onSave: function(){
        if(this.getViewModel().get('categoryAdjust').get('isallowed')){
            this.saveFull();
        } else {
            this.saveNotAllowed();
        }
    },

    /**
     * Perform full save
     */
    saveFull: function(){
        var vm = this.getViewModel(),
            carryOver = vm.get('carryOverSettings'),
            category = vm.get('categoryAdjust');

        var calType = this.lookup('calendarType').getValues().calTypeRadio,
            activeDate = this.lookup('viewDateField').getValue();
        

        var params = {
            wait_date: Ext.Date.format(new Date(category.get('wait_date')), 'm/d/Y'),
            active_date: activeDate,
            accrue: category.get('allowAccrual'),
            cal_type: calType,
            carry_over_expires: '1/1/1900',
            monthly_specials: ''
        };

        var ruleParams = this.gatherAccrualRuleData(activeDate);

        if (category.get('allowAccrual')) {
            ruleParams = this.gatherAccrualRuleData(activeDate);
        }

        if (carryOver.enabled) {
            if (carryOver.option == 1) {
                params.carry_over = category.get('carryMax'); //vm.get('carryMax');
            } else {
                params.carry_over = 0.0;
            }

            if (carryOver.expires) {
                let expires = category.get('carryExpires');
                if (!expires || expires.toString().length == 0) {
                    params.carry_over_expires = '1/1/1900';
                } else {
                    params.carry_over_expires = Ext.Date.format(new Date(expires), 'm/d/Y');
                }
            }
        } else {
            params.carry_over = -1.0;
        }

        var me = this;

        this.api.accrual.saveCategoryAdjust(
            vm.get('targetEmployee'), vm.get('categoryId'), params, ruleParams
        ).then((r)=>{
            Ext.toast(r);
            me.loadAdjustInfo();
            me.loadPoint();
        }).catch((err)=>{
            Ext.toast(err);
            if(err.error){
                console.warn('Error saving category adjust: ', err.error);
            }
        });
    },

    /**
     * Perform limited save
     */
    saveNotAllowed: function(){
        var vm = this.getViewModel(),
            me = this;

        this.api.accrual.saveCategoryAdjustNotAllowed(
            vm.get('targetEmployee'), vm.get('categoryId'),  this.lookup('calendarType').getValues().calTypeRadio
        ).then((r)=>{
            Ext.toast(r);
            me.loadAdjustInfo();
            me.loadPoint();
        }).catch((err)=>{
            Ext.toast(err);
            if(err.error){
                console.warn('Error saving category adjust: ', err.error);
            }
        });
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

    gatherAccrualRuleData: function(activeDate){
        var vm = this.getViewModel(),
            rules = vm.get('categoryRules'),
            ruleCount = rules.getCount(),
            activeDate = new Date(activeDate);

        // Map object to be used by model's mapFromRecords method
        var propMap = {
            rule_names: 'ruleName',
            accform_incs: 'accformInc',
            accform_units: 'accformUnit',
            accform_pers: 'accformPer',
            accform_days: 'accformDay'
        };


        /**
         * Check if rule is in range
         * @param {Object} rule 
         * @param {Date} date 
         * @return {Boolean} true or false
         */
        var ruleInRange = function(rule, date){
            return (
                new Date(rule.get('ruleStart')) <= date &&
                date <= new Date(rule.get('ruleEnd'))
            );
        };

        var collectedRules = []
        
        var idx = 0, rec = rules.getAt(0);

        if(ruleCount > 0){
            while(
                new Date(rec.get('ruleStart')) > activeDate ||
                activeDate > new Date(rec.get('ruleEnd')) && idx < ruleCount
            ){
                idx++;
                rec = rules.getAt(idx);
            }
        }

        for(var i=idx; i<ruleCount; i++){
            let r = rules.getAt(i);
            if(ruleInRange(r, activeDate)){
                collectedRules.push(r);
            }
        }

        return vm.mapFromRecords(propMap, collectedRules);
    }
    
});