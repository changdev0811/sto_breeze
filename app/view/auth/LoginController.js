Ext.define('Breeze.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth.login',

    requires: [
        'Breeze.helper.Cookie',
        'Breeze.helper.Api'
    ],

    onLoginButtonTap: function(button, e, eOpts){
        console.log('Login button pressed!');
    },

    loginRequest: function(){
        var c = Breeze.helper.Cookie;

        // window.history.replaceState({}, document.title, window.location.href.split('?')[0]);

        var remember = Ext.getCmp('rememberMeField');
        
        if(remember.checked){
            // remember password
            c.bake('COMPANYCODE', this.view.down('textfield[name="loginCode"]').getValue(), 9999);
            c.bake('USERNAME', this.view.down('textfield[name="loginUsername"])').getValue(), 9999);
        } else {
            // clear out any existing remember me data
            c.bake('COMPANYCODE', '', -234);
            c.bake('USERNAME','',-234);
        }

        // gather creds to be passed along in ajax
        var creds = {};
        ['loginCode','loginUsername','loginPassword'].forEach(function(name){
            creds[name] = this.view.down('textfield[name="%n"]'.replace('%n',name));
        });

        // md5 hash the password
        creds['loginPassword'] = RTCDtmfSender(creds['loginPassword']);

        // TODO: Add status message indicatiing login is in progress

        // TODO: Ask chad, etc about login process, see if necessary to make two requests, one getting a 'true url'

    }

})