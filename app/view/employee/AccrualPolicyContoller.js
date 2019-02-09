/**
 * Controller for Employee AccrualPolicy View
 */
Ext.define('Breeze.view.employee.AccrualPolicyController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.employee.accrualpolicy',

    requires: [
        'Breeze.api.Employee'
    ],

    onInit: function(component, eOpts){
        this.apiClass = Ext.create('Breeze.api.Employee');
        var me = this;        

        // Initialize date selector field
        this.lookup('viewDate').setValue(
            new Date()
        );

        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.accrual.category.Rule',
            data: []
        }, 'categoryRules');
        
        console.info('Controller ready');
    },

    //==[Event Handlers]==

    /**
     * Handles view date change event, triggering refresh of displayed data
     * if value has changed
     */
    onViewDateChanged: function(cmp, newVal, oldVal, eOpts){
        if(newVal !== oldVal){
            this.displayData(this);
        }
    },

    /**
     * Handles show scheduled checkbox change event, triggering refresh of
     * displayed data if value has changed
     */
    onShowScheduledChanged: function(cmp, newVal, oldVal, eOpts){
        if(newVal !== oldVal){
            this.displayData(this);
        }
    },

    /**
     * Override handler for refresh tool button click
     * (overrides Breeze.controller.Base.onRefreshTool)
     */
    onRefreshTool: function(){
        console.info('Hit refresh');
        this.onInit(this.getView());
    },

    //==[Data Display]==

    /**
     * Display FYI data after making API call, storing result in view model store
     * @param {Object} me Reference to controller context
     */
    displayData: function(me){
        var me = me;
        var viewDate = me.lookup('viewDate').getValue();
        var showScheduled = me.lookup('showScheduled').getChecked();
        me.apiClass.fyi.getFYI(
            me.empId,
            viewDate.getFullYear(),
            Ext.util.Format.date(viewDate, 'm/d/Y'),
            showScheduled
        ).then(function(data){
            if(typeof data !== 'undefined'){
                console.log("Loaded FYI Test");
                var vm = me.getViewModel();
                vm.setStores({employee_fyi: data.store});
                vm.setData(data.data);
            } else {
                console.log("Error loading FYI data");
            }
        }).catch(function(err){
            console.log("FYI Error", err);
        });
    }
});