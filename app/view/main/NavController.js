/**
 * Primary controller class used for main navigation view and routing
 * @class NavController
 * @namespace Breeze.view.main.NavController
 * @alias controller.main.nav
 * @extends Ext.app.ViewController
 */
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
            'Breeze.helper.routing.TreeRouter',
            'Breeze.api.Auth',
            'Breeze.api.Common',
        ],

        init: function(component){
            this.router = Ext.create('Breeze.helper.routing.TreeRouter', this);
            this.apiClass = Ext.create('Breeze.api.Auth');
            this.commonClass = Ext.create('Breeze.api.Common');
            this.loadHeader();
        },

        /**
         * Load data displayed in app header
         */
        loadHeader: function(){
            var me = this;
            this.commonClass.getHeaderInfo().then(
                function(data){
                    me.getViewModel().set('header', data);
                }
            ).catch(function(err){
                console.warn('Failed to load header info', err);
            });
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

        /**
         * Handles user clicking on sidebar toggle button
         */
        onSideNavToggle: function(button, e, eOpts){
            var collapsed = !button.getCollapsed();
            button.setCollapsed(collapsed);
            var navTree = this.lookup('navSideMenuTree');
            // update layout of punch clock
            this.lookup('navPunchClock').setMicro(collapsed);
            // If button's collapsed state isn't the same as
            // the nav tree's micro property, update the navtree
            if(collapsed !== navTree.micro){
                navTree.setMicro(collapsed);
                navTree.toggleCls('normal', !collapsed);
                navTree.toggleCls('micro', collapsed);
                navTree.setStore(
                    (collapsed)? this.getViewModel().getStore('personalNavMicro') : 
                    this.getViewModel().getStore('personalNav')
                );
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

        /**
         * Handle 'Sign Out' menu item click
         */
        onMenuSignOut: function(c, e, eOpts){
            this.apiClass.logout();
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
            console.info('Employee Info Route');
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