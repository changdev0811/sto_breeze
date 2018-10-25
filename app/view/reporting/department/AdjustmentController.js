/**
 * View Controller for Department Adjustment reporting criteria view
 * @class AdjustmentController
 * @namespace Breeze.view.reporting.department.AdjustmentController
 * @alias controller.reporting.department.adjustment
 */
Ext.define('Breeze.view.reporting.department.AdjustmentController', {
    extend: 'Breeze.controller.Reporting',
    alias: 'controller.reporting.department.adjustment',

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        console.info('Department Adjustment Report view inited');

        var me = this;
        var vm = me.getViewModel();

        // Load User-Defined Categories tree store
        this.addStoreToViewModel(
            'Breeze.store.category.List',
            'categoriesList',
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

        console.info('Leaving init');
    },

    /**
     * Handle categories list 'check all' changing value.
     * Use to toggle all checkboxes in list.
     * @param {Object} comp Component firing event
     * @param {Boolean} newVal New value for checkbox
     */
    onCategoriesCheckAllChange: function(comp, newVal){
        var categoryList = comp.getParent().getParent().getComponent('categories');
        categoryList.changeAllCheckboxes(newVal);
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