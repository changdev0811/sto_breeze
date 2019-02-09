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
        showScheduled: false
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

        carryOverExpired: {
            bind: '{categoryPoint.carryOverExpired}',
            get: function(data){
                return this.coloredValueHtml(data);
            }
        }


    },

    privates: {
        coloredValueHtml: function(value){
            var actualValue = parseFloat(value),
                negative = (actualValue < 0);
            
            return [
                '<div class="employee-accrual-policy-ledger>',
                `<div class="sign">${(negative)? '-' : '+'}</div>`,
                `<div class="value ${(negative)? 'negative' : ''}">${value}</div>`,
                '</div>'
            ].join('');
        }
    }

});