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
        'Breeze.helper.Auth',
        'Breeze.view.main.employees.Panel',
        'Breeze.view.reporting.Selector'
    ],

    stores: [
        // Option Lists
        'Breeze.store.option.UserTypes',
        'Breeze.store.option.Genders',
        'Breeze.store.option.Compensation',
        'Breeze.store.option.CalendarTypes',
        'Breeze.store.option.Years',
        'Breeze.store.option.DurationTypes',
        // Other autoload stores
        'Breeze.store.employee.static.PunchRoundingIncrements',
        'Breeze.store.company.Config',
        'Breeze.store.option.NewRates',
        'Breeze.store.accrual.static.ShiftChoices'
    ],

    defaultToken: 'home',

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
        Breeze.helper.Theme.apply();
        //======[Testing Mode Block Start]=========
        // TODO: Removing testing check when out of dev
        var testing = Breeze.helper.Base.isTestMode();
        if(testing){
            // make dummy cookies for test mode, so we
            // can skip login
            Breeze.helper.Auth.setCookies("1","2","5001");
            Breeze.helper.Cookie.bake('STOLI','True',null);
        }
        if((Breeze.helper.Auth.isAuthorized() && Breeze.helper.Auth.isLoggedIn()) || testing){
            // Ext.getStore('CompanyConfig').load();
            this.viewport.add(Ext.create('Breeze.view.main.Nav', {
                //data: {mode: 'supervisor'}
            }));
        } else {
            this.viewport.add(Ext.create('Breeze.view.auth.Login'));
        }
    }
});
