/**
 * View Controller for UDC Admin view
 * @class UDCController
 * @namespace Breeze.view.admin.UDCController
 * @alias controller.admin.udc
 */
Ext.define('Breeze.view.admin.UDCController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.udc',

    requires: [
        'Breeze.api.admin.UDC'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {
        this.api = Ext.create('Breeze.api.admin.UDC');
        // Load User-Defined Categories list store
        this.loadCats();
    },


    /**
     * Load cats, at select first or specific by ID
     * after load
     * @param {String} selectSpecific Category_Code value, use 'new'
     *      to indicate the last loaded record should be selected
     */
    loadCats: function (selectSpecific) {
        var me = this,
            vm = this.getViewModel(),
            selectId = Object.defVal(selectSpecific, null),
            selectLast = (selectId === 'new');

        // Load Point Cats store
        this.addStoreToViewModel(
            'Breeze.store.category.List',
            'categoriesList',
            {
                load: true, loadOpts: {

                    // Callback fired when store load completes
                    callback: function (records, op, success) {
                        // Mark first item in list selected
                        if (success) {
                            var record = records[0];
                            if (selectId) {
                                if (selectLast) {
                                    record = records.getAt(records.length - 1);
                                } else {
                                    record = vm.get('categoriesList').queryRecords('Category_Id', selectId)[0];
                                }
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


    //===[Event Handlers]===

    onCatSelect: function (list, record) {
        this.copyRecordToViewModel(record.getData(), 'categoryData');
    },

    onColorSelect: function (obj, record, eOpts) {
        // update model color
        var vm = this.getViewModel();
        vm.set('categoryData.HexColor', record.data.hex);
        vm.set('categoryData.color_red', record.get('r'));
        vm.set('categoryData.color_green', record.get('g'));
        vm.set('categoryData.color_blue', record.get('b'));
        // +++ need to update to current category's color instead of catCol +++

        // close button menu
        this.lookup('colorBtn').getMenu().hide();
    },

    /**
     * Handle add button click event
     */
    onCategoryAdd: function () {
        var vm = this.getViewModel(),
            me = this;
        this.api.create().then((r) => {
            // Show success message
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 'info'
            });
            // Reload categories, focusing on last in list
            me.loadCats('new');
        }).catch((e) => {
            // Show error message
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 'error'
            });
        });
    },

    /**
     * Handle remove button click event
     */
    onCategoryRemove: function () {
        var vm = this.getViewModel(),
            record = vm.get('categoryData');
        this.api.isInUse(record.Category_Id).then((r) => {
            if (r.inUse) {
                let msg = ''
                if (r.tiedToPoint) {
                    msg = vm.get('messages.confirmDeleteTiedToPoint');
                } else {
                    msg = vm.get('messages.confirmDeleteInUse');
                }
                // Show confirmation dialog
                Ext.Msg.themedConfirm(
                    'Delete Category',
                    msg,
                    (btn) => {
                        // Perform deletion if user chooses 'yes'
                        if (btn == 'yes') {
                            doDelete();
                        }
                    }
                );
            } else {
                // Perform delete without confirmation
                doDelete();
            }
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 'error'
            });
        });

        // Perform deletion
        var doDelete = () => {
            this.api.delete(record.Category_Id).then((r) => {
                // Show success message
                Ext.toast({
                    type: r.type,
                    message: r.message,
                    timeout: 'info'
                });
                // Reload categories
                me.loadCats();
            }).catch((e) => {
                // Show error message
                Ext.toast({
                    type: r.type,
                    message: r.message,
                    timeout: 'error'
                });
            });
        };
    },

    /**
     * Handle save button click event
     */
    onSave: function () {
        var vm = this.getViewModel(),
            me = this,
            record = vm.get('categoryData'),
            catNameField = this.lookup('categoryNameField');

        catNameField.clearInvalid();

        var { Category_Id: catId, Category_Name: catName } = record;
        
        this.api.isNameInUse(catId, catName).then((r) => {
            // Name not in use, allow save
            doSave();
        }).catch((e)=>{
            // Name is in use, show field error and warning toast
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 'warn'
            });
            catNameField.markInvalid('Name is already in use');
        });

        // Function that performs save, called if name is not in use
        doSave = () => {
            var params = Ext.clone(record);
            
            me.api.update(params).then((r) => {
                // Show success message
                Ext.toast({
                    type: r.type,
                    message: r.message,
                    timeout: 'info'
                });
                // Reload categories
                me.loadCats(record.Category_Id);
            }).catch((e) => {
                // Show error message
                Ext.toast({
                    type: e.type,
                    message: e.message,
                    timeout: 'error'
                });
            });
        };
    }


});