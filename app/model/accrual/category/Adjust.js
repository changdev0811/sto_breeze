/**
 * Model for my accrual policy view's category adjustment
 * @class Adjust
 * @memberof Breeze.model.accrual.category
 */
Ext.define('Breeze.model.accrual.category.Adjust', {
    extend: 'Breeze.model.Base',
    fields: [
        { name: "accrued", type: "integer" }, 
        { name: "active_yos_end", type: "date" }, 
        { name: "active_yos_start", type: "date" }, 
        { name: "adjustments", type: "integer" }, 
        { name: "allowAccrual", type: "boolean" }, 
        { name: "allowed", type: "integer" }, 
        { name: "calendarType", type: "integer" }, 
        { name: "carryExpires", type: "date" }, 
        { name: "carryMax", type: "integer" }, 
        { name: "carryOver", type: "integer" }, 
        { name: "categoryId", type: "integer" }, 
        { name: "categoryName", type: "string" }, 
        { name: "departmentName", type: "string" }, 
        { name: "employeeName", type: "string" }, 
        { name: "hire_date", type: "date" }, 
        { name: "isallowed", type: "boolean" }, 
        { name: "recorded", type: "integer" }, 
        { name: "recordingYear", type: "integer" }, 
        { name: "recordingYearStart", type: "date" }, 
        { name: "recordingYearEnd", type: "date" }, 
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