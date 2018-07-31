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
                xtype: 'textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    name: 'user_name',
                    label: 'User Name'
                },
                {
                    name: 'user_type',
                    label: 'User Type'
                },
                {
                    xtype: 'emailfield',
                    name: 'email',
                    label: 'Email',
                    // TODO: Email validation regex
                    /* regex: */
                    invalidText: 'Invalid email address'
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