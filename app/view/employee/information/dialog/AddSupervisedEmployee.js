/**
 * Add supervised employee dialog;
 * Used in Company > Supervised Employees in Employee Info
 * @class AddSupervisedEmployee
 * @memberof Breeze.view.employee.information.dialog
 */
Ext.define('Breeze.view.employee.information.dialog.AddSupervisedEmployee', {
    extend: 'Ext.Dialog',
    alias: 'widget.employee.information.dialog.addsupervisedemployee',
    ui: 'dark-themed-dialog',
    title: 'Add Supervised Employee',
    layout: 'hbox',
    items: [
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
        }
    ],
    buttons: [
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
});