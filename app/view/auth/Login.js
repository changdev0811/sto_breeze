Ext.define('Breeze.view.auth.Login', {
    extend: 'Ext.form.Panel',
    alias: 'widget.auth.Login',
    xtype: 'login-form',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Checkbox',
        'Ext.Button'
    ],

    // viewModel: {
    //     type: 'myformpanel'
    // },

    layout: 'vbox',

    items: [
        {
            xtype: 'fieldset',
            itemId: 'loginFormFieldSet',
            title: 'Log In',
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'companyField',
                    name: 'loginCode',
                    errorTarget: 'under',
                    label: 'Company Code',
                    // labelMinWidth: '110px',
                    labelWidth: 'auto',
                    required: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'usernameField',
                    errorTarget: 'under',
                    label: 'Username',
                    // labelMinWidth: '110px',
                    required: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'passwordField',
                    name: 'loginPassword',
                    errorTarget: 'under',
                    label: 'Password',
                    // labelMinWidth: '110px',
                    required: true,
                    inputType: 'password'
                },
                {
                    xtype: 'checkbox',
                    label: 'Remember Me'
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Forgot Password?'
                        },
                        {
                            xtype: 'button',
                            itemId: 'loginButton',
                            ui: 'action',
                            docked: 'right',
                            text: 'Login'
                        }
                    ]
                }
            ]
        }
    ]

});