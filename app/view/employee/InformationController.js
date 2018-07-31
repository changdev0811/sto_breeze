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
        this.apiClass = Ext.create('Breeze.api.Employee');
        var vm = this.getViewModel();
        var me = this;
        var comp = component;

        this.loadStores(function(pass){
            comp.lookup('departments').setStore(vm.getStore('departments'));
            me.loadEmployeeInfo(component);
        });
    },

    /**
     * Load needed stores
     * @param {Function} callback Callback function passed success bool
     */
    loadStores: function(callback){
        var vm = this.getViewModel();
        
        vm.setStores({
            departments: Ext.create('Breeze.store.company.DepartmentList')
        });

        vm.getStore('departments').load({callback: function(r,o,success){
            if(success){
                callback(true);
            }
        }});
    },

    loadEmployeeInfo: function(component){
        var me = this;
        var empId = component.getData().employee;
        this.apiClass.information.getEmployeeInfo(
            empId
        ).then(function(data){
            console.log("Loaded Employee Data Test");
            var vm = me.getViewModel();
            vm.set('info',data);
            // vm.setData(data.data);
        }).catch(function(err){
            console.log("Employee Info Error");
        });
    },

    displayFormData: function(c,vm){
        //c.queryById('firstName').setValue()
    }
});