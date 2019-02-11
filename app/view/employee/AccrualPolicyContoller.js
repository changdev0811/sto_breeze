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
    }

});