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
        extend: 'Breeze.controller.Base',
        alias: 'controller.main.nav',

        // TODO: Determine if this actually does anything
        stores: [
            'Breeze.store.option.UserTypes',
            'Breeze.store.option.Genders',
            'Breeze.store.option.Compensation',
            'Breeze.store.employee.static.PunchRoundingIncrements',
            'Breeze.store.company.Config',
            'Breeze.store.reporting.Routes'
        ],
    
        requires: [
            'Ext.route.Route',
            'Breeze.helper.Auth',
            'Breeze.helper.routing.TreeRouter',
            'Breeze.api.Auth',
            'Breeze.api.Employee',
            'Breeze.api.Punch',
            'Breeze.api.reporting.YearAtAGlance',
            'Breeze.view.employee.Information',
            'Ext.Toast'
        ],

        /** Routes */
        routes: {
            // Personal routes
            'personal': {
                action: 'onHomeRoute'
            },
            'personal/info': {
                action: 'onPersonalEmployeeInfoRoute',
                name: 'personal_info',
                before: 'beforeRoute'
            },
            'personal/fyi': {
                action: 'onPersonalFyiRoute',
                before: 'beforeRoute'
            },
            'personal/year_at_a_glance': {
                action: 'onPersonalYaagRoute',
                before: 'beforeRoute'
            },
            'personal/worktime_records': {
                action: 'onPersonalWtrRoute',
                before: 'beforeRoute'
            },
            'personal/calendar': {
                action: 'onPersonalCalendarRoute',
                before: 'beforeRoute'
            },
            // Common routes
            'download/punch_station': {
                action: 'onDownloadPunchStationRoute',
                before: 'beforeRoute'
            },
            'home': {
                action: 'onHomeRoute'
            },
            // Report route
            'reports/:category/:type': {
                action: 'onReportRoute',
                // TODO: Implement before report route method to prevent access when not allowed
                before: 'beforeReportRoute'
            }
        },

        init: function(component){
            this.router = Ext.create('Breeze.helper.routing.TreeRouter', this);
            this.apiClass = Ext.create('Breeze.api.Auth');
            this.empClass = Ext.create('Breeze.api.Employee');
            this.punchClass = Ext.create('Breeze.api.Punch');
            this.reportRoutes = Ext.create('Breeze.store.reporting.Routes');
            this.theme = Breeze.helper.Theme;
            this.getViewModel().set('nightMode', (this.theme.getMode() == 'night'));
            Ext.util.History.init();
            this.loadNavigation();
            this.loadEmployee();
            this.loadPunchSettings();
            this.updateAttendanceStatus();
        },

        loadNavigation: function(){
            var me = this;
            
            var navStore = Ext.create('Breeze.helper.navigation.Personal').asTree();
            navStore.load({
                callback: (r,o,success) => {
                    if(success){
                        console.info('Loaded nav from helper');
                        me.addLoadedStoreToViewModel(navStore, 'personalNav');
                    } else {
                        console.warn('Failed to load nav from helper', r, o);
                    }
                }
            });
        },

        /**
         * Load nav-related employee info
         */
        loadEmployee: function(){
            var me = this;
            me.getViewModel().set('userId', this.apiClass.auth.getCookies().emp);
            this.empClass.getHeaderInfo().then(
                function(data){
                    me.getViewModel().set('header', data);
                }
            ).catch(function(err){
                console.warn('Failed to load header info', err);
            });
            this.empClass.getDefaultProjectCode().then(
                function(code){
                    me.getViewModel().set('punch.defaultProjectCode', code);
                }
            ).catch(function(err){
                console.warn('Unable to get default project code', err);
            });
        },

        /**
         * Load punch related settings
         */
        loadPunchSettings: function(){
            var me = this;
            this.punchClass.getCurrentPolicy().then(
                function(data){
                    var vm = me.getViewModel();
                    vm.set('punch.policy', data);
                }
            )
        },

        /**
         * Check punch attendance status
         */
        updateAttendanceStatus: function(){
            var vm = this.getViewModel();
            this.punchClass.getAttendanceStatus().then(
                function(resp){
                    vm.set('punch.status', resp);
                }
            );
        },

        // ===[Event Handlers]===

        /**
         * Handles user clicking on sidebar toggle button
         */
        onSideNavToggle: function(button, e, eOpts){
            var collapsed = !button.getCollapsed();
            button.setCollapsed(collapsed);
            var navTree = this.lookup('navSideMenuTree');
            var sideBar = this.lookup('navSideBar');
            // update layout of punch clock
            this.lookup('navPunchClock').setMicro(collapsed);
            // If button's collapsed state isn't the same as
            // the nav tree's micro property, update the navtree
            // if(collapsed !== navTree.micro){
                // navTree.setMicro(collapsed);
                navTree.toggleCls('normal', !collapsed);
                navTree.toggleCls('micro', collapsed);
                sideBar.toggleCls('micro', collapsed);
                // navTree.setStore(
                //     (collapsed)? this.getViewModel().getStore('personalNavMicro') : 
                //     this.getViewModel().getStore('personalNav')
                // );
            // }
        },

        /**
         * Handle punch clock events
         * @param {Object} cmp Punch clock button component
         * @param {Boolean} quick If punch is a quick punch or not
         * @param {String} kind Kind of punch ('in', 'out', or 'regular')
         */
        onPunch: function(cmp, quick, kind){
            var vm = this.getViewModel();
            var projectCode = vm.get('punch.defaultProjectCode');
            var me = this;
            if(quick){
                console.info('Punching ' + kind);
                me.punchClass.submit(projectCode).then(
                    function(resp){
                        if(resp.success){
                            Ext.toast({
                                message: 'Successfully punched ' + kind,
                                type: Ext.Toast.INFO,
                                timeout: 10000
                            });
                            me.updateAttendanceStatus();
                        } else {
                            Ext.toast('Error submitting punch:<br>' + resp.err, 1024);
                            Ext.toast({
                                message: 'Error submitting punch:<br> ' + resp.err,
                                type: Ext.Toast.ERROR,
                                timeout: 10000
                            });
                        }
                    }
                ).catch(function(err){
                    console.warn('Caught error submitting punch: ', err);
                    Ext.toast({
                        message: 'Error submitting punch',
                        type: Ext.Toast.ERROR,
                        timeout: 10000
                    });
                });
            } else {
                // TODO: Implement regular punch view
                console.info('Regular punch');
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
            this.apiClass.logout(true);
        },

        onMenuNightModeChange: function(c, checked){
            this.theme.swap((checked)? 'night' : 'day');
        },

        // ===[Route change handlers]===

        /**
         * Triggered before route action is resolved
         * Used to make sure navtree syncs its selected item
         * with the url
         */
        beforeRoute: function(action){
            this.syncNavToRoute(action.getUrlParams().input);
            action.resume();
        },

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
            console.info('Created employee info view instance: ', info);
            var info = Ext.create('Breeze.view.employee.Information', {
                data: { employee: undefined }
            });
            this.changeContent(info);
            // { xtype: 'employee.information' }
            // info
            console.info('Employee Info Route Set');
        },

        /**
         * Handle personal FYI route
         */
        onPersonalFyiRoute: function() {
            this.changeContent(
                Ext.create('Breeze.view.employee.Fyi', {
                    data: { employee: undefined }
                })
            );
        },

        /**
         * Handle Personal Year At a Glance Route
         */
        onPersonalYaagRoute: function(){
            var yaag = Ext.create('Breeze.api.reporting.YearAtAGlance');
            var me = this;
            yaag.process().then(
                function(url){
                    if(typeof url == "string"){
                        Ext.toast({
                            message: 'Year at a Glance report successfully generated',
                            type: Ext.Toast.INFO,
                            timeout: 10000
                        });
                        window.open(url,'_blank');
                    } else {
                        if(url.Message){
                            Ext.toast({
                                message: 'Year at a Glance Error: <br>' + url.Message,
                                type: Ext.Toast.ERROR,
                                timeout: 10000
                            });
                        }
                    }
                    Ext.util.History.back();
                }
            ).catch(
                function(err){
                    console.warn('Error generating YAAG report: ', err);
                    Ext.toast({
                        message: 'Error generating Year at a Glance Report', 
                        timeout: 10000,
                        type: Ext.Toast.ERROR
                    });
                    Ext.util.History.back();
                }
            )
        },

        /**
         * Handle personal Work Time Records route
         */
        onPersonalWtrRoute: function(){
            var vm = this.getViewModel();
            var emp = vm.get('userId');
            this.changeContent(
                Ext.create('Breeze.view.employee.WorkTimeRecords', {
                    data: { employee: emp }
                })
            );
        },

        /**
         * Handle personal calendar route
         */
        onPersonalCalendarRoute: function(){
            var vm = this.getViewModel();
            var emp = vm.get('userId');
            this.changeContent(
                Ext.create('Breeze.view.employee.Calendar', {
                    data: { employee: emp }
                })
            );
        },

        /**
         * Handle download punch station route
         */
        onDownloadPunchStationRoute: function(){
            // TODO: open link to punch station download in new tab (add correct url)
            console.info('Downloading punchstation');
            // window.open("https://tko.softtimeonline.com/STO/PunchStation/setup.exe");
            window.location.href = "https://tko.softtimeonline.com/STO/PunchStation/setup.exe";
            Ext.util.History.back();
        },

        /**
         * Called before report route handler method.
         * 
         * Checks to make sure report route is valid, if not, action is cancelled
         */
        beforeReportRoute: function(category, type, action){
            if(this.reportRoutes.resolve(category, type) == null){
                action.stop();
                Ext.util.History.back();
            } else {
                action.resume();
            }
        },

        /**
         * Handle report route
         * 
         * Uses Breeze.store.reporting.Routes to resolve view name based on
         * provided category and type params (reports/<category>/<type>)
         * 
         * @param {String} category Category param from url
         * @param {String} type Type param from url
         */
        onReportRoute: function(category, type){
            console.group('Report Route Handler');
            console.info('Route: ', category, type);
            var viewNS = this.reportRoutes.resolve(category, type);
            console.info('Resolved View: ', viewNS);
            console.groupEnd();
            var component = Ext.create(viewNS, {
                data: {
                    data: { user: this.getViewModel().get('userId') }
                }
            });
            this.changeContent(component);
        },

        // ===[Content functions]===

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

        },

        syncNavToRoute: function(route){
            var tree = this.lookup('navSideMenuTree');
            if(route && route !== null){
                var navNode = tree.getNodeByRoute(route);
                if(navNode !== null && tree.getSelection() !== navNode){
                    // Found a node with the given route, and it isn't currently selected
                    tree.setSelection(navNode);
                }
            }
        }


    });
    /** If a is undefined, return b, else return a 
     * (for handling undefined optional params) */
    var defVal = function(a,b){return"undefined"==typeof a?b:a};
})();