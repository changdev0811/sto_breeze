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

        var me = this,
            vm = this.getViewModel(),
            companyConfig = Ext.getStore('CompanyConfig');


        companyConfig.load({ 
            callback: function(records, op, success){
                if(success){
                    // Set VM attributes indicating if duration
                    //fields should be visible
                    vm.set(
                        'hideDuration',
                        companyConfig.getAt(0).get('PointExpirationType') == 135
                    );
                }
            }
        });



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

    /**
    * Updates which items in UDC list are checked based on loaded
    * point cat information
    */
    syncCheckedCategories: function(){
        var me = this,
            selectedCats = me.getViewModel().get('pointCatCategories'),
            catList = this.lookup('categoryList'),
            cats = catList.getStore();

        // reset all categories
        catList.changeAllCheckboxes(false);

        var ids = selectedCats.query('checked',true).items.map((r)=>{
                return r.get('data');
            }),
            selectedRecords = cats.queryBy((r)=>{
                return ids.includes(r.get('Category_Id'));
            }).items;
        catList.getSelectable().select(selectedRecords,false,true);    
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

        me.addStoreToViewModel(
            'Breeze.store.point.CategoryList',
            'pointCatCategories',
            { 
                load:true, 
                createOpts: {
                    pointID:record.get('PointID')
                },
                loadOpts: {
                    callback:function(records, op, success){
                        if(success){
                            // Update which UDC are checked
                            this.syncCheckedCategories();
                        }
                    },
                    scope: me
 
                }
            }
        );

    }

    


    
});