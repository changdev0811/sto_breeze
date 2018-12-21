/**
 * View Controller for UDC Admin view
 * @class UDCController
 * @namespace Breeze.view.admin.SAOptionsController
 * @alias controller.admin.saoptions
 */
Ext.define('Breeze.view.admin.SAOptionsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.saoptions',

    requires: [
        'Breeze.api.admin.SuperAdminOptions',
        'Breeze.mixin.CommonToolable'
    ],

    mixins: {
        commonToolable: 'Breeze.mixin.CommonToolable'
    },

    config: {
        injectTools: true
    },

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        var me = this,
            vm = this.getViewModel();

        this.api = Ext.create('Breeze.api.admin.SuperAdminOptions');

        this.addStoreToViewModel(
            'Breeze.store.option.TimeZones',
            'timeZones',
            { load: true }
        );

        this.addStoreToViewModel(
            'Breeze.store.company.Config',
            'companyConfig',
            {
                load: true,
                loadOpts: {
                    callback: function(records, op, success){
                        vm.set('configData', Ext.clone(records[0].getData()));
                    },
                    scope: me
                }
            }
        );

        var custId = Breeze.helper.Auth.getCookies().cust;

        this.loadStoreForViewModel(
            'Breeze.store.company.CustomerInfo',
            { 
                load: true,
                createOpts: { customerId: custId },
                loadOpts: {
                    callback: function(records, op, success){
                        if(success){
                            this.copyRecordToViewModel(
                                records[0].getData(),
                                'customerData'
                            );
                        }
                    },
                    scope: me
                }
            }
        ),

        this.api.timeKronStatus().then((r)=>{
            if(!r){
                // Remove Captions tab if timeKronStatus returns false
                var tabs = me.lookup('saTabs');
                tabs.remove(tabs.getComponent('captionsTab'));
            }
        })

    },

    onSave: function(){
        var me = this,
            vm = this.getViewModel();

        var configInfoParams = Ext.clone(vm.get('configData')),
            modified = false,
            fisc = vm.get('configData.FiscDate');

        
        configInfoParams.AccrualCapOption = this.lookup('capGroup').getValues().capOption;
        configInfoParams.ConflictOpt = this.lookup('conflictScope').getValues().conflictOpt;
        configInfoParams.LeaveApproveOpt = this.lookup('appOpt').getValues().leaveApprove;
        configInfoParams.LeaveApproveMode = this.lookup('appMode').getValues().leaveMode;
        configInfoParams.PointExpirationType = this.lookup('PointExpirationType').getValues().expirationType;
        console.info('Save');
        // Remove repo type prop carried over from raw API response
        delete configInfoParams.__type;

        this.api.update(
            configInfoParams,
            modified,
            fisc
        ).then((r)=>{
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 8000
            });
            this.onRefreshTool();
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 8000
            });
        });

    }





});