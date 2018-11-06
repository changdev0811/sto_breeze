/**
 * Controller for Employee Information View
 * @class InformationController
 * @namespace Breeze.view.employee.InformationController
 * @alias controller.employee.information
 * @extends Breeze.controller.Base
 * TODO: Deal with toggle of exclude terminated
 */
Ext.define('Breeze.view.employee.InformationController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.employee.information',

    requires: [
        'Breeze.api.Employee'
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

        // Store whether to exclude terminated employees
        if(!Object.isUnvalued(component.getData().excludeTerminated)){
            this.excludeTerminated = component.getData().excludeTerminated;
            vm.set('excludeTerminated', this.excludeTerminated);
        } else {
            this.excludeTerminated = false;
            vm.set('excludeTerminated', this.excludeTerminated);
        }

        this.checkAccess().then(function(){
            // TODO: finish config loading
            me.loadStores(function(pass){
                // Provide loaded stores to form fields needing them
                comp.lookup('departments').setStore(vm.getStore('departments'));
                // comp.lookup('accrualPolicy').setStore(vm.getStore('scheduleList'));
                // comp.lookup('defaultProject').setStore(vm.getStore('projectList'));
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
                        // me.loadShiftSegments(vm);
                        me.prepareShiftSegments();
                        me.applyCompanyConfig();
                        // if(vm.get('info.LoginType') == 13){
                        //     vm.set('lists.employees.enabled', false);
                        //     vm.set('lists.departments.enabled', false);
                        //     var companyLists = c.lookupReference('companuListTabs');
                        // }
                        me.toggleCompanyLists(c);
                        me.prepareCompanyLists();
                    });
                } else {
                    vm.set('info', Object.assign({},vm.get('newRecord.employee')));
                    vm.set('info.punchPolicy', Object.assign({},vm.get('newRecord.punchPolicy')));
                    me.prepareShiftSegments();
                    me.applyCompanyConfig();
                    // me.toggleCompanyLists(c);
                    me.prepareCompanyLists();
                }
            });
        }).catch(function(err){
            console.warn('Employee Info Loading failed: ', err);
        });
        
    },

    changeDummy: function(){
        console.info('Dummy fired');
    },

    /**
     * Check user access and employee security rights
     * 
     * Also loads company configuration and puts it into store companyConfig
     * 
     * @return {Promise} Promise resolving with no params, or rejecting with error
     */
    checkAccess: function(){
        var me = this;
        var vm = this.getViewModel();
        return new Promise( function(resolve, reject) {
            me.addStoreToViewModel(
                'Breeze.store.company.Config',
                'companyConfig', { load: true, loadOpts: { 
                    callback: function(success) {
                        if(!success){
                            console.warn('Failed to load company config');
                        }
                        me.apiClass.getAccess().then(
                            function (level) {
                                vm.set('accessLevel', level);

                                // Set id to use for requesting security rights
                                var rightsCheckId = vm.get('employeeId')
                                if (vm.get('employeeId') == 'new') {
                                    vm.set('newEmployee', true);
                                    // New employee, use id of 0
                                    rightsCheckId = 0;
                                }
                                me.addStoreToViewModel(
                                    'Breeze.store.employee.SecRights',
                                    'securityRights',
                                    {
                                        load: true,
                                        createOpts: { employeeId: 
                                            (vm.get('employeeId') == 'new')? 0 : vm.get('employeeId') 
                                        },
                                        loadOpts: {
                                            callback: function (success, rec, opt) {
                                                if (success) {
                                                    var rights = vm.get('securityRights').getAt(0).getData();
                                                    // Set read only state based on super admin, new record, or employee rights
                                                    if (
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
                                                    if (!vm.get('perms.ssn')) {
                                                        var ssnPlain = me.view.lookup('ssnPlain');
                                                        // ssnPlain.parent.remove(ssnPlain);
                                                        ssnPlain.setHidden(true);
                                                    }
                                                    if (!vm.get('perms.compensation')) {
                                                        var compPlain = me.view.lookup('compensationPlain');
                                                        // compPlain.parent.remove(compPlain);
                                                        compPlain.setHidden(true);
                                                    }

                                                    // handle rights
                                                    resolve();
                                                } else {
                                                    console.warn('Error getting security rights');
                                                    reject(false);
                                                }
                                            }
                                        }
                                    }
                                );
                            }).catch(function (err) {
                                console.warn('Check access error: ', err);
                                reject(err);
                            }
                        );
                    }
                }}
            );
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
        var config = this.getViewModel().get('companyConfig').getAt(0);
    },

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
                data: sups.getData().items.map((r)=>{
                    return {
                        personId: r.data.id,
                        departmentId: r.data.departmentId, 
                        displayName: r.data.displayName
                    };
                })
            },
            'choices.supervisors'
        );

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
                    departmentId: i.data.departmentId,
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
        }, 'choices.supervising');
        
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

        // Build choices for supervisors
        this.buildSupervisorChoices();

        // Build choices for supervised employees
        this.buildSupervisedEmployeeChoices();

        // Build choices for departments
        this.buildSupervisedDepartmentChoices(); 

    },

    /**
     * Gather shift segment information from viewModel.info and load it
     * into a store using accrual.ShiftSegment model
     */
    prepareShiftSegments: function(){
        var vm = this.getViewModel(),
            starts = vm.get('info.ShiftSegComboStartTimes'),
            ends = vm.get('info.ShiftSegComboStopTimes'),
            shiftSegs = [];
        
        // Go through start/end segments and build model records to use in form
        for(
            var i=0,s=starts[0],e=ends[0];
            i<starts.length;
            i++,s=starts[i],e=ends[i]
        ){
            // Add segment info to array
            shiftSegs.push({
                StartMin: s.shiftSegVal,
                StartTime: s.shiftSegStr,
                StopMin: e.shiftSegVal,
                StopTime: e.shiftSegStr
            });
        }

        // Create store in viewModel from prepared data
        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.accrual.ShiftSegment',
            data: shiftSegs
        }, 'shift.segments' );

        // Make shift choice list available to actionSheets, which can't use formula
        var choices = (function(){
            return function(){for(var b=[],a=0,c=0;48>a;a++,c=30*a)b.push(c);
                return b}().map(function(b){var a=Math.floor(b/60)%12;
                var c=720>b?"AM":"PM";a=(0==a?12:a)+":"+(b%60)
                .toZeroPaddedString(2)+c;return{value:b,time:a}});
        })();
        this.addLoadedStoreToViewModel({
            model: 'Breeze.model.employee.schedule.ShiftTime',
            data: choices
        }, 'shiftChoices');
    },


    //===[Company Tab Grid choice store builders/updaters]==

    /**
     * Build/update choices.supervisors store,
     * used to provide choices for editing supervised employees
     */
    buildSupervisorChoices: function(){
        var vm = this.getViewModel(),
            all = vm.get('choices.supervisors'),
            choices = vm.get('choices.supervising'),
            choiceIds = choices.getData().items.map((rec)=>{
                return rec.data.personId;
            }),
            // used = vm.get('companySupervisors').getData().items.map(
            used = vm.get('companySupervisors').getData().items.map(
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
     * Build/update choices.supervisedEmployees store,
     * used to provide choices for editing supervised employees
     * TODO: Finish implementing
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

    /**
     * Update Company Grid List data fields in view model object 'info'
     * by copying current data values from displayed grid stores
     */
    copyCompanyListsToModel: function(){
        var vm = this.getViewModel(),
            supervisors = vm.get('companySupervisors'),
            employees = vm.get('companySupervisedEmployees'),
            departments = vm.get('companyDepartments');
        
        /**
         * Extracts fields from set of records into ordered arrays
         * @param {(Object|Ext.data.Store)} items Store of records to extract items from
         * @param {Object} map Map of array names to source field names
         */
        var extract = function(items, map){
            var records = items.getData().items,
                arrayNames = Object.keys(map),
                arrays = {};
            arrayNames.forEach((n) => { arrays[n] = []; });

            for(
                var ri=0,rec=records[ri];
                ri<records.length;
                ri++,rec=records[ri]
            ) {
                for(
                    var ni=0,name=arrayNames[ni];
                    ni<arrayNames.length;
                    ni++,name=arrayNames[ni]
                ) {
                    arrays[name].push(rec.get(map[name]));
                }
            }

            
            return arrays;
        };

        /**
         * Copies array values to viewmodel field named 'info.<array name>'
         * @param {Object} arrays Object of named arrays from extract
         */
        var copyData = function(arrays){
            var names = Object.keys(arrays);
            names.forEach((n)=>{
                // Update viewmodel attribute values
                vm.set(
                    ['info', n].join('.'),
                    arrays[n]
                );
            })
        };

        /*  The array names used in these calls match to fields they are going to
            be written to in info.* in the ViewModel */
        var superParts = extract(
                supervisors, 
                {
                    Supervisors: 'displayName', SupervisorIds: 'personId', 
                    SupervisorDeptIds: 'departmentId'
                }
            ),
            empParts = extract(
                employees, 
                {
                    SupervisedEmps: 'displayName', SupervisedEmpIds: 'personId', 
                    SupervisedEmpDeptsIds: 'departmentId'
                }
            ),
            departParts = extract(
                departments,
                {
                    SupervisedDepts: 'departmentName', 
                    SupervisedDeptIds: 'departmentId', 
                    DeptRoles: 'roleName', DeptRoleIds: 'roleId'
                }
            );
        
        // Copy array values to ViewModel
        copyData(superParts);
        copyData(empParts);
        copyData(departParts);

        // TODO: Determine exactly what the purpose of 'SupervisedEmpTerms' is
        /*  Fill 'info.SupervisedEmpTerms' with falses matching the length of 
            any of the empParts arrays */
        var empCount = empParts.SupervisedEmps.length;
        vm.set(
            'info.SupervisedEmpTerms',
            (new Array(empCount)).fill(false, 0, empCount)
        );

        console.info('Copied Company grid list data to ViewModel info record');              

    },

    copyShiftSegmentsToModel: function(){
        var vm = this.getViewModel(),
            segments = vm.get('shift.segments');
        
        /**
         * Extracts fields from set of records into ordered arrays
         * @param {(Object|Ext.data.Store)} items Store of records to extract items from
         * @param {Object} map Map of array names to source field names
         */
        var extract = function(items, map){
            var records = items.getData().items,
                arrayNames = Object.keys(map),
                arrays = {};
            arrayNames.forEach((n) => { arrays[n] = []; });

            for(
                var ri=0,rec=records[ri];
                ri<records.length;
                ri++,rec=records[ri]
            ) {
                for(
                    var ni=0,name=arrayNames[ni];
                    ni<arrayNames.length;
                    ni++,name=arrayNames[ni]
                ) {
                    arrays[name].push(rec.get(map[name]));
                }
            }

            
            return arrays;
        };

        /**
         * Copies array values to viewmodel field named 'info.<array name>'
         * @param {Object} arrays Object of named arrays from extract
         */
        var copyData = function(arrays){
            var names = Object.keys(arrays);
            names.forEach((n)=>{
                // Update viewmodel attribute values
                vm.set(
                    ['info', n].join('.'),
                    arrays[n]
                );
            })
        };

        // Extract arrays
        var shiftParts = extract(
            segments,
            {
                ShiftStartSegments: 'StartMin',
                ShiftStartTimes: 'StartTime',
                ShiftStopSegments: 'StopMin',
                ShiftStopTimes: 'StopTime'
            }
        );
        // Extract combos
        var combos = {ShiftSegComboStartTimes: [], ShiftSegComboStopTimes: []},
            segItems = segments.getData().items;
        for(var i=0,itm=segItems[0];i<segItems.length;i++,itm=segItems[i]){
            combos.ShiftSegComboStartTimes.push({
                shiftSegVal: itm.get('StartMin'),
                shiftSegStr: itm.get('StartTime')
            });
            combos.ShiftSegComboStopTimes.push({
                shiftSegVal: itm.get('StopMin'),
                shiftSegStr: itm.get('StopTime')
            });
        }

        // Copy Arrays
        copyData(segments);
        // Copy combos
        copyData(combos);

        console.info('Copied shift grid data to ViewModel info record');

    },

    //===[Methods checking if item can be added to Company List grid]===

    /**
     * Checks whether or not a new supervisor can be added to Company
     * supervisors list, based on specific requirements
     * 
     * If unable to add, displays a warning Toast explaining why
     * 
     * @return {Boolean} True if supervisor can be added, false otherwise
     */
    canAddCompanySupervisor: function(){
        console.info('Checking if able to add supervisor');
        var vm = this.getViewModel(),
            choices = vm.get('choices.supervising'),
            errorPath = 'errors.company.supervisor';
        
        // No choices are available
        if(choices.count() == 0){
            if(vm.get('excludeTerminated')){
                Ext.toast({
                    message: vm.get(`${errorPath}.noChoicesNonTerminated`),
                    type: Ext.Toast.WARN,
                    timeout: 10000
                });
            } else {
                Ext.toast({
                    message: vm.get(`${errorPath}.noChoices`),
                    type: Ext.Toast.WARN,
                    timeout: 10000
                });
            }
            return false;
        }

        return true;
    },

    /**
     * Checks whether or not a new supervised employee can be added to Company
     * supervised employees list, based on specific requirements
     * 
     * If unable to add, displays a warning Toast explaining why
     * 
     * @return {Boolean} True if employee can be added, false otherwise
     */
    canAddCompanyEmployee: function(){
        console.info('Checking if able to add supervisor');
        var vm = this.getViewModel(),
            choices = vm.get('choices.supervisedEmployees'),
            departments = vm.get('companyDepartments'),
            errorPath = 'errors.company.employee';
        
        // No Departments added
        if(departments.count() == 0){
            Ext.toast({
                message: vm.get(`${errorPath}.noDepartments`),
                type: Ext.Toast.WARN,
                timeout: 10000
            });
            return false
        }

        // No choices are available
        if(choices.count() == 0){
            if(vm.get('excludeTerminated')){
                Ext.toast({
                    message: vm.get(`${errorPath}.noChoicesNonTerminated`),
                    type: Ext.Toast.WARN,
                    timeout: 10000
                });
            } else {
                Ext.toast({
                    message: vm.get(`${errorPath}.noChoices`),
                    type: Ext.Toast.WARN,
                    timeout: 10000
                });
            }
            return false;
        }

        return true;
    },

    //===[Shift Segment Event Handlers & Validation Methods]===

    checkForShiftTimeOverlap: function(updatingRecord, start, stop){
        var vm = this.getViewModel(),
            segments = vm.get('shift.segments'),
            otherRecords = segments.queryRecordsBy(
                (r) => { return r !== updatingRecord; }
            ).map((s)=>{
                return [s.get('StartMin'), s.get('StopMin')];
            }),
            noOverlap = true;
        
        /**
         * Check if value overlaps a shift segment
         * @param {Number} v Value to check for overlap
         * @param {Array} r Segment rangeto check against
         * @return {Boolean} True if overlap, false otherwise
         */
        var overlaps = (v, r) => {
            return (v >= r[0] && v <= r[1]);
        };

        if(!Object.isUnvalued(start)){
            // Skip checking start and stop values if not provided
            otherRecords.push([start,stop]);
        }

        otherRecords.forEach((r,i)=>{
            otherRecords.forEach((r2,i2)=>{
                if(i !== i2){
                    r.forEach((v)=>{
                        noOverlap &= !overlaps(v,r2);
                    });
                }
            });
        });

        return !noOverlap;
    },

    /**
     * Event handler for selecting new shift time value
     * @param {Object} comp Component event originates from
     * @param {Ext.data.Model} data New data model
     * @param {Object} eOpts Event options
     */
    onShiftTimeSelect: function(comp, data, eOpts){
        var targetRecord = comp.getParent().ownerCmp.getRecord(),
            changed = comp.getParent().ownerCmp.getColumn().getItemId(),
            selectedData = { 
                time: data.data.time, 
                value: BreezeTime.parse(data.data.time).asMinutes()
            },
            start = (changed == 'start')? selectedData : {
                time: targetRecord.get('StartTime'), 
                value: targetRecord.get('StartMin')
            },
            stop = (changed == 'stop')? selectedData : {
                time: targetRecord.get('StopTime'),
                value: targetRecord.get('StopMin')
            };

        // Validate constraints to ensure values are okay
        var differentTimes = (start.value !== stop.value),
            noOverlap = !this.checkForShiftTimeOverlap(
                targetRecord, start.value, stop.value
            );
        
        if(differentTimes && noOverlap){
            // Changed value is OK, update and commit
            targetRecord.set({
                StartTime: start.time, StartMin: start.value,
                StopTime: stop.time, StopMin: stop.value
            }, {commit: true});
        } else {
            if(!differentTimes){
                // Start and stop times not different
                Ext.toast({
                    type: Ext.Toast.WARN,
                    message: 'The shift end time must be different from the start time.',
                    timeout: 10000
                });
            } else if(!noOverlap){
                // One or more shifts overlap, so show error
                Ext.toast({
                    type: Ext.Toast.ERROR,
                    message: 'One or more shifts overlap.',
                    timeout: 10000
                });
            }
        }
    },

    // onAddShiftSegment: function(comp){
    //     console.info('Add shift segment');
    //     var vm = this.getViewModel(),
    //         segments = vm.get('shift.segments'),
    //         sheet = comp.getParent().getParent(),
    //         startField = sheet.getComponent('startTime'),
    //         stopField = sheet.getComponent('stopTime'),
    //         startRec = startField.getRecord(),
    //         stopRec = stopField.getRecord();
        
    //     if(startField.validate() && stopField.validate()){
    //         var unique = 
    //             (startRec.get('value') !== stopRec.get('value')),
    //             noOverlap = !this.checkForShiftTimeOverlap(
    //                 null,
    //                 startRec.get('value'),
    //                 stopRec.get('value')
    //             );
            
    //         if(unique && noOverlap){
    //             // All good, ready to add new shift segment row
    //             var newRecord = {
    //                 StartTime: (Breeze.fromMinutes(startRec.get('value')).asTime()),
    //                 StartMin: startRec.get('value'),
    //                 StopTime: (Breeze.fromMinutes(stopRec.get('value')).asTime()),
    //                 StopMin: stopRec.get('value')
    //             };
    //             segments.loadData([newRecord], true);
    //             segments.commitChanges();

    //             sheet.hide();
    //             startField.clearValue();
    //             stopField.clearValue();
    //         }
    //     }

    // },

    onAddShiftSegmentDirect: function(){
        var vm = this.getViewModel(),
            segments = vm.get('shift.segments');
        
        segments.loadData([
            {StartTime: '12:00AM', StartMin: 0, StopTime: '12:30AM', StopMin: 30}
        ], true);
        segments.commitChanges();
    },

    onRemoveShiftSegment: function(grid, info){
        var vm = this.getViewModel(),
            records = vm.get('shift.segments'),
            record = records.findRecord('id', info.record.id);
        
        if(record !== null){
            records.remove([record]);
            records.commitChanges();
        }
    },

    //===[Grid List Event Handlers]===

    /**
     * Handle click event for '+' tool button on grid panels
     * list grid panel titles
     * 
     * Uses data included in tools in view to decide which action sheet
     * to display, and whether some condition must be met first
     * 
     * @param {Object} comp Component event originated from
     * @param {Object} tool Tool component firing event
     */
    onGridAddButton: function(comp, tool){
        var actSheet = this.lookup(tool.getData().sheet),
            checkHandler = tool.getData().checkHandler,
            canShow = true;
        
        if(!Object.isUnvalued(checkHandler)){
            // Check handler name was provided
            canShow = this[checkHandler]();
        }
        
        if(canShow){
            actSheet.show();
        }

        console.info('Handling add button click for company grid');
    },    

    //==[Edit Cell Change Events]==

    /**
     * Handle select event for supervised employees grid cell editor plugin
     * @param {Object} comp Select field component
     * @param {Object} data New data
     * @param {Object} eOpts Event Options
     */
    onEditSupervisorSelect: function(comp, data, eOpts){
        var targetRecord = comp.getParent().ownerCmp.getRecord();
        
        targetRecord.set({
            personId: data.data.personId,
            displayName: data.data.displayName
        }, {commit: true});

        console.info('Select updated record!');
        this.buildSupervisorChoices();
    },

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

    //==[Company List ActionSheet Add event handlers]==

    /**
     * Handle clicking 'Add' button in 'Add Supervised Department'
     * ActionSheet.
     * 
     * If valid, adds a new row to the Supervisor grid
     * 
     * @param {Object} comp Button firing event
     */
    onCompanyAddSupervisor: function(comp){
        var vm = this.getViewModel(),
            chosenSupers = vm.get('companySupervisors'),
            sheet = comp.getParent().getParent(),
            supField = sheet.getComponent('supervisor');
        
        if(supField.validate()){
            // Both fields are valid, so make use of them
            var supRecord = supField.getSelection().getData(),
                newRecord = {
                    personId: supRecord.personId,
                    displayName: supRecord.displayName,
                    departmentId: supRecord.departmentId
                };
            chosenSupers.loadData([newRecord], true);
            chosenSupers.commitChanges();
            // Refresh available choices
            this.buildSupervisorChoices();
        }
        
        // Close action sheet and reset values to empty
        sheet.hide();
        supField.clearValue();
        
        console.info('Add supervisor');
    },

    /**
     * Handle clicking 'Add' button in 'Add Supervised Employee'
     * ActionSheet.
     * 
     * If valid, adds a new row to the Employees grid
     * 
     * @param {Object} comp Button firing event
     */
    onCompanyAddEmployee: function(comp){
        var vm = this.getViewModel(),
            chosenSupers = vm.get('companySupervisedEmployees'),
            sheet = comp.getParent().getParent(),
            supField = sheet.getComponent('employee');
        
        if(supField.validate()){
            // Both fields are valid, so make use of them
            var supRecord = supField.getSelection().getData(),
                newRecord = {
                    personId: supRecord.personId,
                    displayName: supRecord.displayName,
                    departmentId: supRecord.departmentId
                };
            chosenSupers.loadData([newRecord], true);
            chosenSupers.commitChanges();
            // Refresh available choices
            this.buildSupervisorChoices();
        }
        
        // Close action sheet and reset values to empty
        sheet.hide();
        supField.clearValue();
        
        console.info('Add employee');
    },

    /**
     * Handle clicking 'Add' button in 'Add Supervised Department'
     * ActionSheet.
     * 
     * If valid, adds a new row to the Supervised Departments grid
     * 
     * @param {Object} comp Button firing event
     */
    onCompanyAddDepartment: function(comp){
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
        
            // Close action sheet and reset values to empty
            sheet.hide();
            deptField.clearValue();
            roleField.clearValue();
        
        }
        
        
        console.info('Add supervised department');
    },
    
    //==[Company List 'Remove' tool handlers]==


    /**
     * Handles 'remove' tool in Supervisor grid
     * under 'Company' tab
     */
    onCompanyRemoveSupervisorTool: function(grid, info){
        var vm = this.getViewModel(),
            records = vm.get('companySupervisors'),
            record = records.findRecord('id', info.record.id);
        
        if(record !== null){
            records.remove([record]);
            records.commitChanges();

            this.buildSupervisorChoices();
        }

        console.info('removed supervisor');
    },

    /**
     * Handles 'remove' tool in Supervised Employees grid
     * under 'Company' tab
     */
    onCompanyRemoveSupervisedEmployeeTool: function(grid, info){
        var vm = this.getViewModel(),
            records = vm.get('companySupervisedEmployees'),
            record = records.findRecord('id', info.record.id);
        
        if(record !== null){
            records.remove([record]);
            records.commitChanges();

            this.buildSupervisedEmployeeChoices();
        }

        console.info('removed supervised employee');
    },

    /**
     * Handles 'remove' tool in Supervised Departments grid
     * under 'Company' tab
     */
    onCompanyRemoveDepartmentTool: function(grid, info){
        var vm = this.getViewModel(),
            records = vm.get('companyDepartments'),
            record = records.findRecord('id', info.record.id);
        
        if(record !== null){
            records.remove([record]);
            records.commitChanges();

            this.buildSupervisedDepartmentChoices();
        }

        console.info('removed department');
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

    // TODO: Finish implementing data binding for layoffs
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

    //==[Sidebar methods]==
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

    onEditProfilePictureTap: function(ref, e, eOpts){
        var view = this.getView(),
            dialog = this.lookup('profilePictureEditorDialog');
        if(!dialog){
            dialog = Ext.apply({ ownerCmp: view }, view.dialog);
            dialog = Ext.create(dialog);
        }
        dialog.show();
    },

    /**
     * Handle profile image edit dialog's 'remove' button
     */
    onRemoveProfilePicture: function(ref,e,eOpts){

        var picSettings = Breeze.helper.settings.Employee.profilePicture,
            vm = this.getViewModel(),
            form = this.lookup('profilePictureForm');
        
        // Update photo flag in view model to false, indicating no custom pic
        vm.set('info.PhotoFlag', false);

        // Update photo path in view model to default image
        vm.set(
            'info.Photo',
            `${picSettings.path}${picSettings.defaultFile}`
        );

        // Update form fields
        form.getComponent('hasPicture').setValue(false);
        form.getComponent('imageFieldSet')
            .getComponent('imageFile').reset();

        console.info('Profile photo removed.');
    },

    /**
     * Handle profile image edit dialog's 'upload' button
     */
    onUploadProfilePicture: function(ref,e,eOpts){
        var vm = this.getViewModel(),
            employeeId = vm.get('employeeId'),
            form = this.lookup('profilePictureForm');

        console.info('Upload profile image');
        
        this.apiClass.information.uploadPictureAjax(
            form,
            employeeId
        ).then((url) => {
            // Successfully uploaded new image
            // Update photo url in data model
            vm.set('info.Photo', url);
            // console.info('New profile picture URL: ', url);
            // Display success toast
            Ext.toast({
                message: 'Profile picture successfully updated.',
                type: Ext.Toast.INFO,
                timeout: 10000
            });
            // Hide upload form
            form.getParent().hide();
            // Reset form fields
            form.reset();
        }).catch((err) => {
            if(err.extra){
                // console.warn(
                //     'Upload profile picture failed with extra response data:', 
                //     err.extra.error
                // );
            }
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
    onCancelProfilePictureEdit: function(ref, e, eOpts){
        this.lookup('pictureFileField').reset();
        ref.getParent().getParent().hide();
        // this.lookup('profilePictureForm').reset();
    },


    //===[Save/Revert Logic and Event Handlers]===

    // TODO: Finish validation implementation
    validate: function(){
        var vm = this.getViewModel(),
            segments = vm.get('shift.segments');

        // TODO: add shift validity check
        var shiftsOverlapValid = true,
            shiftsUniqueValid = true;
        
        // for(var i=0,rec=segments.getAt(0);i<segments.count;i++,rec=segments.getAt(i)){
        //     shiftsOverlapValid &= this.checkForShiftTimeOverlap(rec);
        // }
        



        // Collect tab containers we need to check for required fields
        var employeeTab = this.lookup('employeeTab'),
            employeeValid = true,
            companyTab = this.lookup('companyTab'),
            companyValid = true,
            securityTab = this.lookup('securityTab'),
            securityValid = true;
        
        ['first_name', 'last_name'].forEach((f)=>{
            var partValid = employeeTab.down(`[name=${f}]`).validate();
            employeeValid = employeeValid && partValid;
        });
        ['department'].forEach((f)=>{
            var partValid = companyTab.down(`[name=${f}]`).validate();
            companyValid = companyValid && partValid;
        });
        ['user_name'].forEach((f)=>{
            var partValid = securityTab.down(`[name=${f}]`).validate();
            securityValid = securityValid && partValid
        });
        if(vm.get('newEmployee')){
            securityValid = securityValid && securityTab.down(`[name=create_password]`);
        }

        return employeeValid && companyValid && securityValid;

    },

    /**
     * Handle Save button click event
     * @param {Object} comp Event source component
     * @param {Object} e Event object
     */
    onSaveButtonTap: function(comp, e){
        var vm = this.getViewModel();
        console.info('Save button pressed');
        if(this.validate()){
            console.info('Validation passed')
            // If validation passed, copy extra data to ViewModel

            this.copyCompanyListsToModel();
            this.copyShiftSegmentsToModel();

            if(vm.get('newEmployee')){
                console.info('Creating new employee record');
                this.apiClass.information.addNewEmployee(
                    this.gatherCreateParams()
                ).then((resp) => {
                    Ext.toast({
                        type: resp.type,
                        message: resp.message,
                        timeout: 10000
                    });
                    // TODO: Decide where to navigate to after successfull save
                }).catch((resp)=>{
                    var msg = resp.message;
                    if(typeof resp.err == 'string'){
                        msg = msg.concat('<br>(', resp.err, ')');
                    }
                    Ext.toast({
                        type: resp.type,
                        message: msg,
                        timeout: 10000
                    })
                });
            } else {
                // Call update API method
                this.apiClass.information.updateEmployee(
                    this.gatherUpdateParams()
                ).then((resp)=>{
                    Ext.toast({
                        message: resp.message,
                        type: resp.type,
                        timeout: 10000
                    });
                    // try to reload view
                    if(this.onInit){
                        this.onInit(this.getView());
                    }
                }).catch((resp)=>{
                    Ext.toast({
                        message: resp.message,
                        type: resp.type,
                        timeout: 10000
                    });
                    console.warn('Save failed: ', resp.err, resp.info)
                })
            }
        }
        console.info('ViewModel updated');
    },

    onRevertButtonTap: function(comp, e){
        console.info('Revert button pressed');
    },

    /**
     * Collect all parameters into a single object for submission
     * @return {Object} Employee info params
     */
    gatherUpdateParams: function(){
        var vm = this.getViewModel(),
            params = {};

        params.employee_id = vm.get('employeeId');
        params.first_name = vm.get('info.FirstName');
        params.last_name = vm.get('info.LastName');
        params.middle_name = vm.get('info.MiddleName');
        params.company_employee_id = vm.get('info.CustomerID');
        params.ssn = vm.get('info.SSN');
        params.payroll = vm.get('info.Payroll');
        params.date_of_hire = vm.get('info.HireDate');
        params.date_of_birth = vm.get('info.BirthDate');
        params.date_of_termination = vm.get('info.TerminationDate');
        params.comp_rate = vm.get('info.CompRate');
        params.comp_per = vm.get('info.CompPer');
        params.sex = vm.get('info.Gender');
        params.picture_path = vm.get('info.Photo');
        // params.picture_modified = vm.get('info.PhotoFlag').toString();
        params.picture_modified = vm.get('info.PhotoFlag');
        // exempt = (vm.get('info.Exempt') == 138);
        params.exempt = false;
        params.notes = vm.get('info.Notes');
        params.recording_mode = vm.get('info.RecordingMode');
        params.exempt_status = vm.get('info.ExemptStatus');
        params.badge_id = vm.get('info.Badge');
        params.email = vm.get('info.Email').trim();
        params.department_id = vm.get('info.Department');
        params.schedule_id = vm.get('info.StartUpSettings');
        params.punchpolicy_id = vm.get('info.punchPolicy.policy_id');
        params.default_project = vm.get('info.DefaultProject');
        // TODO: figure out what determines these values
        params.changeAllowedTime = false;
        params.changePastTime = false;
        params.changeUserModifiedTime = false;
        params.user_modified = true;
        // The next six array items have to be string joined and submitted as lists
        params.shiftStartSegments = vm.get('info.ShiftStartSegments').join(',');
        params.shiftStopSegments = vm.get('info.ShiftStopSegments').join(',');
        params.supervisor_ids = vm.get('info.SupervisorIds').join(',');
        params.employee_ids = vm.get('info.SupervisedEmpIds').join(',');
        params.department_ids = vm.get('info.SupervisedDeptIds').join(',');
        params.department_role_ids = vm.get('info.DeptRoleIds').join(',');
        params.user_type = vm.get('info.LoginType');
        params.ot_opt1 = vm.get('info.punchPolicy.Ot_Opt1');
        params.ot_opt2 = vm.get('info.punchPolicy.Ot_Opt2');
        params.ot_opt3 = vm.get('info.punchPolicy.Ot_Opt3');
        params.ot_opt4 = vm.get('info.punchPolicy.Ot_Opt4');
        params.ot_day1 = vm.get('info.punchPolicy.Ot_Day1');
        params.ot_day2 = vm.get('info.punchPolicy.Ot_Day2');
        params.ot_day3 = vm.get('info.punchPolicy.Ot_Day3');
        params.ot_day4 = vm.get('info.punchPolicy.Ot_Day4');
        params.ot_week1 = vm.get('info.punchPolicy.Ot_Week1');
        params.ot_week2 = vm.get('info.punchPolicy.Ot_Week2');
        params.ot_week3 = vm.get('info.punchPolicy.Ot_Week3');
        params.ot_week4 = vm.get('info.punchPolicy.Ot_Week4');
        params.ot_rate1 = vm.get('info.punchPolicy.Ot_Rate1');
        params.ot_rate2 = vm.get('info.punchPolicy.Ot_Rate2');
        params.ot_rate3 = vm.get('info.punchPolicy.Ot_Rate3');
        params.ot_rate4 = vm.get('info.punchPolicy.Ot_Rate4');
        params.subtract_dayot = vm.get('info.punchPolicy.Subtract_DayOt');
        params.round_increment = vm.get('info.punchPolicy.Round_Increment');
        params.round_offset = vm.get('info.punchPolicy.Round_Offset');
        params.Allow_RegularPunch = vm.get('info.punchPolicy.Allow_RegularPunch');
        params.Allow_QuickPunch = vm.get('info.punchPolicy.Allow_QuickPunch');
        params.Auto_PunchIn = vm.get('info.punchPolicy.Auto_PunchIn');
        params.Auto_PunchOut = vm.get('info.punchPolicy.Auto_PunchOut');
        params.Auto_Close_Shift = vm.get('info.punchPolicy.Auto_Close_Shift');
        params.Auto_LunchPunch = vm.get('info.punchPolicy.Auto_LunchPunch');
        params.LunchPunch_Seg = vm.get('info.punchPolicy.LunchPunch_Seg');
        params.LunchPunch_Hours = vm.get('info.punchPolicy.LunchPunch_Hours');
        params.Can_Add_Projects = vm.get('info.punchPolicy.Can_Add_Projects');
        params.Can_Add_Notes = vm.get('info.punchPolicy.Can_Add_Notes');
        params.Can_Edit_Notes = vm.get('info.punchPolicy.Can_Add_Notes');
        params.Can_Edit_Projects = vm.get('info.punchPolicy.Can_Edit_Notes');
        params.Can_Adjust_Punches = vm.get('info.punchPolicy.Can_Adjust_Punches');
        params.Can_Use_TimeSheets = vm.get('info.punchPolicy.Can_Use_TimeSheets');
        params.InOut_Opt = vm.get('info.punchPolicy.InOut_Opt');
        params.Can_Use_InOut = vm.get('info.punchPolicy.Can_Use_InOut');
        params.policy_id = vm.get('info.StartUpSettings');
        var nullSanitized = {},
            attrs = Object.keys(params);
        attrs.forEach((a)=>{
            nullSanitized[a] = params[a];
            if(Object.isUnvalued(nullSanitized[a])){
                nullSanitized[a]="";
            }
        });
        return nullSanitized;
    },

    gatherCreateParams: function(){
        var vm = this.getViewModel(),
            params = {
                first_name: vm.get('info.FirstName'),
                last_name: vm.get('info.LastName'),
                middle_name: vm.get('info.MiddleName'),
                employee_id: vm.get('info.CustomerID').trim(),
                ssn: vm.get('info.SSN'),
                payroll: vm.get('info.Payroll'),
                date_of_hire: vm.get('info.HireDate'),
                date_of_birth: vm.get('info.BirthDate'),
                date_of_termination: vm.get('info.TerminationDate'),
                comp_rate: vm.get('info.CompRate'),
                comp_per: vm.get('info.CompPer'),
                sex: vm.get('info.Gender'),
                picture_path: vm.get('info.Photo'),
                exempt: false,
                notes: vm.get('info.Notes'),
                recording_mode: vm.get('info.RecordingMode'),
                exempt_status: vm.get('info.ExemptStatus'),
                badge_id: vm.get('info.Badge'),
                email: vm.get('info.Email').trim(),
                department_id: vm.get('info.Department'),
                schedule_id: vm.get('info.StartUpSettings'),
                punchpolicy_id: vm.get('info.punchPolicy.policy_id'),
                default_project: vm.get('info.DefaultProject'),
                username: vm.get('info.Username'),
                password: vm.get('initialPassword'),
                shiftStartSegments: vm.get('info.ShiftStartSegments').join(','),
                shiftStopSegments: vm.get('info.ShiftStopSegments').join(','),
                user_modified: true,
                user_type: vm.get('info.LoginType'),
                supervisor_ids: vm.get('info.SupervisorIds').join(','),
                employee_ids: vm.get('info.SupervisedEmpIds').join(','),
                department_ids: vm.get('info.SupervisedDeptIds').join(','),
                department_role_ids: vm.get('info.DeptRoleIds').join(',')
            };
        return params;
    }

});