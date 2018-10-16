Ext.define('Breeze.helper.navigation.Personal', {
    extend: 'Breeze.helper.navigation.TreeBase',

    config: {
        data: [
            {
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
            }, {
                text: 'Reports', leaf: true,
                iconCls: 'x-fas fa-bar-chart',
                routeRef: 'personal/reports',
                id: 'reports'
            }, {
                text: 'Help', leaf: true,
                iconCls: 'x-fas fa-question-circle',
                routeRef: 'help',
                id: 'help'
            }
        ]
    }

});