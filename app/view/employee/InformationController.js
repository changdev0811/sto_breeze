/**
 * Controller for Employee Information View
 */
Ext.define('Breeze.view.employee.InformationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee.information',

    requires: [
        'Breeze.api.Employee'
    ],

    onInit: function(component, eOpts){
        console.log("Employee Info Controller Init");
    //     this.apiClass = Ext.create('Breeze.api.Employee');
    //     var me = this;
    //    this.apiClass.fyi.getFYI(
    //         '1',
    //         '1999',
    //         '07/25/2018',
    //         true
    //     ).then(function(data){
    //         console.log("Loaded FYI Test");
    //         var vm = me.getViewModel();
    //         vm.setStores({employee_fyi: data.store});
    //         vm.setData(data.data);
    //         me.lookup('fyiGrid').setStore(data.store);
    //     }).catch(function(err){
    //         console.log("FYI Error");
    //     });
        // this.lookup('securityTab').add(
        //     { 
        //         xtype: 'employee.information.security',
        //         userCls: 'employee-info-tab-form'
        //     }
        // );

    }
});