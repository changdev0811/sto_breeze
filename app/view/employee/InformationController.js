/**
 * Controller for Employee Information View
 */
Ext.define('Breeze.view.employee.InformationController', {
    extend: 'Ext.app.ViewController',
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

        this.loadStores(function(pass){
            // Provide loaded stores to form fields needing them
            comp.lookup('departments').setStore(vm.getStore('departments'));
            comp.lookup('accrualPolicy').setStore(vm.getStore('scheduleList'));
            comp.lookup('defaultProject').setStore(vm.getStore('projectList'));
            me.loadEmployeeInfo(component, function(c){
                // == After Employee Info loads ==
                // Assign check fields after info loaded
                var exemptStatus = vm.get('info.ExemptStatus');
                c.lookup('exemptStatus').down('[value=' + exemptStatus + ']').setChecked(true);
                var recordingMode = vm.get('info.RecordingMode');
                c.lookup('recordingMode').down('[value=' + recordingMode + ']').setChecked(true);

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
            scheduleList: Ext.create('Breeze.store.employee.ScheduleList'),
            projectList: Ext.create('Breeze.store.company.FlatProjectList')
        });

        vm.getStore('departments').load({callback: function(r,o,success){
            if(success){
                vm.getStore('scheduleList').load({callback: function(r,o,success){
                    if(success){
                        vm.getStore('projectList').load({callback: function(r,o,success){
                            if(success){
                                callback(true);
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
        var empId = component.getData().employee;
        this.apiClass.information.getEmployeeInfo(
            empId
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

    displayFormData: function(c,vm){
        //c.queryById('firstName').setValue()
    }
});