/**
 * View Model for Nav view
 * Contains stores used to populate navigation sidebar, which also
 * include routing and micro mode styling data
 * @class NavModel
 * @namespace Breeze.view.main.NavModel
 * @alias viewmodel.main.nav
 * @extends Ext.app.ViewModel
 */
Ext.define('Breeze.view.main.NavModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main.nav',

    requires: ['Breeze.api.Punch'],

    data: {
        mode: 'personal',
        context: -1,
        currentEmployee: {},
        // header info
        header: {
            fullname: 'Full Name',
            business: 'Company Name'
        },
        // punch related
        punch: {
            defaultProjectCode: null,
            status: 0,
            hasTimeKron: false,
            // policy: {}
        },
        /**
         * Data for employees views (views showing view of other users, with side panel)
         */
        employeesView: {
            // neither of the following are currently used
            args: null, id: null,
            // Whether to use employees panel sub nav bar
            useSubNav: true,
            /**
             * Data specific to dynamic sub-navigation menu tied to employees panel
             */
            subNav: {
                currentAction: null
            }
        },
        // Side panel content tracking
        sidePanel: {
            // Whether side panel is visible
            shown: false,
            // Either reporting or employees
            type: null,
            // If side panel is currently visible
            /**
             * Actively selected item id (user id for employees, report for reporting)
             * (not used for reporting at this time) 
             **/
            activeItemId: null
        }
    },

    stores: {},

    formulas: {
        hasKron: function(get){
            return (
                get('punch.hasTimeKron')
            );
        },

        // Can user do punch in/out without needing details?
        canQuickPunch: function(get){
            return (
                get('punch.policy.info.Allow_QuickPunch')
            );
        },
        // Can user do detailed punch?
        canPunch: function(get){
            return (
                get('punch.policy.info.Allow_RegularPunch')
            );
        },
        isClockedIn: function(get){
            return (
                get('punch.status') == Breeze.api.Punch.status.IN
            );
        },

        /**
         * Formula used to decide whether employees panel sub navbar
         * is hidden or not
         * @param {Function} get 
         */
        hideEmployeesSubNav: function(get){
            if(
                get('employeesView.useSubNav') &&
                (get('sidePanel.shown') && get('sidePanel.type') == 'employees')
            ){
                return false;
            } else {
                return true;
            }
        }
    }
});