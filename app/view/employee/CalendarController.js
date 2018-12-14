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
        'Breeze.model.calendar.Event',
        'Ext.LoadMask'
    ],

    /**
     * Handles/fired on initialization of view
     */
    onInit: function(comp, eOpts){
        // var me = this;
        // var vm = this.getViewModel();
        console.info('Calendar controller initialized');
        this.getViewModel().set('employeeId', comp.getData().employee);
        this.companyApi = Ext.create('Breeze.api.Company');
        this.loadCategories();
        // this.loadCalendar();
        console.info('Loaded stuff', this.getViewModel().get('employeeId'));
    },


    loadCategories: function(){
        var me = this;
      
        me.companyApi.category.loadCompactListStore((success, id, store) => {
            if(!success){
                // Failed to load
                console.warn('Failed to load Categories store');
            } else {
                // Succeeded!
                var addedToModel = me.addLoadedStoreToViewModel(store, 'categories');
                if(addedToModel){
                    // Successfully added store to view model
                    console.info('Categories loaded successfully into View Model');
                    me.loadCalendar();
                } else {
                    // Unable to add to view model
                    console.warn('Failed to add categories to View Model')
                }
            }
        });
    },

    loadCalendar: function(){
        var me = this;
        var vm = me.getViewModel();

        console.info('Calendar Load Start');
        
        var calendarCmp = this.lookup('calendarPanel'),
            calendar = calendarCmp.getView().activeView,
            start = calendar.getDisplayRange().start,
            end = calendar.getDisplayRange().end;

        this.showLoadingMask(true);

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
            // console.info('Calendar load successful: ', success);
            
            // Add event listeners for detecting when all events finish updating
            calStore.getEventSource().on({
                datachanged: function(){
                    console.info('datachanged');
                    this.showLoadingMask(true);
                }, 
                refresh: function(){
                    console.info('refresh');
                    this.showLoadingMask(false);
                },
                // beforeupdate: function(){
                //     console.info('beforeupdate');
                //     this.showLoadingMask(true);
                // },
                // endupdate: function(){
                //     console.info('endupdate');
                //     this.showLoadingMask(true);
                // },
                scope: me
            });
            
            vm.setStores({calendar: calStore});
        }});
    },

    showLoadingMask: function(shown){
        var cmp = this.lookup('calendarPanel').getView().activeView;
        if(shown){
            cmp.setMasked({
                xtype: 'loadmask',
                message: 'Loading Events',
                messageCls: 'calendar-loading-mask'
            });
        } else {
            cmp.unmask();
        }
    },

    // === [Event Handlers] ===

    onPrevMonthButton: function(){
        console.info("Prev");
        this.showLoadingMask(true);
        this.lookup('calendarPanel').navigate(
            -1, Ext.Date.MONTH
        );
    }

    // onEventsLoadedForMonth: function(){
    //     this.lookup('calendarPanel').unmask();
    // }
});