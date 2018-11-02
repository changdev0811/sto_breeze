/**
 * Security Role model
 * @class SecurityRole
 * @namespace Breeze.model.data.SecurityRole
 * @alias model.data.securityrole
 */
Ext.define('Breeze.model.company.SecurityRole', {
    extend: 'Breeze.model.Base',
    alias: 'model.company.securityrole',
    idProperty: 'Role_Id',
    fields: [
        { name: 'Customer_Id', type: 'string' },
        { name: 'Role_Id', type: 'integer' },
        { name: 'Role_Name', type: 'string' },
        { name: 'Add_Employeer', type: 'boolean' },
        { name: 'Delete_Employee', type: 'boolean' },
        { name: 'Edit_Employee', type: 'boolean' },
        { name: 'View_SSN', type: 'boolean' },
        { name: 'View_Compensation', type: 'boolean' },
        { name: 'Employee_Category_Adjust', type: 'boolean' },
        { name: 'Adjustments', type: 'boolean' },
        { name: 'Leave_Approval', type: 'boolean' },
        { name: 'Modify_Recorded_Time', type: 'boolean' },
        { name: 'Manage_Points', type: 'boolean' },
        { name: 'Add_Notes', type: 'boolean' },
        { name: 'Employee_Reports', type: 'boolean' },
        { name: 'Department_Reports', type: 'boolean' },
        { name: 'Project_Maintenance', type: 'boolean' },
        { name: 'Deduction_Maintenance', type: 'boolean' },
        { name: 'Export_Payroll', type: 'boolean' },
        { name: 'Payroll_Template_Maintenance', type: 'boolean' },
        { name: 'Worktime_Maintenance', type: 'boolean' },
        { name: 'Worktime_Approval', type: 'boolean' }
    ]
});