Ext.define('Breeze.view.employee.information.Security', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.security',

    layout: 'vbox',

    items: [
        
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset',
            layout: 'hbox',
            title: 'Login Information',
            defaults: {
                flex: 1,
                xtype: 'breeze-textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    name: 'user_name',
                    label: 'User Name',
                    bind: '{info.Username}'
                },
                {
                    name: 'user_type',
                    xtype: 'selectfield',
                    label: 'User Type',
                    bind: '{info.LoginType}',
                    store: 'UserTypeOptions',
                    displayField: 'Description',
                    valueField: 'ID'
                },
                {
                    xtype: 'breeze-email',
                    name: 'email',
                    label: 'Email',
                    bind: '{info.Email}',
                    // TODO: Email validation regex
                    /* regex: */
                    invalidText: 'Invalid email address',
                    validators: Ext.create('Ext.data.validator.Email', 
                    {message: 'Invalid email address'})
                }
            ]  
        },
        {
            xtype: 'fieldset',
            ui: 'employeeinfo-fieldpanel',
            userCls: 'employee-info-fieldset-bordered',
            // userCls: 'employee-info-fieldpanel',
            layout: 'hbox',
            title: 'Change Password',
            defaults: {
                flex: 1,
                xtype: 'textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    name: 'old_password',
                    label: 'Current Password',
                    xtype: 'passwordfield'
                },
                {
                    name: 'password',
                    xtype: 'passwordfield',
                    label: 'New Password'
                    // Changing password requires new and new confirm pass
                },
                {
                    name: 'confirm_new_password',
                    label: 'Confirm',
                    xtype: 'passwordfield',
                    
                }
            ]  
        }
    ]
});