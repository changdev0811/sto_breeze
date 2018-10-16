Ext.define('Breeze.store.navigation.Personal', {
    extend: 'Ext.data.TreeStore',
    /*
    Uncomment to use a specific model class
    model: 'User',
    */
    /*
    Fields can also be declared without a model class:
    fields: [
        {name: 'firstName', type: 'string'},
        {name: 'lastName',  type: 'string'},
        {name: 'age',       type: 'int'},
        {name: 'eyeColor',  type: 'string'}
    ]
    */
    /*
    Uncomment to specify data inline
    data : [
        {firstName: 'Ed',    lastName: 'Spencer'},
        {firstName: 'Tommy', lastName: 'Maintz'},
        {firstName: 'Aaron', lastName: 'Conran'}
    ]
    */
    // autoLoad: false,
    // clearOnLoad: true,
    // root: {
    //     expanded: true,
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
                        id: 'personal'
                    },
                    {
                        text: 'Calendar', leaf: true,
                        iconCls: 'x-fas fa-calendar',
                        id: 'personal',
                        routeRef: 'personal/calendar'
                    }, {
                        text: 'Employee Information', leaf: true,
                        iconCls: 'x-fas fa-id-card',
                        routeRef: 'personal/info',
                        id: 'personal'
                    }, {
                        text: 'FYI', leaf: true,
                        iconCls: 'x-fas fa-table',
                        routeRef: 'personal/fyi',
                        id: 'personal'
                    }, {
                        text: 'Year at a Glance', leaf: true,
                        iconCls: 'x-fas fa-eye',
                        routeRef: 'personal/year_at_a_glance',
                        id: 'personal'
                    }, {
                        text: 'WorkTime Records', leaf: true,
                        iconCls: 'x-fas fa-calendar-check-o',
                        routeRef: 'personal/worktime_records',
                        id: 'personal'
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
    // }

});