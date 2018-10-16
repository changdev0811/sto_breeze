Ext.define('Breeze.view.main.employees.Panel', {
    extend: 'Ext.Container',
    alias: 'widget.main.employees.panel',
    xtype: 'breeze-employees-panel',

    // Uncomment to give this component an xtype 
    // xtype : 'breeze-panel', 

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

    layout: 'fit',

    // padding: '8pt',
    layout: 'fit',


    items: [
        {
            xtype: 'tabpanel',
            ui: 'wtr-tabbar',
            tabBar: {
                defaultTabUI: 'wtr-tabbar',
                shadow: false
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
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'searchfield',
                                    ui: 'alt',
                                    flex: 1,
                                    placeholder: 'Search'
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
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
                                    ui: 'action'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-minus',
                                    ui: 'action'
                                }
                            ]
                        },
                        {
                            xtype: 'tree',
                            flex: 1,
                            reference: 'employeesTree'
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
                                    ui: 'action'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-minus',
                                    ui: 'action'
                                }
                            ]
                        },
                        {
                            xtype: 'tree',
                            flex: 1,
                            reference: 'departmentsTree'
                        }
                    ]
                },
                // ===[Groups Tab]===
                {
                    xtype: 'container',
                    title: 'Groups',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'toolbar',
                            itemId: 'searchToolbar',
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
                                    ui: 'action'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-minus',
                                    ui: 'action'
                                }
                            ]
                        },
                        {
                            xtype: 'tree',
                            flex: 1,
                            reference: 'departmentsTree'
                        }
                    ]
                }
            ]
        }
    ]
});