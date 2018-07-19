(function(){
    /**
     * View Controller for view.main.Nav
     */
    Ext.define('Breeze.view.main.NavController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.main.nav',

        requires: [
            'Ext.route.Route'
        ],

        // Routes
        routes: {
            'home': 'onHomeRoute',
            'personal/employee_info': 'onPersonalEmployeeInfoRoute',
            'personal/fyi': 'onPersonalFyiRoute',
            'personal/year_at_a_glance': 'onPersonalYaagRoute',
            'personal/work_time_records': 'onPersonalWtrRoute',
            'personal/calendar': 'onPersonalCalendarRoute',
            'download/punch_station': 'onDownloadPunchStationRoute'
        },

        // Route change handlers

        onHomeRoute: function() {

        },

        onPersonalEmployeeInfoRoute: function(){

        },

        onPersonalFYIRoute: function() {
            
        },

        onPersonalYAAGRoute: function(){

        },

        onPersonalWTRRoute: function(){

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