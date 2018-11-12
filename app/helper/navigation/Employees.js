Ext.define('Breeze.helper.navigation.Employees', {
    extend: 'Breeze.helper.navigation.TreeBase',

    config: {
        targetPath: 'personal',
        mergeOptions: {
            child: false,
            before: true
        },
        data: [
            {
                text: 'Employees',
                routeRef: 'employees',
                routeEvent: 'sidepanelopen',
                id: 'employees',
                iconCls: 'x-fas fa-users',
                leaf: true
            }
        ]
    }
});