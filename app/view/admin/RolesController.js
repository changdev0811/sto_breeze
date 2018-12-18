/**
 * View Controller for Roles Admin view
 * @class ProjectsController
 * @namespace Breeze.view.admin.RolesController
 * @alias controller.admin.roles
 */
Ext.define('Breeze.view.admin.RolesController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.roles',

    stores: [
        // 'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        // Load User-Defined Categories list store
        //this.addStoreToViewModel(
        //    'Breeze.store.category.List',
        //    'categoriesList',
        //    { load: true }
        //);


   
    },

  
    //===[Event Handlers]===

    /**
     * Called when record item is selected 
     */
    onRolesSelect: function(list, record){
        vm = this.getViewModel();
        vm.set('selectedRoleID', record.data.id);
    },

    /**
     * Called when store is change 
     */
    onRolesStoreChange: function(list){
        // if first started select 0 or item removed
        list.select( 0, true );
        // +++ if saved, keep current selection
        // +++ if new created, select it
    }

    
});