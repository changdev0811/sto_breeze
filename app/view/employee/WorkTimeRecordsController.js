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
        this.getViewModel().set('employeeId', component.getData().employee);
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

    /**
     * Load at a glance data from payroll
     */
    loadAtAGlance: function(){
        var me = this;
        var vm = me.getViewModel();
        var lookupId = me.getViewModel().get('employeeId');
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

    /**
     * Load work time record data store
     */
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

    /**
     * Load time sheet record store
     */
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

    onWeekChange: function(comp, x, eOpts){
        // console.group('Selected week change handler');
        // console.info('Selected week changed');
        // console.info('Week:', comp.getSelectedWeek());
        // console.groupEnd();

        var week = comp.getSelectedWeek();
        var vm = this.getViewModel();
        vm.set('startDate', week.start);
        vm.set('endDate', week.end);

        var days = comp.getSelectedDates();
        var names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        for(var i=0;i<days.length;i++){
            var prop = "sheetDayLabels.day".concat(i+1);
            var val = [names[i],'<br/>', days[i].getMonth() + 1, '/', days[i].getDate()].join('');
            vm.set(prop,val);
        }
    }

    // ===[Display Logic]===
});