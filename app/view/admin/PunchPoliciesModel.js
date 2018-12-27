/**
 * View Model class for Punch Policies Admin view
 * @class PunchPoliciesModel
 * @namespace Breeze.view.admin.PunchPoliciesModel
 * @alias viewmodel.admin.punchpolicies
 */
Ext.define('Breeze.view.admin.PunchPoliciesModel', {
    extend: 'Breeze.viewmodel.Base',
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
            get: function (get) {
                return (get('policyData.Ot_Day1') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'policyData.Ot_Day1', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeDaily2: {
            get: function (get) {
                return (get('policyData.Ot_Day2') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'policyData.Ot_Day2', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeDaily3: {
            get: function (get) {
                return (get('policyData.Ot_Day3') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'policyData.Ot_Day3', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeDaily4: {
            get: function (get) {
                return (get('policyData.Ot_Day4') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'policyData.Ot_Day4', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeWeekly1: {
            get: function (get) {
                return (get('policyData.Ot_Week1') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'policyData.Ot_Day1', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeWeekly2: {
            get: function (get) {
                return (get('policyData.Ot_Week2') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'policyData.Ot_Day2', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeWeekly3: {
            get: function (get) {
                return (get('policyData.Ot_Week3') / 60 / 60);
            },
            set: function (value) {
                this.set(
                    'policyData.Ot_Day3', Math.round(value * 60 * 60)
                );
            }
        },
        overtimeWeekly4: {
            get: function (get) {
                return (get('policyData.Ot_Week4') / 60 / 60);
            },
            set: function (value) {
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
            get: function (data) {
                return data.ot1;
            }
        },
        overtime3Enabled: {
            bind: {
                ot1: '{policyData.Ot_Opt1}',
                ot2: '{policyData.Ot_Opt2}'
            },
            get: function (data) {
                return data.ot1 && data.ot2;
            }
        },
        overtime1Checked: {
            get: function (get) {
                return get('policyData.Ot_Opt1');
            },
            set: function (value) {
                this.set('policyData.Ot_Opt1', value);
                if (!value) {
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
            get: function (get) {
                return get('policyData.Ot_Opt2');
            },
            set: function (value) {
                this.set('policyData.Ot_Opt2', value);
                if (!value) {
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
            get: function (get) {
                return get('policyData.Ot_Opt3');
            },
            set: function (value) {
                this.set('policyData.Ot_Opt3', value);
                if (!value) {
                    this.set('policyData.Ot_Opt4', false);
                }
            }
        },

        //===[Rounding Rule Formulas]===
        roundingOffsetEnabled: function (get) {
            return (get('policyData.Round_Increment') !== 1);
        },
        // Formulas for populating rounding preview time text
        roundingRule1: {
            bind: {
                roundTo: '{policyData.Round_Increment}',
                offset: '{policyData.Round_Offset}'
            },
            get: function (data) {

                console.info('data: ', JSON.stringify(data));
                if (data.roundTo == 1) {
                    return "Punches will not be rounded";
                } else {


                    var baseDate = new Date('1/1/2000 08:00:00 AM');

                    var refT = Ext.Date.add(
                        baseDate, Ext.Date.SECOND, data.roundTo * -60
                    );

                    var lowTime = refT, highTime = refT;

                    while (BreezeTime.util.roundPunch(
                        Ext.Date.add(lowTime, Ext.Date.SECOND, -60),
                        data.roundTo,
                        data.offset
                    ).toString() == refT.toString()) {
                        lowTime = Ext.Date.add(lowTime, Ext.Date.SECOND, -60);
                    }

                    while (BreezeTime.util.roundPunch(
                        Ext.Date.add(highTime, Ext.Date.SECOND, 60),
                        data.roundTo,
                        data.offset
                    ).toString() == refT.toString()) {
                        highTime = Ext.Date.add(highTime, Ext.Date.SECOND, 60);
                    }

                    var text = BreezeTime.util.getPart(refT),
                        low = BreezeTime.util.getPart(lowTime),
                        high = BreezeTime.util.getPart(highTime);

                    return `Punches between ${low} and ${high} will round to ${text}`;
                }

            }
        },
        roundingRule2: {
            bind: {
                roundTo: '{policyData.Round_Increment}',
                offset: '{policyData.Round_Offset}'
            },
            get: function (data) {
                var baseDate = new Date('1/1/2000 08:00:00 AM');

                var refT = baseDate;

                var lowTime = refT, highTime = refT;

                while (BreezeTime.util.roundPunch(
                    Ext.Date.add(lowTime, Ext.Date.SECOND, -60),
                    data.roundTo,
                    data.offset
                ).toString() == refT.toString()) {
                    lowTime = Ext.Date.add(lowTime, Ext.Date.SECOND, -60);
                }

                while (BreezeTime.util.roundPunch(
                    Ext.Date.add(highTime, Ext.Date.SECOND, 60),
                    data.roundTo,
                    data.offset
                ).toString() == refT.toString()) {
                    highTime = Ext.Date.add(highTime, Ext.Date.SECOND, 60);
                }

                var text = BreezeTime.util.getPart(refT),
                    low = BreezeTime.util.getPart(lowTime),
                    high = BreezeTime.util.getPart(highTime);

                return `Punches between ${low} and ${high} will round to ${text}`;
            },
        },
        roundingRule3: {
            bind: {
                roundTo: '{policyData.Round_Increment}',
                offset: '{policyData.Round_Offset}'
            },
            get: function (data) {
                var baseDate = new Date('1/1/2000 08:00:00 AM');

                var refT = Ext.Date.add(
                    baseDate, Ext.Date.SECOND, data.roundTo * 60
                );

                var lowTime = refT, highTime = refT;

                while (BreezeTime.util.roundPunch(
                    Ext.Date.add(lowTime, Ext.Date.SECOND, -60),
                    data.roundTo,
                    data.offset
                ).toString() == refT.toString()) {
                    lowTime = Ext.Date.add(lowTime, Ext.Date.SECOND, -60);
                }

                while (BreezeTime.util.roundPunch(
                    Ext.Date.add(highTime, Ext.Date.SECOND, 60),
                    data.roundTo,
                    data.offset
                ).toString() == refT.toString()) {
                    highTime = Ext.Date.add(highTime, Ext.Date.SECOND, 60);
                }

                var text = BreezeTime.util.getPart(refT),
                    low = BreezeTime.util.getPart(lowTime),
                    high = BreezeTime.util.getPart(highTime);

                return `Punches between ${low} and ${high} will round to ${text}`;
            }
        }
    },

    /**
     * Construct object containing params to be passed into save API call
     * @return {Object} Parameters
     */
    saveParameters: function(){
        var params = {
            policyName: 'policy_name',
            policyId: 'policy_id',
            otOpt1: 'Ot_Opt1',
            otOpt2: 'Ot_Opt2',
            otOpt3: 'Ot_Opt3',
            otOpt4: 'Ot_Opt4',
            otDay1: 'Ot_Day1',
            otDay2: 'Ot_Day2',
            otDay3: 'Ot_Day3',
            otDay4: 'Ot_Day4',
            otWeek1: 'Ot_Week1',
            otWeek2: 'Ot_Week2',
            otWeek3: 'Ot_Week3',
            otWeek4: 'Ot_Week4',
            otRate1: 'Ot_Rate1',
            otRate2: 'Ot_Rate2',
            otRate3: 'Ot_Rate3',
            otRate4: 'Ot_Rate4',
            subtractDayOt: 'Subtract_DayOt',
            roundingInc: 'Round_Increment',
            roundingOff: 'Round_Offset',
            allowRegular: 'Allow_RegularPunch',
            allowQuick: 'Allow_QuickPunch',
            punchStart: 'Auto_PunchIn',
            punchExit: 'Auto_PunchOut',
            punchLunch: 'Auto_LunchPunch',
            lunchMinutes: 'LunchPunch_Seg',
            lunchHours: 'LunchPunch_Hours',
            autoCloseShift: 'Auto_Close_Shift',
            addProjects: 'Can_Add_Projects',
            addNotes: 'Can_Add_Notes',
            editNotes: 'Can_Edit_Notes',
            useTimesheets: 'Can_Use_TimeSheets',
            adjustPunches: 'Can_Adjust_Punches',
            useInOut: 'Can_Use_InOut',
            punchInOut: 'InOut_Opt'
        };
        var paramKeys = Object.keys(params);
        for(var i=0,p=paramKeys[0];i<paramKeys.length;i++,p=paramKeys[i]){
            params[p] = this.get(`policyData.${params[p]}`);
        }
        return params;
    }

});