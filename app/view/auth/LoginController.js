/**
 * View Controller for Login view
 * @class LoginController
 * @namespace Breeze.auth.LoginController
 * @alias controller.auth.login
 */
Ext.define('Breeze.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth.login',

    requires: [
        'Breeze.helper.Cookie',
        'Breeze.helper.Api',
        'Breeze.api.Auth'
    ],

    init: function(c){
        this.api = Ext.create('Breeze.api.Auth');
    },

    onLoginButtonTap: function(button, e, eOpts){
        console.log('Login button pressed!');
        if(this.validateForm()){
            this.loginRequest();
        }
    },

    loginRequest: function(){
        var c = Breeze.helper.Cookie;

        // window.history.replaceState({}, document.title, window.location.href.split('?')[0]);

        var remember = Ext.getCmp('rememberMeField');
        
        var creds = {
            loginCode: this.view.down('[name="loginCode"]').getValue(),
            loginUsername: this.view.down('[name="loginUsername"]').getValue(),
            loginPassword: this.view.down('[name="loginPassword"]').getValue()
        };

        if(remember.checked){
            // remember password
            c.bake('COMPANYCODE', creds.loginCode, 9999);
            c.bake('USERNAME', creds.loginUsername, 9999);
        } else {
            // clear out any existing remember me data
            c.bake('COMPANYCODE', '', -234);
            c.bake('USERNAME','',-234);
        }

        // md5 hash the password
        creds.loginPassword = send(creds['loginPassword']);


        // TODO: Add status message indicatiing login is in progress

        var me = this;

        console.group('Login');
        me.api.preLogin(creds.loginCode).then(function(r){
            if(r.success){
                console.info('PreLogin Resolved: Successful');
                me.api.login(
                    r.url, creds.loginCode, 
                    creds.loginUsername, creds.loginPassword
                ).then(function(r){
                    console.info('Login Resolved; success: ', r.success);
                    if(r.success){
                        // If need to show renewal message
                        if(r.renewal){
                            // renewal message
                            // r.renewalMessage
                        } else {
                            // good to continue directly
                            window.location.reload();
                        }
                    } 
                }).catch(function(e){
                    console.warn('Login Rejected: ', e);
                    switch(e.reason){
                        case 'terminated':
                            me.updateMessage(true, 'error', e.message);
                        break;
                        default: 
                            me.updateMessage(true, 'error', 'Unspecified error (' + e.message + ')');
                        break;
                    }
                });
            } else {
                console.warn('PreLogin Resolved, returned failure');
            }
        }).catch(function(e){
            console.warn('PreLogin Rejected: ', e);
        });
        
        console.groupEnd();
        // TODO: Ask chad, etc about login process, see if necessary to make two requests, one getting a 'true url'
    },

    validateForm: function(){
        var form = this.lookup('loginForm');
        var valid = form.validate();
        console.info('Valid form?', valid);
        if(valid){
            this.lookup('message').setHidden(true);
        }
        return valid;
    },

    /**
     * Update visibility and content of login form message box
     * @param {Boolean} shown If true, message is made visible
     * @param {String} state Updates message state, if shown is true
     * @param {String} message Updates message state, if shown is true
     */
    updateMessage: function(shown, state, message){
        var message = this.lookup('message');
        if(!shown){
            message.setHidden(true);
        } else {
            message.setState(state);
            message.setMessage(message);
            message.setHidden(false);
        }
    }

})