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
                        id: 'personal',
                        children: [
                            {
                                text: 'Download PunchStation', leaf: true,
                                iconCls: 'x-fa fa-cloud-download',
                                routeRef: 'download/punch_station',
                                id: 'personal'
                            },
                            {
                                text: 'Calendar', leaf: true,
                                iconCls: 'x-fa fa-calendar',
                                id: 'personal'
                            }, {
                                text: 'Employee Information', leaf: true,
                                iconCls: 'x-fa fa-id-card-o',
                                routeRef: 'personal/info',
                                id: 'personal'
                            }, {
                                text: 'FYI', leaf: true,
                                iconCls: 'x-fa fa-table',
                                routeRef: 'personal/fyi',
                                id: 'personal'
                            }, {
                                text: 'Year at a Glance', leaf: true,
                                iconCls: 'x-fa fa-eye',
                                routeRef: 'personal/year_at_a_glance',
                                id: 'personal'
                            }, {
                                text: 'WorkTime Records', leaf: true,
                                iconCls: 'x-fa fa-calendar-check-o',
                                routeRef: 'personal/worktime_records',
                                id: 'personal'
                            }
                        ]
                    }, {
                        text: 'My Requests', leaf: true,
                        iconCls: 'x-fa fa-retweet',
                        routeRef: 'personal/requests',
                        id: 'myRequests'
                    },  {
                        text: 'Reports', leaf: true,
                        iconCls: 'x-fa fa-bar-chart',
                        routeRef: 'personal/reports',
                        id: 'reports'
                    },  {
                        text: 'Help', leaf: true,
                        iconCls: 'x-fa fa-question-circle',
                        routeRef: 'help',
                        id: 'help'
                    }
                ]
            }
        },
        personalNavMicro: {
            type: 'tree',
            root: {
                children: [
                    /*{
                        text: 'Dashboard', leaf: true,
                        iconCls: 'x-fa fa-tachometer'
                    },*/ 
                    {
                        text: 'Personal',
                        iconCls: 'x-fa fa-user',
                        // routeAct: false,
                        routeRef: 'personal',
                        id: 'personal'
                    },
                    {
                        text: 'Download PunchStation', //leaf: true,
                        iconCls: 'x-fa fa-cloud-download',
                        routeRef: 'download/punch_station',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '14pt'
                        }
                    },
                    {
                        text: 'Calendar', leaf: true,
                        iconCls: 'x-fa fa-calendar',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '14pt'
                        }
                    }, {
                        text: 'Employee Information', leaf: true,
                        iconCls: 'x-fa fa-id-card-o',
                        routeRef: 'personal/info',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '14pt'
                        }
                    }, {
                        text: 'FYI', leaf: true,
                        iconCls: 'x-fa fa-table',
                        routeRef: 'personal/fyi',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '14pt'
                        }
                    }, {
                        text: 'Year at a Glance', leaf: true,
                        iconCls: 'x-fa fa-eye',
                        routeRef: 'personal/year_at_a_glance',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '14pt'
                        }
                    }, {
                        text: 'WorkTime Records', leaf: true,
                        iconCls: 'x-fa fa-calendar-check-o',
                        routeRef: 'personal/worktime_records',
                        id: 'personal',
                        extra: {
                            parent: 'personal',
                            size: '14pt'
                        }
                    }, {
                        text: 'My Requests', leaf: true,
                        iconCls: 'x-fa fa-retweet',
                        routeRef: 'personal/requests',
                        id: 'myRequests'
                    },  {
                        text: 'Reports', leaf: true,
                        iconCls: 'x-fa fa-bar-chart',
                        routeRef: 'personal/reports',
                        id: 'reports'
                    },  {
                        text: 'Help', leaf: true,
                        iconCls: 'x-fa fa-question-circle',
                        routeRef: 'help',
                        id: 'help'
                    }
                ]
            }
        }
    }
});