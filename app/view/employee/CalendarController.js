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
        this.getViewModel().set('employeeId', comp.getData().employee);
        this.loadCategories();
        // this.loadCalendar();
        console.info('Loaded stuff', this.getViewModel().get('employeeId'));
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
        var vm = me.getViewModel();

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
        
        var calendar = this.lookup('calendarPanel').getView().activeView,
            start = calendar.getDisplayRange().start,
            end = calendar.getDisplayRange().end;
        var calStore = Ext.create('Breeze.store.calendar.Calendar',
            {
                // autoLoad: true,
                categories: vm.getStore('categories'),
                startDate: start.toLocaleString(),
                endDate: end.toLocaleString(),
                utcStartDate: start.toUTC({out: Date.UTC_OUT.STRING}),
                utcEndDate: end.toUTC({out: Date.UTC_OUT.STRING}),
                // endDate: (new Date()).toISOString(),
                lookup: vm.get('employeeId')
            }
        ).load({callback: function(r,o,success){
            console.info('Calendar load successful: ', success);
            vm.setStores({calendar: calStore});
        }});


    },

    // === [Event Handlers] ===

});