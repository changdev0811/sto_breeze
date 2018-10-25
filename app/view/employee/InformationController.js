/**
 * Controller for Employee Information View
 * @class InformationController
 * @namespace Breeze.view.employee.InformationController
 * @alias controller.employee.information
 * @extends Breeze.controller.Base
 */
Ext.define('Breeze.view.employee.InformationController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.employee.information',

    requires: [
        'Breeze.api.Employee',
        // 'Breeze.model.accrual.ShiftSegment',
        // 'Breeze.store.accrual.ScheduleList',
        // 'Breeze.store.company.EmployeeList',
        // 'Breeze.store.company.SupervisorList',
        // 'Breeze.store.company.FlatProjectList',
        // 'Breeze.store.record.PunchPolicies'
    ],

    onInit: function(component, eOpts){
        console.log("Employee Info Controller Init");
        this.apiClass = Ext.create('Breeze.api.Employee');
        var vm = this.getViewModel();
        var me = this;
        var comp = component;

        // remember id of user doing viewing
        vm.set('viewerId', Breeze.helper.Auth.getCookies().emp);

        if(typeof component.getData().employee !== 'undefined'){
            this.empId = component.getData().employee;
            vm.set('employeeId', this.empId);
        } else {
            this.empId = this.apiClass.auth.getCookies().emp;
            vm.set('employeeId', this.empId);
        }

        this.checkAccess().then(function(){
            me.loadStores(function(pass){
                // Provide loaded stores to form fields needing them
                comp.lookup('departments').setStore(vm.getStore('departments'));
                comp.lookup('accrualPolicy').setStore(vm.getStore('scheduleList'));
                comp.lookup('defaultProject').setStore(vm.getStore('projectList'));
                comp.lookup('punchPolicy').setStore(vm.getStore('punchPolicies'));
                if(vm.get('employeeId') !== 'new'){
                    // if employee id isn't new, load employee
                    me.loadEmployeeInfo(component, function(c){
                        // == After Employee Info loads ==
                        // Assign check fields after info loaded
                        // var exemptStatus = vm.get('info.ExemptStatus');
                        // c.lookup('exemptStatus').down('[value=' + exemptStatus + ']').setChecked(true);
                        // var recordingMode = vm.get('info.RecordingMode');
                        // c.lookup('recordingMode').down('[value=' + recordingMode + ']').setChecked(true);
                        me.loadShiftSegments(vm);
                        me.applyCompanyConfig();
                        // if(vm.get('info.LoginType') == 13){
                        //     vm.set('lists.employees.enabled', false);
                        //     vm.set('lists.departments.enabled', false);
                        //     var companyLists = c.lookupReference('companuListTabs');
                        // }
                        me.toggleCompanyLists(c);
                        me.prepareCompanyLists();
                    });
                }
            });
        }).catch(function(err){
            console.warn('Employee Info Loading failed: ', err);
        });
        
    },

    /**
     * Check user access and employee security rights
     * @return {Promise} Promise resolving with no params, or rejecting with error
     */
    checkAccess: function(){
        var me = this;
        var vm = this.getViewModel();
        return new Promise( function(resolve, reject) {
            me.apiClass.getAccess().then(
                function(level){
                    vm.set('accessLevel', level);

                    // Set id to use for requesting security rights
                    var rightsCheckId = vm.get('employeeId')
                    if(vm.get('employeeId') == 'new'){
                        // New employee, use id of 0
                        rightsCheckId = 0;
                    }
                    me.apiClass.getSecurityRights(rightsCheckId).then(
                        function(rights){
                            // Set read only state based on super admin, new record, or employee rights
                            if(
                                vm.get('accessLevel') == Breeze.api.Employee.accessLevel.SUPER_ADMIN ||
                                vm.get('employeeId') == 'new' ||
                                (rights.Edit_Employee)
                            ) {
                                vm.set('readOnly', false);
                            } else {
                                vm.set('readOnly', true);
                            }

                            // Set field-specific visibility values
                            vm.set('perms.ssn', rights.View_SSN);
                            vm.set('perms.compensation', rights.View_Compensation);

                            // remove hidden fields so they can't be pilfered with inspect
                            if(!vm.get('perms.ssn')){
                                var ssnPlain = me.view.lookup('ssnPlain');
                                // ssnPlain.parent.remove(ssnPlain);
                                ssnPlain.setHidden(true);
                            }
                            if(!vm.get('perms.compensation')){
                                var compPlain = me.view.lookup('compensationPlain');
                                // compPlain.parent.remove(compPlain);
                                compPlain.setHidden(true);
                            }

                            // handle rights
                            resolve();
                        }
                    ).catch(
                        function(err){
                            console.warn('Error getting security rights: ', err);
                            reject(err);
                        }
                    )
                }
            ).catch(function(err){
                console.warn('Check access error: ', err);
                reject(err);
            });
        });
    },

    /**
     * Load needed stores
     * @param {Function} callback Callback function passed success bool
     */
    loadStores: function(callback){
        var vm = this.getViewModel();
        
        vm.setStores({
            departments: Ext.create('Breeze.store.company.DepartmentList'),
            scheduleList: Ext.create('Breeze.store.accrual.ScheduleList'),
            projectList: Ext.create('Breeze.store.company.FlatProjectList'),
            punchPolicies: Ext.create('Breeze.store.record.PunchPolicies'),
            supervisors: Ext.create('Breeze.store.company.SupervisorList', { autoLoad: true }),
            employees: Ext.create('Breeze.store.company.EmployeeList', {autoLoad: true}),
            securityRoles: Ext.create('Breeze.store.company.SecurityRoleList', {autoLoad: true}),
            shiftSegments: Ext.create('Ext.data.Store', {
                // autoLoad: true,
                model: 'Breeze.model.accrual.ShiftSegment',
                // storeId: 'shiftSegments'
            })
        });

        // vm.getStore('supervisors').load();

        vm.getStore('departments').getProxy().extraParams.excludeterminated = 0;
        vm.getStore('departments').getProxy().extraParams.includeUserDept = vm.get('readOnly');
        
        vm.getStore('departments').load({callback: function(r,o,success){
            if(success){
                vm.getStore('scheduleList').load({callback: function(r,o,success){
                    if(success){
                        vm.getStore('projectList').load({callback: function(r,o,success){
                            if(success){
                                vm.getStore('punchPolicies').load({callback: function(r,o,success){
                                    if(success){
                                        callback(true);
                                    } else {
                                        console.warn('Failed to load punch policies');
                                    }
                                }});
                            }
                        }});
                    }
                }});
            }
        }});
    },

    loadEmployeeInfo: function(component, callback){
        var callback = (typeof callback == 'undefined')? function(){} : callback;
        var me = this;
        this.apiClass.information.getEmployeeInfo(
            me.getViewModel().get('employeeId')
        ).then(function(data){
            console.log("Loaded Employee Data Test");
            var vm = me.getViewModel();
            var info = data.employee;
            info.punchPolicy = data.punchPolicy;
            vm.set('info',info);
            callback(component);
            // vm.setData(data.data);
        }).catch(function(err){
            console.warn("Employee Info Error", err);
        });
    },

    /**
     * Load data into ShiftSegment store
     * @param {Object} vm ViewModel reference
     */
    loadShiftSegments: function(vm){
        var shiftSegments = vm.getStore('shiftSegments');
        var shiftStartTimes = vm.get('info.ShiftStartTimes');
        var shiftStopTimes = vm.get('info.ShiftStopTimes');
        var data = [];
        for(var i=0;i < shiftStartTimes.length && i < shiftStopTimes.length; i ++){
            data.push({
                StartTime: shiftStartTimes[i].replace(' ',''),
                StopTime: shiftStopTimes[i].replace(' ',''),
                StartMin: vm.get('info.ShiftStartSegments')[i],
                StopMin: vm.get('info.ShiftStopSegments')[i]
            });
        }
        shiftSegments.setData(data);
        this.lookup('shiftSegmentGrid').setStore(shiftSegments);
    },

    /**
     * Apply settings retrieved from Company Config store
     */
    applyCompanyConfig: function(){
        var config = Ext.getStore('CompanyConfig').getAt(0);
    },

    // collectCompanyLists: function(){
    //     var vm = this.getViewModel();

    //     var supervisorIds = vm.get('info.SupervisorIds');
    //     var supervisors = vm.getStore('supervisors').queryRecordsBy(
    //         function(rec){
    //             return supervisorIds.includes(rec.id + '');
    //         }
    //     );
    //     // vm.getStore('supervisors').filterBy(function(record){
    //     //     return supervisorIds.includes(record.id + '');
    //     // });
    //     // this.lookup('supervisorsGrid').setStore(vm.getStore('supervisors'));
    //     vm.set('lists.supervisors.data', supervisors);
    // }

    /**
     * Toggle visibility of company tab lists based on login type
     * @param {Object} ctx Component context
     */
    toggleCompanyLists: function(ctx){
        var me = this;
        var vm = me.getViewModel();
        if(vm.get('info.LoginType') == Breeze.api.Employee.accessLevel.EMPLOYEE){
            vm.set('lists.employees.enabled', false);
            vm.set('lists.departments.enabled', false);
            var listTab = ctx.lookupReference('companyListTabs');
            var empTab = listTab.getComponent('employeesTab');
            var depTab = listTab.getComponent('departmentsTab');
            listTab.remove(empTab);
            listTab.remove(depTab);
        }
    },

    /**
     * Prepare stores needed for company supervisors, supervised
     * employees and supervised departments grids.
     * 
     * Loads initial values and creates choice stores to track
     * available items and used items for each grid
     */
    prepareCompanyLists: function(){
        var me = this,
            vm = this.getViewModel();
        console.info('Preparing company lists');

        var emps = vm.get('employees'),
            sups = vm.get('supervisors'),
            deps = vm.get('departments'),
            role = vm.get('securityRoles');
        
        var eids = vm.get('info.SupervisedEmpIds'),
            sids = vm.get('info.SupervisorIds'),
            dids = vm.get('info.SupervisedDeptIds'),
            rids = vm.get('info.DeptRoleIds');

        var personModel = 'Breeze.model.employee.company.Person',
            deptModel = 'Breeze.model.employee.company.Department';

        //==[Complete Choice Set Stores]==

        /* Create 'choices' store for employees, containing
           full list of possible employees */
        this.addLoadedStoreToViewModel(
            {
                model: personModel,
                data: emps.getData().items.map((r)=>{
                    return {
                        personId: r.data.id, 
                        displayName: r.data.displayName
                    };
                })
            },
            'choices.employees'
        );

        /* Create 'choices' store for departments, with full
            list of possible departments */
        this.addLoadedStoreToViewModel(
            {
                model: deptModel,
                data: deps.getData().items.map((r)=>{
                    return {
                        departmentId: r.data.Id,
                        departmentName: r.data.Name,
                        roleId: 0,
                        roleName: ''
                    };
                })
            },
            'choices.departments'
        );

        //==[Current Company Grid Data Value Stores]==

        // Create local store for company supervisors
        this.addLoadedStoreToViewModel(
            {
                model: personModel,
                data: (
                    sups.queryRecordsBy((r)=>{
                        return (sids.includes(r.id));
                    })
                ).map((i)=>{return {
                    personId: i.data.id, 
                    displayName: i.data.displayName
                };})
            },
            'companySupervisors'
        );

        // Create local store for company supervised employees
        this.addLoadedStoreToViewModel(
            {
                model: personModel,
                data: (
                    emps.queryRecordsBy((r)=>{
                        return (eids.includes(r.id));
                    })
                ).map((i)=>{return {
                    personId: i.data.id, 
                    displayName: i.data.displayName
                };})
            },
            'companySupervisedEmployees'
        );

        // Create local store for company departments
        this.addLoadedStoreToViewModel(
            {
                model: deptModel,
                data: (
                    deps.queryRecordsBy((r)=>{
                        return (dids.includes(r.id));
                    })
                ).map((r,idx)=>{
                    console.info('Building dept store');
                    return {
                        departmentId: r.get('Id'),
                        departmentName: r.get('Name'),
                        roleId: rids[idx],
                        roleName: role
                            .findRecord('Role_Id', rids[idx]).get('Role_Name')
                    };
                })
            },
            'companyDepartments'
        );
        

        //==[Available Choice Set Stores]==

        // Store used to track available supervisors
        this.addLoadedStoreToViewModel({
            model: personModel,
            data: []
        }, 'choices.supervisors');
        
        // Store used to track available supervised employees
        this.addLoadedStoreToViewModel({
            model: personModel,
            data: []
        }, 'choices.supervisedEmployees');

        // Store used to track available departments
        this.addLoadedStoreToViewModel({
            model: deptModel,
            data: []
        }, 'choices.supervisedDepartments');

        //===[Build Initial Choice Sets]===

        // Build choices for supervised employees
        this.buildSupervisedEmployeeChoices();

        // Build choices for departments
        this.buildSupervisedDepartmentChoices(); 

    },

    //===[Company List Event Handlers]===

    onCompanyGridAddButton: function(comp, tool, eOpts){
        var actSheet = this.lookup(tool.getData().sheet);
        actSheet.show();

        console.info('Handling add button click for company grid');
    },

    //==[Edit Cell Change Events]==
    /**
     * Handle select event for supervised employees grid cell editor plugin
     * @param {Object} comp Select field component
     * @param {Object} data New data
     * @param {Object} eOpts Event Options
     */
    onEditSupervisedEmployeeSelect: function(comp, data, eOpts){
        var targetRecord = comp.getParent().ownerCmp.getRecord();
        
        targetRecord.set({
            personId: data.data.personId,
            displayName: data.data.displayName
        }, {commit: true});

        console.info('Select updated record!');
        this.buildSupervisedEmployeeChoices();
    },

    /**
     * Handle select event for supervised departments grid
     * department name cell editor plugin
     * @param {Object} comp Select field component
     * @param {Object} data New data
     * @param {Object} eOpts Event Options
     */
    onEditDepartmentsDeptSelect: function(comp, data, eOpts){
        var targetRecord = comp.getParent().ownerCmp.getRecord();

        targetRecord.set({
            departmentId: data.data.departmentId,
            departmentName: data.data.departmentName
        }, {commit: true});
        
        console.info('Select edit department department');
        this.buildSupervisedDepartmentChoices();
    },

    /**
     * Handle select event for supervised departments grid
     * role name cell editor plugin
     * @param {Object} comp Select field component
     * @param {Object} data New data
     * @param {Object} eOpts Event Options
     */
    onEditDepartmentsRoleSelect: function(comp, data, eOpts){
        var targetRecord = comp.getParent().ownerCmp.getRecord();

        targetRecord.set({
            roleId: data.get('Role_Id'),
            roleName: data.get('Role_Name')
        }, {commit: true});

        console.info('Select edit department role');
    },

    //===[Company Tab Grid choice store builders/updaters]==

    /**
     * Build/update choices.supervisedEmployees store,
     * used to provide choices for editing supervised employees
     */
    buildSupervisedEmployeeChoices: function(){
        var vm = this.getViewModel(),
            all = vm.get('choices.employees'),
            choices = vm.get('choices.supervisedEmployees'),
            choiceIds = choices.getData().items.map((rec)=>{
                return rec.data.personId;
            }),
            used = vm.get('companySupervisedEmployees').getData().items.map(
                (rec) => { return rec.data.personId; }
            ),
            toRemove = choices.queryBy((rec) => {
                return (used.includes(rec.data.personId));
            }),
            toAdd = all.queryBy((rec) => {
                return (!used.includes(rec.data.personId));
            }).items;
        toAdd = toAdd.filter((rec) => {
            return (!choiceIds.includes(rec.data.personId));
        });
        choices.loadData(toAdd, true);
        choices.remove(toRemove.items);
        choices.commitChanges();

        console.info('Done building supervised employees store');
    },

    /**
     * Build/update choice.departments store,
     * used to provide choices for editing supervised departments
     */
    buildSupervisedDepartmentChoices: function(){
        var vm = this.getViewModel(),
            all = vm.get('choices.departments'),
            choices = vm.get('choices.supervisedDepartments'),
            choiceIds = choices.getData().items.map((rec)=>{
                return rec.get('departmentId');
            }),
            used = vm.get('companyDepartments').getData().items.map(
                (rec) => { return rec.get('departmentId'); }
            ),
            toRemove = choices.queryBy((rec) => {
                return (used.includes(rec.get('departmentId')));
            }),
            toAdd = all.queryBy((rec) => {
                return (!used.includes(rec.data.departmentId));
            }).items.filter((rec) => {
                return (!choiceIds.includes(rec.data.departmentId));
            });

        // Add missing
        choices.loadData(toAdd, true);
        // Remove used
        choices.remove(toRemove.items);
        // Save changes
        choices.commitChanges();

        console.info('Done building departments store');
    },

    //==[Company List ActionSheet Add event handlers]==
    onAddDepartment: function(comp){
        var vm = this.getViewModel(),
            chosenDepts = vm.get('companyDepartments'),
            sheet = comp.getParent().getParent(),
            deptField = sheet.getComponent('department'),
            roleField = sheet.getComponent('role');
        
        if(deptField.validate() && roleField.validate()){
            // Both fields are valid, so make use of them
            var deptRecord = deptField.getSelection().getData(),
                roleRecord = roleField.getSelection().getData(),
                newRecord = {
                    departmentId: deptRecord.departmentId,
                    departmentName: deptRecord.departmentName,
                    roleId: roleRecord.Role_Id,
                    roleName: roleRecord.Role_Name
                };
            chosenDepts.loadData([newRecord], true);
            chosenDepts.commitChanges();
            // Refresh available choices
            this.buildSupervisedDepartmentChoices();
        }
        
        // Close action sheet and reset values to empty
        sheet.hide();
        deptField.clearValue();
        roleField.clearValue();
        
        console.info('Add supervised department');
    },

    //===[Action Tool Handlers]===
    
    /**
     * Overridden handeler from refresh tool click
     * (overrides Breeze.controller.Base.onRefreshTool)
     */
    onRefreshTool: function(){
        // this.onInit(this.getView());
        console.info('Refresh');
        var parentComp = this.getView().getParent()
        var employee = this.getViewModel().get('employeeId');
        parentComp.remove(this.getView());
        parentComp.setActiveItem(
            Ext.create('Breeze.view.employee.Information', {
                data: { employee: employee }
            })
        );
    },

    //===[Event Handlers]===

    /**
     * Handles 'cancel' button click inside actionsheet, closing
     * actionsheet
     * @param {Object} comp Firing component
     */
    onActionSheetCancel: function(comp){
        comp.getParent().getParent().hide();
    },

    onLayoffButtonToggle: function(){
        // TODO: Implement layoff toggle
        var vm = this.getViewModel();

        if(vm.get('info.LayoffStatus') == "Active"){
            this.lookup('layoffEffectivePicker').show();
        } else {
            vm.set('info.LayoffStatus', "Active");
        }

        console.info('Layoff toggle button clicked');
    },

    onLayoffEffectivePicked: function(){
        var vm = this.getViewModel();

        console.info('Picked effective layoff date');
    },

    onNotesButtonTap: function(ref, x, eOpts){
        console.info("[onNotesButtonTap]");
        //notesDialog
        var view = this.getView(),
            dialog = this.lookup('notesDialog');
        if (!dialog) {
            dialog = Ext.apply({ ownerCmp: view }, view.dialog);
            dialog = Ext.create(dialog);
        }
        dialog.show();
    },

    onCloseNotesDialog: function(dialog, e, eOpts){
        dialog.hide();
    },

    onEditProfileImageTap: function(ref, e, eOpts){
        var view = this.getView(),
            dialog = this.lookup('profileImageEditorDialog');
        if(!dialog){
            dialog = Ext.apply({ ownerCmp: view }, view.dialog);
            dialog = Ext.create(dialog);
        }
        dialog.show();
    },

    /**
     * Handle profile image edit dialog's 'remove' button
     */
    onRemoveProfileImage: function(ref,e,eOpts){
        console.info('Remove profile image');
    },

    /**
     * Handle profile image edit dialog's 'upload' button
     */
    onUploadProfileImage: function(ref,e,eOpts){
        console.info('Upload profile image');
        this.apiClass.information.uploadPicture(
            this.lookup('profileImageForm')
        ).then((result) => {

        }).catch((err) => {
            Ext.toast({
                message: err.message,
                type: err.type,
                timeout: 10000
            });
        });
    },
    
    /**
     * Handle profile image edit dialog's 'cancel' button
     */
    onCancelProfileImageEdit: function(ref, e, eOpts){
        this.lookup('pictureFileField').reset();
        ref.getParent().getParent().hide();
        // this.lookup('profileImageForm').reset();
    }


});