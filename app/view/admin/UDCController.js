/**
 * View Controller for UDC Admin view
 * @class UDCController
 * @namespace Breeze.view.admin.UDCController
 * @alias controller.admin.udc
 */
Ext.define('Breeze.view.admin.UDCController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.udc',

    stores: [
        // 'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {
        
        // Load User-Defined Categories list store
        this.loadCats();


   
    },


    /**
     * Load cats, at select first or specific by ID
     * after load
     * @param {String} selectSpecific Category_Code value
     */
    loadCats: function(selectSpecific){
        var me = this,
            vm = this.getViewModel(),
            selectId = Object.defVal(selectSpecific, null);

        // Load Point Cats store
        this.addStoreToViewModel(
            'Breeze.store.category.List',
            'categoriesList',
            { load: true, loadOpts: {

                    // Callback fired when store load completes
                    callback:function(records, op, success){
                        // Mark first item in list selected
                        if(success){
                            var record = records[0];
                            if(selectId){
                                record = vm.get('categoriesList').queryRecord('Category_Code', selectId);
                            }
                            this.lookup('categoryList').getSelectable()
                                .setSelectedRecord(record);
                        }
                    },
                    scope: me
                } 
            }
        );
    },






    onCatSelect:function(list, record){
        var me = this,
            vm = me.getViewModel();
            vm.set('selectedCat', record.getData());
    },

    onColorSelect:function(obj, record, eOpts){
        // update model color
        var vm = this.getViewModel();
            vm.set('catCol', record.data.hex);
            // +++ need to update to current category's color instead of catCol +++

        // close button menu
        this.lookup('colorBtn').getMenu().hide();


    },

    
});