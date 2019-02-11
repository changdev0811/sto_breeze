/**
 * View Model for My Accrual Policy view
 * @class AccrualPolicyViewModel
 * @extends Ext.app.ViewModel
 * @memberof Breeze.view.employee
 */
Ext.define('Breeze.view.employee.AccrualPolicyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employee.accrualpolicy',

    data: {
        // Show Scheduled checkbox
        showScheduled: false,
        // Carry over
        carryOverSettings: {
            expires: false,
            enabled: false,
            option: 0
        }
    },

    formulas: {
        /**
         * Boolean indicating if view should be restricted as user
         * is non admin
         * @formula
         * @memberof Breeze.view.employee.AccrualPolicyViewModel
         * @return {Boolean} True if restricted, false otherwise
         */
        isRestricted: {
            bind: {
                access: '{accessLevel}',
                rights: '{securityRights.Employee_Category_Adjust}'
            },
            get: function(data){
                if(data.rights || data.access == Breeze.helper.Auth.accessLevel.SUPER_ADMIN){
                    return false;
                } else {
                    return true;
                }
            }
        },

        /**
         * Carry max value formula, has getter and setter
         * @formula
         * @memberof Breeze.view.employee.AccrualPolicyViewModel
         * @return {Number} Carrymax value
         */
        carryMax: {
            bind: '{categoryAdjust.carryMax}',
            get: function(data){
                if(data < 0){
                    return 1;
                } else {
                    return data;
                }
            },
            set: function(val){
                this.set('categoryAdjust.carryMax',val);
            }
        },
        
        hideCarryOver: {
            bind: '{carryOverSettings.enabled}',
            get: function(data){
                return !data;
            }
        },

        /**
         * Formula used to determine if carry over max field should be visible
         * based on carry over option select field's value
         * @formula
         * @memberof Breeze.view.employee.AccrualPolicyViewModel
         * @return {Boolean} True if visible, false otherwise
         */
        hideCarryMax: {
            bind: '{carryOverSettings.option}',
            get: function(data){
                return (data == 0);
            }
        },

        /**
         * Formula used to convert hire date into date object
         * @formula
         * @formulaBind categoryAdjust.hire_date
         * @formulaGetter
         * @memberof Breeze.view.employee.AccrualPolicyViewModel
         * @return {Date} Hire date as Date object
         */
        employeeHireDate: {
            bind: '{categoryAdjust.hire_date}',
            get: function(data){
                return new Date(data);
            }
        }
    },

    /**
     * Inline stores
     * @todo TODO: Consider moving these stores to a mixin or extendable class, as both accrual policy view models need them
     * @class
     * @memberof Breeze.view.employee.AccrualPolicyViewModel
     * @inner
     */
    stores: {
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
    }
});