/**
 * View Model class for Accrual Policies Admin view
 * @class AccrualPoliciesModel
 * @namespace Breeze.view.admin.AccrualPoliciesModel
 * @alias viewmodel.admin.accrualpolicies
 */
Ext.define('Breeze.view.admin.AccrualPoliciesModel', {
    extend: 'Breeze.viewmodel.Base',
    alias: 'viewmodel.admin.accrualpolicies',

    // constructor: function (cfg) {
    //     this.callParent([cfg]);
    // },

    data: {
        // selectedCategory: null,
        // for easily enabling/disabling buttons based on data bindings
        disabled: {
            createAccrualInterval: false,
            createAccrualRule: false,
            createCarryOverRule: false,
            deletePolicy: false
        },
        
        saveAndApply: {
            // Option binding for checkboxes in 'Apply to Employees' subview
            options: {
                applyPast: false,
                changeUserShifts: false,
                changeUserCategories: false
            },
            // Apply progress bar value
            progress: 0.5
        }
    },

    stores: {
        accrualCapUnit: {
            fields: [
                { name: 'code', type: 'integer' },
                { name: 'description', type: 'string' }
            ],
            data: [
                { code: 48, description: 'Days' },
                { code: 49, description: 'Hours' },
                { code: 50, description: 'Minutes' }
            ]
        },
        groupedCategoryAccrualRules: {
            source: '{selectedCategoryAccrualRules}',
            groupField: 'ruleName'
        },
        onPerTypes: {
            model: 'Breeze.model.data.TypeOption',
            data: [
                {
                    ID: 1, CodeTypeID: 0, Description: 'on'
                },
                {
                    ID: 2, CodeTypeID: 0, Description: 'per'
                }
            ]
        },
        accrualRatePer: {
            model: 'Breeze.model.data.TypeOption',
            data: [
                {
                    ID: 115,
                    CodeTypeID: 14,
                    Description: 'Days'
                },
                {
                    ID: 116,
                    CodeTypeID: 14,
                    Description: 'Weeks'
                },
                {
                    ID: 117,
                    CodeTypeID: 14,
                    Description: 'Months'
                },
                {
                    ID: 118,
                    CodeTypeID: 14,
                    Description: 'Years'
                },
                {
                    ID: 140,
                    CodeTypeID: 14,
                    Description: 'Hours Worked'
                },
                {
                    ID: 140,
                    CodeTypeID: 14,
                    Description: 'Days Worked'
                },
                {
                    ID: 119,
                    CodeTypeID: 14,
                    Description: 'Monthly Special'
                }
            ]
        },
        accrualRateOn: {
            model: 'Breeze.model.data.TypeOption',
            data: [
                {
                    ID: 51,
                    CodeTypeID: 14,
                    Description: 'Weekly'
                },
                {
                    ID: 52,
                    CodeTypeID: 14,
                    Description: 'Bi-Weekly'
                },
                {
                    ID: 68,
                    CodeTypeID: 14,
                    Description: 'Semi-Monthly'
                },
                {
                    ID: 53,
                    CodeTypeID: 14,
                    Description: 'Monthly'
                },
                {
                    ID: 54,
                    CodeTypeID: 14,
                    Description: 'Quarterly'
                },
                {
                    ID: 55,
                    CodeTypeID: 14,
                    Description: 'Semi-Annually'
                },
                {
                    ID: 114,
                    CodeTypeID: 14,
                    Description: 'Annually'
                },
                {
                    ID: 100,
                    CodeTypeID: 14,
                    Description: 'Annually(Anniv.)'
                },
                {
                    ID: 56,
                    CodeTypeID: 14,
                    Description: 'Monthly Special'
                }
            ]
        },
        monthlySpecialOnOpt: {
            model: 'Breeze.model.data.AccrualDayOption',
            data: [
                {
                    ID: '1',
                    Description: 'January'
                },
                {
                    ID: '2',
                    Description: 'February'
                },
                {
                    ID: '3',
                    Description: 'March'
                },
                {
                    ID: '4',
                    Description: 'April'
                },
                {
                    ID: '5',
                    Description: 'May'
                },
                {
                    ID: '6',
                    Description: 'June'
                },
                {
                    ID: '7',
                    Description: 'July'
                },
                {
                    ID: '8',
                    Description: 'August'
                },
                {
                    ID: '9',
                    Description: 'September'
                },
                {
                    ID: '10',
                    Description: 'October'
                },
                {
                    ID: '11',
                    Description: 'November'
                },
                {
                    ID: '12',
                    Description: 'December'
                }
            ]
        },
        monthlySpecialPerOpt: {
            model: 'Breeze.model.data.AccrualDayOption',
            data: [
                {
                    ID: '1',
                    Description: '1st Month'
                },
                {
                    ID: '2',
                    Description: '2nd Month'
                },
                {
                    ID: '3',
                    Description: '3rd Month'
                },
                {
                    ID: '4',
                    Description: '4th Month'
                },
                {
                    ID: '5',
                    Description: '5th Month'
                },
                {
                    ID: '6',
                    Description: '6th Month'
                },
                {
                    ID: '7',
                    Description: '7th Month'
                },
                {
                    ID: '8',
                    Description: '8th Month'
                },
                {
                    ID: '9',
                    Description: '9th Month'
                },
                {
                    ID: '10',
                    Description: '10th Month'
                },
                {
                    ID: '11',
                    Description: '11th Month'
                },
                {
                    ID: '12',
                    Description: '12th Month'
                }
            ]
        },
        onWeekly: {
            model: 'Breeze.model.data.AccrualDayOption',
            data: [
                {
                    ID: '1',
                    Description: 'Sunday'
                },
                {
                    ID: '2',
                    Description: 'Monday'
                },
                {
                    ID: '3',
                    Description: 'Tuesday'
                },
                {
                    ID: '4',
                    Description: 'Wednesday'
                },
                {
                    ID: '5',
                    Description: 'Thursday'
                },
                {
                    ID: '6',
                    Description: 'Friday'
                },
                {
                    ID: '7',
                    Description: 'Saturday'
                }
            ]
        },
        onBiWeekly: {
            model: 'Breeze.model.data.AccrualDayOption',
            data: [
                {
                    ID: '1',
                    Description: '1st Sunday'
                },
                {
                    ID: '2',
                    Description: '1st Monday'
                },
                {
                    ID: '3',
                    Description: '1st Tuesday'
                },
                {
                    ID: '4',
                    Description: '1st Wednesday'
                },
                {
                    ID: '5',
                    Description: '1st Thursday'
                },
                {
                    ID: '6',
                    Description: '1st Friday'
                },
                {
                    ID: '7',
                    Description: '1st Saturday'
                },
                {
                    ID: '8',
                    Description: '2nd Sunday'
                },
                {
                    ID: '9',
                    Description: '2nd Monday'
                },
                {
                    ID: '10',
                    Description: '2nd Tuesday'
                },
                {
                    ID: '11',
                    Description: '2nd Wednesday'
                },
                {
                    ID: '12',
                    Description: '2nd Thursday'
                },
                {
                    ID: '13',
                    Description: '2nd Friday'
                },
                {
                    ID: '14',
                    Description: '2nd Saturday'
                }
            ]
        },
        monthly31: {
            model: 'Breeze.model.data.AccrualDayOption',
            data: [
                {
                    ID: 'ANNIVERSARY',
                    Description: 'Anniversary'
                },
                {
                    ID: '1',
                    Description: '1st'
                },
                {
                    ID: '2',
                    Description: '2nd'
                },
                {
                    ID: '3',
                    Description: '3rd'
                },
                {
                    ID: '4',
                    Description: '4th'
                },
                {
                    ID: '5',
                    Description: '5th'
                },
                {
                    ID: '6',
                    Description: '6th'
                },
                {
                    ID: '7',
                    Description: '7th'
                },
                {
                    ID: '8',
                    Description: '8th'
                },
                {
                    ID: '9',
                    Description: '9th'
                },
                {
                    ID: '10',
                    Description: '10th'
                },
                {
                    ID: '11',
                    Description: '11th'
                },
                {
                    ID: '12',
                    Description: '12th'
                },
                {
                    ID: '13',
                    Description: '13th'
                },
                {
                    ID: '14',
                    Description: '14th'
                },
                {
                    ID: '15',
                    Description: '15th'
                },
                {
                    ID: '16',
                    Description: '16th'
                },
                {
                    ID: '17',
                    Description: '17th'
                },
                {
                    ID: '18',
                    Description: '18th'
                },
                {
                    ID: '19',
                    Description: '19th'
                },
                {
                    ID: '20',
                    Description: '20th'
                },
                {
                    ID: '21',
                    Description: '21st'
                },
                {
                    ID: '22',
                    Description: '22nd'
                },
                {
                    ID: '23',
                    Description: '23rd'
                },
                {
                    ID: '24',
                    Description: '24th'
                },
                {
                    ID: '25',
                    Description: '25th'
                },
                {
                    ID: '26',
                    Description: '26th'
                },
                {
                    ID: '27',
                    Description: '27th'
                },
                {
                    ID: '28',
                    Description: '28th'
                },
                {
                    ID: '29',
                    Description: '29th'
                },
                {
                    ID: '30',
                    Description: '30th'
                },
                {
                    ID: '31',
                    Description: '31st'
                }
            ]
        },
        monthly30: {
            model: 'Breeze.model.data.AccrualDayOption',
            data: [
                {
                    ID: 'ANNIVERSARY',
                    Description: 'Anniversary'
                },
                {
                    ID: '1',
                    Description: '1st'
                },
                {
                    ID: '2',
                    Description: '2nd'
                },
                {
                    ID: '3',
                    Description: '3rd'
                },
                {
                    ID: '4',
                    Description: '4th'
                },
                {
                    ID: '5',
                    Description: '5th'
                },
                {
                    ID: '6',
                    Description: '6th'
                },
                {
                    ID: '7',
                    Description: '7th'
                },
                {
                    ID: '8',
                    Description: '8th'
                },
                {
                    ID: '9',
                    Description: '9th'
                },
                {
                    ID: '10',
                    Description: '10th'
                },
                {
                    ID: '11',
                    Description: '11th'
                },
                {
                    ID: '12',
                    Description: '12th'
                },
                {
                    ID: '13',
                    Description: '13th'
                },
                {
                    ID: '14',
                    Description: '14th'
                },
                {
                    ID: '15',
                    Description: '15th'
                },
                {
                    ID: '16',
                    Description: '16th'
                },
                {
                    ID: '17',
                    Description: '17th'
                },
                {
                    ID: '18',
                    Description: '18th'
                },
                {
                    ID: '19',
                    Description: '19th'
                },
                {
                    ID: '20',
                    Description: '20th'
                },
                {
                    ID: '21',
                    Description: '21st'
                },
                {
                    ID: '22',
                    Description: '22nd'
                },
                {
                    ID: '23',
                    Description: '23rd'
                },
                {
                    ID: '24',
                    Description: '24th'
                },
                {
                    ID: '25',
                    Description: '25th'
                },
                {
                    ID: '26',
                    Description: '26th'
                },
                {
                    ID: '27',
                    Description: '27th'
                },
                {
                    ID: '28',
                    Description: '28th'
                },
                {
                    ID: '29',
                    Description: '29th'
                },
                {
                    ID: '30',
                    Description: '30th'
                }
            ]
        },
        monthly28: {
            model: 'Breeze.model.data.AccrualDayOption',
            data: [
                {
                    ID: 'ANNIVERSARY',
                    Description: 'Anniversary'
                },
                {
                    ID: '1',
                    Description: '1st'
                },
                {
                    ID: '2',
                    Description: '2nd'
                },
                {
                    ID: '3',
                    Description: '3rd'
                },
                {
                    ID: '4',
                    Description: '4th'
                },
                {
                    ID: '5',
                    Description: '5th'
                },
                {
                    ID: '6',
                    Description: '6th'
                },
                {
                    ID: '7',
                    Description: '7th'
                },
                {
                    ID: '8',
                    Description: '8th'
                },
                {
                    ID: '9',
                    Description: '9th'
                },
                {
                    ID: '10',
                    Description: '10th'
                },
                {
                    ID: '11',
                    Description: '11th'
                },
                {
                    ID: '12',
                    Description: '12th'
                },
                {
                    ID: '13',
                    Description: '13th'
                },
                {
                    ID: '14',
                    Description: '14th'
                },
                {
                    ID: '15',
                    Description: '15th'
                },
                {
                    ID: '16',
                    Description: '16th'
                },
                {
                    ID: '17',
                    Description: '17th'
                },
                {
                    ID: '18',
                    Description: '18th'
                },
                {
                    ID: '19',
                    Description: '19th'
                },
                {
                    ID: '20',
                    Description: '20th'
                },
                {
                    ID: '21',
                    Description: '21st'
                },
                {
                    ID: '22',
                    Description: '22nd'
                },
                {
                    ID: '23',
                    Description: '23rd'
                },
                {
                    ID: '24',
                    Description: '24th'
                },
                {
                    ID: '25',
                    Description: '25th'
                },
                {
                    ID: '26',
                    Description: '26th'
                },
                {
                    ID: '27',
                    Description: '27th'
                },
                {
                    ID: '28',
                    Description: '28th'
                }
            ]
        }
    },

    formulas: {
        categoryYearType: {
            // TODO: Implement category year type set
            // set: function(get){

            // },
            get: function (get) {
                var catId = get('categoryId'),
                    cats = get('policyCategories');
                if (
                    !Object.isUnvalued(catId) &&
                    !Object.isUnvalued(cats)
                ) {
                    var cat = cats
                        .findRecord('categoryId', catId);
                    return cat.get('calendarType');
                } else {
                    return null;
                }
            }
        },
        /**
         * Combines allowAccrual property and disabled.addAccrualRule
         * to determine if button should be disabled
         * @param {Function} get 
         */
        disableAddAccrualRule: function(get){
            let allowed = get('selectedCategory.allowAccrual'),
                disabled = get('disabled.createAccrualRule');
            return (!allowed || disabled);
        },
        /**
         * Combines allowAccrual property and disabled.addAccrualInterval
         * to determine if button should be disabled
         * @param {Function} get 
         */
        // disableAddAccrualInterval: function(get){
        //     let allowed = get('selectedCategory.allowAccrual'),
        //         disabled = get('disabled.addAccrualInterval');
        //     return (!allowed || disabled);
        // }
        disableAddAccrualInterval: {
            bind: {
                allowed: '{selectedCategory.allowAccrual}',
                disabled: '{disabled.createAccrualInterval}',
                rules: '{selectedCategoryAccrualRules}'
            },
            get: function(data){
                return (!data.allowed || data.disabled) || !(data.rules.getCount());
            }
        }
    },

    saveParameters: function(){
        var policy = this.get('policyData'),
            shifts = this.get('policySegments'),
            category = this.get('selectedCategory'),
            rules = this.get('selectedCategoryAccrualRules'),
            carryOvers = this.get('selectedCategoryCarryOverRules');
        
        var params = {
            scheduleId: '',
            schedName: '',
            recMode: '',
            shiftStartSegments: '',
            shiftStopSegments: '',
            catIds: '',
            catCalTypes: '',
            catWaitTimes: '',
            catWaitRates: '',
            allowAccrual: '',
            accSvcFrom: '',
            accSvcTo: '',
            accRuleName: '',
            accInc: '',
            accUnit: '',
            accPer: '',
            accDay: '',
            accMS: '',
            carSvcFrom: '',
            carSvcTo: '',
            carOver: '',
            carExpAmt: '',
            carExpUnit: '',
            accrualCapAmounts: '',
            accrualCapUnits: '',
            balanceCapAmounts: '',
            balanceCapUnits: ''
        };

        // Assign values pulled from policyData
        Object.assign(
            params, {
                recMode: policy.recordingMode.toString(),
                schedName: policy.Name,
                scheduleId: policy.ID.toString()
            }
        );

        // Output names with source prop names for mapFromRecords
        var shiftParams = {
            shiftStartSegments: 'StartSegment',
            shiftStopSegments: 'StopSegment'
        };

        Object.assign(
            params, this.mapFromRecords(shiftParams, shifts)
        );

        if(category.isAllowed){
            // Output names with source prop names for mapFromRecords
            let catParams = {
                catIds: 'categoryId',
                catWaitRates: 'newRate',
                catWaitTimes: 'newTime',
                catCalTypes: 'calendarType',
                accrualCapAmounts: 'accrualCapAmount',
                accrualCapUnits: 'accrualCapUnit',
                balanceCapAmounts: 'balanceCapAmount',
                balanceCapUnits: 'balanceCapUnit'
            };
            Object.assign(
                params,
                this.mapFromRecord(catParams, category, true, true)
            );
            
            // Accrual Rules
            if(category.allowAccrual){
                params.allowAccrual = '1';
                // Output names with source prop names for mapFromRecords
                let ruleParams = {
                    accSvcFrom: 'svcFrom',
                    accSvcTo: 'svcTo',
                    accUnit: 'accformUnit',
                    accRuleName: 'ruleName',
                    accPer: 'accformPer',
                    accDay: 'accformDay',
                    accInc: 'accformInc'
                };
                Object.assign(
                    params,
                    this.mapFromRecords(ruleParams, rules)
                );
            } else {
                // Accrual Rules not allowed
                params.allowAccrual = '0';
            }

            // Carry Over Rules
            if(carryOvers.getCount() > 0){
                // Output names with source prop names for mapFromRecords
                let carryOverParams = {
                    carSvcFrom: 'svcFrom',
                    carSvcTo: 'svcTo',
                    carExpAmt: 'perAmount',
                    carExpUnit: 'perUnit',
                    carOver: (rec) => {
                        if(rec.get('allowCarry')){
                            return rec.get('carryOvr');
                        } else {
                            return '-1';
                        }
                    }
                };

                Object.assign(
                    params, this.mapFromRecords(carryOverParams, carryOvers)
                );
            } else {
                // Category not allowed
                Object.assign(
                    params, {
                        catWaitTimes: '0', catWaitRates: '44', allowAccrual: '0'
                    }
                );
            }
        }

        return params;

    }

});