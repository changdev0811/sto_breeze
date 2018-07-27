/**
 * Controller for Employee FYI View
 */
Ext.define('Breeze.view.employee.Fyi2Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee.fyi2',

    requires: [
        'Breeze.api.Employee'
    ],

    init: function(component, eOpts){
        console.log("FYI Controller Init");
        this.apiClass = Ext.create('Breeze.api.Employee');
        var me = this;
       this.apiClass.fyi.getFYI(
            '1',
            '1999',
            '07/25/2018',
            true
        ).then(function(data){
            console.log("Loaded FYI Test");
            var vm = me.getViewModel();
            vm.setStores({employee_fyi: data.store});
            vm.setData(data.data);
            me.lookup('fyiGrid').setStore(data.store);
        }).catch(function(err){
            console.log("FYI Error");
        });

    }
});