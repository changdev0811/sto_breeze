/**
 * Add supervised employee dialog
 * @class AddSupervisedEmployee
 * @namespace Breeze.view.employee.information.dialog.AddSupervisedEmployee
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
})