/**
 * View Controller for Department Absence reporting criteria view
 * @class AbsenceController
 * @namespace Breeze.view.reporting.department.AbsenceController
 * @alias controller.reporting.department.absence
 */
Ext.define('Breeze.view.reporting.department.AbsenceController', {
    extend: 'Breeze.controller.Reporting',
    alias: 'controller.reporting.department.absence',

    stores: [
        'Breeze.store.tree.UserDefinedCategories'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        console.info('Department Absence Report view inited');

        var me = this;
        var vm = me.getViewModel();

        // Load User-Defined Categories list store
        this.addStoreToViewModel(
            'Breeze.store.category.CompactList',
            'categoriesList',
            { load: true }
        );
        
        // this.addStoreToViewModel(
        //     'Breeze.store.tree.UserDefinedCategories',
        //     'categoriesTree',
        //     { load: true }
        // );

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