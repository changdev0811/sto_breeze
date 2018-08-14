/**
 * View Model for Nav view
 */
Ext.define('Breeze.view.main.NavModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main.nav',

    data: {
        mode: 'personal',
        context: -1
    },

    stores: {
        personalNav: {
            type: 'tree',
            root: {
                children: [
                    /*{
                        text: 'Dashboard', leaf: true,
                        iconCls: 'x-fa fa-tachometer'
                    },*/ {
                        text: 'Personal',
                        iconCls: 'x-fa fa-user',
                        // routeAct: false,
                        routeRef: 'personal',
                        children: [
                            {
                                text: 'Download PunchStation', leaf: true,
                                iconCls: 'x-fa fa-cloud-download',
                                routeRef: 'download/punch_station'
                            },
                            {
                                text: 'Calendar', leaf: true,
                                iconCls: 'x-fa fa-calendar',
                                routeRef: 'personal/calendar'
                            }, {
                                text: 'Employee Information', leaf: true,
                                iconCls: 'x-fa fa-id-card-o',
                                routeRef: 'personal/info'
                            }, {
                                text: 'FYI', leaf: true,
                                iconCls: 'x-fa fa-table',
                                routeRef: 'personal/fyi'
                            }, {
                                text: 'Year at a Glance', leaf: true,
                                iconCls: 'x-fa fa-eye',
                                routeRef: 'personal/year_at_a_glance'
                            }, {
                                text: 'WorkTime Records', leaf: true,
                                iconCls: 'x-fa fa-calendar-check-o',
                                routeRef: 'personal/worktime_records'
                            }
                        ]
                    }, {
                        text: 'My Requests', leaf: true,
                        iconCls: 'x-fa fa-retweet',
                        routeRef: 'personal/requests'
                    },  {
                        text: 'Reports', leaf: true,
                        iconCls: 'x-fa fa-bar-chart',
                        routeRef: 'personal/reports'
                    },  {
                        text: 'Help', leaf: true,
                        iconCls: 'x-fa fa-question-circle',
                        routeRef: 'help'
                    }
                ]
            }
        }
    }
});