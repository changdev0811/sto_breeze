Ext.define('Breeze.view.main.employees.Panel', {
    extend: 'Ext.Container',
    alias: 'widget.main.employees.panel',
    xtype: 'breeze-employees-panel',

    controller: 'main.employees.panel',
    viewModel: {
        type: 'main.employees.panel'
    },

    listeners: {
        initialize: 'init'
    },
    // showAnimation: {
    //     type: 'reveal',
    //     direction: 'right',
    //     duration: 200
    // },
    // hideAnimation: {
    //     type: 'reveal',
    //     direction: 'left',
    //     duration: 200
    // },

    width: '300pt',

    layout: 'vbox',
    userCls: 'employees-panel',
    // padding: '16pt',

    items: [
        {
            xtype: 'tabpanel',
            flex: 1,
            ui: 'wtr-tabbar',
            tabBar: {
                defaultTabUI: 'wtr-tabbar',
                shadow: false,
                padding: '16pt'
            },
            layout: {
                animation: 'fade'
            },
            defaults: {
                userCls: 'employees-panel',
                layout: 'vbox'
            },
            items: [
                // ===[Employees Tab]===
                {
                    xtype: 'container',
                    title: 'Employees',
                    items: [
                        {
                            xtype: 'toolbar',
                            itemId: 'searchToolbar',
                            ui: 'employees-panel-toolbar',
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'searchfield',
                                    ui: 'solo',
                                    shadow: true,
                                    flex: 1,
                                    placeholder: 'Search'
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            ui: 'employees-panel-toolbar',
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    ui: 'dark-textfield dark-textfield-sm',
                                    flex: 1,
                                    itemId: 'activeCount',
                                    label: 'Active',
                                    value: 1
                                },
                                {
                                    xtype: 'displayfield',
                                    ui: 'dark-textfield dark-textfield-sm',
                                    flex: 1,
                                    itemId: 'terminatedCount',
                                    label: 'Terminated',
                                    value: 1
                                },
                                {
                                    xtype: 'displayfield',
                                    ui: 'dark-textfield dark-textfield-sm',
                                    flex: 1,
                                    itemId: 'deletedCount',
                                    label: 'Deleted',
                                    value: 1
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-plus',
                                    ui: 'plain wtr-button'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-minus',
                                    ui: 'plain wtr-button'
                                }
                            ]
                        },
                        {
                            xtype: 'tree',
                            userCls: 'employees-panel-tree',
                            flex: 1,
                            reference: 'employeesEmployeeTree'
                        }
                    ]
                },
                // ===[Departments Tab]===
                {
                    xtype: 'container',
                    title: 'Depts',
                    items: [
                        {
                            xtype: 'toolbar',
                            itemId: 'searchToolbar',
                            ui: 'employees-panel-toolbar',
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'searchfield',
                                    // ui: 'dark-textfield',
                                    ui: 'alt',
                                    flex: 1,
                                    placeholder: 'Search'
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            ui: 'employees-panel-toolbar',
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    ui: 'dark-textfield dark-textfield-sm',
                                    flex: 1,
                                    itemId: 'activeCount',
                                    label: 'Active',
                                    value: 1
                                },
                                {
                                    xtype: 'displayfield',
                                    ui: 'dark-textfield dark-textfield-sm',
                                    flex: 1,
                                    itemId: 'terminatedCount',
                                    label: 'Terminated',
                                    value: 1
                                },
                                {
                                    xtype: 'displayfield',
                                    ui: 'dark-textfield dark-textfield-sm',
                                    flex: 1,
                                    itemId: 'deletedCount',
                                    label: 'Deleted',
                                    value: 1
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-plus',
                                    ui: 'plain wtr-button'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-minus',
                                    ui: 'plain wtr-button'
                                }
                            ]
                        },
                        {
                            xtype: 'tree',
                            userCls: 'employees-panel-tree',
                            flex: 1,
                            reference: 'employeesDepartmentTree',
                            rootVisible: false,
                            bind: {
                                store: '{departmentsTree}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'toolbar',
            ui: 'employees-panel-toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'breeze-checkbox',
                    ui: 'dark-checkbox',
                    boxLabel: 'Exclude Terminated',
                    name: 'exclude_terminated'
                }
            ]
        }
    ]
});