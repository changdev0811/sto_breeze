/**
 * Add shift segment dialog
 * @class AddShiftSegment
 * @namespace Breeze.view.employee.information.dialog.AddShiftSegment
 */
Ext.define('Breeze.view.employee.information.dialog.AddShiftSegment', {
    extend: 'Ext.Dialog',
    alias: 'widget.employee.information.dialog.addshiftsegment',
    ui: 'dark-themed-dialog',
    title: 'Add Shift Segment',
    layout: 'hbox',
    items: [
        {
            xtype: 'combobox',
            itemId: 'start',
            label: 'Start',
            store: 'accrualShiftChoices',
            displayField: 'time',
            valueField: 'value',
            forceSelection: false,
            queryMode: 'local',
            required: true,
            validators: {
                type: 'controller',
                fn: 'validateShiftTime'
            }
        },
        {
            xtype: 'spacer',
            width: '8pt'
        },
        {
            xtype: 'combobox',
            itemId: 'stop',
            label: 'Stop',
            store: 'accrualShiftChoices',
            displayField: 'time',
            valueField: 'value',
            forceSelection: false,
            queryMode: 'local',
            required: true,
            validators: {
                type: 'controller',
                fn: 'validateShiftTime'
            }
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save',
            ui: 'confirm alt',
            handler: 'onAddShiftSegmentDialogSave'
        },
        {
            xtype: 'spacer', width: '8pt'
        },
        {
            xtype: 'button',
            text: 'Cancel',
            ui: 'decline alt',
            handler: 'onDialogCancel',
            data: {
                // cleanup function after closing dialog
                cancelableAction: 'onAddShiftSegmentDialogCancel'
            }
        }
    ]
})