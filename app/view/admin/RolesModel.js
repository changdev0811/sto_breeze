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
    	selectedRoleID: "1", 

    },

	formulas: {
    	selectedRole: function(get){
    		var role = get('roles').findRecord('id', get('selectedRoleID'));
    		return role.get('data');
    	},

    },

	stores: {
        // TODO: Remove when API dummy is available
        roles: {
            data:[
				{
					"id":"1",
					//"text":"Full Supervisor", //<-- had to remove to prevent label before and after icon
					"name":"Full Supervisor", // <-- +++ this is and added item +++
					"iconCls":"fal fa-badge-check fa-2x fa-fw sto-skyblue",
					"leaf":"true",
					"d":null,
					"data":{
						"Add_Employee":true,
						"Add_Notes":true,
						"Adjustments":true,
						"Customer_ID":"991012",
						"Deduction_Maintenance":false,
						"Delete_Employee":true,
						"Department_Reports":true,
						"Edit_Employee":true,
						"Employee_Category_Adjust":true,
						"Employee_Reports":true,
						"Export_Payroll":false,
						"Leave_Approval":true,
						"Manage_Points":true,
						"Modify_Recorded_Time":true,
						"Payroll_Template_Maintenance":false,
						"Project_Maintenance":false,
						"Role_Id":"1003",
						"Role_Name":"Full Supervisor",
						"View_Compensation":true,
						"View_SSN":true,
						"Worktime_Approval":false,
						"Worktime_Maintenance":false
					},
					"type":"role",
					"fullName":null,
					"qtip":null,
					"cls":null,
					"status":0,
					"icon":"none.png",
					"checked":null
				},
				{
					"id":"2",
					//"text":"Limited Supervisor", //<-- had to remove to prevent label before and after icon
					"name":"Limited Supervisor", // <-- +++ this is and added item +++
					"iconCls":"fal fa-badge-check fa-2x fa-fw sto-skyblue",
					"leaf":"true",
					"d":null,
					"data":{
						"Add_Employee":false,
						"Add_Notes":true,
						"Adjustments":true,
						"Customer_ID":"991012",
						"Deduction_Maintenance":false,
						"Delete_Employee":false,
						"Department_Reports":true,
						"Edit_Employee":false,
						"Employee_Category_Adjust":false,
						"Employee_Reports":true,
						"Export_Payroll":false,
						"Leave_Approval":true,
						"Manage_Points":true,
						"Modify_Recorded_Time":true,
						"Payroll_Template_Maintenance":false,
						"Project_Maintenance":false,
						"Role_Id":"1001",
						"Role_Name":"Limited Supervisor",
						"View_Compensation":false,
						"View_SSN":false,
						"Worktime_Approval":false,
						"Worktime_Maintenance":false
					},
					"type":"role",
					"fullName":null,
					"qtip":null,
					"cls":null,
					"status":0,
					"icon":"none.png",
					"checked":null
				},
				{
					"id":"3",
					//"text":"Read Only Supervisor", //<-- had to remove to prevent label before and after icon
					"name":"Read Only Supervisor", // <-- +++ this is and added item +++
					"iconCls":"fal fa-badge-check fa-2x fa-fw sto-skyblue",
					"leaf":"true",
					"d":null,
					"data":{
						"Add_Employee":false,
						"Add_Notes":true,
						"Adjustments":false,
						"Customer_ID":"991012",
						"Deduction_Maintenance":false,
						"Delete_Employee":false,
						"Department_Reports":true,
						"Edit_Employee":false,
						"Employee_Category_Adjust":false,
						"Employee_Reports":true,
						"Export_Payroll":false,
						"Leave_Approval":true,
						"Manage_Points":false,
						"Modify_Recorded_Time":true,
						"Payroll_Template_Maintenance":false,
						"Project_Maintenance":false,
						"Role_Id":"1002",
						"Role_Name":"Read Only Supervisor",
						"View_Compensation":false,
						"View_SSN":false,
						"Worktime_Approval":false,
						"Worktime_Maintenance":false
					},
					"type":"role",
					"fullName":null,
					"qtip":null,
					"cls":null,
					"status":0,
					"icon":"none.png",
					"checked":null
				}
			]
		}
	}
});