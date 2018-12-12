/**
 * View Controller for Point Categories Admin view
 * @class PointCatsController
 * @namespace Breeze.view.admin.PointCatsController
 * @alias controller.admin.pointcats
 */
Ext.define('Breeze.view.admin.PointCatsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.pointcats',

    requires: [
        'Breeze.api.admin.PointCats'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        var me = this,
            vm = this.getViewModel(),
            companyConfig = Ext.getStore('CompanyConfig');
        
        this.api = Ext.create('Breeze.api.admin.PointCats');

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
    * Event handler for occurrence values From grid item change
    *
    * Preforms validation logic
    *
    * @param {Object} comp Selected Component
    * @param {Object} newValue New Value
    * @param {Object} oldValue Old Value
    * @param {Object} eOpts Event options
    */
    onOccurrenceFromChange:function(comp, newValue, oldValue, eOpts){
        var location = comp.getParent().getLocation(),
            record = location.cell.getRecord(),
            recordIndex = record.store.indexOf(record),
            toValue = record.get('occto'),
            isValid = true,
            message = '';

        if(toValue !== 0 && newValue > toValue){
            isValid = false;
            message = 'The occurrance from can\'t be after the occurrence to.';
        }else if( recordIndex > 0 ){
            var prevRecord = record.store.getAt(recordIndex - 1);
            if(newValue <= prevRecord.get('occfrom')){
                console.log("D");
                isValid = false;
                message = 'This interval can\'t completely overwrite the previous interval.';
            }
        }
        if(!isValid){
            Ext.toast({
                type: Ext.Toast.ERROR,
                message: message,
                timeout: 10000
            });
            comp.suspendEvent('change');
            comp.setValue(oldValue);
            comp.resumeEvent('change');
            return false;
        }

    },


    /**
    * Event handler for occurrence values Through grid item change
    *
    * Preforms validation logic
    *
    * @param {Object} comp Selected Component
    * @param {Object} newValue New Value
    * @param {Object} oldValue Old Value
    * @param {Object} eOpts Event options
    */
    onOccurrenceThroughChange:function(comp, newValue, oldValue, eOpts){
        var location = comp.getParent().getLocation(),
        record = location.cell.getRecord(),
        recordIndex = record.store.indexOf(record),
        lastIndex = record.store.getCount() - 1,
        isLast = (
            (record.store.getCount() - 1) == recordIndex
        ),
        fromValue = record.get('occfrom'),
        isValid = true,
        message = '';

        if( isLast ){
            if( newValue !== 0 ){
                isValid = false;
                message = 'Occurrence must be through 0 (infinity) for the last interval.';
            }
        }else if( newValue < fromValue ){
            isValid = false;
            message = 'The occurrance through year can\'t be before the occurrance from interval.';
        }else if( recordIndex < lastIndex - 1  ){
            if(newValue >= record.store.getAt(recordIndex + 1).get('occto')){
                isValid = false;
                message = 'This occurrance can\'t completely overwrite the next interval.';
            }
        }

        if( !isValid ){
            Ext.toast({
                type: Ext.Toast.ERROR,
                message: message,
                timeout: 10000
            });
            comp.suspendEvent('change');
            comp.setValue(oldValue);
            comp.resumeEvent('change');
            return false;
        }
    },


    /**
    * Fires before entering editor for grid
    * 
    * Prevents last 'through' column from being editable
    * 
    * @param {Object} location Current grid location
    */
    onOccurrenceValueBeforeEdit:function(location){
        if(location.column.getItemId() == "through"){
            if(location.record.store.getCount() - 1 <= location.recordIndex){
                return false;
            }
        }
    },

    /**
     * Fired on completion of occurrence value cell edit
     * 
     * Performs data tidying
     * 
     * @param {Object} location 
     */
    onOccurrenceValuePostEdit: function(location){
        var record = location.record,
            index = location.recordIndex,
            store = record.store,
            lastIndex = record.store.getCount() - 1;
        
        if(index > 0){
            /*
                Make sure previous record's to value is
                this record's from value - 1
            */
            store.getAt(index - 1).set(
                'occto', record.get('occfrom') - 1
            );
        }

        if(index < lastIndex){
            /*
                Make sure next record's from value is
                this record's to value + 1
            */
            store.getAt(index + 1).set(
                'occfrom', record.get('occto') + 1
            );
        }

        // enforce last row's 'to' being 0 (∞)
        store.getAt(lastIndex).set(
            'occto', 0
        );

        // Save changes
        store.commitChanges();
    },

    /**
     * @todo TODO: Implement onOccurrenceValueSelect
     */
    onOccurrenceValueSelect: function(location){
        this.lookup()
    },

    /**
     * Event handler for Occurrence Values 'add' button
     * Adds new row to grid, auto populating values and
     * adjusting values of previous row
     */
    onOccurrenceValueAdd: function(){
        var vm = this.getViewModel(),
            occurrences = vm.get('occurrenceValues'),
            // Current last occurrence record
            // currentLast = occurrences.getAt(
            //     occurrences.getCount() - 1
            // );
            currentLast = occurrences.last();
        
        // Create new occurrence record, prev from + 1, to ∞
        var newOcc = {
            occfrom: currentLast.get('occfrom') + 1,
            occto: 0,
            value: 0
        };

        // Update previous last item with to value of from + 1,
        // forcing store to commit after update        
        currentLast.set({
            occfrom: currentLast.get('occfrom'),
            occto: currentLast.get('occfrom') + 1,
            value: currentLast.get('value')
        }, {commit: true});

        // Add new occurrence record
        occurrences.add(newOcc);
        // Commit store record changes
        occurrences.commitChanges();
    },

    /**
     * Handle remove tool click event from Occurrence Values
     * grid item
     * @param {Object} grid 
     * @param {Object} info 
     */
    onOccurrenceValueRemove: function(grid, info){
        var record = info.record,
            store = record.store,
            rowCount = store.getCount(),
            index = store.indexOf(record);
        if(rowCount > 1){
            /*
                Previous record gets deleted items duration,
                unless it is the first
            */ 
            if(index == 0){
                store.getAt(1).set('occfrom', 1);
            } else {
                store.getAt(index - 1).set(
                    'occto', record.get('occto')
                );
            }
            // remove record
            store.remove([record]);
        } else {
            /*
                Reset only remaining row to defaults
            */
           record.set({
               occfrom: 1,
               occto: 0,
               value: 0
           });
        }

        store.commitChanges();
    },

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

        if(vm.get('occurrencesValues')){
            // remove occurance value records if they exist
            vm.get('occurrencesValues').removeAll();
        }

        // Occurrence is spelled wrong in the model, anything defined
        // only here is correctly spelled :)
        me.addLoadedStoreToViewModel({
            model:'Breeze.model.point.category.Occurence',
            data:Ext.clone(record.get('Occurences'))
        }, 'occurrenceValues');

        vm.set('selectedPointCat', record.getData());

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