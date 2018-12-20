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
        var selectedId = Object.defVal(selectedId, null, true),
            me = this;

        this.addStoreToViewModel(
            'Breeze.store.record.punchPolicies.DetailList',
            'policies',
            {
                load: true,
                loadOpts: {
                    callback: function (records, op, success) {
                        if (success) {
                            var record = records[0];
                            if (selectedId !== null) {
                                record = records.find((r) => {
                                    return r.get('policy_id');
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

    //===[Display/Calculation Functions]===






});