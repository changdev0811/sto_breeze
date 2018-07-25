/**
 * Controller for Employee FYI View
 */
Ext.define('Breeze.view.employee.FyiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee.fyi',

    requires: [
        'Breeze.service.Employee'
    ],

    init: function(component, eOpts){
        console.log("FYI Controller Init");
        var me = this;
        Breeze.service.Employee.getFYITest(
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