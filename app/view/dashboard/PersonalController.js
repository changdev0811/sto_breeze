/**
 * Controller for Personal Dashboard
 *
 * @class PersonalController
 * @namespace Breeze.view.dashboard.PersonalController
 * @alias controller.view.dashboard.personal
 */
Ext.define('Breeze.view.dashboard.PersonalController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.dashboard.personal',
    
    requires: [
        'Breeze.api.Employee',
    ],

    onInit: function(comp, eOpts){
        this.apiClass = Ext.create('Breeze.api.Employee');
        console.info('Personal dashboard controller init');
        this.loadFyi();
        this.loadInfo();
        //
        var me = this;
        this.lookup('infoDash').getHeader().el.on('click', function(e){
            me.onInfoNavClick(e);
        });
        this.lookup('calDash').getHeader().el.on('click', function(e){
            me.onCalendarNavClick(e);
        });
        this.lookup('fyiDash').getHeader().el.on('click', function(e){
            me.onFyiNavClick(e);
        });
        this.lookup('motdDash').getHeader().el.on('click', function(e){
            me.onMOTDNavClick(e);
        });

        // Load MOTD
        this.motdApi = Ext.create('Breeze.api.admin.MOTD');
        var vm = this.getViewModel();
        this.motdApi.get().then((r)=>{

            vm.set('motd', r);
            let hide = (r == null || r == "" ) ? true : false;
            vm.set('hideMotd', hide);

        }).catch((err)=>{
            // Shouldn't be reachable
        });  


        //        
        console.info('Calendar controller initialized');
        this.getViewModel().set('employeeId', comp.getData().employee);
        this.companyApi = Ext.create('Breeze.api.Company');
        this.loadCategories();

    },

    loadFyi: function(){
        var viewDate = new Date();
        var vm = this.getViewModel();
        var empId = this.apiClass.auth.getCookies().emp;
        this.apiClass.fyi.getFYI(
            empId,
            viewDate.getFullYear(),
            Ext.util.Format.date(viewDate, 'm/d/Y'),
            false // show scheduled
        ).then(function(data){
            vm.setupStore(data.store, 'fyi');
        }).catch(function(err){
            console.warn('Error loading FYI data for dashboard', err);
        });
    },

    loadInfo: function(){
        var vm = this.getViewModel();
        this.apiClass.information.getEmployeeInfo().then(
            function(data){
                vm.set('employeeInfo', data.employee);
            }
        ).catch(function(err){
            console.warn('Error getting employee info for dashboard', err);
        });
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
    },


    /*== Navigation button handlers ==*/
    onFyiNavClick: function(){
        this.redirectTo('personal/fyi');
    },
    
    onCalendarNavClick: function(){
        this.redirectTo('personal/calendar');
    },

    onInfoNavClick: function(){
        this.redirectTo('personal/info');
    },

    onMOTDNavClick: function(){
        var vm = this.getViewModel();
        console.info("[onNotesButtonTap]");
        //notesDialog
        var view = this.getView(),
            dialog = null;
            dialog = this.lookup('MOTDDialog');

        if (!dialog) {
            dialog = Ext.apply({ ownerCmp: view }, view.dialog);
            dialog = Ext.create(dialog);
        }
        dialog.show();
    },
    
    onCloseMOTDDialog: function(ref, e, eOpts){
        //dialog.hide();
        ref.getParent().getParent().hide();
    },


});