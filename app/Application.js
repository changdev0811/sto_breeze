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

    stores: [
        'Breeze.store.company.DepartmentList'
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
        
        // TODO: Removing testing check when out of dev
        var testing = true; // (should be removed later)
        if(testing){
            Breeze.helper.Auth.setCookies("1","2","3");
        }
        if(Breeze.helper.Auth.isAuthorized() || testing){
            this.viewport.add(Ext.create('Breeze.view.main.Nav', {
                //data: {mode: 'supervisor'}
            }));
        } else {
            this.viewport.add(Ext.create('Breeze.view.auth.Login'));
        }
    }
});
