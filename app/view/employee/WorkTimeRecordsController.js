/**
 * WorkTime Records view Controller
 *
 * @class WorkTimeRecordsController
 * @namespace Breeze.view.employee.WorkTimeRecordsController
 */
Ext.define('Breeze.view.employee.WorkTimeRecordsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee.worktimerecords',
    
    requires: [
        'Breeze.api.Employee',
        'Breeze.api.Company'
    ],

    onInit: function(component, eOpts){
        this.api = Ext.create('Breeze.api.Employee');
        this.companyApi = Ext.create('Breeze.api.Company');
        this.getViewModel().set('employee', component.getData().employee);
        this.loadProjects();
        this.loadWorkTimeRecords();
        this.loadAtAGlance();
    },
    
    // ===[Data Loading]===
    
    /**
     * Load flat projects list into view model
     */
    loadProjects: function(){
        var me = this;
        this.companyApi.project.flatList().then(
            function(store){
                me.getViewModel().setStores({projects: store});
                me.loadTimeSheetRecords();
            }
        ).catch(function(e){
            console.warn('Failed to load projects list');
        })
    },

    loadAtAGlance: function(){
        var me = this;
        var vm = me.getViewModel();
        var lookupId = me.getViewModel().get('employee');
        // TODO: Add live date data for ajax call in place of dummy dates
        this.api.workTimeRecords.getEmployeePayrollHours(
            lookupId,
            '2018-07-01T00:00:00',
            '2018-07-07T00:00:00'
        ).then(function(data){
           vm.set('atAGlance.regular', data.regular);
           vm.set('atAGlance.ot1',data.ot1);
           vm.set('atAGlance.ot2',data.ot2);
           vm.set('atAGlance.ot3',data.ot3);
           vm.set('atAGlance.ot4',data.ot4);
        }).catch(function(err){
            console.warn('Error getting employee payroll information: ', err);
        });
    },

    loadWorkTimeRecords: function(){
        var me = this;
        // TODO: Add live date data for ajax call in place of dummy dates
        this.api.workTimeRecords.getWorkTimeRecordsForRange(
            this.api.auth.getCookies().emp,
            '2018-07-01T00:00:00',
            '2018-07-07T00:00:00',
            'workTimeRecordStore'
        ).then(function(store){
            // me.getViewModel().setStores({workTimeRecords: store});
            // me.lookup('workTimeRecordGrid').setStore(me.getViewModel().getStore('workTimeRecords'));
            me.getViewModel().setStores({workTimeRecords: store});
            me.getViewModel().set('employeeName', store.getAt(0).get('Employee_Name'));
            console.info('WorkTimeRecord loaded');
        });
    },

    loadTimeSheetRecords: function(){
        var me = this;
        // TODO: Add live date data for ajax call in place of dummy dates
        this.api.workTimeRecords.getTimeSheetForRange(
            this.api.auth.getCookies().emp,
            '2018-07-01T00:00:00',
            '2018-07-07T00:00:00',
            'workTimeSheetStore'
        ).then(function(store){
            // me.getViewModel().setStores({workTimeRecords: store});
            // me.lookup('workTimeRecordGrid').setStore(me.getViewModel().getStore('workTimeRecords'));
            // me.getViewModel().set('timeSheetRecords', store);
            me.getViewModel().setStores({timeSheetRecords: store});
            console.info('TimeSheet View loaded');
        });
    },

    // ===[Event Handlers]===

    // ===[Display Logic]===
});