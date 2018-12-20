/**
 * View Controller for Punch Policies Admin view
 * @class PunchPoliciesController
 * @namespace Breeze.view.admin.PunchPoliciesController
 * @alias controller.admin.punchpolicies
 */
Ext.define('Breeze.view.admin.PunchPoliciesController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.punchpolicies',

    requires: [
        'Breeze.api.admin.PunchPolicies',
        'Breeze.mixin.CommonToolable'
    ],

    mixins: {
        commonToolable: 'Breeze.mixin.CommonToolable'
    },

    config: {
        injectTools: true
    },

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        var me = this,
            vm = this.getViewModel();

        this.api = Ext.create('Breeze.api.admin.PunchPolicies');
        this.loadPolicies();
    },

    /**
     * (re)load policies
     * @param {Object} selectedId Optional ID of policy to highlight after load
     */
    loadPolicies: function (selectedId) {
        var me = this;

        this.addStoreToViewModel(
            'Breeze.store.record.punchPolicies.DetailList',
            'policies',
            {
                load: true,
                loadOpts: {
                    callback: function (records, op, success) {
                        if (success && records.length > 0) {
                            var record = records[0];
                            if (!Object.isUnvalued(selectedId)) {
                                record = records.find((r) => {
                                    return r.get('policy_id') == selectedId;
                                });
                            }
                            this.lookup('policyList').getSelectable()
                                .setSelectedRecord(record);
                        }
                    },
                    scope: me
                }
            }
        );
    },

    //===[Event Handlers]===
    onPolicySelect: function (list, record) {
        var vm = this.getViewModel();

        // this.copyRecordToViewModelData(
        //     record,
        //     'policyData'
        // );
        vm.set('policyData', Ext.clone(record.getData()));

    },

    onPolicyRemove: function () {
        var me = this,
            vm = this.getViewModel(),
            policyId = vm.get('policyData.policy_id');
        this.api.delete(policyId).then((r) => {
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 8000
            });
            me.loadPolicies();
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 8000
            });
        });
    },

    /**
     * Call add policy API method when 'add' is clicked in template dialog
     * @param {Object} cmp 
     */
    onPolicyAdd: function (cmp) {
        var me = this,
            vm = this.getViewModel(),
            dlg = cmp.getParent().getParent(),
            templateId = dlg.getComponent('templateList').getSelectable()
                .getSelectedRecord().get('policy_id');

        // hide dialog
        dlg.hide();

        // make api call
        this.api.add(templateId).then((r) => {
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 8000
            });
            me.loadPolicies(parseInt(r.id));
        }).catch((e) => {
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 8000
            });
        });
    },

    showAddTemplateDialog: function () {
        var view = this.getView(),
            dialog = this.addTemplateDialog;

        if (!dialog) {
            dialog = Ext.apply({
                ownerCmp: view
            }, view.addTemplateDialog);
            this.addTemplateDialog = dialog = Ext.create(dialog);
        }

        dialog.getButtons().getComponent('add').setDisabled(
            dialog.getComponent('templateList').getSelectionCount() == 0
        );
        dialog.show();
    },


    /**
     * Update whether 'add' button is enabled when a template is selected
     * @param {*} list 
     * @param {*} record 
     */
    onTemplateSelect: function (list, record) {
        list.getParent().getButtons().getComponent('add').setDisabled(Object.isUnvalued(record));
    },

    onAddTemplateDialogCancel: function () {
        this.addTemplateDialog.hide();
    },

    showApplyToEmployeesDialog: function () {
        var view = this.getView(),
            dialog = this.applyToEmployeesDialog,
            vm = this.getViewModel(),
            me = this,
            params = vm.saveParameters();

        this.api.update(params).then((r) => {
            me.api.applicableEmployees(vm.get('policyData.policy_id')).then((r) => {
                vm.set('targetEmployees', r);
                if (!dialog) {
                    dialog = Ext.apply({
                        ownerCmp: view
                    }, view.applyToEmployeesDialog);
                    me.applyToEmployeesDialog = dialog = Ext.create(dialog);
                }
    
                dialog.getButtons().getComponent('add').setDisabled(
                    dialog.getComponent('employeesList').gatherSelected().length == 0
                );
    
                dialog.show();
            }).catch((e) => {
                console.warn('Error showing apply to employees dialog', e);
                Ext.toast({
                    type: Ext.Toast.ERROR,
                    message: 'Unable to get Employees',
                    timeout: 8000
                });
            });
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 8000
            });
        });
    },

    /**
     * Update whether 'add' button is enabled when an employee is selected
     * @param {*} list 
     * @param {*} record 
     */
    onEmployeeSelect: function (list, record) {
        list.getParent().getButtons().getComponent('add').setDisabled(
            list.gatherSelected().length == 0
        );
    },

    onApplyToEmployeesDialogCancel: function () {
        this.applyToEmployeesDialog.hide();
    },

    onPolicyApply: function(){
        var dialog = this.applyToEmployeesDialog,
            vm = this.getViewModel(),
            me = this,
            employees = dialog.getComponent('employeesList').getSelectable()
                .getSelectedRecords().map((r)=>{return r.get('id')});
            
        this.api.applyToEmployees(
            vm.get('policyData.policy_id'),
            employees.join(',')
        ).then((r)=>{
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 8000
            });
            dialog.hide();
            me.loadPolicies(parseInt(vm.get('policyData.policy_id')));
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 8000
            });
            dialog.hide();
        });
    },

    onSave: function () {
        var me = this,
            vm = this.getViewModel(),
            params = vm.saveParameters();

        this.api.update(params).then((r) => {
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 8000
            });
            me.loadPolicies(parseInt(vm.get('policyData.policy_id')));
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 8000
            });
        });
    }



    //===[Display/Calculation Functions]===






});