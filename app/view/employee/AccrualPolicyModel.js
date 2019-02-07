Ext.define('Breeze.view.employee.AccrualPolicyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employee.accrualpolicy',

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
    },

    stores: {
        // 'employee_fyi': null
    }

});