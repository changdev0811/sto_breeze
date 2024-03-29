/**
 * Security subview tab for Employee Info
 * @class Security
 * @namespace Breeze.view.employee.information.Security
 */
Ext.define('Breeze.view.employee.information.Security', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.security',
    padding:'8pt',

    controller: 'employee.information.security',

    layout: 'vbox',

    plugins: {
        readOnlyPlug: {
            type: 'breeze.form.readonly',
            recursive: true,
            expression: 'readOnly'
        }
    },

    items: [
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset no-side-margin',
            title: 'Login Information',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                        xtype: 'breeze-textfield',
                        userCls: 'employee-info-general-field',
                        ui: 'employeeinfo-textfield'
                    },
                    items: [
    
                        {
                            itemId: 'user_name',
                            label: 'User Name',
                            bind: { 
                                value: '{info.Username}',
                                editable: '{employeeId == "new"}'
                            },
                            ignoreReadOnly: true,
                            required: true,
                            plugins: {
                                asyncValidate: {
                                    type: 'breeze.field.asyncvalidation',
                                    validator: 'validateUserName',
                                    triggerEvent: 'focusleave',
                                    force: false
                                }
                            },
                            listeners: {
                                aftervalidationfail: 'onUserNameAfterValidationFail' 
                            }
                        },
                        {
                            itemId: 'user_type',
                            // xtype: 'selectfield',
                            xtype: 'combobox',
                            editable: false,
                            label: 'User Type',
                            bind: { value: '{info.LoginType}' }, 
                            store: 'UserTypeOptions',
                            displayField: 'Description',
                            valueField: 'ID'
                        },
                        {
                            xtype: 'breeze-email',
                            itemId: 'email',
                            label: 'Email',
                            bind: { value: '{info.Email}' }, 
                            // TODO: Email validation regex
                            /* regex: */
                            invalidText: 'Invalid email address',
                            validators: Ext.create('Ext.data.validator.Email', 
                            {message: 'Invalid email address'})
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                        xtype: 'breeze-textfield',
                        userCls: 'employee-info-general-field',
                        ui: 'employeeinfo-textfield'
                    },
                    bind: {
                        hidden: '{!newEmployee}'
                    },
                    items: [
                        {
                            xtype: 'breeze-password',
                            itemId: 'create_password',
                            bind: { 
                                value: '{initialPassword}'
                            },
                            required: true,
                            label: 'New Password'
                        }
                    ]
                }
            ]  
        },
        {
            xtype: 'fieldset',
            // xtype: 'formpanel',
            userCls: 'employee-info-fieldset no-side-margin',

            //ui: 'employeeinfo-fieldpanel',
            //userCls: 'employee-info-fieldset-bordered',
            reference: 'securityChangePassword',
            layout: 'vbox',
            title:'<i class="fas fa-key" style="padding-right:8pt;"></i>Change Password',
            ignoreReadOnly: true,
            bind: {
                hidden: '{newEmployee}'
            },
            defaults: {
                flex: 1,
                xtype: 'textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                { 
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                        userCls: 'employee-info-general-field',
                        ui: 'employeeinfo-textfield'
                    },
                    items: [
                        {
                            itemId: 'old_password',
                            label: 'Current Password',
                            xtype: 'breeze-password',
                            ignoreReadOnly: true,
                            listeners: {
                                change: 'checkChangeReady'
                            }
                        },
                        {
                            itemId: 'password',
                            xtype: 'breeze-password',
                            label: 'New Password',
                            // Changing password requires new and new confirm pass
                            listeners: {
                                // make password fields required when value is entered
                                change: 'updatePasswordRequirement'
                            }
                        },
                        {
                            itemId: 'confirm_new_password',
                            label: 'Confirm',
                            xtype: 'breeze-password',
                            listeners: {
                                change: 'checkChangeReady'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    defaults: {
                        xtype: 'button'
                    },
                    items: [
                        {
                            text: 'Reset',
                            ui: 'action',
                            listeners: {
                                tap: 'onResetChangePasswordTap'
                            }
                        },
                        {
                            xtype:'component',
                            flex:1
                        },
                        {
                            ui: 'confirm alt',
                            reference: 'changePasswordButton',
                            text: 'Change Password',
                            disabled: true,
                            listeners: {
                                tap: 'onChangePasswordTap'
                            }

                        }
                    ]
                }
            ]
        }
    ]
});