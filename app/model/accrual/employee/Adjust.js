/**
 * Model for my accrual policy view's category adjustment
 * @class Adjust
 * @memberof Breeze.model.accrual.employee
 */
Ext.define('Breeze.model.accrual.employee.Adjust', {
    requires: [
        'Breeze.model.accrual.employee.Rule'
    ],
    extend: 'Breeze.model.Base',
    fields: [
        { name: "accrued", type: "integer" }, 
        { name: "active_yos_end", type: "string" }, 
        { name: "active_yos_start", type: "string" }, 
        { name: "adjustments", type: "integer" }, 
        { name: "allowAccrual", type: "boolean" }, 
        { name: "allowed", type: "integer" }, 
        { name: "calendarType", type: "integer" }, 
        { name: "carryExpires", type: "string" }, 
        { name: "carryMax", type: "integer" }, 
        { name: "carryOver", type: "integer" }, 
        { name: "categoryId", type: "integer" }, 
        { name: "categoryName", type: "string" }, 
        { name: "departmentName", type: "string" }, 
        { name: "employeeName", type: "string" }, 
        { name: "hire_date", type: "string" }, 
        { name: "isallowed", type: "boolean" }, 
        { name: "recorded", type: "integer" }, 
        { name: "recordingYear", type: "integer" }, 
        { name: "recordingYearStart", type: "string" }, 
        { name: "recordingYearEnd", type: "string" }, 
        { name: "remaining", type: "integer" }, 
        { name: "viewDate", type: "date" }, 
        { name: "wait_date", type: "date" }
    ],
    hasMany: [
        {
            model: 'Breeze.model.accrual.category.Rule',
            name: 'rules'
        }
    ]
});