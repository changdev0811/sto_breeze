/**
 * View Controller for Department Payroll Summary reporting criteria view
 * @class PayrollSummaryController
 * @namespace Breeze.view.reporting.department.PayrollSummaryController
 * @alias controller.reporting.department.payrollsummary
 */
Ext.define('Breeze.view.reporting.department.PayrollSummaryController', {
    extend: 'Breeze.controller.Reporting',
    alias: 'controller.reporting.department.payrollsummary',

    stores: [
        // 'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        console.info('Department Payroll Summary Report view inited');

        var me = this;
        var vm = me.getViewModel();

        // Load User-Defined Categories tree store
        // Create instance of report generation API class
        this.reportApi = Ext.create(
            'Breeze.api.reporting.department.PayrollSummary',
            {exceptionHandler: this.onReportException}
        );

        this.addStoreToViewModel(
            'Breeze.store.category.List',
            'categoriesList',
            { load: true }
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
        
        if(vmData.reportParams.incids == ''){
            valid = false;
            messages.push('Please select a Department or Employee.');
        }

        // Check 1 > weeks have been picked if week mode
        if(
            vmData.reportParams.date_type == 'weeks' &&
            vmData.reportParams.weeks_str == ''
        ){
            valid = false;
            messages.push('Please select one or more weeks.');
        }
        
        // Check dStart and dEnd picked if date_range mode
        if(vmData.reportParams.date_type == 'date_range'){
            // Cause fields in date_range tab to show red if not specified,
            // using built in validator
            this.lookup('dateTabs').getActiveItem()
                .getComponent('fields').getItems().items.forEach((i)=>{
                    i.validate();
                }
            );
            if(vmData.reportParams.dStart == null){
                valid = false;
                messages.push('Please select a \'From\' date.');
            }
            if(vmData.reportParams.dEnd == null){
                valid = false;
                messages.push('Please select a \'To\' date.');
            }
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
            employeeSelectTree = this.lookup('employeeSelectTabs').getActiveItem(),
            dateTabs = this.lookup('dateTabs');

        // Set myinclist to list of chosen employee IDs
        vm.set(
            'reportParams.incids', 
            this.checkedTreeItems(
                employeeSelectTree.getComponent('tree'), {
                    nodeType: (employeeSelectTree.getItemId() == 'departments')? 'emp' : null,
                    forceInt: false
                }
            ).join(',')
        );

        // Set selected week range or date range
        var dateType = dateTabs.getActiveItem().getData().type;
        // Update dateType parameter value
        vm.set('reportParams.date_type', dateType);
        // Update additional date params based on type selected
        switch(dateType){
            case 'weeks':
                // Update weeks
                var weeks = vm.get('selectedWeeks').getData().items;
                // Set dStart and dEnd to null
                vm.set('reportParams.dStart', null);
                vm.set('reportParams.dEnd', null);
                vm.set('reportParams.dStartUtc', null);
                vm.set('reportParams.dEndUtc', null);
                // Set week_str to list of selected weeks
                vm.set(
                    'reportParams.week_str',
                    weeks.map((w) => { 
                        return w.getData().startText; 
                    }).join(',')
                );
                // Set week_strUtc to list of selected weeks as UTC dates
                vm.set(
                    'reportParams.week_strUtc',
                    weeks.map((w) => {
                        // Use our custom toUTC method, specifying output as string
                        return w.getData().start.toUTC({ out: Date.UTC_OUT.STRING });
                    }).join('*')
                );
                break;
            case 'date_range':
                // Wrapped in try-catch so as not to fail if no date values are provided
                // Validation method will detect they are missing and prevent submission
                try {
                    // Update UTC ranges
                    vm.set(
                        'reportParams.dStartUtc', 
                        vm.get('reportParams.dStart').toUTC({
                            out: Date.UTC_OUT.STRING
                        })
                    );
                    vm.set(
                        'reportParams.dEndUtc', 
                        vm.get('reportParams.dEnd').toUTC({
                            out: Date.UTC_OUT.STRING
                        })
                    );

                    // clear week_str and week_strUtc
                    vm.set('reportParams.week_str', '');
                    vm.set('reportParams.week_strUtc', '');
                } catch (ex) {

                }
                break;
        }
        
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