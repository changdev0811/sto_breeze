/**
 * Restore Employee Admin view
 * @class RestoreEmployee
 * @namespace Breeze.view.admin.RestoreEmployee
 * @alias widget.admin.restoreemployee
 */
Ext.define('Breeze.view.admin.RestoreEmployee', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.restoreemployee',

    config: {
        crumbTitle: 'Restore Employees'
    },


    // View Model
    viewModel: {
        type: 'admin.restoreemployee'
    },

        // Controller
    controller: 'admin.restoreemployee',
    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'admin-base',

    title: 'Restore Employees',

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [
        {
            xtype: 'panel',
            ui: 'admin-sub',
            layout:'fit',
            buttons: {
                save: { reference:'restoreButton', disabled:true, text: 'Restore Employee', handler:'onRestoreButtonTap', ui: 'action', },
            },
            buttonAlign: 'right',
            buttonToolbar: {
                xtype: 'toolbar',
                ui: 'admin-actions',
                shadow: false
            },
            items:[
                {
                    xtype: 'selectfield',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset no-border',
                    reference:'deletedEmployeesSelectField',
                    maxWidth:'350pt',
                    labelAlign: 'left',
                    labelWidth: 'auto',
                    placeholder: 'Select employee to restore',
                    label:'Employee to Restore',
                    displayField: 'text',
                    valueField: 'data',
                    bind: {
                        store: '{Employees}',
                    },
                    listeners:{
                        select:'onEmployeeSelect'
                    }

                },





            ]
        },
    ]
});