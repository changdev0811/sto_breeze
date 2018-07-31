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
                }
            ]  
        },
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset',
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