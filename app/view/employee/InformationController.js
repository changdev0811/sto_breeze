/**
 * Controller for Employee Information View
 */
Ext.define('Breeze.view.employee.InformationController', {
    extend: 'Ext.app.ViewController',
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
                me.loadEmployeeInfo(component, function(c){
                    // == After Employee Info loads ==
                    // Assign check fields after info loaded
                    var exemptStatus = vm.get('info.ExemptStatus');
                    c.lookup('exemptStatus').down('[value=' + exemptStatus + ']').setChecked(true);
                    var recordingMode = vm.get('info.RecordingMode');
                    c.lookup('recordingMode').down('[value=' + recordingMode + ']').setChecked(true);
                    me.loadShiftSegments(vm);
                    me.applyCompanyConfig();
                    // if(vm.get('info.LoginType') == 13){
                    //     vm.set('lists.employees.enabled', false);
                    //     vm.set('lists.departments.enabled', false);
                    //     var companyLists = c.lookupReference('companuListTabs');
                    // }
                    me.toggleCompanyLists(c);
                });
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
                    if(vm.get('employeeId') == 'mew'){
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
                                ssnPlain.parent.remove(ssnPlain);
                            }
                            if(!vm.get('perms.compensation')){
                                var compPlain = me.view.lookup('compensationPlain');
                                compPlain.parent.remove(compPlain);
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
            me.empId
        ).then(function(data){
            console.log("Loaded Employee Data Test");
            var vm = me.getViewModel();
            var info = data.employee;
            info.punchPolicy = data.punchPolicy;
            vm.set('info',info);
            callback(component);
            // vm.setData(data.data);
        }).catch(function(err){
            console.log("Employee Info Error");
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
    }

});