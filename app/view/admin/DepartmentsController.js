/**
 * View Controller for Departments Admin view
 * @class DepartmentsController
 * @namespace Breeze.view.admin.DepartmentsController
 * @alias controller.admin.departments
 */
Ext.define('Breeze.view.admin.DepartmentsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.departments',

    requires: [
        'Breeze.api.admin.Departments',
        'Breeze.mixin.CommonToolable'
    ],

    mixins: {
        commonToolable: 'Breeze.mixin.CommonToolable'
    },

    config: {
        // Tell common tools mixin to inject print and refresh tool buttons
        injectTools: true
    },

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        // Instantiate api class
        this.api = Ext.create('Breeze.api.admin.Departments');

        // Load supervisor list
        this.addStoreToViewModel(
            'Breeze.store.company.SupervisorList',
            'supervisorList',
            { load: true }
        );

        // Make department config store ready for loading
        this.addStoreToViewModel(
            'Breeze.store.company.config.Department',
            'departmentConfig',
            { load: false }
        );

        this.addStoreToViewModel(
            'Breeze.store.company.SecurityRoleList',
            'roles',
            { load: true }
        );

        this.addStoreToViewModel(
            'Breeze.store.company.department.Employees',
            'employees',
            { load: false }
        );

        this.loadDepartments();

    },

    loadDepartments: function (selectId, searchString) {
        var me = this,
            searchString = Object.defVal(searchString, ''),
            vm = this.getViewModel();

        this.addStoreToViewModel(
            'Breeze.store.company.DepartmentList',
            'departmentList',
            {
                load: true,
                createOpts: { searchString: searchString },
                loadOpts: {
                    callback: function (records, op, success) {
                        if (success && records.length > 0) {
                            var record = records[0];
                            if (!Object.isUnvalued(selectId)) {
                                record = records.find((r) => {
                                    return r.get('Id') == selectId;
                                });
                            }
                            if (searchString == '') {
                                this.lookup('departmentsList').getSelectable()
                                    .setSelectedRecord(record);
                            } else {
                                this.api.filteredList(searchString).then((r) => {
                                    var excluded = records.find((rec) => {
                                        return !r.includes(rec.get('Id').toString());
                                    });
                                    vm.get('departmentList').remove(excluded);
                                    if (records.length - excluded.length > 0) {
                                        this.lookup('departmentsList').getSelectable()
                                            .setSelectedRecord(record);
                                    }
                                });
                            }
                        }
                    },
                    scope: me
                }
            }
        )
    },

    //===[Add Supervisor Dialog]===
    showAddSupervisorDialog: function () {
        var view = this.getView(),
            vm = this.getViewModel();
            dialog = this.addSupervisorDialog;

        if (!dialog) {
            dialog = Ext.apply({
                ownerCmp: view
            }, view.addSupervisorDialog);
            this.addSupervisorDialog = dialog = Ext.create(dialog);
        }

        dialog.getComponent('supervisorSelector').setValue(null);

        var supervisorsInUse = vm.get('supervisors').getData().items.map((r)=>{
            return r.get('supervisorId').toString();
        });

        var supervisorsUnused = vm.get('supervisorList').queryBy((r)=>{
            return !supervisorsInUse.includes(r.get('id').toString());
        });

        var choices = supervisorsUnused.items.map((r)=>{
            return {name: r.get('displayName'), id: r.get('id')};
        });

        dialog.getComponent('supervisorSelector').setOptions(choices);



        dialog.show();
    },

    onAddSupervisorDialogCancel: function () {
        this.addSupervisorDialog.hide();
    },

    //===[Event Handlers]===

    onSearch: function(src){
        this.loadDepartments(null, src.getValue());
    },

    onDepartmentSelect: function (list, selectedRecord) {
        var vm = this.getViewModel(),
            me = this;
        if (!Object.isUnvalued(selectedRecord)) {

            this.copyRecordToViewModel(
                selectedRecord.getData(),
                'departmentData'
            );

            var dConfig = vm.get('departmentConfig');

            // Force proxy to update so params take effect
            dConfig.updateProxy(dConfig.getProxy());
            dConfig.setDepartmentId(selectedRecord.get('Id'));

            // Reload store
            dConfig.load({
                callback: function (s) {
                    me.copyRecordToViewModel(
                        dConfig.getAt(0).get('ConflictLimit'),
                        'conflictLimit'
                    );
                }
            });

            var employees = vm.get('employees');

            employees.updateProxy(employees.getProxy());
            employees.setDepartmentId(selectedRecord.get('Id'));

            employees.load();

            // vm.get('supervisorList').load();

            this.addStoreToViewModel(
                'Breeze.store.company.department.Supervisors',
                'supervisors',
                {
                    load: true,
                    createOpts: { departmentId: vm.get('departmentData.Id') }
                }
            );

            // Update seleected department id value
            vm.set('selectedDepartmentId', selectedRecord.get('Id'));
        }
    },

    onAddDepartment: function () {
        this.api.create().then((r) => {
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 8000
            });
            me.loadDepartments();
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 8000
            });
        });
    },

    onRemoveDepartment: function () {
        var me = this,
            vm = this.getViewModel(),
            id = vm.get('departmentData.Id');

        this.api.canRemove(id).then((r) => {
            me.api.remove(id).then((r2) => {
                Ext.toast({
                    type: r2.type,
                    message: r2.message,
                    timeout: 8000
                });
                me.loadDepartments();
            }).catch((e2) => {
                Ext.toast({
                    type: e2.type,
                    message: e2.message,
                    timeout: 8000
                });
            });
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 12000
            });
        });
    },

    onAddSupervisor: function(){
        var me = this,
            vm = this.getViewModel(),
            dlg = this.addSupervisorDialog;
        
        var supervisors = vm.get('supervisors'),
            superSelect = dlg.getComponent('supervisorSelector'),
            roleSelect = dlg.getComponent('roleSelector'),
            superId = superSelect.getValue(),
            superRec = superSelect.getStore().query('id',superId).getAt(0),
            roleId = roleSelect.getValue(),
            roleRec = roleSelect.getStore().query('Role_Id', roleId).getAt(0);
        
        supervisors.add({
            supervisorId: superId,
            roleId: roleId,
            Name: superRec.get('name'),
            Role_Name: roleRec.get('Role_Name')  
        });

        dlg.hide();
    },

    onEditSupervisorRoleSelect: function (comp, data) {
        var record = comp.getParent().ownerCmp.getRecord();

        record.set({
            roleId: data.data.Role_Id,
            Role_Name: data.data.Role_Name
        });

        record.commit();
    },

    onRemoveSupervisor: function (grid, data) {
        var me = this,
            vm = this.getViewModel();

        data.record.store.remove(data.record);
    },

    onSave: function(){
        var me = this,
            vm = this.getViewModel(),
            supervisors = vm.get('supervisors'),
            dept = vm.get('departmentData'),
            id = dept.get('Id');
        
        var newSupers = supervisors.getNewRecords(),
            updatedSupers = supervisors.getModifiedRecords(),
            removedSupers = supervisors.getRemovedRecords();

        var pending = [];

        // Build new supervisor creation promises
        for(var i=0;i<newSupers.length;i++){
            var s = newSupers[i];
            pending.push(
                me.api.addSupervisor(
                    id,
                    s.get('supervisorId'),
                    s.get('roleId')
                )
            );
        }

        // Build update supervisor promises
        for(var i=0;i<updatedSupers.length;i++){
            var s = updatedSupers[i];
            pending.push(
                me.api.updateSupervisor(
                    id,
                    s.get('supervisorId'),
                    s.get('roleId')
                )
            );
        }

        // Build removed supervisor promises
        for(var i=0;i<removedSupers.length;i++){
            var s = removedSupers[i];
            pending.push(
                me.api.removeSupervisor(
                    id,
                    s.get('supervisorId'),
                    s.get('roleId')
                )
            );
        }

        Promise.all(pending).then((r)=>{
            me.api.update(
                id,
                dept.get('Name'),
                {ConflictLimit: vm.get('ConflictLimit')}
            ).then((r2)=>{
                // Successfull
                Ext.toast({
                    type: r2.type,
                    message: r2.message,
                    timeout: 8000
                });
                me.loadDepartments(id);
            }).catch((e2)=>{
                // Update failed
                Ext.toast({
                    type: e2.type,
                    message: e2.message,
                    timeout: 8000
                });
            });
        }).catch((e)=>{
            // 1+ Supervisor api operations failed
            Ext.toast({
                type: Ext.Toast.ERROR,
                message: 'Error while updating Supervisors.<br>Unable to save Department.',
                timeout: 10000
            });
        });
    }
});