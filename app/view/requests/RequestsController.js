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
            me.updateCalendarFormViewModel();
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
                                record = vm.get('leaveRequests').findRecord("unique_id", requestId.toString());
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
     * @todo TODO: Navigate calendar to month of first request day on load (see LeaveRequestSlidePanel.js:160)
     */
    loadRequestedDays: function(requestId, changeCalendarDate=false){
        var me = this,
            vm = this.getViewModel(),
            store = vm.get('requestedDays');
        
        store.setRequestId(requestId);
        store.updateProxy();
        store.load({
            callback: function(records, op, success){
                if(success && changeCalendarDate && records.length > 0){
                    // If indicated and requests are available, change calendar to show event
                    this.lookup('calendarPanel').setValue(
                        new Date(records[0].get('request_date'))
                    );
                }
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

    /**
     * Display the dialog for creating a new leave request
     */
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
     * Display employee notes dialog, either normal or readonly
     * @param {Boolean} readOnly If true, display as read only
     */
    showEmployeeNotesDialog: function(readOnly = false){
        var view = this.getView(),
            vm = this.getViewModel(),
            request = vm.get('selectedRequest'),
            dialog = this.employeeNotesDialog;
        if(!dialog){
            dialog = Ext.apply({
                ownerCmp: view
            }, view.employeeNotesDialog);
            this.employeeNotesDialog = dialog = Ext.create(dialog);
        }

        // Update note data and adjust form based on read only value
        var notes = dialog.getComponent('notes');
        notes.setValue(request.emp_notes);
        notes.setReadOnly(readOnly);
        dialog.getButtons().getComponent('save').setHidden(readOnly);
        
        dialog.show();
    },

    /**
     * Display supervisor notes dialog
     */
    showSupervisorNotesDialog: function(){
        var view = this.getView(),
            vm = this.getViewModel(),
            request = vm.get('selectedRequest'),
            dialog = this.supervisorNotesDialog;
        if(!dialog){
            dialog = Ext.apply({
                ownerCmp: view
            }, view.supervisorNotesDialog);
            this.supervisorNotesDialog = dialog = Ext.create(dialog);
        }

        // Update note data
        dialog.getComponent('notes').setValue(request.sup_notes);
        
        dialog.show();
    },

    /**
     * Display deny notes dialog
     */
    showDenyNotesDialog: function(){
        var view = this.getView(),
            vm = this.getViewModel(),
            request = vm.get('selectedRequest'),
            dialog = this.denyNotesDialog;
        if(!dialog){
            dialog = Ext.apply({
                ownerCmp: view
            }, view.denyNotesDialog);
            this.denyNotesDialog = dialog = Ext.create(dialog);
        }

        // Update note data
        dialog.getComponent('notes').setValue(request.sup_notes);
        
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

    /**
     * Handle 'Employee Notes' button click event
     */
    onEmployeeNotesButton: function(){
        this.showEmployeeNotesDialog(false);
    },

    /**
     * Handle 'Employee Notes' (read only) button click event
     */
    onEmployeeNotesReadOnlyButton: function(){
        this.showEmployeeNotesDialog(true);
    },

    /**
     * Event handler for 'save' button in Employee Notes dialog
     */
    onEmployeeNotesSave: function(){
        var requestId = this.getViewModel().get('selectedRequest').unique_id,
            me = this,
            dialog = this.employeeNotesDialog,
            notes = dialog.getComponent('notes').getValue();
        
        this.api.requests.changeEmployeeRequestNotes(requestId, notes).then((r)=>{
            me.loadRequests(requestId);
            dialog.hide();
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 'info'
            });
        }).catch((err)=>{
            dialog.hide();
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 'error'
            });
        });
    },

    /**
     * Event handler for save button in create leave request dialog
     * @param {Object} btn 
     */
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

    /**
     * Handle dialog cancel button click event
     */
    onEmployeeNotesDialogCancel: function(){
        this.employeeNotesDialog.hide();
    },

    /**
     * Handle dialog cancel button click event
     */
    onSupervisorNotesDialogCancel: function(){
        this.supervisorNotesDialog.hide();
    },

    /**
     * Handle dialog cancel button click event
     */
    onDenyNotesDialogCancel: function(){
        this.denyNotesDialog.hide();
    },

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
                // successful, so update event record
                me.api.requests.updateRequestEvent(
                    record, request.unique_id
                ).then((r2)=>{
                    // Refresh requested days
                    me.loadRequestedDays(request.unique_id);
                    // Show success
                    Ext.toast({
                        type: r2.type,
                        message: r2.message,
                        timeout: 'info'
                    });
                }).catch((err2)=>{
                    // Refresh requested days
                    me.loadRequestedDays(request.unique_id);
                    // Show error
                    Ext.toast({
                        type: err2.type,
                        message: err2.message,
                        timeout: 'error'
                    });
                });
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
     * Event handler for delete button shown on requested day items
     * @param {Object} grid Reference to containing grid component
     * @param {Object} info Object with selecion info
     */
    onRequestedDaysDelete: function(grid, info){
        var record = info.record,
            vm = this.getViewModel(),
            request = vm.get('selectedRequest'),
            me = this;
        this.api.requests.deleteRequestDay(
            request.unique_id, record
        ).then((r)=>{
            me.loadRequestedDays(request.unique_id);
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 'info'
            });
        }).catch((e)=>{
            Ext.toast({
                type: e.type,
                message: e.message,
                timoeut: 'error'
            });
        });
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
        this.loadRequestedDays(selected.get('unique_id'), true);
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

    // === [Calendar] ===

    /**
     * Load calendar
     */
    loadCalendar: function(){
        var me = this;
        var vm = me.getViewModel();

        // console.info('Calendar Load Start');
        
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
                    // console.info('datachanged');
                    this.showLoadingMask(true);
                }, 
                refresh: function(){
                    // console.info('refresh');
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
     * Makes calendar add event form inherit this view's viewmodel
     */
    updateCalendarFormViewModel: function(){
        var cmp = this.lookup('calendarPanel').getView().getAt(0),
            form = cmp.getAddForm();
            Ext.merge(form, {viewModel: {parent: this.getViewModel()}});
            cmp.setAddForm(form);
    },

    onAddRequestedDaysTool: function(){
        this.lookup('calendarPanel').getView().getAt(0).showAddForm();
    },

    /**
     * Fired prior to showing Add Event form for Calendar
     * Decides whether or not form should be shown
     * @param {*} view 
     * @param {*} context 
     */
    onCalendarBeforeEventAdd: function(view, context){
        console.info('before event add');
        var request = this.getViewModel().get('selectedRequest');
        if(Object.isUnvalued(request)){
            // Cancel form if no request is selected
            return false;
        }
        var requestStatus = request.request_status.toUpperCase();
        // Cancel showing form if leave request isn't in valid state
        if(requestStatus == "DRAFT" || requestStatus == "DENIED"){
            // ok
        } else {
            return false;
        }
    },

    /**
     * Event handler for clicking 'save' in add request day form
     * 
     * Takes event data built by calendar logic and uses it to make
     * an api call to add a requested day
     * 
     * @param {Object} view Calendar month view component (view in calendar panel)
     * @param {Object} context Object with 'event' - event record, and 'data'- event data
     * @param {*} eOpts Event options
     */
    onCalendarEventAdd: function(view, context, eOpts){
        // console.info('Calendar event added');
        var me = this,
            vm = this.getViewModel(),
            hoursMode = vm.get('amountInHoursMode'),
            requestId = vm.get('selectedRequest').unique_id,
            event = context.data;

        var amount = 0, amountSrc = (hoursMode)? event.hours : event.percent;

        if(hoursMode){
            amount = (amountSrc * 100) / 24;
        } else {
            amount = amountSrc;
        }
        
        // if(amount == 0){
        //     Ext.toast({
        //         type: Ext.Toast.WARN,
        //         message: 'Requested time must be greater than 0'
        //     })
        // }

        me.api.requests.addRequestDay(
            requestId, event.startDate, event.calendarId, amount
        ).then((r)=>{
            me.loadCategories();
            me.loadRequestedDays(requestId);
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 'info'
            });
        }).catch((e)=>{
            me.loadCategories();
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 'error'
            });
        });
    }
});