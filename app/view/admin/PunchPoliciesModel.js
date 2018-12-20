/**
 * View Model class for Punch Policies Admin view
 * @class PunchPoliciesModel
 * @namespace Breeze.view.admin.PunchPoliciesModel
 * @alias viewmodel.admin.punchpolicies
 */
Ext.define('Breeze.view.admin.PunchPoliciesModel', {
    extend: 'Breeze.viewModel.Base',
    alias: 'viewmodel.admin.punchpolicies',


    data: {
        // Object is given a copy of punch policy info to apply edits to before saving
        policyData: null,
        overtimes: {
            ot1: false,
            ot2: false,
            ot3: false,
            ot4: false
        }
    },

    formulas: {
        //===[Overtime Value Formulas]===
        overtimeDaily1: {
            get: function(get){
                return (get('policyData.Ot_Day1') / 60 / 60);
            },
            set: function(value){
                this.set(
                    'policyData.Ot_Day1', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeDaily2: {
            get: function(get){
                return (get('policyData.Ot_Day2') / 60 / 60);
            },
            set: function(value){
                this.set(
                    'policyData.Ot_Day2', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeDaily3: {
            get: function(get){
                return (get('policyData.Ot_Day3') / 60 / 60);
            },
            set: function(value){
                this.set(
                    'policyData.Ot_Day3', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeDaily4: {
            get: function(get){
                return (get('policyData.Ot_Day4') / 60 / 60);
            },
            set: function(value){
                this.set(
                    'policyData.Ot_Day4', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeWeekly1: {
            get: function(get){
                return (get('policyData.Ot_Week1') / 60 / 60);
            },
            set: function(value){
                this.set(
                    'policyData.Ot_Day1', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeWeekly2: {
            get: function(get){
                return (get('policyData.Ot_Week2') / 60 / 60);
            },
            set: function(value){
                this.set(
                    'policyData.Ot_Day2', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeWeekly3: {
            get: function(get){
                return (get('policyData.Ot_Week3') / 60 / 60);
            },
            set: function(value){
                this.set(
                    'policyData.Ot_Day3', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeWeekly4: {
            get: function(get){
                return (get('policyData.Ot_Week4') / 60 / 60);
            },
            set: function(value){
                this.set(
                    'policyData.Ot_Day4', Math.round(value * 60 * 60)
                );
            }
        },
        //===[Overtime Checkbox Formulas]===
        overtime2Enabled: {
            bind: {
                ot1: '{policyData.Ot_Opt1}'
            },
            get: function(data){
                return data.ot1;
            }
        },
        overtime3Enabled: {
            bind: {
                ot1: '{policyData.Ot_Opt1}',
                ot2: '{policyData.Ot_Opt2}'
            },
            get: function(data){
                return data.ot1 && data.ot2;
            }
        },
        overtime1Checked: {
            get: function(get){
                return get('policyData.Ot_Opt1');
            },
            set: function(value){
                this.set('policyData.Ot_Opt1',value);
                if(!value){
                    this.setMultiple(
                        [
                            'policyData.Ot_Opt2',
                            'policyData.Ot_Opt3',
                            'policyData.Ot_Opt4'
                        ],
                        false
                    );
                }
            }
        },
        overtime2Checked: {
            get: function(get){
                return get('policyData.Ot_Opt2');
            },
            set: function(value){
                this.set('policyData.Ot_Opt2',value);
                if(!value){
                    this.setMultiple(
                        [
                            'policyData.Ot_Opt3',
                            'policyData.Ot_Opt4'
                        ],
                        false
                    );
                }
            }
        },
        overtime3Checked: {
            get: function(get){
                return get('policyData.Ot_Opt3');
            },
            set: function(value){
                this.set('policyData.Ot_Opt3',value);
                if(!value){
                    this.set('policyData.Ot_Opt4',false);
                }
            }
        }
        
        
    }

});