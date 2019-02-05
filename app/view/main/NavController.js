/**
 * Primary controller class used for main navigation view and routing
 * @class NavController
 * @namespace Breeze.view.main.NavController
 * @alias controller.main.nav
 * @extends Ext.app.ViewController
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
        'Breeze.store.reporting.Routes',
        'Breeze.store.option.Years'
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
        'Ext.Toast',
        'Breeze.view.main.employees.Panel',
        'Breeze.view.reporting.Selector',
        'Breeze.helper.settings.StyleRules'
    ],

    /**
     * Settings for content displayable in side panel
     */
    Panels: {
        /** Employees panel */
        EMPLOYEES: {
            view: 'Breeze.view.main.employees.Panel',
            clearContent: true,
            id: 'employees',
            authorize: 'authorizedToViewEmployees'
        },
        /** Report selector panel */
        REPORTING: {
            view: 'Breeze.view.reporting.Selector',
            // view: 'Breeze.view.employees.Information',
            clearContent: true,
            id: 'reporting'
        }
    },

    /**
     * Global event listeners
     */
    listen: {
        global: {
            sidepanelclose: 'onSidePanelClose',
            sidepanelopen: 'onSidePanelOpen'
        }
    },

    /** Routes */
    routes: {
        'user/preferences': {
            action: 'onUserPreferencesRoute',
            name: 'user_preferences',
            before: 'beforeRoute'
        },
        // Personal routes
        'personal': {
            action: 'onHomeRoute',
            before: 'beforeRoute'
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
        'personal/accrual_policy/:id': {
            action: 'onPersonalAccrualPolicy',
            // before: 'beforeRoute'
        },

        'personal/leave_request_approval': {
            action: 'onPersonalLeaveRequestApproval',
            before: 'beforeRoute'
        },

        'personal/time_sheet_approval': {
            action: 'onPersonalTimeSheetApproval',
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
        // My Requests routes
        'requests' : {
            before: 'beforeRoute',
            action: 'onMyRequestsRoute'
        },
        // Common routes
        'download/punch_station': {
            action: 'onDownloadPunchStationRoute',
            before: 'beforeRoute'
        },
        'home': {
            action: 'onHomeRoute',
            before: 'beforeRoute'
        },
        'employees/:act/:id': {
            action: 'onEmployeesViewRoute',
            before: 'beforeEmployeesViewRoute'
        },
        // Admin route
        'admin/:type': {
            action: 'onAdminRoute',
            // TODO: Implement before report route method to prevent access when not allowed
            // before: 'beforeAdminRoute'
        },
        // Report route
        'reports/:category/:type': {
            action: 'onReportRoute',
            // TODO: Implement before report route method to prevent access when not allowed
            before: 'beforeReportRoute'
        },
        'help': {
            action: 'onHelpRoute'
        },
        'signout': {
            action: 'onMenuSignOut'
        }
    },

    init: function(component){
        var me = this;

        this.tasks = {}; // hold various tasks
        this.taskRunner = new Ext.util.TaskRunner(); // shared task runner

        this.router = Ext.create('Breeze.helper.routing.TreeRouter', {controller: this});
        this.apiClass = Ext.create('Breeze.api.Auth');
        this.empClass = Ext.create('Breeze.api.Employee');
        this.punchClass = Ext.create('Breeze.api.Punch');
        this.addStoreToViewModel(
            'Breeze.store.reporting.Routes',
            'reportRoutes',
            { load: false }
        );
        this.addStoreToViewModel(
            'Breeze.store.employees.Routes',
            'employeesRoutes',
            { load: false }
        );
        this.addStoreToViewModel(
            'Breeze.store.admin.Routes',
            'adminRoutes',
            { load: false }
        );
        this.theme = Breeze.helper.Theme;
        Breeze.helper.Auth.startAuthCheckTimer();
        this.getViewModel().set('nightMode', (this.theme.getMode() == 'night'));
        Ext.util.History.init();

        this.loadAccess();
        this.loadEmployee();
        this.loadPunchSettings();
        this.loadConfigAndPreferences();
        this.updateAttendanceStatus();
    },

    loadNavigation: function(){
        var me = this,
            level = me.getViewModel().get('accessLevel');
        
        // var navStore = Ext.create('Breeze.helper.navigation.Personal').asTreeWithExtras('Breeze.helper.navigation.Employees');
        var navStore, extras = [];
        if (level >= Breeze.api.Employee.accessLevel.SUPERVISOR) {
            extras.push('Breeze.helper.navigation.Employees');
            if(level == Breeze.api.Employee.accessLevel.SUPER_ADMIN){
                extras.push('Breeze.helper.navigation.Admin');
            }
            console.info('Extras: ', extras);
            // If user is supervisor or above, add employees section to nav
            navStore = Ext.create('Breeze.helper.navigation.Personal')
                .asTreeWithExtras(extras);
        } else {
            // Default employee level navigation
            this.refreshSidePanel(false);
            navStore = Ext.create('Breeze.helper.navigation.Personal').asTree();
        }
        me.addLoadedStoreToViewModel(navStore, 'personalNav');
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
     * Load Config and User preferences stores into viewmodel
     */
    loadConfigAndPreferences: function(){
        var vm = this.getViewModel();
        this.addStoreToViewModel(
            'Breeze.store.company.Config',
            'companyConfig',
            { load: true }
        );
        this.addStoreToViewModel(
            'Breeze.store.record.UserPreferences',
            'userPreferences',
            { load: true, createOpts: { userId: vm.get('userId') } }
        );
    },

    /**
     * Retrieve and store user's access level
     */
    loadAccess: function(){
        var me = this,
            vm = me.getViewModel();
        
        me.empClass.getAccess().then(function(level){
            vm.set('accessLevel', level);
            // update navigation
            me.loadNavigation();
        }).catch((err)=>{
            console.warn('Failed to get user access level info:', err);
        })
    },

    /**
     * Load punch related settings
     */
    loadPunchSettings: function(){
        var me = this;
        this.punchClass.getCurrentPolicy().then(
            function(data){
                var vm = me.getViewModel();
                vm.set('punch.policy', data.info);
                vm.set('punch.hasTimeKron', data.hasTimeKron);
            }
        );
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

    onLogoTap: function(){
        this.redirectTo('home');
    },

    /**
     * Handles user clicking on sidebar toggle button
     */
    onSideNavToggle: function(button, e, eOpts){
        var collapsed = !button.getCollapsed();
        button.setCollapsed(collapsed);
        var navTree = this.lookup('navSideMenuTree');
        var sideBar = this.lookup('navSideBar');
        this.lookup('userHeader').setCollapsed(collapsed);
        // update layout of punch clock
        //this.lookup('navPunchClock').setMicro(collapsed);
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
            me.onPunchWindowTap();
        }
    },


    /**
     * Handle punch window menu button event, displaying 
     * punch options dialog
     * @param {*} ref 
     * @param {*} x 
     * @param {*} eOpts 
     */
    onPunchWindowTap: function(){
        var vm = this.getViewModel();
            me = this;
        var view = this.getView(),
            dialog = this.punchWindowDialog;
            
        if (!dialog) {
            dialog = Ext.apply({ 
                ownerCmp: view, 
                viewModel: { parent: vm }  
            }, view.punchWindowDialog);
            this.punchWindowDialog = dialog = Ext.create(dialog);
        }
        
        this.punchClass.getCurrentPunchData().then((r)=>{
            me.addStoreToViewModel('Breeze.store.company.FlatProjectList', 'flatProjects', {load: true});
            me.copyRecordToViewModel(r, 'punch.currentData');
            me.tasks.punchWindowClock = me.taskRunner.newTask({
                run: function(){
                    let cmp = me.punchWindowDialog.query('[itemId="currentTime"]')[0];
                    cmp.setHtml(Ext.Date.format(new Date(), 'g:i:s A'));
                },
                interval: 500
            });
            me.tasks.punchWindowClock.start();
            dialog.getComponent('notes').setValue("");
            dialog.show();
        });
        console.info("[onPunchWindowTap]");
        //notesDialog
        // dialog.show();
    },

    /**
     * Handle punch window dialog close event
     * @param {*} dialog 
     * @param {*} e 
     * @param {*} eOpts 
     */
    onPunchWindowClose: function(ref, e, eOpts){
        var dlg = this.punchWindowDialog;
        dlg.hide();
        dlg.getComponent('notes').clearValue();
        this.taskRunner.stop(this.tasks.punchWindowClock, true);
    },

    /**
     * Event handler for submit button in punch window
     * 
     * Performs punch submit api call and closes dialog
     */
    onPunchWindowSubmit: function(){
        var vm = this.getViewModel(),
            dlg = this.punchWindowDialog,
            project = dlg.getComponent('project').getSelection(),
            notes = dlg.getComponent('notes').getValue(),
            punchIn= (vm.get('punch.currentData.punch_status') == 0);
        project = (project == null)? "" : project.get('Code');
        me.punchClass.submit(project, notes, punchIn).then(
            (resp)=>{
                if(resp.success){
                    Ext.toast({
                        message: 'Successfully punched ' + kind,
                        type: Ext.Toast.INFO,
                        timeout: 10000
                    });
                    me.updateAttendanceStatus();
                    dlg.hide();
                    // close punch window
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
    },


    /**
     * Handle side nav tree item selection changing
     */
    onSideNavSelect: function(tree, tRecord, eOpst){
        if(tRecord !== null){
            console.log("Side nav menu item selection changed!");
            var r = this.router.resolve(tRecord, true);
            console.log("Route result: " + r);
            this.router.resolve(tRecord);
        }
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
        try{
            this.syncNavToRoute(action.getUrlParams().input);
        } catch(err){
            console.warn('Sync error: ', err);
        }
        
        // ensure side panel isn't visible
        try{
            this.refreshSidePanel(false);
        } catch (err) {
            console.warn('refresh err', err);
        }
        // Reset logout timeout timer
        Breeze.helper.Auth.refreshTimeout();
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
        // prevent name errors
        this.destroyContentByType(['employee.information']);
        var info = Ext.create('Breeze.view.employee.Information', {
            data: { employee: undefined }
        });
        console.info('Created employee info view instance: ', info);
        this.changeContent(info);
        // { xtype: 'employee.information' }
        // info
    },

    onUserPreferencesRoute: function() {
        console.info('User Preferences Route');
        var info = Ext.create('Breeze.view.user.Preferences');
        this.changeContent(info);
    },

    // onUserPreferences: function() {
    //     this.redirectTo('user/preferences');
    // },

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
     * Handle personal Accrual Policy route
     */
    onPersonalAccrualPolicy: function( id ) {
        console.info('Accrual Policy');
        this.syncNavToRoute('root');
        this.replaceContent(
            'Breeze.view.employee.EmployeeAccrualPolicy', {
                data: { employee: undefined, catId: id }
            }
        );
    },


    /**
     * Handle personal Leave Request Approval route
     */
    onPersonalLeaveRequestApproval: function() {
        this.changeContent(
            Ext.create('Breeze.view.employee.LeaveRequestApproval', {
                data: { employee: undefined }
            })
        );
    },


    /**
     * Handle personal Time Sheet Approval route
     */
    onPersonalTimeSheetApproval: function() {
        this.changeContent(
            Ext.create('Breeze.view.employee.TimeSheetApproval', {
                data: { employee: undefined }
            })
        );
    },



    /**
     * Handle Personal Year At a Glance Route
     */
    onPersonalYaagRoute: function(){
        var vm = this.getViewModel();
        var emp = vm.get('userId');
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
                    // window.open(url,'_blank');
                    me.changeContent(
                        Ext.create('Breeze.view.employee.YearAtAGlance', {
                            data: { employee: emp }, viewModel: { data: { path: url }}
                        })
                    );
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

    /*
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
    */

    /**
     * Handle personal Work Time Records route
     */
    onPersonalWtrRoute: function(){
        var vm = this.getViewModel();
        var emp = vm.get('userId');
        this.changeContent(
            Ext.create('Breeze.view.employee.WorkTimeRecords', {
                data: { 
                    employee: emp, 
                    // navViewModel: vm 
                },
                viewModel: {
                    // tell view model to use navmodel as parent
                    parent: vm
                }
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
     * Handle My Requests route
     */
    onMyRequestsRoute: function(){
        console.info("[onMyRequestsRoute]");
        var vm = this.getViewModel(),
            emp = vm.get('userId');
        this.changeContent(
            Ext.create('Breeze.view.requests.Requests', {
            //Ext.create('Breeze.view.requests.MyRequestsInput', {
                data: { employee: emp },
                viewModel: {
                    parent: vm
                }
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
     * Handle admin route
     */
    onAdminRoute: function(type){
        console.info('Admin Route', type);
        var vm = this.getViewModel(),
            routes = vm.get('adminRoutes');
        // hide side panel
        this.refreshSidePanel(false);
        if(type !== 'list'){
            let ns = routes.resolve(type);
            // this.changeContent(
            //     Ext.create(ns, {
                    
            //     })
            // );    
            this.replaceContent(ns, {});
        } else {
            this.changeContent(
                Ext.create('Breeze.view.dashboard.Admin')
            );
            // this.replaceContent('Breeze.view.dashboard.Admin', {});
        }
        // this.changeContent(
        //     Ext.create(ns, {
        //         data: { employee: undefined }
        //     })
        // );

    },

    //===[Employees]===

    /**
     * Check if user is authorized to see employees panel
     * @return {boolean} True if authorized, false otherwise
     */
    authorizedToViewEmployees: function(){
        var accessLevel = this.getViewModel().get('accessLevel');
        if(accessLevel < Breeze.api.Employee.accessLevel.SUPERVISOR){
            return false;
        } else {
            return true;
        }
    },
    
    /**
     * Perform pre-route checks to make sure there is a valid action
     * to display in view with employees panel
     */
    beforeEmployeesViewRoute: function(act,id,action){
        console.info('Before employee view route');
        var vm = this.getViewModel(),
            accessLevel = vm.get('accessLevel'),
            employeesRoutes = vm.get('employeesRoutes');
            // viewDataArgs = vm.get('employeesView.args'),
            // viewDataId = vm.get('employeesView.id');
        if(
            // Invalid access level
            (accessLevel < Breeze.api.Employee.accessLevel.SUPERVISOR) ||
            // Not enough data in viewmodel indicating intent
            // (Object.isUnvalued(viewDataArgs) || Object.isUnvalued(viewDataId)) ||
            // act in URL doesn't resolve
            (employeesRoutes.resolve(act) == null)
        ) {
            action.stop();
            Ext.util.History.back();
        } else {
            action.resume();
        }
    },

    onEmployeesViewRoute: function(act,id){
        var vm = this.getViewModel(),
            // args = vm.get('employeesView.args'),
            // id = vm.get('employeesView.id'),
            plan = vm.get('employeesRoutes').resolve(act);
        
        // Make sure employees panel is still shown
        this.refreshSidePanel(true, this.Panels.EMPLOYEES);
        
        // employees.SubNav is shown by formular 'hideEmployeesSubNav'.
        vm.set('sidePanel.type', this.Panels.EMPLOYEES.id);

        if(!plan.method){
            // var view = Ext.create(
            //     plan.view, {
            //         data: { employee: id }
            //     }
            // );

            // this.changeContent(view);
            this.replaceContent(
                plan.view,
                { data: { employee: id }, viewModel: { parent: vm } }
            );
        }

        console.info('Resolving employees view route');
    },

    // ===[Reporting]===

    /**
     * Called before report route handler method.
     * 
     * Checks to make sure report route is valid, if not, action is cancelled
     */
    beforeReportRoute: function(category, type, action){
        var reportRoutes = this.getViewModel().get('reportRoutes');
        if(reportRoutes.resolve(category, type) == null){
            action.stop();
            Ext.util.History.back();
        } else {
            // Hide reporting side panel
            // this.refreshSidePanel(false);
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
        var reportRoutes = this.getViewModel().get('reportRoutes'),
            viewNS = reportRoutes.resolve(category, type);
        console.info('Resolved View: ', viewNS);
        console.groupEnd();
        this.replaceContent(viewNS, {
            data: {
                data: { user: this.getViewModel().get('userId') }
            }
        });
    },

    // ===[Content functions]===

    /**
     * Refresn side panel, rebuilding content if setting to visible
     * when previously hidden
     * @param {Boolean} show Whether panel should be shown
     * @param {Object} type which panel to display
     */
    refreshSidePanel: function(show, type){
        var panelContainer = this.lookup('sidePanelContainer'),
            vm = this.getViewModel(),
            currentType = vm.get('sidePanel.type');

        if(
            !show && !panelContainer.getHidden() &&
            !type
        ){
            vm.set('sidePanel.type', null);
            // panelContainer.setHidden(true);
            vm.set('sidePanel.shown', false);
            panelContainer.removeAll();
            return null;
        }
        var type = Object.defVal(type, currentType);
        if(
            panelContainer.getHidden() == show ||
            panelContainer.items.length == 0 ||
            (currentType !== type.id || !show)
        ){
            // panelContainer.setHidden(!show);
            vm.set('sidePanel.shown', show);
            if(type){
                if(show && currentType !== type.id){
                    panelContainer.removeAll();
                    if(type.clearContent){
                        // clear content panel if configured to do so
                        this.lookup('contentContainer').removeAll();
                    }
                    let emp = vm.get('userId'),
                        panel = Ext.create(
                            type.view,
                            { data: { employee: emp } }
                        );
                    // If type.id is 'employees', employees.SubNav is shown by formular 'hideEmployeesSubNav'.
                    // vm.set('sidePanel.type', type.id);
                    panelContainer.insert(0, panel);
                    console.info('Showing side panel: ', type.id);
                } else {
                    console.info('Hiding side panel');
                }
            } else {
                // no type, set type to null
                vm.set('sidePanel.type', null);
            }
        }
    },

    /**
     * Handle global event to close side panel
     */
    onSidePanelClose: function(){
        this.refreshSidePanel(false);
    },

    /**
     * Handle global event to show side panel
     * @param {Object} e Event data
     */
    onSidePanelOpen: function(e){
        var panel = this.Panels[e.route.toUpperCase()];
        if(!Object.isUnvalued(panel)){
            var authorized = true;
            if(panel.authorize){
                authorized = this[panel.authorize]();
            }
            if(authorized){
                this.refreshSidePanel(true, panel);
                this.syncNavToRoute(e.route);
                window.location.hash="";
                if(panel.clearContent){
                    this.lookup('contentContainer').removeAll();
                }
            }
        }
    },

    /**
     * Replaces content view with component instantiated
     * after current content component has been destroyed
     * 
     * @param {String} ns Namespace of view to construct
     * @param {Object} args Optional config object
     */
    replaceContent: function(ns, args){
        var container = this.lookup('contentContainer');
        console.info('replace content');
        var old = container.getActiveItem();
        if(!Object.isUnvalued(old)){
            try {
                container.remove(old, true);
            } catch (ex) {
                console.warn('Error', old, ex);
                // container.remove(old);
            } finally {

            }
        }

        var newContent = Ext.create(ns, args);
        this.prepareCrumb(newContent);
        container.push(newContent);
        container.setActiveItem(newContent);
    },

    /**
     * Swap contents of body content container
     * @param {Object} newContent New view / component to show in content container
     */
    changeContent: function(newContent, xtypesToDestroy){
        var container = this.lookup('contentContainer'),
        xtypesToDestroy = Object.defVal(xtypesToDestroy, [], true);
        if(xtypesToDestroy.length > 0){
            // Clean up content with given xtypes, if specified
            this.destroyContentByType(xtypesToDestroy);
        }
        console.info('change content');
        if(newContent && newContent !== null){
            var old = container.getActiveItem();
            container.setActiveItem(newContent);
            this.prepareCrumb();
            if(typeof old !== 'undefined'){
                container.remove(old);
            }
        }

    },

    /**
     * Automatically determine title and url hash
     * for current view and add it to breadcrumbs
     * @param {Object} content Optionally provided content instance
     */
    prepareCrumb: function(content){
        var label = 'Unknown',
            content = content;
        
        if(Object.isUnvalued(content)){
            content = this.lookup('contentContainer')
            .getActiveItem(); 
        }

        try{
            if(content && content['getCrumbTitle']){
                label = content.getCrumbTitle();
            }
        } catch (ex) {
            console.warn(ex);
        }
    
        this.lookup('breadCrumbs').bakeCrumb(
            label,
            `#${Ext.History.currentToken}`
        );
    },

    /**
     * Change content of container, disposing of previous content
     * @param {Object} container Container component to change content of
     * @param {Object} content Content component to put into container
     * @deprecated
     */
    // changeContainerContent: function(container, content){
    //     if(content && content !== null){
    //         var old = container.getActiveItem();
    //         container.setActiveItem(content);
    //         if(typeof old !== 'undefined'){
    //             container.remove(old);
    //         }
    //     }
    // },

    syncNavToRoute: function(route){
        var tree = this.lookup('navSideMenuTree');
        if(route && !Object.isUnvalued(route)){
            var navNode = tree.getNodeByRoute(route);
            if(navNode !== null && tree.getSelection() !== navNode){
                // Found a node with the given route, and it isn't currently selected
                tree.setSelection(navNode);
            }
        }
    },


    /**
     * Handle download punch station route
     */
    onHelpRoute: function(){
        // TODO: open link to punch station download in new tab (add correct url)
        console.info('Help Route');
        window.open("http://www.softtimeonline.com/help/");
        Ext.util.History.back();
    },

    privates: {
        /**
         * Force destroy to be called on any view content with matching xtype
         * to avoid name attribute collisions
         * @param {Array} types 
         */
        destroyContentByType: function(types){
            var container = this.lookup('contentContainer'),
                items = container.getItems().items;
            for(let i = 0; i < items.length; i++){
                if( items[i].xtype && types.includes(items[i].xtype)){
                    // items[i].destroy();
                    container.remove(items[i],true);
                }
            }
        }
    }



});
