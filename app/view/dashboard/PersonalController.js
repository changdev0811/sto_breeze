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
                    //me.loadCalendar();
                } else {
                    // Unable to add to view model
                    console.warn('Failed to add categories to View Model')
                }
            }
        });
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
    }


});