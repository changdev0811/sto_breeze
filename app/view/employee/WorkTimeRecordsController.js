/**
 * WorkTime Records view Controller
 *
 * @class WorkTimeRecordsController
 * @alias Breeze.view.employee.WorkTimeRecordsController
 */
Ext.define('Breeze.view.employee.WorkTimeRecordsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee.worktimerecords',
    
    requires: [
        'Breeze.api.Employee'
    ],

    onInit: function(component, eOpts){
        this.api = Ext.create('Breeze.api.Employee');
        this.loadWorkTimeRecords();
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
    }

});