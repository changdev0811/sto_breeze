/**
 * View Controller for Holiday Editor Admin view
 * @class HolidayEditorController
 * @namespace Breeze.view.admin.HolidayEditorController
 * @alias controller.admin.holidayeditor
 */
Ext.define('Breeze.view.admin.HolidayEditorController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.holidayeditor',

    requires: [
        'Breeze.store.record.Holidays'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {
        var me = this,
            vm = me.getViewModel();
        
        this.loadHolidays(2018);
    },

    /**
     * Load holiday data for given year.
     * 
     * Marks first holiday as active after load completes
     * 
     * @param {(String|Number)} year Year to load data for
     */
    loadHolidays: function(year){
        var me = this;

        this.addStoreToViewModel(
            'Breeze.store.record.Holidays',
            'holidays',
            { 
                load: true, createOpts: { year: year },
                loadOpts: {
                    callback: function(records, op, success){
                        if(success && records.length > 0){
                            this.lookup('holidaysGrid').getSelectable()
                                .selectRange(0,0,false);
                        }
                    },
                    scope: me
                }
            }
        );
    },

    // ===[Event Handlers]===

    onHolidaySelect: function(grid, record, opts){
        var vm = this.getViewModel();

        vm.set('holidayData', Ext.clone(record.getData()));        
    }

});