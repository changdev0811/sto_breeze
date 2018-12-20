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

        this.addStoreToViewModel(
            'Breeze.store.company.SecurityRoleList',
            'roles',
            { load: true }
        );

        this.addStoreToViewModel(
            'Breeze.store.company.department.Employees',
            'employees',
            { load: false }
        );
   
    },

    //===[Event Handlers]===

    onDepartmentSelect: function(list, selectedRecord){
        var vm = this.getViewModel(),
            me = this;
        if(!Object.isUnvalued(selectedRecord)){
            
            this.copyRecordToViewModel(
                selectedRecord.getData(),
                'departmentData'
            );

            var dConfig = vm.get('departmentConfig');
            
            // Force proxy to update so params take effect
            dConfig.updateProxy(dConfig.getProxy());
            dConfig.setDepartmentId(selectedRecord.get('Id'));

            // Reload store
            dConfig.load({callback: function(s){
                me.copyRecordToViewModel(
                    dConfig.getAt(0).get('ConflictLimit'),
                    'conflictLimit'
                );
            }});

            var employees = vm.get('employees');

            employees.updateProxy(employees.getProxy());
            employees.setDepartmentId(selectedRecord.get('Id'));

            employees.load();
            
            // vm.get('supervisorList').load();

            this.addStoreToViewModel(
                'Breeze.store.company.department.Supervisors',
                'supervisors',
                { 
                    load: true, 
                    createOpts: { departmentId: vm.get('departmentData.Id')}
                }
            );
            
            // Update seleected department id value
            vm.set('selectedDepartmentId', selectedRecord.get('Id'));
        }
    },
    
});