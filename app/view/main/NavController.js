(function(){
    /**
     * View Controller for view.main.Nav
     */
    Ext.define('Breeze.view.main.NavController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.main.nav',

        stores: [
            'Breeze.store.option.UserTypes',
            'Breeze.store.option.Genders',
            'Breeze.store.option.Compensation',
            'Breeze.store.employee.static.PunchRoundingIncrements',
            'Breeze.store.company.Config'
        ],
    

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
            'personal': 'onHomeRoute',
            'personal/info': {
                action: 'onPersonalEmployeeInfoRoute',
                name: 'personal_info'
            },
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
            this.changeContent(
                Ext.create('Breeze.view.dashboard.Personal', {
                    data: { employee: undefined }
                })
            );
        },

        onPersonalEmployeeInfoRoute: function(){
            // var auth = Breeze.helper.Auth.getCookies();
            // var info = Ext.create('Breeze.view.employee.Information');
            this.changeContent(
                Ext.create('Breeze.view.employee.Information', {
                    data: { employee: undefined }
                })
                // { xtype: 'employee.information' }
                // info
            );
        },

        onPersonalFyiRoute: function() {
            this.changeContent(
                Ext.create('Breeze.view.employee.Fyi', {
                    data: { employee: undefined }
                })
            );
        },

        onPersonalYaagRoute: function(){

        },

        onPersonalWtrRoute: function(){
            this.changeContent(
                Ext.create('Breeze.view.employee.WorkTimeRecords', {
                    data: { employee: undefined }
                })
            );
        },

        onPersonalCalendarRoute: function(){
            this.changeContent(
                Ext.create('Breeze.view.employee.Calendar', {
                    data: { employee: undefined }
                })
            );
        },

        onDownloadPunchStationRoute: function(){
            // TODO: open link to punch station download in new tab
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
            
            if(newContent && newContent !== null){
            //     container.add(newContent);
                var old = container.getActiveItem();
                container.setActiveItem(newContent);
                if(typeof old !== 'undefined'){
                    container.remove(old);
                }
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