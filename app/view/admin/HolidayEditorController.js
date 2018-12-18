/**
 * View Controller for Holiday Editor Admin view
 * @class HolidayEditorController
 * @namespace Breeze.view.admin.HolidayEditorController
 * @alias controller.admin.holidayeditor
 */
Ext.define('Breeze.view.admin.HolidayEditorController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.holidayeditor',

    stores: [
        // 'Breeze.store.category.List'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {
           
    },

    loadHolidays: function(year){
        var me = this;

        this.addStoreToViewModel(
            'Breeze.store.record.Holidays',
            'holidays',
            { load: true, createOpts: { year: year } }
        );
    }

});