/**
 * Controller for Employee FYI View
 */
Ext.define('Breeze.view.employee.FyiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee.fyi',

    requires: [
        'Breeze.api.Employee'
    ],

    onInit: function(component, eOpts){
        console.log("FYI Controller Init");
        this.apiClass = Ext.create('Breeze.api.Employee');
        var me = this;        

        // store id of employee to fetch info of
        this.empId = component.getData().employee;

        // Initialize date selector field
        this.lookup('viewDate').setValue(
            new Date()
        );

        this.displayData(me);
    },

    /**
     * Display FYI data after making API call, storing result in view model store
     * @param {Object} me Reference to controller context
     */
    displayData: function(me){
        var viewDate = this.lookup('viewDate').getValue();
        me.apiClass.fyi.getFYI(
            me.empId,
            viewDate.getFullYear(),
            Ext.util.Format.date(viewDate, 'm/d/Y'),
            true
        ).then(function(data){
            if(typeof data !== 'undefined'){
                console.log("Loaded FYI Test");
                var vm = me.getViewModel();
                vm.setStores({employee_fyi: data.store});
                vm.setData(data.data);
                me.lookup('fyiDataList').setStore(data.store);
            } else {
                console.log("Error loading FYI data");
            }
        }).catch(function(err){
            console.log("FYI Error", err);
        });
    }
});