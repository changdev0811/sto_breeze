/**
 * View model for Change Accrual Policy Dialog for Employee Information
 */
Ext.define('Breeze.view.employee.information.dialog.ChangeAccrualPolicyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employee.information.dialog.changeaccrualpolicymodel',
    
    data: {
        changePast: false,
        changeUserModified: false
    }
});