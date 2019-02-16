/**
 * View Controller for Misc Policy reporting criteria view
 * @class PolicyController
 * @namespace Breeze.view.reporting.misc.PolicyController
 * @alias controller.reporting.misc.policy
 */
Ext.define('Breeze.view.reporting.misc.PolicyController', {
    extend: 'Breeze.controller.Reporting',
    alias: 'controller.reporting.misc.policy',

    stores: [
        // 'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        console.info('Misc Policy Report view inited');

        var me = this;
        var vm = me.getViewModel();

        // Create instance of report generation API class
        this.reportApi = Ext.create(
            'Breeze.api.reporting.misc.Policy',
            {exceptionHandler: this.onReportException}
        );

        // Load Policies (TODO: Update once new api call is available)
        this.addStoreToViewModel(
            'Breeze.store.accrual.ScheduleList',
            'policiesList',
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
        
        // Check if 1 > policies was selected
        if(vmData.reportParams.incids == ''){
            valid = false;
            messages.push('Please select one or more Policies.');
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
            policyList = this.lookup('policyList');

        // Update accrual policy schedule ids from accrualPolicyList
        var scheduleRecords = policyList.gatherSelected(),
            selectedScheduleIds = scheduleRecords.map((r)=>{
                return r.getData().ID;
            }).join(',');
        vm.set('reportParams.incids', selectedScheduleIds);
        
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