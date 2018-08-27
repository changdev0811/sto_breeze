/**
 * Controller for employee Calendar view
 *
 * @class CalendarController
 * @namespace Breeze.view.employee.CalendarController
 * @alias controller.employee.calendar
 */
Ext.define('Breeze.view.employee.CalendarController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.employee.calendar',

    requires: [
        'Breeze.store.category.CompactList'
    ],

    /**
     * Handles/fired on initialization of view
     */
    onInit: function(comp, eOpts){
        // var me = this;
        // var vm = this.getViewModel();
        console.info('Calendar controller initialized');
        this.loadCategories();
        this.lookup('calendarPanel').setNextButton(this.lookup('nextMonthButton'));
    },


    loadCategories: function(){
        var me = this;
        this.addStoreToViewModel(
            'Breeze.store.category.CompactList',
            'categories',
            {
                load: true,
                loadOpts: { callback: function(success,a,b){
                    if(success){
                        console.info('Categories loaded successfully');
                    } else {
                        console.warn('Failed to load categories');
                    }
                }}
            }
        )
    },

    // === [Event Handlers] ===

    onNextMonth: function(c){
        this.lookup('calendarPanel').getView().nextMonth(1);
    }
});