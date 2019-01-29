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
            requests: Ext.create('Breeze.api.Requests', {
                companyConfigRecord: vm.get('companyConfig').getAt(0)
            })
        };

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
     * Event handler for editor on Leave Request grid's name column
     * @param {*} location 
     * @param {*} editor 
     * @param {*} newValue 
     * @param {*} oldValue 
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