/**
 * Add company dialog, used in Company > Departments
 * in Employee Info
 * @class AddDepartment
 * @memberof Breeze.view.employee.information.dialog
 * @alias widget.employee.information.dialog.adddepartment
 */
Ext.define('Breeze.view.employee.information.dialog.AddDepartment', {
    extend: 'Ext.Dialog',
    alias: 'widget.employee.information.dialog.adddepartment',
    ui: 'dark-themed-dialog',
    title: 'Add Department',
    layout: 'hbox',
    items: [
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
        }
    ],
    buttons: [
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
});