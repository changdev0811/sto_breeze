/**
 * Controller for Personal Dashboard
 *
 * @class PersonalController
 * @namespace Breeze.view.dashboard.PersonalController
 * @alias controller.view.dashboard.personal
 */
Ext.define('Breeze.view.dashboard.PersonalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard.personal',
    
    requires: [
        'Breeze.api.Employee'
    ],

    onInit: function(component, eOpts){
        this.apiClass = Ext.create('Breeze.api.Employee');
        console.info('Personal dashboard controller init');
        this.loadFyi();
        this.loadInfo();
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

    /*== Navigation button handlers ==*/
    onFyiNavClick: function(){
        this.redirectTo('personal/fyi');
    }

});