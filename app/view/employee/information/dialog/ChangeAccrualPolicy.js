Ext.define('Breeze.view.employee.information.dialog.ChangeAccrualPolicy', {
    extend: 'Ext.Dialog',
    alias: 'widget.employee.information.dialog.changeaccrualpolicy',
    
    viewModel: {
        type: 'employee.information.dialog.changeaccrualpolicymodel'
    },

    // data: {
    //     saveHandler: function(){},
    //     doneHandler: function(){}
    // },

    ui: 'dark-themed-dialog',
    title: 'Change Accrual Policy',
    
    layout: 'vbox',

    buttons: [
        {
            text: 'Done',
            ui: 'confirm alt',
            handler: 'onChangeAccrualPolicyDialogDone'
        },
        {
            text: 'Cancel',
            ui: 'decline alt',
            style: 'margin-left: 8pt',
            handler: 'onChangeAccrualPolicyDialogCancel'
        }
    ],

    items: [
        {
            xtype: 'component',
            html: '**These changes will not save until you save this Employee\'s Information**',
            userCls: 'dialog-warning'
        },
        {
            xtype: 'fieldset',
            itemId: 'mode',
            title: 'When saving this change, would you like to:',
            items: [
                {
                    xtype: 'containerfield',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'radio',
                        bodyAlign: 'stretch',
                        ui: 'dialog-field-radio'
                    },
                    items: [
                        {
                            boxLabel: 'Change Accrual Policy and apply Accrual Information',
                            value: 3, name: 'mode', checked: true
                        },
                        {
                            boxLabel: 'Change Accrual Policy and apply Accrual Information and Shift Time',
                            value: 4, name: 'mode'
                        },
                        {
                            boxLabel: 'Change Accrual Policy only',
                            value: 1, name: 'mode', reference: 'changeAccrualPolicyMode1'
                        },
                        {
                            boxLabel: 'Change Accrual Policy and apply Shift Time',
                            value: 2, name: 'mode', 
                            reference: 'changeAccrualPolicyMode2'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            bind: {
                hidden: '{changeAccrualPolicyMode1.checked || changeAccrualPolicyMode2.checked}'
            },
            defaults: {
                xtype: 'checkbox',
                bodyAlign: 'center',
                ui: 'dialog-field-checkbox'
            },
            items: [
                {
                    boxLabel: 'Change Past Recording Years',
                    bind: {
                        checked: '{changePast}'
                    },
                    flex: 1
                },
                {
                    boxLabel: 'Change User-Modified Records',
                    bind: {
                        checked: '{changeUserModified}'
                    },
                    flex: 1
                }
            ]
        }
    ]
});