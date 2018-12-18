/**
 * View Controller for MOTD Admin view
 * @class MOTDController
 * @namespace Breeze.view.admin.MOTDController
 * @alias controller.admin.motd
 */
Ext.define('Breeze.view.admin.MOTDController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.motd',

    requires: [
        'Breeze.api.admin.MOTD'
    ],


    /**
     * Called when the view is created
     */
    onInit: function (component) {
        this.api = Ext.create('Breeze.api.admin.MOTD');
        
        var vm = this.getViewModel();

        this.api.get().then((r)=>{
            vm.set('motd', r);
        }).catch((err)=>{
            // Shouldn't be reachable
        });
    },



    /**
     * Handle save button click event
     */
    onSaveButton: function(){
        var vm = this.getViewModel();
        this.api.save(vm.get('motd')).then((r)=>{
            Ext.toast({
                type: Ext.Toast.SUCCESS,
                message: 'Successfully updated Message of the Day.',
                timeout: 10000
            });
        }).catch((err)=>{
            Ext.toast({
                type: err.type,
                message: err.message,
                timeout: 10000
            });
        });
    }
    


    
});