/**
 * Controller for Employee AccrualPolicy View
 */
Ext.define('Breeze.view.employee.AccrualPolicyController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.employee.accrualpolicy',

    requires: [
        'Breeze.api.Employee',
        'Breeze.api.employee.AccrualPolicy',
        'Breeze.store.category.CompactList'
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
            model: 'Breeze.model.accrual.category.Rule',
            data: []
        }, 'categoryRules');

        console.info('Controller ready');
        this.loadAdjustInfo();
        this.loadPoint();
    },

    loadAdjustInfo: function(){
        var vm = this.getViewModel(),
            me = this;
        
        this.api.accrual.categoryAdjustInfo(
            vm.get('targetEmployee'),
            vm.get('categoryId'),
            vm.get('activeDay'),
            vm.get('showScheduled')
        ).then((r)=>{
            me.copyRecordToViewModel(r,'adjustInfo');//,'Breeze.model.accrual.category.Adjust');
            me.getViewModel().get('categoryRules').load(r.rules);
            console.info('adjust loaded');
        }).catch((e)=>{

        });
    },

    loadPoint: function(){
        var me = this,
            vm = me.getViewModel();
        this.api.accrual.categoryPointInTime(
            vm.get('targetEmployee'),
            vm.get('categoryId'),
            vm.get('activeDay'),
            vm.get('showScheduled')
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
        this.loadPoint();
    }

});