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
        'Breeze.api.admin.Departments'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        // Instantiate api class
        this.apiClass = Ext.create('Breeze.api.admin.Departments');

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

    loadDepartments: function (selectId) {
        var me = this;

        this.addStoreToViewModel(
            'Breeze.store.company.DepartmentList',
            'departmentList',
            {
                load: true,
                loadOpts: {
                    callback: function (records, op, success) {
                        if (success && records.length > 0) {
                            var record = records[0];
                            if (!Object.isUnvalued(selectId)) {
                                record = records.find((r) => {
                                    return r.get('Id') == selectId;
                                });
                            }
                            this.lookup('departmentsList').getSelectable()
                                .setSelectedRecord(record);
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
            dialog = this.addSupervisorDialog;

        if (!dialog) {
            dialog = Ext.apply({
                ownerCmp: view
            }, view.addSupervisorDialog);
            this.addSupervisorDialog = dialog = Ext.create(dialog);
        }

        dialog.show();
    },

    onAddSupervisorDialogCancel: function () {
        this.addSupervisorDialog.hide();
    },

    //===[Event Handlers]===

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

    onEditSupervisorRoleSelect: function (comp, data) {
        var record = comp.getParent().ownerCmp.getRecord();

        record.set({
            roleId: data.data.Role_Id,
            Role_Name: data.data.Role_Name
        }, { commit: true });

        record.commit();
    },

    onRemoveSupervisor: function (grid, data) {
        var me = this,
            vm = this.getViewModel();

        data.record.store.remove(data.record);
        // this.api.removeSupervisor(
        //     vm.get('departmentData.Id'),
        //     data.record.get('supervisorId'),
        //     data.record.get('roleId')
        // ).then((r) => {
        //     Ext.toast({
        //         type: r.type,
        //         message: r.message,
        //         timeout: 8000
        //     });
        //     me.loadDepartments(vm.get('departmentData.Id'));
        // }).catch((e) => {
        //     Ext.toast({
        //         type: e.type,
        //         message: e.message,
        //         timeout: 8000
        //     });
        // });
    }
});