Ext.define('Breeze.view.employee.information.Sheets', {
    extend: 'Breeze.widget.actionsheet.MultipleMode',
    alias: 'widget.employee.information.sheets',
    title: 'Add Supervised Employee',
    listeners: {
        hide: 'onActionSheetHide'
    },
    data: {
        modes: {
            supervisor: {
                title: 'Add Supervisor',
                show: ['supervisor', 'supervisorButtons']
            },
            supervisedEmployee: {
                title: 'Add Supervised Employee',
                show: ['employee', 'supervisedEmployeeButtons']
            },
            department: {
                title: 'Add Department',
                show: ['department', 'role', 'departmentButtons']
            },
            shiftSegment: {
                title: 'Add Shift Segment',
                show: ['startTime', 'stopTime', 'shiftSegmentButtons']
            }
        },
        mode: 'supervisor'
    },
    items: [
        // Add Supervisor fields
        {
            xtype: 'selectfield',
            label: 'Supervisor',
            itemId: 'supervisor',
            displayField: 'displayName',
            valueField: 'personId',
            bind: {
                store: '{choices.supervising}'
            },
            required: true, errorTarget: 'under'
        },
        {
            xtype: 'container',
            itemId: 'supervisorButtons',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            style: 'padding-top: 6pt',
            items: [
                {
                    xtype: 'button',
                    ui: 'confirm alt',
                    text: 'Add',
                    listeners: {
                        tap: 'onCompanyAddSupervisor'
                    }
                },
                { xtype: 'spacer', width: 8 },
                {
                    xtype: 'button',
                    ui: 'decline alt',
                    text: 'Cancel',
                    listeners: {
                        tap: 'onActionSheetCancel'
                    }
                }
            ]
        },
        // Add Supervised Employee fields
        {
            xtype: 'selectfield',
            label: 'Employee Name',
            itemId: 'employee',
            displayField: 'displayName',
            valueField: 'personId',
            bind: {
                store: '{choices.supervisedEmployees}'
            },
            required: true, errorTarget: 'under'
        },
        {
            xtype: 'container',
            itemId: 'supervisedEmployeeButtons',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            style: 'padding-top: 6pt',
            items: [
                {
                    xtype: 'button',
                    ui: 'confirm alt',
                    text: 'Add',
                    listeners: {
                        tap: 'onCompanyAddEmployee'
                    }
                },
                { xtype: 'spacer', width: 8 },
                {
                    xtype: 'button',
                    ui: 'decline alt',
                    text: 'Cancel',
                    listeners: {
                        tap: 'onActionSheetCancel'
                    }
                }
            ]
        },
        // Add Company Department fields
        {
            xtype: 'selectfield',
            itemId: 'department',
            label: 'Department',
            displayField: 'departmentName',
            valueField: 'departmentId',
            bind: {
                store: '{choices.supervisedDepartments}'
            },
            required: true, errorTarget: 'under'
        },
        {
            xtype: 'selectfield',
            itemId: 'role',
            label: 'Role',
            displayField: 'Role_Name',
            valueField: 'Role_Id',
            bind: {
                store: '{securityRoles}'
            },
            required: true, errorTarget: 'under'
        },
        {
            xtype: 'container',
            itemId: 'departmentButtons',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            style: 'padding-top: 6pt',
            items: [
                {
                    xtype: 'button',
                    ui: 'confirm alt',
                    text: 'Add',
                    listeners: {
                        tap: 'onCompanyAddDepartment'
                    }
                },
                { xtype: 'spacer', width: 8 },
                {
                    xtype: 'button',
                    ui: 'decline alt',
                    text: 'Cancel',
                    listeners: {
                        tap: 'onActionSheetCancel'
                    }
                }
            ]
        },
        // Add Shift Segment fields
        {
            xtype: 'selectfield',
            itemId: 'startTime',
            label: 'Start',
            displayField: 'time',
            valueField: 'value',
            store: 'accrualShiftChoices',
            ignoreReadOnly: true,
            required: true, errorTarget: 'under'
        },
        {
            xtype: 'selectfield',
            itemId: 'stopTime',
            label: 'Stop Time',
            displayField: 'time',
            valueField: 'value',
            ignoreReadOnly: true,
            store: 'accrualShiftChoices',
            required: true, errorTarget: 'under'
        },
        {
            xtype: 'container',
            itemId: 'shiftSegmentButtons',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            style: 'padding-top: 6pt',
            items: [
                {
                    xtype: 'button',
                    ui: 'confirm alt',
                    text: 'Add',
                    listeners: {
                        tap: 'onAddShiftSegment'
                    }
                },
                { xtype: 'spacer', width: 8 },
                {
                    xtype: 'button',
                    ui: 'decline alt',
                    text: 'Cancel',
                    listeners: {
                        tap: 'onActionSheetCancel'
                    }
                }
            ]
        },
    ]
});