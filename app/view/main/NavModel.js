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
            policy: {
                hasTimeKron: false,
                info: {}
            }
        }
    },

    stores: {
        /**
         * Navigation items (expanded) for personal mode
         */
        personalNav: {
            type: 'tree',
            root: {
                children: [
                    /*{
                        text: 'Dashboard', leaf: true,
                        iconCls: 'x-fas fa-tachometer'
                    },*/ {
                        text: 'Personal',
                        iconCls: 'x-fas fa-user',
                        // routeAct: false,
                        routeRef: 'personal',
                        id: 'personal',
                        children: [
                            {
                                text: 'Download PunchStation', leaf: true,
                                iconCls: 'x-fas fa-cloud-download-alt',
                                routeRef: 'download/punch_station',
                                id: 'punchstation'
                            },
                            {
                                text: 'Calendar', leaf: true,
                                iconCls: 'x-fas fa-calendar',
                                id: 'calendar',
								routeRef: 'personal/calendar'
                            }, {
                                text: 'Employee Information', leaf: true,
                                iconCls: 'x-fas fa-id-card',
                                routeRef: 'personal/info',
                                id: 'employeeInfo'
                            }, {
                                text: 'FYI', leaf: true,
                                iconCls: 'x-fas fa-table',
                                routeRef: 'personal/fyi',
                                id: 'fyi'
                            }, {
                                text: 'Year at a Glance', leaf: true,
                                iconCls: 'x-fas fa-eye',
                                routeRef: 'personal/year_at_a_glance',
                                id: 'yaag'
                            }, {
                                text: 'WorkTime Records', leaf: true,
                                iconCls: 'x-fas fa-calendar-check-o',
                                routeRef: 'personal/worktime_records',
                                id: 'wtr'
                            }
                        ]
                    }, {
                        text: 'My Requests', leaf: true,
                        iconCls: 'x-fas fa-retweet',
                        routeRef: 'personal/requests',
                        id: 'myRequests'
                    },  {
                        text: 'Reports', leaf: true,
                        iconCls: 'x-fas fa-bar-chart',
                        routeRef: 'personal/reports',
                        id: 'reports'
                    },  {
                        text: 'Help', leaf: true,
                        iconCls: 'x-fas fa-question-circle',
                        routeRef: 'help',
                        id: 'help'
                    }
                ]
            }
        },
        /**
         * Navigation items (micro) for personal mode
         */
        personalNavMicro: {
            type: 'tree',
            root: {
                children: [
                    /*{
                        text: 'Dashboard', leaf: true,
                        iconCls: 'x-fas fa-tachometer'
                    },*/ 
                    {
                        text: 'Personal',
                        iconCls: 'x-fas fa-user',
                        // routeAct: false,
                        routeRef: 'personal',
                        id: 'personal'
                    },
                    {
                        text: 'Download PunchStation', //leaf: true,
                        iconCls: 'x-fas fa-cloud-download',
                        routeRef: 'download/punch_station',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '12pt'
                        }
                    },
                    {
                        text: 'Calendar', leaf: true,
                        iconCls: 'x-fas fa-calendar',
                        id: 'personal',
						routeRef: 'personal/calendar',
                        extra: {
                            parent: 'personal',
                            size: '12pt'
                        }
                    }, {
                        text: 'Employee Information', leaf: true,
                        iconCls: 'x-fas fa-id-card',
                        routeRef: 'personal/info',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '12pt'
                        }
                    }, {
                        text: 'FYI', leaf: true,
                        iconCls: 'x-fas fa-table',
                        routeRef: 'personal/fyi',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '12pt'
                        }
                    }, {
                        text: 'Year at a Glance', leaf: true,
                        iconCls: 'x-fas fa-eye',
                        routeRef: 'personal/year_at_a_glance',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '12pt'
                        }
                    }, {
                        text: 'WorkTime Records', leaf: true,
                        iconCls: 'x-fas fa-calendar-check-o',
                        routeRef: 'personal/worktime_records',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '12pt'
                        }
                    }, {
                        // text: 'My Requests', leaf: true,
                        iconCls: 'x-fas fa-retweet',
                        routeRef: 'personal/requests',
                        id: 'myRequests'
                    },  {
                        text: 'Reports', leaf: true,
                        iconCls: 'x-fas fa-bar-chart',
                        routeRef: 'personal/reports',
                        id: 'reports'
                    },  {
                        text: 'Help', leaf: true,
                        iconCls: 'x-fas fa-question-circle',
                        routeRef: 'help',
                        id: 'help'
                    }
                ]
            }
        }
    },

    formulas: {
        hasKron: function(get){
            return (
                get('punch.policy.hasTimeKron')
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
        }
    }
});