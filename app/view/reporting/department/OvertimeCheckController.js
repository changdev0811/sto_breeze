/**
 * View Controller for Department Overtime Check reporting criteria view
 * @class OvertimeCheckController
 * @namespace Breeze.view.reporting.department.OvertimeCheckController
 * @alias controller.reporting.department.overtimecheck
 */
Ext.define('Breeze.view.reporting.department.OvertimeCheckController', {
    extend: 'Breeze.controller.Reporting',
    alias: 'controller.reporting.department.overtimecheck',

    stores: [
        'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        console.info('Department Overtime Check Report view inited');

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
    },

    //===[Event Handlers]===

    /**
     * Handle mini calendar click event, adding newly selected
     * week to selected weeks store if not already present
     * 
     * @param {Object} comp Reference to mini calendar component
     */
    onWeekSelect: function(comp){
        // view model reference
        var vm = this.getViewModel(),
            // get selectedWeeks store
            selectedWeekStore = vm.get('selectedWeeks'),
            selection = comp.getSelectedWeek();
        
        // Add short date string attributes to record object for display purposes
        selection.startText = Breeze.helper.Time.shortDate(selection.start);
        
        // Check if a week with this range has already been selected
        if(selectedWeekStore.find('start', selection.start) == -1){
            console.info('Adding range');
            // Not already present, so add it
            // true indicates data should be appended to existing
            selectedWeekStore.loadData([selection], true);
            // sort
            selectedWeekStore.sort('start','ASC');
            // commit changes
            selectedWeekStore.commitChanges();
            // sort
            selectedWeekStore.sort('start','ASC');
            // // commit changes
            // selectedWeekStore.commitChanges();
        }
        
        console.info('Week Selected');
    },

    /**
     * Handle click event for 'x' tool button in Selected Week
     * grid. Removes row and removes associated record from store
     * 
     * @param {Object} grid Grid event originated from
     * @param {Object} info Additional event data
     */
    onWeekRemoveTool: function(grid, info){
        // View model reference
        var vm = this.getViewModel(),
            weekStore = vm.get('selectedWeeks'),
            recordToRemove = weekStore.findRecord('id', info.record.id);
        
        // If record was found, remove it
        if(recordToRemove !== null){
            weekStore.remove([recordToRemove]);
            // commit changes to store
            weekStore.commitChanges();
        }
    }

    
});