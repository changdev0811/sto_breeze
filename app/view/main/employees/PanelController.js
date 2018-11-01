/**
 * View Controller for Employees Panel
 * @class PanelController
 * @namespace Breeze.view.main.employees.PanelController
 * @extends Breeze.controller.Base
 * @alias main.employees.panel
 */
Ext.define('Breeze.view.main.employees.PanelController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.main.employees.panel',
    /**
     * Called when the view is created
     */
    onInit: function () {
        
        // Old tree api stores
        this.addStoreToViewModel(
            'Breeze.store.tree.employee.Departments',
            'departmentsTree',
            { load: true }
        );
        this.addStoreToViewModel(
            'Breeze.store.tree.employee.Employees',
            'employeesTree',
            { load: true }
        );

        // New list api stores
        this.addStoreToViewModel(
            'Breeze.store.employees.Departments',
            'departmentsList',
            { load: true }
        );

        this.addStoreToViewModel(
            'Breeze.store.employees.Employees',
            'employeesList',
            { load: true }
        );

        console.info('Employee Panel initialized');
    },

    //===[Event Handlers]===

    /**
     * Update search query parameter and reload employees
     * store
     * 
     * @param {Object} comp Search field component
     */
    doEmployeesSearch: function(comp){
        console.info('Employees search');
        var vm = this.getViewModel(),
            query = comp.getValue(),
            excludeTerminated = vm.get('excludeTerminated'),
            store = vm.get('employeesTree');
        
        var proxy = store.getProxy();
        // Force proxy to update
        store.updateProxy(proxy);

        // Update params
        store.setSearchString(query);
        store.setExcludeTerminated(excludeTerminated);

        // Reload store with updated params
        store.load();
    },

    /**
     * Update search query parameter and reload departments
     * store
     * 
     * @param {Object} comp Search field component
     */
    doDepartmentsSearch: function(comp){
        var vm = this.getViewModel(),
            query = comp.getValue(),
            excludeTerminated = vm.get('excludeTerminated'),
            store = vm.get('departmentsTree');
        
        // Force store proxy to update
        store.updateProxy(store.getProxy());

        // Update params
        store.setSearchString(query);
        store.setExcludeTerminated(excludeTerminated);

        // Reload store with updated params
        store.load();
    },

    /**
     * Handle employees tree selection change, toggling
     * whether 'remove' button is enabled
     * @param {Object} comp Tree component sending event
     */
    onEmployeesTreeSelect: function(comp){
        this.lookup('employeesEmployeeToolbar')
            .getComponent('remove').setDisabled(
                (comp.getSelectionCount() == 0)
        );
    },

    /**
     * Handle departments tree selection change, toggling
     * whether 'remove' button is enabled
     * @param {Object} comp Tree component sending event
     */
    onDepartmentsTreeSelect: function(comp){
        this.updateDepartmentsRemoveEmployeeEnabled(comp);
    },

    /**
     * Enable/disable department tab's remove employee button based
     * on whether an employee is selected in the tree
     * @param {Object} comp Departments tree component
     */
    updateDepartmentsRemoveEmployeeEnabled: function(comp){
        var selected = (comp.getSelectionCount() > 0),
            isEmployee = (
                comp.getSelectable().getSelectedRecord().get('type') == 'Emp'
            );
        this.lookup('employeesDepartmentToolbar')
            .getComponent('remove').setDisabled(!(
                selected && isEmployee
            )
        );
    }
});