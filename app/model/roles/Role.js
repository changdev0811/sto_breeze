Ext.define('Breeze.model.roles.Role', {
    extend: 'Breeze.model.Base',
    fields: [
        {name:"Add_Employee",                   type:"boolean"},
        {name:"Add_Notes",                      type:"boolean"},
        {name:"Adjustments",                    type:"boolean"},
        {name:"Customer_ID",                    type:"string" },
        {name:"Deduction_Maintenance",          type:"boolean"},
        {name:"Delete_Employee",                type:"boolean"},
        {name:"Department_Reports",             type:"boolean"},
        {name:"Edit_Employee",                  type:"boolean"},
        {name:"Employee_Category_Adjust",       type:"boolean"},
        {name:"Employee_Reports",               type:"boolean"},
        {name:"Export_Payroll",                 type:"boolean"},
        {name:"Leave_Approval",                 type:"boolean"},
        {name:"Manage_Points",                  type:"boolean"},
        {name:"Modify_Recorded_Time",           type:"boolean"},
        {name:"Payroll_Template_Maintenance",   type:"boolean"},
        {name:"Project_Maintenance",            type:"boolean"},
        {name:"Role_Id",                        type:"string" },
        {name:"Role_Name",                      type:"string" },
        {name:"View_Compensation",              type:"boolean"},
        {name:"View_SSN",                       type:"boolean"},
        {name:"Worktime_Approval",              type:"boolean"},
        {name:"Worktime_Maintenance",           type:"boolean"},
    ],
    proxy:{
        type: 'memory',
        reader: {
            type:'json',
            rootProperty: 'Roles'
        }
    }
});