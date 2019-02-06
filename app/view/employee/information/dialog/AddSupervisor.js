/**
 * Add supervised employee dialog; Used in company > supervisors
 * in Employee Info
 * @class AddSupervisor
 * @memberof Breeze.view.employee.information.dialog
 */
Ext.define('Breeze.view.employee.information.dialog.AddSupervisor', {
    extend: 'Ext.Dialog',
    alias: 'widget.employee.information.dialog.addsupervisor',
    ui: 'dark-themed-dialog',
    title: 'Add Supervisor',
    layout: 'hbox',
    items: [
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
        }
    ],
    buttons: [
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
});