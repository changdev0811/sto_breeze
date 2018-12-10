/**
 * View Controller for Point Categories Admin view
 * @class PointCatsController
 * @namespace Breeze.view.admin.PointCatsController
 * @alias controller.admin.pointcats
 */
Ext.define('Breeze.view.admin.PointCatsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.pointcats',

    stores: [
        // 'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        var me = this;

        // Load Point Cats store
        this.addStoreToViewModel(
            'Breeze.store.point.ListApi',
            'pointCats',
            { load: true, loadOpts: {

                    // Callback fired when store load completes
                    callback:function(records, op, success){
                        // Mark first item in list selected
                        if(success){
                            this.lookup('pointCatsList').getSelectable().setSelectedRecord(records[0]);
                        }
                    },
                    scope: me
                } 
            }
        );



        // Load User-Defined Categories list store
        this.addStoreToViewModel(
            'Breeze.store.category.List',
            'categoriesList',
            { load: true }
        );







   
    },

    // === [Event Handlers] ===
    /**
    *
    * Updates selected point cat record and loads associated 
    • UDC items
    * 
    * @param {object} list Source list component
    * @param {object} record Selected record
    */
    onPointCatSelect:function(list, record){

        var me = this,
            vm = me.getViewModel();

        vm.set('selectedPointID', record.get('PointID'));
        me.addLoadedStoreToViewModel({
            model:'Breeze.model.point.category.Occurence',
            data:record.get('Occurences')
        }, 'occurenceValues');
    }

    


    
});