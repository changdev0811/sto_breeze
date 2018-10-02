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
        var weekSelect = this.lookup('weekSelector');
        weekSelect.setValue(weekSelect.getValue());
        this.loadEmployee();
        this.getViewModel().set('employeeId', component.getData().employee);
        this.loadProjects();
        this.loadWorkTimeRecords();
        this.loadAtAGlance();
        this.attachListenerToRecordGrid();

        console.info('WorkTimeRecords controller initialized');
        /*  Force week selector / mini calendar's selection to 
            be a full week on load */
    },
    
    // ===[Data Loading]===
    
    loadEmployee: function(){
        var me = this;
        var vm = me.getViewModel();
        Ext.create('Breeze.api.Employee').getHeaderInfo().then(function(r){
            vm.set('employeeName', r.fullname);
        }).catch(
            function(err){
                console.warn('Error loading employee header info', err);
            }
        );
    },

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
     * Load at a glance data from payroll. If unable to get employeeId from view model,
     * aborts by returning null
     */
    loadAtAGlance: function(){
        var me = this;
        var vm = me.getViewModel();
        var start = vm.get('startDate');
        var end = vm.get('endDate');
        var lookupId = me.getViewModel().get('employeeId');
        
        /* Check if lookupId is null. Used to prevent erroneous call to loadAtAGlance
        by week selector prior to availability of prerequisite data */
        if(lookupId == null){
            console.warn('loadAtAGlance Not ready to make getEmployeePayrollHours call; aborting');
            return null;
        }
        
        // TODO: Add live date data for ajax call in place of dummy dates
        this.api.workTimeRecords.getEmployeePayrollHours(
            lookupId,
            start.toUTCString(),
            end.toUTCString()
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
            start.toUTC({out: Date.UTC_OUT.STRING}),
            end.toUTC({out: Date.UTC_OUT.STRING}),
            'workTimeRecordStore'
        ).then(function(store){
            // me.getViewModel().setStores({workTimeRecords: store});
            // me.lookup('workTimeRecordGrid').setStore(me.getViewModel().getStore('workTimeRecords'));
            me.getViewModel().setStores({workTimeRecords: store});
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
            start.toUTCString(),
            end.toUTCString(),
            'workTimeSheetStore'
        ).then(function(store){
            // me.getViewModel().setStores({workTimeRecords: store});
            // me.lookup('workTimeRecordGrid').setStore(me.getViewModel().getStore('workTimeRecords'));
            // me.getViewModel().set('timeSheetRecords', store);
            me.getViewModel().setStores({timeSheetRecords: store});
            console.info('TimeSheet View loaded');
        }).catch(function(err){
            console.warn('Failed loading time sheet records: ', err);
        });
    },

    attachListenerToRecordGrid: function(){
        console.info('Attaching listener to WTRecord grid for location/map popup');
        var me = this;
        var grid = me.lookup('workTimeRecordGrid');
        grid.el.on({
            click: {
                fn: function(event, target, caller){
                    me.onRecordGridClick(event,target,caller);
                },
                options: {
                    scope: me,
                    preventDefault: false
                }
            }
        });
    },

    // ===[Event Handlers]===

    onRecordGridClick: function(eventObj, target, caller){
        var me = this;
        // console.group('Record grid click handler');
        // console.info('Target: ', target);
        // console.info('Event: ', eventObj);
        // console.groupEnd();
        if(target.dataset['action'] == 'map'){
            me.showPunchLocationPopup({
                kind: target.dataset['punch'],
                id: parseInt(target.dataset['record'])
            })
        }
    },

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

    onWorkRecordsUpdated: function(cmp, val, old, eOpts){
        console.info('work records changed');
        this.changeVisibilityOfAllPunches(this.getViewModel().get('showPunches'));
    },

    /**
     * Handles hiding/showing all punches when 'Show/Hide All Punches'
     * button is pressed.
     * 
     * Uses boolean stored in view model and alternate text labels
     * stored in button component's data attribute.
     * 
     * @param {Object} cmp Button component sending event
     */
    onShowPunches: function(cmp, event, eOpts){
        // update view model value
        var vm = this.getViewModel();
        var shown = !vm.get('showPunches');
        vm.set('showPunches', shown);
        // change text
        cmp.setText(
            cmp.getData()[(shown)? 'hideText' : 'showText']
        );
        this.changeVisibilityOfAllPunches(shown);
    },

    // ===[Display Logic]===

    /**
     * Make all punches visible or hidden based on parameter passed in
     * @param {Boolean} visible If true, all punches will be expanded; 
     *      else all will be collapsed
     */
    changeVisibilityOfAllPunches: function(visible){
        console.info('Punches visibility toggled!', visible);
        var grid = this.lookup('workTimeRecordGrid');
        for(var i=0;i<grid.getItemCount();i++){
            var row = grid.getItemAt(i);
            if(visible){
                row.expand();
            } else {
                row.collapse();
            }
        }
    },

    /**
     * Display punch location map popup dialog
     * @param {Object} params Parameter object defining kind ('in'/'out') and id
     *  of record
     */
    showPunchLocationPopup: function(params){
        var record = this.getViewModel().get('workTimeRecords').
            getById(params.id),
            view = this.getView(),
            dialog = this.dialog;
        
        if(!dialog){
            dialog = Ext.apply({ownerCmp: view}, view.dialog);
            this.dialog = dialog = Ext.create(dialog);
        }

        var pData = null,
            // get reference to map component in dialog
            mapCmp = dialog.getComponent('map');
        
        // Get appropriate punch data from record based on kind
        if(params.kind == 'out'){
            pData = record.get('Out_Punch');
        } else {
            pData = record.get('In_Punch');
        }

        // Center map at punch GPS location
        mapCmp.setMapCenter({
            latitude: pData.lat, longitude: pData.lng
        });

        // Add marker to map at punch GPS location
        mapCmp.setMarkers([{
            position: { lat: pData.lat, lng: pData.lng }
        }]);

        // Update description content data object attached to 
        // dialog's data model
        dialog.getViewModel().setData({
            date: pData.processed_time,
            lat: pData.lat,
            lng: pData.lng
        });

        // Show dialog
        dialog.show();
    }
});