/**
 * View Controller for Employee Timesheet reporting criteria view
 * @class TimesheetController
 * @namespace Breeze.view.reporting.employee.TimesheetController
 * @alias controller.reporting.employee.timesheet
 */
Ext.define('Breeze.view.reporting.employee.TimesheetController', {
    extend: 'Breeze.controller.Reporting',
    alias: 'controller.reporting.employee.timesheet',

    stores: [
        // 'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        console.info('Employee Timesheet Report view inited');

        var me = this;
        var vm = me.getViewModel();

        // Create instance of report generation API class
        this.reportApi = Ext.create(
            'Breeze.api.reporting.employee.Timesheet',
            {exceptionHandler: this.onReportException}
        );

        // Load employees for tree selector
        this.addStoreToViewModel(
            'Breeze.store.reporting.parameters.Employees',
            'employeesTree',
            { load: true }
        );

        // Load departments for tree selector
        this.addStoreToViewModel(
            'Breeze.store.reporting.parameters.Departments',
            'departmentsTree',
            { load: true }
        );

        // Load company config
        this.addStoreToViewModel(
            'Breeze.store.company.Config',
            'companyConfig',
            { 
                load: true,
                // callback to store Company configs
                loadOpts: { callback: (success) => {
                    if(success){
                        let config = vm.get('companyConfig'),
                            companyParams = config.getAt(0);
                        vm.set(
                            'reportParams.LogoInHeader', 
                            companyParams.get('RepLogo')
                        );
                        vm.set(
                            'reportParams.NameInHeader',
                            companyParams.get('RepComp')
                        );
                        vm.set(
                            'reportParams.RepSignature',
                            companyParams.get('RepSignature')
                        );
                        vm.set(
                            'reportParams.CompanyName',
                            companyParams.get('CompanyName')
                        );
                        vm.set(
                            'reportParams.RepLogoPath',
                            companyParams.get('RepLogoPath')
                        );
                    }
                }}
            }
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
        
        if(vmData.reportParams.incids == ''){
            valid = false;
            if(this.lookup('employeeSelectTabs').getActiveItem().getItemId()=='departments'){
                messages.push('Please select one or more Departments containing Employees.');
            } else {
                messages.push('Please select one or more Employees.');
            }
        }

        // checking if weeks are selected or not
        if(vmData.reportParams.weeks_str == '') {
            valid = false;
            messages.push('Please select one or more weeks');
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
    },

    /**
     * Refresh values in viewmodel for selected employees and category
     */
    refreshSelectedItems: function(){
        var vm = this.getViewModel(),
            employeeSelectTree = this.lookup('employeeSelectTabs').getActiveItem();

        // Set myinclist to list of chosen employee IDs
        vm.set(
            'reportParams.incids', 
            this.checkedTreeItems(
                employeeSelectTree.getComponent('tree'), {
                    nodeType: (employeeSelectTree.getItemId() == 'departments')? 'Emp' : null,
                    forceInt: false
                }
            ).join(',')
        );

        var weekStore = vm.get('selectedWeeks'),
            weeksStr = weekStore.data.items.map((r)=>r.data.start),
            weeksStrUtc = weekStore.data.items.map((r)=>new Date(r.data.start).toUTCString());

        vm.set(
            'reportParams.weeks_str',
            weeksStr.join(',')
        );

        vm.set(
            'reportParams.weeks_strUtc',
            weeksStrUtc.join('*')
        );
    },

    /**
     * Handle exception thrown by report store proxy
     * @param {*} proxy 
     * @param {*} response 
     * @param {*} op 
     * @param {*} eOpts 
     */
    onReportException: function(proxy, response, op, eOpts){
        console.warn('Exception thrown for report: ', response);
    },

    /**
     * Build report
     * @param {String} format Report format ('PDF','EXCEL', 'WORD')
     */
    buildReport: function(format){
        var me = this,
            params = this.getViewModel().getData().reportParams;
        me.reportApi.process(params, format).then(
            function(url){
                if(typeof url == "string"){
                    Ext.toast({
                        message: 'Report Successfully Generated',
                        type: Ext.Toast.INFO,
                        timeout: 10000
                    });
                    window.open(url, '_blank');
                } else {
                    if(url.Message){
                        Ext.toast({
                            message: 'Report Error: <br>' + url.Message,
                            type: Ext.Toast.ERROR,
                            timeout: 10000
                        });
                    }
                }
            }
        ).catch(function(err){
            console.warn('Error generating report', err);
        })
    },

    //===[Action Button Override Handlers]===

    /**
     * Overridden handler for 'Print PDF' action button
     */
    onPrintPDF: function(c, e, eOpts){
        console.info('Print PDF Clicked');
        if(this.validateParameters()){
            this.buildReport('PDF');
        }
    },

    /**
     * Overridden handler for 'Print Excel' action button
     */
    onPrintExcel: function(c, e, eOpts){
        console.info('Print Excel Clicked');
        if(this.validateParameters()){
            this.buildReport('EXCEL');
        }
    },

    /**
     * Overridden handler for 'Print Word' action button
     */
    onPrintWord: function(c, e, eOpts){
        console.info('Print Word Clicked');
        if(this.validateParameters()){
            this.buildReport('WORD');
        }
    },

    
});