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
        this.loadProjects();
        this.loadWorkTimeRecords();
        this.loadTimeSheetRecords();
    },
    

    /**
     * Load flat projects list into view model
     */
    loadProjects: function(){
        var me = this;
        this.companyApi.project.flatList().then(
            function(store){
                me.getViewModel().setStores({projects: store});
            }
        ).catch(function(e){
            console.warn('Failed to load projects list');
        })
    },

    loadWorkTimeRecords: function(){
        var me = this;
        this.api.workTimeRecords.getWorkTimeRecordsForRange(
            this.api.auth.getCookies().emp,
            '2018-07-01T00:00:00',
            '2018-07-07T00:00:00',
            'workTimeRecordStore'
        ).then(function(store){
            // me.getViewModel().setStores({workTimeRecords: store});
            // me.lookup('workTimeRecordGrid').setStore(me.getViewModel().getStore('workTimeRecords'));
            me.getViewModel().set('workTimeRecords', store);
            console.info('WorkTimeRecord loaded');
        });
    },

    loadTimeSheetRecords: function(){
        var me = this;
        this.api.workTimeRecords.getTimeSheetForRange(
            this.api.auth.getCookies().emp,
            '2018-07-01T00:00:00',
            '2018-07-07T00:00:00',
            'workTimeSheetStore'
        ).then(function(store){
            // me.getViewModel().setStores({workTimeRecords: store});
            // me.lookup('workTimeRecordGrid').setStore(me.getViewModel().getStore('workTimeRecords'));
            me.getViewModel().set('timeSheetRecords', store);
            // me.getViewModel().setStores({timeSheetRecords: store});
            console.info('TimeSheet View loaded');
        });
    }

});