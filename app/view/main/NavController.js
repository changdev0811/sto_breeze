(function(){
    /**
     * View Controller for view.main.Nav
     */
    Ext.define('Breeze.view.main.NavController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.main.nav',

        requires: [
            'Ext.route.Route',
            'Breeze.helper.Auth',
            'Breeze.helper.routing.TreeRouter'
        ],

        init: function(component){
            this.router = Ext.create('Breeze.helper.routing.TreeRouter', this);
        },

        // Routes
        routes: {
            'home': 'onHomeRoute',
            'personal/employee_info': 'onPersonalEmployeeInfoRoute',
            'personal/fyi': {
                action: 'onPersonalFyiRoute',
            },
            'personal/year_at_a_glance': 'onPersonalYaagRoute',
            'personal/worktime_records': 'onPersonalWtrRoute',
            'personal/calendar': 'onPersonalCalendarRoute',
            'download/punch_station': 'onDownloadPunchStationRoute'
        },

        // Event Handlers

        onSideNavToggle: function(button, e, eOpts){
            var collapsed = !button.getCollapsed()
            button.setCollapsed(collapsed);
            if(collapsed !== this.lookup('navSideMenuTree').micro){
                this.lookup('navSideMenuTree').setMicro(collapsed);
            }
        },

        /**
         * Handle side nav tree item selection changing
         */
        onSideNavSelect: function(tree, tRecord, eOpst){
            console.log("Side nav menu item selection changed!");
            var r = this.router.resolve(tRecord, true);
            console.log("Route result: " + r);
            this.router.resolve(tRecord);
        },

        // Route change handlers

        onHomeRoute: function() {

        },

        onPersonalEmployeeInfoRoute: function(){
            // var auth = Breeze.helper.Auth.getCookies();
            var info = Ext.create('Breeze.view.employee.Information');
            this.changeContent(
                // Ext.create('Breeze.view.employee.Information')
                // { xtype: 'employee.information' }
                info
            );
        },

        onPersonalFyiRoute: function() {
            this.changeContent(
                Ext.create('Breeze.view.employee.Fyi')
            );
        },

        onPersonalYaagRoute: function(){

        },

        onPersonalWtrRoute: function(){

        },

        onPersonalCalendarRoute: function(){

        },

        onDownloadPunchStationRoute: function(){

        },

        // Content functions

        /**
         * Swap contents of body content container
         * @param {Object} newContent New view / component to show in content container
         * @param {Boolean} modalMode If true, treat view as 'modal' (disable menus); default false
         */
        changeContent: function(newContent, modalMode){
            var modalMode = defVal(modalMode, false);

            var container = this.lookup('contentContainer');
            container.removeAll();
            if(newContent && newContent !== null){
                container.add(newContent);
            }

            if(modalMode){
                // TODO: Change what menus are shown / enabled
            }

        }


    });
    /** If a is undefined, return b, else return a 
     * (for handling undefined optional params) */
    var defVal = function(a,b){return"undefined"==typeof a?b:a};
})();