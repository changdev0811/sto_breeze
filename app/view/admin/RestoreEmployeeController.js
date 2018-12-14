/**
 * View Controller for RestoreEmployee Admin view
 * @class UDCController
 * @namespace Breeze.view.admin.RestoreEmployeeController
 * @alias controller.admin.restoreemployee
 */
Ext.define('Breeze.view.admin.RestoreEmployeeController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.restoreemployee',

    requires: [
        'Breeze.store.employees.Deleted'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        // Instantiate api class
        this.api = Ext.create('Breeze.api.admin.DeletedEmployee');


        // Load User-Defined Categories list store
        this.addStoreToViewModel(
            'Breeze.store.employees.Deleted',
            'Employees',
            { load: true }
        );

   



    },

  
    //===[Event Handlers]===

    onRestoreButtonTap: function(){

        var me = this,
            selectField = this.lookup('deletedEmployeesSelectField'),
            val = selectField.getValue();

        if(val){
            this.api.restore(val).then(function(r){
                // show succes
                Ext.toast({
                    type: Ext.Toast.SUCCESS,
                    message: r,
                    timeout: 10000
                });

                // refresh the view
                me.onRefreshTool();

            }).catch(function(e){
                // Failure, show error
                Ext.toast({
                    type: e.type,
                    message: e.message,
                    timeout: 10000
                });
            });
        }
    },

    onEmployeeSelect: function(cmp, rec){
        var dis = ( Object.isUnvalued(rec) ) ?  true : false; 
        this.lookup('restoreButton').setDisabled( dis ); 
    }


    
});