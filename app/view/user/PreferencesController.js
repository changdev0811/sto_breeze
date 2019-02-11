/**
 * View Controller for Employee Information Report reporting criteria view
 * @class InformationController
 * @namespace Breeze.view.user.Preferences
 * @alias controller.user.preferences
 */
Ext.define('Breeze.view.user.PreferencesController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.user.preferences',
    theme: Breeze.helper.Theme,

    onInit: function(component){
        var me = this;
        var vm = me.getViewModel();
        // Create instance of user preferences API class
        this.preferencesApi = Ext.create('Breeze.api.user.Preferences');

        var themeName = this.theme.getMode();
        var nightMode = (themeName === 'night')? true : false;
        console.log('theme name', themeName);
        console.log('nightMode', nightMode);
		this.getViewModel().set('nightMode', (this.theme.getMode() == 'night') ? 1 : 0);
        // Load UserPreferences
        this.addStoreToViewModel(
            'Breeze.store.user.Preferences',
            'userPreferences',
            {
                load: true,
                createOpts: {
                   offset: 240,
                   limit: 25 
                },
                // callback for user preferences to store view model.
                loadOpts: { callback: (success) => {
                    if(success){
                        let userPrefs = vm.get('userPreferences').getAt(0);
                        vm.set(
                            'params',
                            {
                                NightMode: nightMode,
                                GoogleCal: userPrefs.get('GoogleCal'),
                                ViewSupervisorDashboard: userPrefs.get('ViewSupervisorDashboard'),
                                ShowHints: userPrefs.get('ShowHints'),
                                LeaveRequestWizard: userPrefs.get('LeaveRequestWizard'),
                                ViewMessageOfTheDay: userPrefs.get('ViewMessageOfTheDay'),
                                ViewTimeLocal: userPrefs.get('ViewTimeLocal'),
                                HHMM: userPrefs.get('HHMM'),
                                ClockOutSignOut: userPrefs.get('ClockOutSignOut'),
                                YaagCalendarView: userPrefs.get('YaagCalendarView'),
                                YaagCalendarType: userPrefs.get('YaagCalendarType')
                            }
                        );
                    }
                }}
            }
        );
    },
    
    /**
     * handler for 'Save' action button
     */
    onSave: function(c, e, eOpts){
        console.info('Save Clicked');
        var me = this,
            params = this.getViewModel().getData().params;
        me.preferencesApi.makeApiCall(
            'UpdateUserPreferences',
            {
                'ConfigInfo': Ext.JSON.encode(params)
            }
        ).then(
            function(r){
                console.info("Updating User Preferences success",r);
            }
        ).catch(
            function(err){
                console.info("Updating User Preferences failed",err);
            }
        );
    },


    //onMenuNightModeChange: function(checkbox, newValue, oldValue, eOpts){
    //    console.log(`${(newValue)? 'night' : 'day'} theme`);
    //    this.theme.swap((newValue)? 'night' : 'day');
    //}
	onMenuNightModeChange: function(field, value){
        this.theme.swap((value == 1)? 'night' : 'day');
    }
});