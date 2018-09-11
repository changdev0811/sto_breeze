/**
 * WorkTime Records view Controller
 *
 * @class WorkTimeRecordsController
 * @namespace Breeze.view.employee.WorkTimeRecordsController
 */
Ext.define('Breeze.view.employee.WorkTimeRecordsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.employee.worktimerecords',
    
    requires: [
        'Breeze.api.Employee',
        'Breeze.api.Company'
    ],

    /**
     * Initialize component handler
     */
    onInit: function(component, eOpts){
        this.api = Ext.create('Breeze.api.Employee');
        this.companyApi = Ext.create('Breeze.api.Company');
        weekSelect.setValue(weekSelect.getValue());
        this.getViewModel().set('employeeId', component.getData().employee);
        this.loadProjects();
        this.loadWorkTimeRecords();
        this.loadAtAGlance();

        var weekSelect = this.lookup('weekSelector');
        /*  Force week selector / mini calendar's selection to 
            be a full week on load */

        
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
        var start = vm.get('startDate');
        var end = vm.get('endDate');
        var lookupId = me.getViewModel().get('employeeId');
        // TODO: Add live date data for ajax call in place of dummy dates
        this.api.workTimeRecords.getEmployeePayrollHours(
            lookupId,
            start.toISOString(),
            end.toISOString()
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
        var vm = me.getViewModel();
        var start = vm.get('startDate');
        var end = vm.get('endDate');
        // TODO: Add live date data for ajax call in place of dummy dates
        this.api.workTimeRecords.getWorkTimeRecordsForRange(
            this.api.auth.getCookies().emp,
             // '2018-07-01T00:00:00',
            // '2018-07-07T00:00:00',
            start.toISOString(),
            end.toISOString(),
            'workTimeRecordStore'
        ).then(function(store){
            // me.getViewModel().setStores({workTimeRecords: store});
            // me.lookup('workTimeRecordGrid').setStore(me.getViewModel().getStore('workTimeRecords'));
            me.getViewModel().setStores({workTimeRecords: store});
            me.getViewModel().set('employeeName', store.getAt(0).get('Employee_Name'));
            console.info('WorkTimeRecord loaded');
        }).catch(function(err){
            console.warn('Failed loading work time records: ', err);
        });
    },

    /**
     * Load time sheet record store
     */
    loadTimeSheetRecords: function(){
        var me = this;
        var vm = me.getViewModel();
        var start = vm.get('startDate');
        var end = vm.get('endDate');
        // TODO: Add live date data for ajax call in place of dummy dates
        this.api.workTimeRecords.getTimeSheetForRange(
            this.api.auth.getCookies().emp,
            // '2018-07-01T00:00:00',
            // '2018-07-07T00:00:00',
            start.toISOString(),
            end.toISOString(),
            'workTimeSheetStore'
        ).then(function(store){
            // me.getViewModel().setStores({workTimeRecords: store});
            // me.lookup('workTimeRecordGrid').setStore(me.getViewModel().getStore('workTimeRecords'));
            // me.getViewModel().set('timeSheetRecords', store);
            me.getViewModel().setStores({timeSheetRecords: store});
            console.info('TimeSheet View loaded');
            /* TODO: Determine why the record punch location hook call
                is only working when made after timesheet records are loaded,
                instead of after work time records */
            // attach event listeners for punch location map popups
            me.hookRecordPunchLocations();
        }).catch(function(err){
            console.warn('Failed loading time sheet records: ', err);
        });
    },

    /**
     * Finds all location icons in punches and attaches event listeners
     * to them that cause the map popup dialog to show when clicked
     */
    hookRecordPunchLocations: function(){
        console.info('Hooking record punch locations!');
        // this.lookup('workTimeRecordGrid').el.query('a[data-action="location-out"]');
        var anchors = this.lookup('workTimeRecordGrid').el.query('[data-action="map"]', false);
        var me = this;
        anchors.forEach(function(anchor){
            // console.info('Hooking event to anchor ', anchor);
            anchor.on({
                click: function(e, node){
                    // console.info('Was clicked!');
                    me.showLocationPopup(node);
                }
            })
        })
    },

    // ===[Event Handlers]===

    /**
     * Handles event triggered by changing selected week in mini calendar
     */
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
        this.loadWorkTimeRecords();
        this.loadTimeSheetRecords();
        this.loadAtAGlance();
    },

    /**
     * Hides map dialog when X tool is clicked
     */
    onCloseDialog: function(dialog, e, eOpts){
        dialog.hide();
    },

    /**
     * Handle state change of WTR 'show punches' checkbox
     */
    onShowPunches: function(cmp, e, eOpts){
        console.info('Show punches checkbox toggled!');
        var grid = this.lookup('workTimeRecordGrid');
        for(var i=0;i<grid.getItemCount();i++){
            var row = grid.getItemAt(i);
            row.expand();
        }
    },

    // ===[Display Logic]===

    showLocationPopup: function(node){
        // console.info('Show location popup event handled!');

        var kind = node.getAttribute('data-punch');
        var recordId = parseInt(node.getAttribute('data-record'));

        var record = this.getViewModel().get('workTimeRecords').getById(recordId);

        var view = this.getView(),
            dialog = this.dialog;

        if (!dialog) {
            dialog = Ext.apply({ ownerCmp: view }, view.dialog);
            this.dialog = dialog = Ext.create(dialog);
        }

        var punchData = null;
        if(kind == 'out'){
            punchData = record.get('Out_Punch');
        } else {
            punchData = record.get('In_Punch');
        }

        console.info('Setting map:', punchData.lat, punchData.lng);
        // Apply coordinates to map component
        dialog.getComponent('map').setMapCenter({
            latitude: punchData.lat, longitude: punchData.lng
        });

        // Add GPS location marker
        dialog.getComponent('map').setMarkers([{
            position: {lat: punchData.lat, lng: punchData.lng}
        }]);

        // Apply display info to dialog's data object
        dialog.getViewModel().setData({
            date: punchData.processed_time,
            lat: punchData.lat,
            lng: punchData.lng
        });

        dialog.show();
    },
});