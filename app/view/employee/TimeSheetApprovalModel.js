Ext.define('Breeze.view.employee.TimeSheetApprovalModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employee.TimeSheetApproval',

    data: {
        employeeName: 'X',
        departmentName: 'X',
        hireDate: 'X',
        points: '',
        carriedOver: 'X',
        carryOverExpired: 'X',
        accrued: 'X',
        adjustments: 'X',
        allowed: 'X',
        recorded: 'X',
        showScheduledTime: 'X',
        remaining: 'X',

        approvalMode: 'X',
        conflictScope: 'X',
        conflictLimit: 'X',
        fyiAsOfDate: 'X',

    },

    stores: {
        // 'employee_fyi': null
    }

});