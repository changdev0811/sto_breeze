/**
 * View Controller for Project Details reporting criteria view
 * @class ProjectDetailsController
 * @namespace Breeze.view.reporting.project.ProjectDetailsController
 * @alias controller.reporting.project.projectdetails
 */
Ext.define('Breeze.view.reporting.project.ProjectDetailsController', {
    extend: 'Breeze.controller.Reporting',
    alias: 'controller.reporting.project.projectdetails',

    stores: [
        // 'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        console.info('Project Details Report view inited');

        var me = this;
        var vm = me.getViewModel();

        // Create instance of report generation API class
        this.reportApi = Ext.create(
            'Breeze.api.reporting.project.ProjectDetails',
            {exceptionHandler: this.onReportException}
        );

        // Load User-Defined Categories tree store
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

        // Load projects for tree selector
        this.addStoreToViewModel(
            'Breeze.store.reporting.parameters.Projects',
            'projectsList',
            { load: true, createOpts: { showNoProject: true } }
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
                            captions = companyParams.get('Captions');
                        vm.set(
                            'captions.projectSinglar', 
                            captions.ProjectSinglar
                        );
                        vm.set(
                            'captions.projectPlural',
                            captions.ProjectPlural
                        );
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
                    }
                }}
            }
        );

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

        if(vmData.reportParams.inccats == ''){
            valid = false;
            messages.push('Please select a Category.')
        }

        // Validation check for Projects
        if(vmData.reportParams.projids == ''){
            valid = false;
            let caption = vm.get('captions.projectPlural');
            messages.push(`Please select one or more ${caption}.`);
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
            categoryList = this.lookup('categoryList'),
            projectList = this.lookup('projectList');

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
        
        // Categories list method gatherSelected returns array of all records selected
        var categoryRecords = categoryList.gatherSelected(),
            // get array of selected categories, using map to filter out the IDs
            /*  TODO: +++Note: the following needs to have 'return' in the 
                body-- might be missing elsewhere
            */
            selectedCategories = categoryRecords.map((r)=>{return r.getData().Category_Id});
        // assign list of category ids as single string, joined with ','
        vm.set(
            'reportParams.inccats',
            selectedCategories.join(',')
        );
        
        // Gather selected projects
        var projectRecords = projectList.gatherSelected(),
            selectedProjects = projectRecords.map((r)=>{return r.getData().ID});
        vm.set(
            'reportParams.projids',
            selectedProjects.join(',')
        );

        vm.set(
            'reportParams.dStartUtc',
            vm.get('reportParams.dStart').toUTCString()
        );
        vm.set(
            'reportParams.dEndUtc',
            vm.get('reportParams.dEnd').toUTCString()
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