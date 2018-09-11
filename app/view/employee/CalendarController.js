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
        'Breeze.store.category.CompactList',
        'Breeze.model.calendar.Event'
    ],

    /**
     * Handles/fired on initialization of view
     */
    onInit: function(comp, eOpts){
        // var me = this;
        // var vm = this.getViewModel();
        console.info('Calendar controller initialized');
        this.loadCategories();
        // this.loadCalendar();
        console.info('Loaded stuff');
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
                        me.loadCalendar();
                    } else {
                        console.warn('Failed to load categories');
                    }
                }}
            }
        )
    },

    loadCalendar: function(){
        var me = this;
        var vm = this.getViewModel();

        // var calStore = Ext.create('Ext.calendar.store.Calendars',
        //     {
        //         autoLoad: true,
        //         eventStoreDefaults: {
        //             model: 'Breeze.model.calendar.Event',
        //             proxy: {
        //                 type: 'ajax',
        //                 url: 'resources/calendar/absences.json'
        //             }
        //         },
        //         data: [
        //             {
        //                 "id": 1,
        //                 "title": "Default"
        //             }
        //         ]
        //     }
        // );

        var calStore = Ext.create('Breeze.store.calendar.Calendar',
            {
                autoLoad: true,
                categories: vm.getStore('categories'),
                startDate: (new Date()).toISOString(),
                endDate: (new Date()).toISOString(),
                lookup: '5003'
            }
        );


        vm.setStores({calendar: calStore});


    },

    // === [Event Handlers] ===

    onNextMonth: function(c){
        this.lookup('calendarPanel').getView().nextMonth(1);
    }
});