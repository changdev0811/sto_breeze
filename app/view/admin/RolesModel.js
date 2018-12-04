/**
 * View Model class for Roles Admin view
 * @class RolesModel
 * @namespace Breeze.view.admin.RolesModel
 * @alias viewmodel.admin.roles
 */
Ext.define('Breeze.view.admin.RolesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.roles',

	constructor: function(cfg){
        this.callParent([cfg]);
    },

	data: {
    	// TODO: change to null
    	selectedRoleID: "1"
    },

	formulas: {
    	selectedRole: function(get){
    		var role = get('roles').findRecord('Role_Id', get('selectedRoleID'));
    		return role;
    	},
    },

	stores: {
        // TODO: Remove when API dummy is available
        roles: {
            data: [
            	{
					"Customer_Id": "1",
					"Role_Name": "New Role",
					"Role_Id": "1",
					"Add_Employee": true,
					"Delete_Employee": true,
					"Edit_Employee": true,
					"View_SSN": true,
					"View_Compensation": true,
					"Employee_Category_Adjust": true,
					"Adjustments": true,
					"Leave_Approval": true,
					"Modify_Recorded_Time": true,
					"Manage_Points": true,
					"Add_Notes": true,
					"Employee_Reports": true,
					"Department_Reports": true,

					// NEW
					'Project_Maintenance': true,
					'Deduction_Maintenance': true,
					'Export_Payroll': true,
					'Payroll_Template_Maintenance': true,
					'Worktime_Maintenance': true,
					'Worktime_Approvial': true,


				}
			]
		}
	}




                                    





});