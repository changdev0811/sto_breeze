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
        
    }
});