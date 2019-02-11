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

    mixins: {
        dialogCancelable: 'Breeze.mixin.DialogCancelable'
    },
    /**
     * Initialize component handler
     */
    onInit: function(component, eOpts){
        console.log("final checking with STI", STI);
        this.api = Ext.create('Breeze.api.Employee');
        this.companyApi = Ext.create('Breeze.api.Company');
        this.punchApi = Ext.create('Breeze.api.Punch');
        var weekSelect = this.lookup('weekSelector');
        weekSelect.setValue(weekSelect.getValue());

        var vm = this.getViewModel();

        if(typeof component.getData().employee !== 'undefined'){
            vm.set('employeeId', component.getData().employee);
        } else {
            vm.set('employeeId', this.api.auth.getCookies().emp);
        }

        // if(component.getData().navViewModel){
        //     // Make view model inherit from main nav view model
        //     vm.setParent(component.getData().navViewModel);
        // }

        // Load security rights
        this.addStoreToViewModel(
            'Breeze.store.employee.SecRights',
            'secRights',
            {
                load: true,
                createOpts: { employeeId: vm.get('employeeId') }
            }
        );

        this.loadEmployee();
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
        this.api.getHeaderInfo(vm.get('employeeId')).then(function(r){
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
        // var me = this;
        // this.companyApi.project.flatList().then(
        //     function(store){
        //         me.getViewModel().setStores({projects: store});
        //         me.loadTimeSheetRecords();
        //     }
        // ).catch(function(e){
        //     console.warn('Failed to load projects list');
        // })
        this.addStoreToViewModel(
            'Breeze.store.company.FlatProjectList',
            'projects',
            {
                load: true
            }
        );
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
            start,
            end
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

    loadTimeSheet: function() {
        var me = this,
            vm = me.getViewModel(),
            emp = me.api.auth.getCookies().emp,
            start = vm.get('startDate'),
            end = vm.get('endDate');
        var ts_store = vm.getStore('timeSheetStore');

        if (!ts_store) {
            me.addStoreToViewModel(
                'Breeze.store.record.TimeSheet',
                'timeSheetStore'
            );
            ts_store = vm.getStore('timeSheetStore');
        } else {
            ts_store.removeAll();
        }
        
        return new Promise(function(resolve, reject){
            ts_store.load({
                params: {
                    lookup_id: emp,
                    sdate: start,
                    edate: end
                },
                callback: (records, operation, success) => {
                    if(success){
                        // let ts_store = vm.get('timeSheetStore');
                        vm.set(
                            'timeSheet', 
                            ts_store.getAt(0).data
                        );
                        resolve();
                    } else {
                        reject();
                    }
                }
            });
        });
    },

    getEmployeeRights: function() {
        var me = this,
            vm = me.getViewModel();
        var sr_store = vm.getStore('secRightsStore');

        if (!sr_store) {
            me.addStoreToViewModel(
                'Breeze.store.record.TimeSheet',
                'secRightsStore'
            );
            sr_store = vm.getStore('secRightsStore');
        } else {
            sr_store.removeAll();
        }
        
        return new Promise(function(resolve, reject){
            sr_store.load({
                callback: (records, operation, success) => {
                    if(success){
                        // let ts_store = vm.get('timeSheetStore');
                        vm.set(
                            'secRights', 
                            sr_store.getAt(0).data
                        );
                        resolve();
                    } else {
                        reject();
                    }
                }
            });
        });
    },

    /**
     * Load work time record data store
     */
    loadWorkTimeRecords: function(){
        var me = this,
            vm = me.getViewModel(),
            cust = me.api.auth.getCookies().cust,
            emp = me.api.auth.getCookies().emp,
            start = vm.get('startDate'),
            end = vm.get('endDate');

        // TODO: Add live date data for ajax call in place of dummy dates
        me.api.workTimeRecords.getWorkTimeRecordsForRange(
            emp,
            start,
            end,
            // this.api.auth.getCookies().emp,
            // '2018-07-01T00:00:00',
            // '2018-07-07T00:00:00',
            'workTimeRecordStore'
        ).then(function(store){
            // me.getViewModel().setStores({workTimeRecords: store});
            // me.lookup('workTimeRecordGrid').setStore(me.getViewModel().getStore('workTimeRecords'));
            //me.getViewModel().setStores({workTimeRecords: store});

            /*
            // This record is for adding new record
            var blankRecord = Ext.create('Breeze.model.record.WorkTime', {
                Record_Date: ' Click Here to Add',
                Customer_ID: cust,
                ID: 0,
                Project_ID: 0,
                Total_Time: 'new',
                Deduction: null,
                Employee_ID: emp
            });
            */

            // Add the blankRcord as the first record
            // store.insert(0, blankRecord);
            me.addLoadedStoreToViewModel(store, 'workTimeRecords');
            me.updateShowPunchesButton(false);
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
        console.info('before time sheet load');
        var start = vm.get('startDate');
        var end = vm.get('endDate');
        // TODO: Add live date data for ajax call in place of dummy dates
        this.api.workTimeRecords.getTimeSheetForRange(
            this.api.auth.getCookies().emp,
            // '2018-07-01T00:00:00',
            // '2018-07-07T00:00:00',
            start,
            end,
            'workTimeSheetStore'
        ).then((store)=>{
            // me.getViewModel().setStores({workTimeRecords: store});
            // me.lookup('workTimeRecordGrid').setStore(me.getViewModel().getStore('workTimeRecords'));
            // me.getViewModel().set('timeSheetRecords', store);
            // me.getViewModel().setStores({timeSheetRecords: store});
            // me.addLoadedStoreToViewModel(store, 'timeSheet');
            me.addLoadedStoreToViewModel({
                model: 'Breeze.model.record.timeSheet.Record',
                data: store.getAt(0).get('Records')
            }, 'timeSheetRecords');
            me.addLoadedStoreToViewModel({
                model: 'Breeze.model.record.timeSheet.Record',
                data: store.getAt(0).get('SummaryRecords')
            }, 'timeSheetSummary');
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
        this.updateShowPunchesButton(shown);
        this.changeVisibilityOfAllPunches(shown);
    },

    // ===[Display Logic]===

    /**
     * Force display mode of 'Show/Hide All Punches' button to update
     * to match given boolean
     * @param {Boolean} state If true, read 'Hide', else 'Show'
     */
    updateShowPunchesButton: function(state){
        var vm = this.getViewModel(),
            button = this.lookup('showPunchesButton');
        vm.set('showPunches', state);
        button.setText(
            button.getData()[(!state)? 'showText' : 'hideText']
        );
    },

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
    },

    /** 
     * the change listener for Time IN and Time OUT columns
    */
    onTimeChange: function (cmp, newVal, oldVal) {
        var record = cmp.getParent().ownerCmp.getRecord();
        
        var timeProcessor = function(fieldName, val) {
            var time = record.get('Record_Date');    
            time = new Date(time.getFullYear(), time.getMonth(), time.getDate(), Math.floor(val/60), val%60, time.getSeconds());
            record.set(fieldName, time);
        }

        if(cmp.getItemId() == 'timeInSelector') {
            timeProcessor('Start_Time', newVal);
        } else {
            timeProcessor('End_Time', newVal);
        }

        this.updateOrCreateWTR(record.data);
    },

    /** 
     * the change listener for Date and Project columns
    */
    onCellChange: function (cmp, newVal, oldVal) {
        var record = cmp.getParent().ownerCmp.getRecord();
        this.updateOrCreateWTR(record.data);
    },

    /** 
     * the renderer of selectfield for projects
     * @param {int} value project ID
    */
    projectRenderer: function(value) {
        var vm = this.getViewModel(),
            projects = vm.get('projects'),
            recordIndex = projects.findExact('ID', value);
        if(recordIndex === -1) {
            // It means that it is unknown values
            return '';
        }

        var projectName = projects.getAt(recordIndex).get('Name');
        return projectName;
    },

    /** 
     * the renderer of selectfield for Time IN and Time OUT columns
     * @param {} value the number of minutes
    */
    timefieldRenderer: function(value) {
        var timeList = Ext.getStore('accrualShiftChoices'),
            index = timeList.findExact('value', value);
        if(index === -1) {
            return '';  
        }

        var time = timeList.getAt(index).get('time');
        return time;
    },

    /** 
     * show 'Add New WorkTime Record' dialog
    */
    showAddNewWTRDialog: function() {
        var view = this.getView(),
            dialog = this.addNewWTRDialog;
        
        if (!dialog) {
            dialog = Ext.apply({
                ownerCmp: view
            }, view.addNewWTRDialog);
            this.addNewWTRDialog = dialog = Ext.create(dialog);
        }

        dialog.show();
    },

    /** 
     * Handler of Save button on AddNewWTRDialog
    */
    onAddNewWTRDialogSave: function(btn) {
        var me = this,
            dateEle = me.lookupReference('date'),
            projectEle = me.lookupReference('project'),
            timeInEle = me.lookupReference('timeIn'),
            timeOutEle = me.lookupReference('timeOut');
        
        dateEle.validate();
        projectEle.validate();
        timeInEle.validate();
        timeOutEle.validate();

        if(dateEle.isValid() && projectEle.isValid()
            && timeInEle.isValid() && timeOutEle.isValid()) {
            var dlg = btn.getParent().getParent(),
                date = dateEle.getValue(),
                cust = me.api.auth.getCookies().cust,
                emp = me.api.auth.getCookies().emp,
                startTime = timeInEle.getValue(),
                endTime = timeOutEle.getValue(),
                projectID = projectEle.getValue();

            // This record is for adding new record
            // var newWTR = {
            //     Record_Date: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
            //     Customer_ID: cust,
            //     Start_Time: new Date(date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(startTime/60), startTime%60, 0),
            //     End_Time: new Date(date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(endTime/60), endTime%60, 0),
            //     ID: 0,
            //     Project_ID: projectID,
            //     Total_Time: null,
            //     Employee_ID: emp
            // }

            var newWTR = Ext.create('Breeze.model.record.WorkTime', {
	            Record_Date: date,
                Customer_ID: STI.currentEmp.CustomerID,
                Start_Time: new Date(date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(startTime/60), startTime%60, 0),
                End_Time: new Date(date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(endTime/60), endTime%60, 0),
	            ID: 0,
	            Project_ID: projectID,
	            Total_Time: null,
                Deduction: null,
	            Employee_ID: emp
	        });

            dlg.hide();
            this.onAddNewWTRDialogCancel(dlg);
            /** 
             * We need to do something here.
             * Ajax call - isTimeSheetValidForNewData
            */
            me.updateOrCreateWTR(newWTR.data);
            // me.updateOrCreateWTR(newWTR);
        }
    },

    /**
     * Method called by dialog cancelable mixin's onDialogCancel method
     * for Add New WTR dialog cancel button; resets field values and
     * clears validation error indicators
     * @param {Object} dlg dialog reference
     */
    onAddNewWTRDialogCancel: function(dlg) {
        var me = this;
            dateEle = me.lookupReference('date'),
            projectEle = me.lookupReference('project'),
            timeInEle = me.lookupReference('timeIn'),
            timeOutEle = me.lookupReference('timeOut');

        dateEle.clearValue();
        projectEle.clearValue();
        timeInEle.clearValue();
        timeOutEle.clearValue();
    },

    isEndTimeLess: function(baseTime, startTime, endTime) {
        if (endTime == null) {
            return false;
        }
        var d = new Date(baseTime);
        var tmpStartTime = new Date(d.getFullYear(), d.getMonth(), d.getDate(), startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
        var tmpEndTime = new Date(d.getFullYear(), d.getMonth(), d.getDate(), endTime.getHours(), endTime.getMinutes(), endTime.getSeconds());

        if (tmpEndTime < tmpStartTime) {
            return true;
        } else {
            return false;
        }
    },

    updateOrCreateWTR: function(WTR) {
        var me = this,
            WTRObj = new Object();
        
        WTRObj.Customer_ID = WTR.Customer_ID;
        WTRObj.ID          = WTR.ID;
        WTRObj.employee_id = WTR.Employee_ID;
        WTRObj.record_date = WTR.Record_Date.getFullYear() + "/" + (WTR.Record_Date.getMonth() + 1) + "/" + WTR.Record_Date.getDate();

        var tempDate,
            date = new Date(WTRObj.record_date);

        var dateProcessor = function(date) {
            var tempDateStr, YMD, TMS;
            tempDateStr = date.toLocaleString('en-GB');
            YMD = tempDateStr.split(",").shift().split("/").reverse().join("-");
            TMS = tempDateStr.split(",").pop().trim();
            return [YMD, TMS].join("T");
        }
        
        if (WTR.Start_Time !== null) {
            if (STI.currentPrefs.ViewTimeLocal == true) {
                tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), WTR.Start_Time.getHours(), WTR.Start_Time.getMinutes(), WTR.Start_Time.getSeconds());
                // WTRObj.Start_Time = dateProcessor(tempDate);
                WTRObj.Start_Time = tempDate
            } else {
                tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), WTR.Start_Time.getUTCHours(), WTR.Start_Time.getUTCMinutes(), WTR.Start_Time.getUTCSeconds());
                // WTRObj.Start_Time = dateProcessor(tempDate);
                WTRObj.Start_Time = tempDate
            }
        } else {
            WTRObj.Start_Time = null;
        }

        if (WTR.End_Time !== null) {
            var addDay = this.isEndTimeLess(WTR.Record_Date, WTR.Start_Time, WTR.End_Time);
            if (addDay) {
                tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, WTR.End_Time.getHours(), WTR.End_Time.getMinutes(), WTR.End_Time.getSeconds());
                // WTRObj.End_Time = dateProcessor(tempDate);
                WTRObj.End_Time = tempDate;
            } else {
                tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), WTR.End_Time.getHours(), WTR.End_Time.getMinutes(), WTR.End_Time.getSeconds());
                // WTRObj.End_Time = dateProcessor(tempDate);
                WTRObj.End_Time = tempDate;
            }
        } else {
            WTRObj.End_Time = null;
        }

        WTRObj.projecT_id = WTR.Project_ID;

        if (WTR.In_Punch) {
            WTRObj.pin_id = (WTR.In_Punch.Customer_ID == null) ? 0 : WTR.In_Punch.Id;
        } else {
            WTRObj.pin_id = 0;
        }
        if (WTR.Out_Punch) {
            WTRObj.pout_id = (WTR.Out_Punch.Customer_ID == null) ? 0 : WTR.Out_Punch.Id;
        } else {
            WTRObj.pout_id = 0;
        }
        
        WTRObj.Total_Time = (WTR.Total_Time == null) ? 0 : WTR.Total_Time;
        
        me.api.updateWTR(WTRObj)
            .then(function(r) {
                var interval = 50;
                console.log("WorkTimeRecord saving success!");
                // setTimeout(function() { me.refreshWTV() }, interval);
            }).catch(function(err) {
                console.log("WorkTimeRecord saving fail!");
            });
        console.log("final WTRObj", WTRObj);
    },

    refreshWTV: function() {
        var me = this;
        me.loadTimeSheet()
        .then(function(r) {
            me.getEmployeeRights();
            // we need to do something here
            me.loadWorkTimeRecords();
        })
    }
});