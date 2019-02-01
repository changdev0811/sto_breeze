/**
 * Login view
 * @class Login
 * @namespace Breeze.view.auth.Login
 * @alias widget.auth.login
 */
Ext.define('Breeze.view.auth.Login', {
    extend: 'Ext.Container',
    alias: 'widget.auth.login',
    xtype: 'login-form',
    scrollable: true,

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
            reference: 'loginForm',
            defaults:{
                ui: 'login-fieldset',
            },
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'companyCode',
                    name: 'loginCode',
                    errorTarget: 'under',
                    label: 'Company Code',
                    // labelMinWidth: '110px',
                    labelWidth: 'auto',
                    required: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'username',
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
                    inputType: 'password',
                    listeners: {
                        keypress: 'pressEnterKey'
                    }
                },
                {
                    xtype: 'checkbox',
                    ui:'login-checkbox',
                    boxLabel: 'Remember Me',
                    id: 'rememberMeField'
                },
                {
                    xtype: 'breeze-message',
                    state: 'error',
                    message: 'Test message',
                    hidden: true,
                    reference: 'message'
                }    
            ],
            buttons: [
                {
                    text: 'Login',
                    ui: 'action',
                    handler: 'onLoginButtonTap'
                },
                {
                    xtype: 'button',
                    text: 'Forgot Password?',
                    handler: 'onForgotButtonTap'
                },
            ]
        }
    ]

});