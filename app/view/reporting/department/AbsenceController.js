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
        // 'Breeze.store.tree.UserDefinedCategories'
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
     * provided.
     * 
     * If errors are found, display appropriate message(s) in error toast popup
     * 
     * @return {Boolean} True if validation succeeds, false otherwise
     */
    validateParameters: function(){
        // Make sure view model has latest selected employees and category
        this.refreshSelectedItems();
        var valid = true,
            messages = [],
            vm = this.getViewModel()
            vmData = vm.getData();
        
        if(vmData.reportParams.myinclist == ''){
            valid = false;
            messages.push('Please select a Department or Employee.');
        }

        if(vmData.reportParams.category_id == null){
            valid = false;
            messages.push('Please select a Category.')
        }

        if(!valid){
            // If validation failed, show error(s) in toast message
            Ext.toast({
                message: messages.join('<br>'),
                type: Ext.Toast.ERROR,
                timeout: 10000
            });
        }

        return valid;
    },

    /**
     * Refresh values in viewmodel for selected employees and category
     */
    refreshSelectedItems: function(){
        var vm = this.getViewModel(),
            employeeSelectTree = this.lookup('employeeSelectTabs').getActiveItem(),
            cateoryList = this.lookup('categoryList');
        
        // Set myinclist to list of chosen employee IDs
        vm.set(
            'reportParams.myinclist', 
            this.checkedTreeItems(
                employeeSelectTree.getComponent('tree'), {
                    nodeType: (employeeSelectTree.getItemId() == 'departments')? 'emp' : null,
                    forceInt: false
                }
            ).join(',')
        );
        
        var selectedCategory = this.lookup('categoryList').getSelection();

        if(selectedCategory !== null){
            // set category_id
            vm.set(
                'reportParams.category_id',
                selectedCategory.getData().Category_ID       
            );
        }
    },

    //===[Action Button Override Handlers]===

    /**
     * Handle 'Print PDF' action button
     * Can be overridden in view controllers extending Reporting
     */
    onPrintPDF: function(c, e, eOpts){
        console.info('Print PDF Clicked');
        this.validateParameters();
    },


    
});