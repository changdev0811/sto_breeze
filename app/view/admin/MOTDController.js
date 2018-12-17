/**
 * View Controller for MOTD Admin view
 * @class MOTDController
 * @namespace Breeze.view.admin.MOTDController
 * @alias controller.admin.motd
 */
Ext.define('Breeze.view.admin.MOTDController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.motd',



    /**
     * Called when the view is created
     */
    onInit: function (component) {

        //var vm = this.getViewModel(),
        //    companyConfig = Ext.getStore('CompanyConfig');
        //
        //this.api = Ext.create('Breeze.api.admin.PointCats');
        //
        //companyConfig.load({ 
        //    callback: function(records, op, success){
        //        if(success){
        //            // Set VM attributes indicating if duration
        //            //fields should be visible
        //            vm.set(
        //                'hideDuration',
        //                companyConfig.getAt(0).get('PointExpirationType') == 135
        //            );
        //        }
        //    }
        //});
        //
        //
        //// Load User-Defined Categories list store
        //this.addStoreToViewModel(
        //    'Breeze.store.category.List',
        //    'categoriesList',
        //    { load: true }
        //);
   
    },



    /**
     * Handle save button click event
     */
    onSaveButton: function(){
    //    var params = this.collectParams(),
    //        me = this;
    //        
    //    // Perform update call only if params isn't null
    //    if(params){
    //        // Make API call
    //        this.api.update(params).then((r)=>{
    //            // Show success toast
    //            Ext.toast({
    //                type: Ext.Toast.SUCCESS,
    //                message: r,
    //                timeout: 10000
    //            });
    //            me.loadPointCats(params.point_id);
    //        }).catch((e)=>{
    //            // Show error/warning toast
    //            Ext.toast({
    //                type: e.type,
    //                message: e.message,
    //                timeout: 10000
    //            });
    //        });
    //    }
    }
    


    
});