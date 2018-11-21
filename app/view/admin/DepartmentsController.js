/**
 * View Controller for Departments Admin view
 * @class DepartmentsController
 * @namespace Breeze.view.admin.DepartmentsController
 * @alias controller.admin.departments
 */
Ext.define('Breeze.view.admin.DepartmentsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.departments',

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        // Instantiate api class
        this.apiClass = Ext.create('Breeze.api.admin.Departments');

        // Load supervisor list
        this.addStoreToViewModel(
            'Breeze.store.company.SupervisorList',
            'supervisorList',
            { load: true }
        );

        // Load departments list
        this.addStoreToViewModel(
            'Breeze.store.company.DepartmentList',
            'departmentList',
            { load: true }
        );

        // Make department config store ready for loading
        this.addStoreToViewModel(
            'Breeze.store.company.config.Department',
            'departmentConfig',
            { load: false }
        );
   
    },

    //===[Event Handlers]===

    onDepartmentSelect: function(list, selectedRecord){
        var vm = this.getViewModel();
        if(!Object.isUnvalued(selectedRecord)){
            var dConfig = vm.get('departmentConfig');
            
            // Force proxy to update so params take effect
            dConfig.updateProxy(dConfig.getProxy());
            dConfig.setDepartmentId(selectedRecord.get('Id'));

            // Reload store
            dConfig.load({callback: function(s){
                vm.set('conflictLimit', dConfig.getAt(0).get('ConflictLimit'));
            }});

            // Update seleected department id value
            vm.set('selectedDepartmentId', selectedRecord.get('Id'));
        }
    }


    
});