/**
 * View Controller for My Requests
 * @class RequestsController
 * @namespace Breeze.view.requests.RequestsController
 */
Ext.define('Breeze.view.requests.RequestsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.requests.requests',


    requires: [
        'Breeze.api.company.Category',
        'Breeze.api.Requests'
    ],

    onInit: function(comp){
        var me = this,
            vm = this.getViewModel();
        
        this.api = { 
            category: Breeze.api.company.Category,
            requests: Breeze.api.Requests
        };

        // // If company config is already loaded, pass it to the requests api
        // if(vm.get('companyConfig').isLoaded()){
        //     console.info('company config load already');
        //     this.api.requests.setCompanyConfigRecord(vm.get('companyConfig').getAt(0));
        // } else {
        //     // If not loaded, add single time event listener to handle load completion
        //     vm.get('companyConfig').on({load: {
        //         fn: (records, op, success)=>{
        //             this.api.requests = records[0];
        //             console.info('company config load complete');
        //         }, 
        //         scope: me,
        //         single: true
        //     }});
        //     if(!vm.get('companyConfig').isLoading()){
        //         // If loading isn't in progress, start it
        //         vm.get('companyConfig').load();
        //     }
        // }

        // calendar categories
        vm.set('employeeId', vm.get('userId'));
        this.loadCategories();
        
        // Load emp shift time info
        Ext.create('Breeze.api.Employee').getShiftTime(vm.get('employeeId')).then((r)=>{
            vm.set('empShiftTime', r);
        }).catch((e)=>{
            console.warn('Failed to load employee shift time with getEmpShiftTime');
        });

        // Prepare store for requested days
        me.addStoreToViewModel(
            'Breeze.store.record.leaveRequest.Days',
            'requestedDays',
            { load: false }
        );

        me.loadRequests();
    },

    /**
     * Load requests into store, optionally selecting one by its unique_id
     * @param {String} requestId (optional) id of request to select after load
     */
    loadRequests: function(requestId = null){
        var me = this,
            vm = this.getViewModel();

        // Load requests
        me.addStoreToViewModel(
            'Breeze.store.record.leaveRequests.Employee',
            'leaveRequests',
            { 
                load: true,
                loadOpts: {
                    callback: function(records, op, success){
                        if(success){
                            var record = records[0];
                            if(requestId !== null){
                                record = vm.get('leaveRequests').queryRecords("unique_id", requestId.toString())[0];
                            }
                            this.lookup('leaveRequestsGrid').getSelectable().setSelectedRecord(
                                record
                            )
                        }
                    },
                    scope: me
                }
            }
        );
    },


    /**
     * Reload requested days store, passing in ID of request to load days for
     * @param {Object} requestId Leave Request ID to load days for
     */
    loadRequestedDays: function(requestId){
        var me = this,
            vm = this.getViewModel(),
            store = vm.get('requestedDays');
        
        store.setRequestId(requestId);
        store.updateProxy();
        store.load({
            callback: function(records, op, success){
                // c
            },
            scope: me
        });
    },


    // calendar categories    
    loadCategories: function(){
        var me = this;
      
        me.api.category.loadCompactListStore((success, id, store) => {
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

    /**
     * Load calendar
     */
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

    /**
     * Handle showing/hiding loading mask for calendar
     * @param {Boolean} shown 
     */
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

    showCreateRequestDialog: function(){
        console.info('create request dialog');
        var view = this.getView(),
            vm = this.getViewModel();
            dialog = this.createRequestDialog;
        
        if(!dialog){
            dialog = Ext.apply({
                ownerCmp: view
            }, view.createRequestDialog);
            this.createRequestDialog = dialog = Ext.create(dialog);
        }

        dialog.show();
                
    },

    /**
     * Update view model values bound to visibility of various
     * Leave Request action buttons, based on the request status of currently
     * selected leave request
     */
    toggleLeaveRequestActionButtons: function(){
        var vm = this.getViewModel(),
            leaveRequest = vm.get('selectedRequest'),
            status = leaveRequest.request_status.toUpperCase(),
            companyConfig = vm.get('companyConfig').getAt(0),
            actions = vm.get('requestActions');
        switch (status) {
            case "DRAFT":
                actions = {
                    employeeNotes: true,
                    employeeNotesReadOnly: false,
                    supervisorNotes: false,
                    denyNotes: false,
                    submit: true,
                    delete: true,
                    cancel: false,
                    deleteDay: true
                };
                break;
            case "PENDING":
                actions = {
                    employeeNotes: false,
                    employeeNotesReadOnly: true,
                    supervisorNotes: true,
                    denyNotes: false,
                    submit: false,
                    delete: false,
                    // Show cancel button based on config settings
                    cancel: (companyConfig.get('CancelLeavePending') !== 131),
                    deleteDay: false
                };
                break;
            case "CANCELLATION PENDING":
                actions = {
                    employeeNotes: false,
                    employeeNotesReadOnly: true,
                    supervisorNotes: true,
                    denyNotes: false,
                    submit: false,
                    delete: false,
                    cancel: false,
                    deleteDay: false
                };
                break;
            case "CANCELLATION DENIED":
                actions = {
                    employeeNotes: false,
                    employeeNotesReadOnly: true,
                    supervisorNotes: true,
                    denyNotes: true,
                    submit: false,
                    delete: false,
                    cancelRequest: false,
                    deleteDay: false
                };
                break;
            case "APPROVED":
                actions = {
                    employeeNotes: false,
                    employeeNotesReadOnly: true,
                    supervisorNotes: true,
                    denyNotes: false,
                    submit: false,
                    delete: false,
                    // Show cancel button based on config settings
                    cancel: (companyConfig.get('CancelLeaveNotTaken') !== 131),
                    deleteDay: false
                };
                break;
            case "DENIED":
                actions = {
                    employeeNotes: true,
                    employeeNotesReadOnly: false,
                    supervisorNotes: true,
                    denyNotes: true,
                    submit: true,
                    delete: true,
                    cancel: false,
                    deleteDay: true
                };
                break;
            case "CANCELLED":
                actions = {
                    employeeNotes: true,
                    employeeNotesReadOnly: false,
                    supervisorNotes: true,
                    denyNotes: false,
                    submit: false,
                    delete: true,
                    cancel: false,
                    deleteDay: true
                };
                break;
        }
        vm.set('requestActions', actions);
        
    },

    // === [Event Handlers] ===

    onCreateRequest: function(btn){
        var dlg = this.createRequestDialog,
            nameField = dlg.getComponent('requestName'),
            vm = this.getViewModel(),
            api = this.api,
            me = this;

        if(!nameField.validate()){
            // Field is blank, so show warning
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'You must enter a name for this request!',
                timeout: 'warn'
            });
        } else {
            // Name is okay, so proceed
            api.requests.createRequest(nameField.getValue()).then((r)=>{

            }).catch((e)=>{

            })
        }
    },

    /**
     * Handle cancel button action for create leave request dialog,
     * hiding and resetting field values
     * 
     * @param {Object} btn Button that triggered event
     */
    onCreateRequestDialogCancel: function(btn){
        var dlg = this.createRequestDialog,
            nameField = dlg.getComponent('requestName');
        
        dlg.hide();
        nameField.clearValue();
        nameField.clearInvalid();
    },

    // onLeaveRequestBeforeCompleteEdit: function(location, editor, newVal, oldVal){
    //     console.info('before name edit complete');
    //     var record = location.record;

    //     if(newVal.trim().length == 0){

    //     }
    // },

    /**
     * Event handler that fires before displaying amount editor for 
     * Requested Days grid, deciding whether field should be editable
     * @param {Object} location 
     * @param {Object} editor Editor object
     */
    onRequestedDaysBeforeEdit: function(location, editor){
        // console.info('before requested day edit');
        var record = location.record,
            vm = this.getViewModel(),
            status = vm.get('selectedRequest').request_status.toUpperCase();
        if(status == 'APPROVED' || status == 'PENDING'){
            return false;
        }
    },

    /**
     * Handle event fired by completion of editing a cell in requested
     * days grid.
     * 
     * Applies validation check and reverts value if validation fails
     * 
     * @param {*} location Location object provided by cell editor plugin
     * @param {*} editor Editor object
     * @param {*} newVal New value
     * @param {*} oldVal Old value
     */
    onRequestedDaysEdit: function(location, editor, newVal, oldVal){
        var vm = this.getViewModel(),
            hoursMode = (vm.get('empShiftTime.recording_mode') == 21),
            request = vm.get('selectedRequest'),
            record = location.record,
            me = this,
            amount = (!hoursMode)? newVal / 100 : newVal;
        if(newVal <= 0){
            Ext.toast({
                type: Ext.Toast.WARN,
                message: 'Requested time must be greater than 0',
                timeout: 'warn'
            });
            record.set({Amount: oldVal}, {commit: true});
        } else {
            me.api.requests.validateRequestDay(
                request.unique_id,
                record.get('request_date'),
                record.get('category_code'),
                amount,
                null,
                vm.get('companyConfig').getAt(0)
            ).then((r)=>{
                // successful
            }).catch((err)=>{
                // failed to validate, so return to old value
                record.set({Amount: oldVal}, {commit: true});
                // show warning
                Ext.toast({
                    type: Ext.Toast.WARN,
                    message: err,
                    timeout: 'warn'
                });
            });
        }
    },

    /**
     * Event handler for editor on Leave Request grid's name column
     * @param {*} location Location object provided by cell editor plugin
     * @param {*} editor Editor object
     * @param {*} newVal New value
     * @param {*} oldVal Old value
     */
    onLeaveRequestEdit: function(location, editor, newValue, oldValue){
        // console.info('Leave request edit');
        var requestId = location.record.get('unique_id'),
            me = this;
        
        me.api.requests.renameEmployeeRequest(
            requestId, newValue
        ).then((r)=>{
            Ext.toast({
                type: Ext.Toast.INFO,
                message: 'Successfully renamed Leave Request',
                timeout: 'info'
            });
            me.loadRequests(requestId);
        }).catch((err)=>{
            Ext.toast({
                type: Ext.Toast.ERROR,
                message: 'Unable to rename Leave Request',
                timeout: 'error'
            });
            me.loadRequests(requestId);
        });

    },


    /**
     * Event handler for select event on Leave Requests grid
     * @param {Object} grid 
     * @param {Object} selected 
     */
    onLeaveRequestSelect: function(grid, selected){
        
        // Make copy of selected leave request
        this.copyRecordToViewModel(
            selected.getData(), 'selectedRequest'
        );

        // Update values in view model that determine which request action buttons are shown
        this.toggleLeaveRequestActionButtons();

        // Load requested days for selected leave request
        this.loadRequestedDays(selected.get('unique_id'));
    },

    onPrevMonthButton: function(){
        console.info("Prev");
        this.showLoadingMask(true);
        this.lookup('calendarPanel').navigate(
            -1, Ext.Date.MONTH
        );
    },

    onFyiNavClick:function(){
        this.redirectTo('personal/fyi');
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    },

    // === [Leave Request Form] ===
    showLeaveRequestForm: function(){
        // console.info('Leave Request Button');
        var view = this.getView(),
            form = view.getComponent('form');
        view.setActiveItem(form);
    },

    closeLeaveRequestForm: function(){
        var view = this.getView(),
            requests = view.getComponent('requests');
        view.setActiveItem(requests);
    },

});