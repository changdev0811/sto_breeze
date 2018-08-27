Ext.define('Breeze.view.auth.Login', {
    extend: 'Ext.Container',
    alias: 'widget.auth.login',
    xtype: 'login-form',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Checkbox',
        'Ext.Button'
    ],

    controller: 'auth.login',

    layout: 'vbox',
    userCls: 'login',

    items: [
        {
            // xtype: 'fieldset',
            xtype: 'formpanel',
            userCls: 'login-fieldset',
            itemId: 'loginFormFieldSet',
            title: 'Log In',
            items: [
                {
                    xtype: 'textfield',
                    id: 'companyField',
                    name: 'loginCode',
                    errorTarget: 'under',
                    label: 'Company Code',
                    // labelMinWidth: '110px',
                    labelWidth: 'auto',
                    required: true
                },
                {
                    xtype: 'textfield',
                    name: 'loginUsername',
                    errorTarget: 'under',
                    label: 'Username',
                    // labelMinWidth: '110px',
                    required: true
                },
                {
                    xtype: 'textfield',
                    name: 'loginPassword',
                    errorTarget: 'under',
                    label: 'Password',
                    // labelMinWidth: '110px',
                    required: true,
                    inputType: 'password'
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Remember Me',
                    id: 'rememberMeField'
                },
                // {
                //     xtype: 'container',
                //     items: [
                //         {
                //             xtype: 'button',
                //             text: 'Forgot Password?'
                //         },
                //         {
                //             xtype: 'button',
                //             ui: 'action',
                //             docked: 'right',
                //             text: 'Login',
                //             listeners: {
                //                 tap: 'onLoginButtonTap'
                //             }
                //         }
                //     ]
                // }
            ],
            buttons: [
                {
                    text: 'Login',
                    ui: 'action',
                    handler: 'onLoginButtonTap'
                },
                {
                    xtype: 'button',
                    text: 'Forgot Password?'
                },
            ]
        }
    ]

});