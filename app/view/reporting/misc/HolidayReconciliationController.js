/**
 * View Controller for Misc Holiday Reconciliation reporting criteria view
 * @class HolidayReconciliationController
 * @namespace Breeze.view.reporting.misc.HolidayReconciliationController
 * @alias controller.reporting.misc.holidayreconciliation
 */
Ext.define('Breeze.view.reporting.misc.HolidayReconciliationController', {
    extend: 'Breeze.controller.Reporting',
    alias: 'controller.reporting.misc.holidayreconciliation',

    stores: [
        'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        console.info('Misc Holiday Reconciliation Report view inited');

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