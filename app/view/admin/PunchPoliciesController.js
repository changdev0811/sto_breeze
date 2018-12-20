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
        var me = this;

        this.copyRecordToViewModelData(
            record,
            'policyData'
        );

    },

    onPolicyRemove: function(cmp){        

    },

    /**
     * Call add policy API method when 'add' is clicked in template dialog
     * @param {Object} cmp 
     */
    onPolicyAdd: function(cmp){
        var me = this,
            vm = this.getViewModel(),
            dlg = cmp.getParent().getParent(),
            templateId = dlg.getComponent('templateList').getSelectable()
                .getSelectedRecord().get('policy_id');
        
        // hide dialog
        dlg.hide();
        
        // make api call
        this.api.add(templateId).then((r)=>{
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 8000
            });
            me.loadPolicies(parseInt(r.id));
        }).catch((e)=>{
            Ext.toast({
                type: r.type,
                message: r.message
            });
        })
    },

    onShowAddTemplateDialog: function(){
        var view = this.getView(),
            dialog = this.addTemplateDialog;

        if(!dialog){
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
    onTemplateSelect: function(list, record){
        list.getParent().getButtons().getComponent('add').setDisabled(Object.isUnvalued(record));
    },

    onAddTemplateDialogCancel: function(){
        this.addTemplateDialog.hide();
    },

    onSave: function(){
        console.info('save');
    }



    //===[Display/Calculation Functions]===






});