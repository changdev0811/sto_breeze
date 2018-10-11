/**
 * View Controller for Employee Summary by Project reporting criteria view
 * @class EmployeeProjectController
 * @namespace Breeze.view.reporting.employee.EmployeeProjectController
 * @alias controller.reporting.employee.employeeproject
 */
Ext.define('Breeze.view.reporting.employee.EmployeeProjectController', {
    extend: 'Breeze.controller.Reporting',
    alias: 'controller.reporting.employee.employeeproject',

    stores: [
        'Breeze.store.tree.UserDefinedCategories'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        console.info('Employee Summary by Project Report view inited');

        var me = this;
        var vm = me.getViewModel();

        // Load User-Defined Categories tree store
        this.addStoreToViewModel(
            'Breeze.store.tree.UserDefinedCategories',
            'categoriesTree',
            { load: true }
        );

        // Load employees for tree selector
        this.addStoreToViewModel(
            'Breeze.store.tree.reporting.Employees',
            'employeesTree',
            { load: true }
        );

        // Load departments for tree selector
        this.addStoreToViewModel(
            'Breeze.store.tree.reporting.Departments',
            'departmentsTree',
            { load: true }
        );

        // Load company config
        this.addStoreToViewModel(
            'Breeze.store.company.Config',
            'companyConfig',
            { load: true }
        );

        console.info('Store: ', vm.getStore('udcTree'));
        console.info('Leaving init');
    },

    /**
     * Check parameter values and ensure all required fields have been
     * provided
     * @return {Boolean} True if validation succeeds, false otherwise
     * @todo TODO: Finish implementing
     */
    validateParameters: function(){
        return true;
    }

    
});