/**
 * Store used for resolving report views based on their url route params
 * 
 * Format for url is reports/<category>/<type>
 * 
 * @class Routes
 * @namespace Breeze.store.reporting.Routes
 */
Ext.define('Breeze.store.reporting.Routes', {
    extend: 'Ext.data.Store',
    autoLoad: true,

    // Fields for store-- not backed by model
    fields: [
        { name: 'category', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'view', type: 'string' },
        { name: 'key', type: 'string' }
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
        {
            "category": "department",
            "type": "absence",
            "view": "Breeze.view.reporting.department.Absence",
            "key": "AbsenceReport"
        },
        {
            "category": "department",
            "type": "absencesummary",
            "view": "Breeze.view.reporting.department.AbsenceSummary",
            "key": "AbsenceSummary"
        },
        {
            "category": "department",
            "type": "adjustment",
            "view": "Breeze.view.reporting.department.Adjustment",
            "key": "AdjustmentReport"
        },
        {
            "category": "department",
            "type": "daily",
            "view": "Breeze.view.reporting.department.Daily",
            "key": "DailyReport"
        },
        {
            "category": "department",
            "type": "dailytotals",
            "view": "Breeze.view.reporting.department.DailyTotals",
            "key": "DeptDailyTotals"
        },
        {
            "category": "department",
            "type": "deptdetails",
            "view": "Breeze.view.reporting.department.DeptDetails",
            "key": "DepartmentDetails"
        },
        {
            "category": "department",
            "type": "deptprofile",
            "view": "Breeze.view.reporting.department.DeptProfile",
            "key": "DeptProfile"
        },
        {
            "category": "department",
            "type": "deptreconciliation",
            "view": "Breeze.view.reporting.department.DeptReconciliation",
            "key": "DepartmentReconciliation"
        },
        {
            "category": "department",
            "type": "inoutboard",
            "view": "Breeze.view.reporting.department.InOutBoard",
            "key": "InOutBoard"
        },
        {
            "category": "department",
            "type": "inouthistory",
            "view": "Breeze.view.reporting.department.InOutHistory",
            "key": "InOutHistory"
        },
        {
            "category": "department",
            "type": "monthly",
            "view": "Breeze.view.reporting.department.Monthly",
            "key": "MonthlyReport"
        },
        {
            "category": "department",
            "type": "notes",
            "view": "Breeze.view.reporting.department.Notes",
            "key": "Notes"
        },
        {
            "category": "department",
            "type": "overtimecheck",
            "view": "Breeze.view.reporting.department.OvertimeCheck",
            "key": "OvertimeCheck"
        },
        {
            "category": "department",
            "type": "payrollsummary",
            "view": "Breeze.view.reporting.department.PayrollSummary",
            "key": "PayrollSummary"
        },
        {
            "category": "department",
            "type": "puncherrors",
            "view": "Breeze.view.reporting.department.PunchErrors",
            "key": "PunchErrors"
        },
        {
            "category": "department",
            "type": "security",
            "view": "Breeze.view.reporting.department.Security",
            "key": "SecurityReport"
        },
        {
            "category": "department",
            "type": "shiftanalysis",
            "view": "Breeze.view.reporting.department.ShiftAnalysis",
            "key": "ShiftAnalysis"
        },
        {
            "category": "department",
            "type": "summaryproject",
            "view": "Breeze.view.reporting.department.SummaryProject",
            "key": "DProjectSummary"
        },
        {
            "category": "department",
            "type": "timerecap",
            "view": "Breeze.view.reporting.department.TimeRecap",
            "key": "TimeRecap"
        },
        {
            "category": "employee",
            "type": "allowance",
            "view": "Breeze.view.reporting.employee.Allowance",
            "key": "AllowanceProjection"
        },
        {
            "category": "employee",
            "type": "details",
            "view": "Breeze.view.reporting.employee.Details",
            "key": "EmployeeDetails"
        },
        {
            "category": "employee",
            "type": "fyi",
            "view": "Breeze.view.reporting.employee.Fyi",
            "key": "EmployeeFYI"
        },
        {
            "category": "employee",
            "type": "information",
            "view": "Breeze.view.reporting.employee.Information",
            "key": "EmployeeInformation"
        },
        {
            "category": "employee",
            "type": "profile",
            "view": "Breeze.view.reporting.employee.Profile",
            "key": "EmployeeProfile"
        },
        {
            "category": "employee",
            "type": "excessivehours",
            "view": "Breeze.view.reporting.employee.ExcessiveHours",
            "key": "ExcessiveHours"
        },
        {
            "category": "employee",
            "type": "lateness",
            "view": "Breeze.view.reporting.employee.Lateness",
            "key": "LatenessCheck"
        },
        {
            "category": "employee",
            "type": "recordedtime",
            "view": "Breeze.view.reporting.employee.RecordedTime",
            "key": "RecordedTime"
        },
        {
            "category": "employee",
            "type": "employeeproject",
            "view": "Breeze.view.reporting.employee.EmployeeProject",
            "key": "EProjectSummary"
        },
        {
            "category": "employee",
            "type": "timeactivity",
            "view": "Breeze.view.reporting.employee.TimeActivity",
            "key": "TimeActivity"
        },
        {
            "category": "employee",
            "type": "timesheet",
            "view": "Breeze.view.reporting.employee.Timesheet",
            "key": "Timesheet"
        },
        {
            "category": "employee",
            "type": "worktimedetails",
            "view": "Breeze.view.reporting.employee.WorktimeDetails",
            "key": "WorktimeDetails"
        },
        {
            "category": "employee",
            "type": "yearataglance",
            "view": "Breeze.view.reporting.employee.YearAtAGlance",
            "key": "YearAtAGlance"
        },
        {
            "category": "misc",
            "type": "accrualpolicies",
            "view": "Breeze.view.reporting.misc.AccrualPolicies",
            "key": "AccrualPolicies"
        },
        {
            "category": "misc",
            "type": "anniversaries",
            "view": "Breeze.view.reporting.misc.Anniversaries",
            "key": "AnniversaryList"
        },
        {
            "category": "misc",
            "type": "audit",
            "view": "Breeze.view.reporting.misc.Audit",
            "key": "CompanyHistory"
        },
        {
            "category": "misc",
            "type": "birthdays",
            "view": "Breeze.view.reporting.misc.Birthdays",
            "key": "BirthdayList"
        },
        {
            "category": "misc",
            "type": "departmentlist",
            "view": "Breeze.view.reporting.misc.DepartmentList",
            "key": "DepartmentList"
        },
        {
            "category": "misc",
            "type": "holidaydetails",
            "view": "Breeze.view.reporting.misc.HolidayDetails",
            "key": "HolidayDetails"
        },
        {
            "category": "misc",
            "type": "holidaylist",
            "view": "Breeze.view.reporting.misc.HolidayList",
            "key": "HolidayList"
        },
        {
            "category": "misc",
            "type": "holidayreconciliation",
            "view": "Breeze.view.reporting.misc.HolidayReconciliation",
            "key": "HolidayReconciliation"
        },
        {
            "category": "misc",
            "type": "leaverequests",
            "view": "Breeze.view.reporting.misc.LeaveRequests",
            "key": "LeaveRequestSummary"
        },
        {
            "category": "misc",
            "type": "leaverequestsummary",
            "view": "Breeze.view.reporting.misc.LeaveRequestSummary",
            "key": "LeaveRequests"
        },
        {
            "category": "misc",
            "type": "attendance",
            "view": "Breeze.view.reporting.misc.Attendance",
            "key": "PerfectAttendance"
        },
        {
            "category": "misc",
            "type": "policy",
            "view": "Breeze.view.reporting.misc.Policy",
            "key": "PolicyReport"
        },
        {
            "category": "misc",
            "type": "quicklist",
            "view": "Breeze.view.reporting.misc.QuickList",
            "key": "QuickList"
        },
        {
            "category": "misc",
            "type": "supervisors",
            "view": "Breeze.view.reporting.misc.Supervisors",
            "key": "SupervisorList"
        },
        {
            "category": "point",
            "type": "excessivepoints",
            "view": "Breeze.view.reporting.point.ExcessivePoints",
            "key": "ExcessivePoints"
        },
        {
            "category": "point",
            "type": "pointdetails",
            "view": "Breeze.view.reporting.point.PointDetails",
            "key": "PointDetails"
        },
        {
            "category": "point",
            "type": "pointledger",
            "view": "Breeze.view.reporting.point.PointLedger",
            "key": "PointLedger"
        },
        {
            "category": "point",
            "type": "pointtotals",
            "view": "Breeze.view.reporting.point.PointTotals",
            "key": "PointTotals"
        },
        {
            "category": "project",
            "type": "projectdetails",
            "view": "Breeze.view.reporting.project.ProjectDetails",
            "key": "ProjectDetails"
        },
        {
            "category": "project",
            "type": "projectprofile",
            "view": "Breeze.view.reporting.project.ProjectProfile",
            "key": "ProjectProfile"
        },
        {
            "category": "project",
            "type": "projectrecap",
            "view": "Breeze.view.reporting.project.ProjectRecap",
            "key": "ProjectRecap"
        },
        {
            "category": "project",
            "type": "projecttime",
            "view": "Breeze.view.reporting.project.ProjectTime",
            "key": "ProjectTimeSummary"
        }
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
    },

     /**
     * Resolve report key value into route URL
     * @param {String} key Report key value
     * @return {String} resolved url
     */
    resolveKey: function (key) {
        var idx = this.find('key', key);
        if (idx !== -1) {
            let rec = this.getAt(idx).data,
                url = `reports/${rec.category}/${rec.type}`;
            return url;
        } else {
            return null;
        }
    }
});