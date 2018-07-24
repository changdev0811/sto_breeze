/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Breeze.Application', {
    extend: 'Ext.app.Application',

    name: 'Breeze',

    controllers: ['Breeze.controller.Overseer'],

    requires: [
        'Breeze.helper.Auth'
    ],

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    launch: function(){
        console.log("Launched");
        if(Breeze.helper.Auth.isAuthorized()){
            this.viewport.add(Ext.create('Breeze.view.main.Nav'));
        } else {
            this.viewport.add(Ext.create('Breeze.view.auth.Login'));
        }
    }
});
