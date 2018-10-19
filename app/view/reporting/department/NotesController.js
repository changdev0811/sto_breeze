/**
 * View Controller for Department Notes reporting criteria view
 * @class NotesController
 * @namespace Breeze.view.reporting.department.NotesController
 * @alias controller.reporting.department.notes
 */
Ext.define('Breeze.view.reporting.department.NotesController', {
    extend: 'Breeze.controller.Reporting',
    alias: 'controller.reporting.department.notes',

    stores: [
        'Breeze.store.tree.UserDefinedCategories'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        console.info('Department Notes Report view inited');

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