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

        // View Date
        activeDay: (new Date()),
        // Show Scheduled checkbox
        showScheduled: false,
    },

    stores: {
        // 'employee_fyi': null
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
            bind: '{adjustInfo.carryMax}',
            get: function(data){
                if(data < 0){
                    return 1;
                } else {
                    return data;
                }
            },
            set: function(val){
                this.set('adjustInfo.carryMax',val);
            }
        },
        
        hideCarryOver: {
            bind: '{adjustInfo.carryOver}',
            get: function(data){
                return !data;
            }
        },

        hideCarryMax: {
            bind: '{carryOptionField.value}',
            get: function(data){
                return (data == 0);
            }
        }
    },
});