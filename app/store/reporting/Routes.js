/**
 * Store used for resolving report views based on their url route params
 * 
 * Format for url is reports/<category>/<type>
 * 
 * @class ViewRoutes
 * @namespace Breeze.store.reporting.Routes
 */
Ext.define('Breeze.store.reporting.Routes', {
    extend: 'Ext.data.Store',
    autoLoad: true,

    // Fields for store-- not backed by model
    fields: [
        { name: 'category', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'view', type: 'string' }
    ],

    /**
     * Route data goes here
     * category: first url part (e.g. department)
     * type: second url part (should be lowercase, e.g. 'absence' for Absence)
     * controller: Full namespace path to view for report
     * 
     * example:
     * 
     * Breeze.view.report.department.Absence ->
     *  { 
     *      category: 'department', type: 'absence', 
     *      view: 'Breeze.view.report.department.Absence' 
     *  }
     */
    data: [
        // Department
        { 
            category: 'department', type: 'absence', 
            view: 'Breeze.view.reporting.department.Absence' 
        },
        {
            category: 'department', type: 'absencesummary', 
            view: 'Breeze.view.reporting.department.AbsenceSummary'             
        },
        {
            category: 'department', type: 'adjustment', 
            view: 'Breeze.view.reporting.department.Adjustment'             
        },
        {
            category: 'department', type: 'daily', 
            view: 'Breeze.view.reporting.department.Daily'             
        },
        {
            category: 'department', type: 'dailytotals', 
            view: 'Breeze.view.reporting.department.DailyTotals'             
        },
        {
            category: 'department', type: 'deptdetails', 
            view: 'Breeze.view.reporting.department.DeptDetails'             
        },
        {
            category: 'department', type: 'deptprofile', 
            view: 'Breeze.view.reporting.department.DeptProfile'             
        },
        {
            category: 'department', type: 'deptreconciliation', 
            view: 'Breeze.view.reporting.department.DeptReconciliation'             
        },
        {
            category: 'department', type: 'inoutboard', 
            view: 'Breeze.view.reporting.department.InOutBoard'             
        },
        {
            category: 'department', type: 'inouthistory', 
            view: 'Breeze.view.reporting.department.InOutHistory'             
        },
        {
            category: 'department', type: 'monthly', 
            view: 'Breeze.view.reporting.department.Monthly'             
        },
        {
            category: 'department', type: 'notes', 
            view: 'Breeze.view.reporting.department.Notes'             
        },
        {
            category: 'department', type: 'overtimecheck', 
            view: 'Breeze.view.reporting.department.OvertimeCheck'             
        },
        {
            category: 'department', type: 'payrollsummary', 
            view: 'Breeze.view.reporting.department.PayrollSummary'             
        },
        {
            category: 'department', type: 'puncherrors', 
            view: 'Breeze.view.reporting.department.PunchErrors'             
        },
        {
            category: 'department', type: 'security', 
            view: 'Breeze.view.reporting.department.Security'             
        },
        {
            category: 'department', type: 'shiftanalysis', 
            view: 'Breeze.view.reporting.department.ShiftAnalysis'             
        },
        {
            category: 'department', type: 'summaryproject', 
            view: 'Breeze.view.reporting.department.SummaryProject'             
        },
        {
            category: 'department', type: 'timerecap', 
            view: 'Breeze.view.reporting.department.TimeRecap'             
        },
        // Employee
        {
            category: 'employee', type: 'allowance', 
            view: 'Breeze.view.reporting.employee.Allowance'             
        },
        {
            category: 'employee', type: 'details', 
            view: 'Breeze.view.reporting.employee.Details'             
        },
        {
            category: 'employee', type: 'fyi', 
            view: 'Breeze.view.reporting.employee.Fyi'             
        },
        {
            category: 'employee', type: 'information', 
            view: 'Breeze.view.reporting.employee.Information'             
        },
        {
            category: 'employee', type: 'profile', 
            view: 'Breeze.view.reporting.employee.Profile'             
        },
        {
            category: 'employee', type: 'excessivehours', 
            view: 'Breeze.view.reporting.employee.ExcessiveHours'             
        },
        {
            category: 'employee', type: 'lateness', 
            view: 'Breeze.view.reporting.employee.Lateness'             
        },
        {
            category: 'employee', type: 'recordedtime', 
            view: 'Breeze.view.reporting.employee.RecordedTime'             
        },
        {
            category: 'employee', type: 'employeeproject', 
            view: 'Breeze.view.reporting.employee.EmployeeProject'             
        },
        {
            category: 'employee', type: 'timeactivity', 
            view: 'Breeze.view.reporting.employee.TimeActivity'             
        },
        {
            category: 'employee', type: 'timesheet', 
            view: 'Breeze.view.reporting.employee.Timesheet'             
        },
        {
            category: 'employee', type: 'worktimedetails', 
            view: 'Breeze.view.reporting.employee.WorktimeDetails'             
        },
        {
            category: 'employee', type: 'yearataglance', 
            view: 'Breeze.view.reporting.employee.YearAtAGlance'             
        }
        // Miscellaneous

        // Point

        // Project

    ],

    resolve: function(category, type){
        var idx = this.findBy((e) => {
            return (e.data.category === category && e.data.type === type);
        });
        if(idx !== -1){
            return this.getAt(idx).data.view;
        } else {
            return null;
        }
    }
});