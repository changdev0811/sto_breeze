/**
 * Company configuration info model
 * (from /ConfigInfo)
 * 
 * @repositoryType Repository.Entities.ConfigInfo
 * @class Config
 * @alias Breeze.model.company.Config
 */
Ext.define('Breeze.model.company.Config', {
    extend: 'Breeze.model.Base',
    alias: 'model.company.config',
    fields: [
        { name: 'CompanyName', type: 'string' },
        { name: 'LogoPath', type: 'string' },
        { name: 'RepLogoPath', type: 'string' },
        { name: 'CarryType', type: 'integer' },
        { name: 'ConflictOpt', type: 'integer' },
        { name: 'CarryExp_Type', type: 'integer' },
        { name: 'CarryExp_Amt', type: 'integer' },
        { name: 'CarryExpires', type: 'boolean' },
        { name: 'FiscDate', type: 'string' },
        { name: 'CarryDate', type: 'date', dateFormat: 'MS' },
        { name: 'RepLogo', type: 'boolean' },
        { name: 'RepSignature', type: 'boolean' },
        { name: 'RecMode', type: 'integer' },
        { name: 'AutoPointDelete', type: 'boolean' },
        { name: 'LeaveApproveOpt', type: 'integer' },
        { name: 'LeaveApproveMode', type: 'integer' },
        { name: 'LeaveApprovalEmailSupervisor', type: 'boolean' },
        { name: 'LeaveDenialEmailSupervisor', type: 'boolean' },
        { name: 'ConflictLimit', type: 'integer' },
        { name: 'EmployeeViewConflictDetails', type: 'boolean' },
        { name: 'EnforceAllowed', type: 'boolean' },
        { name: 'AutoAdjustDelete', type: 'boolean' },
        { name: 'CarryYear', type: 'integer' },
        { name: 'AutoNoteDelete', type: 'boolean' },
        { name: 'RepComp', type: 'boolean' },
        { name: 'EmployeesLicensed', type: 'integer' },
        { name: 'LogoWidth', type: 'integer' },
        { name: 'LogoHeight', type: 'integer' },
        { name: 'HireDateYOS', type: 'boolean' },
        { name: 'RequestLeaveInPast', type: 'boolean' },
        { name: 'CancelLeavePending', type: 'integer' },
        { name: 'CancelLeaveNotTaken', type: 'integer' },
        { name: 'CancelLeaveAfterTaken', type: 'integer' },
        { name: 'PasswordComplexity', type: 'boolean' },
        { name: 'PointExpirationType', type: 'integer' },
        { name: 'PointRollingDuration', type: 'string' },
        { name: 'DisableSSN', type: 'boolean' },
        { name: 'PunchComment1', type: 'string' },
        { name: 'PunchComment2', type: 'string' },
        { name: 'PunchComment3', type: 'string' },
        { name: 'PunchComment4', type: 'string' },
        { name: 'PunchComment5', type: 'string' },
        { name: 'PunchComment6', type: 'string' },
        { name: 'PunchComment7', type: 'string' },
        { name: 'PunchComment8', type: 'string' },
        { name: 'StartOfWeek', type: 'integer' },
        { name: 'PunchCutOff', type: 'integer' },
        { name: 'hasTKO', type: 'boolean' },
        { name: 'EnableExternalPunches', type: 'boolean' },
        { name: 'StateLessPunching', type: 'boolean' },
        { name: 'TimeZone_ID', type: 'string' },
        { name: 'Captions', reference: 'model.company.config.captions' }
    ]
});