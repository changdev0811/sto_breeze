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
     * Cascade checked value of tree grid item to any children
     * @param {Object} cell Checked cell that was modified
     * @param {Boolean} checked New value for checked
     * @param {Object} node Tree node being targetted 
     */
    onTreeGridChecked: function(cell, index, checked, node, eOpts){
        console.info('Cascading tree checked change');
        node.cascadeBy(function(child){
            child.set('checked', checked);
        });
    },

    /**
     * Handle change to checked state of 'Check All' toolbar item
     * shown over departments and employees trees. Applies checked value
     * to all items in current tree
     * @param {Object} elem Checkbox element; active tree is determined 
     *  relative to this
     * @param {boolean} checked Checked value of source checkbox
     */
    onTreeGridCheckAllChange: function(elem, checked, eOpts){
        console.info('Check all changed');
        elem.parent.parent.getActiveItem().getRootNode().cascadeBy(function(child){
            child.set('checked', checked);
        });
    }
});