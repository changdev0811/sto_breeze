/**
 * Employees panel view
 * @class Panel
 * @namespace Breeze.view.main.employees.Panel
 * @alias widget.main.employees.panel
 */
Ext.define('Breeze.view.main.employees.Panel', {
    extend: 'Ext.Container',
    alias: 'widget.main.employees.panel',
    xtype: 'breeze-employees-panel',

    controller: 'main.employees.panel',
    viewModel: {
        type: 'main.employees.panel'
    },

    listeners: {
        initialize: 'onInit'
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
            reference: 'employeesPanelTabs',
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
                    itemId: 'employees',
                    items: [
                        // Search toolbar
                        {
                            xtype: 'toolbar',
                            itemId: 'searchToolbar',
                            ui: 'employees-toolbar',
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'searchfield',
                                    reference: 'employeesSearch',
                                    ui: 'solo',
                                    shadow: true,
                                    flex: 1,
                                    placeholder: 'Search',
                                    listeners: {
                                        action: 'doEmployeesSearch',
                                        clearicontap: 'doEmployeesSearch'
                                    }
                                }
                            ]
                        },
                        // Info + action
                        {
                            xtype: 'toolbar',
                            ui: 'employees-toolbar', docked: 'top',
                            reference: 'employeesEmployeeToolbar',
                            defaults: {
                                xtype: 'displayfield',
                                ui: [
                                    'dark-textfield', 'dark-textfield-sm',
                                    'employees-toolbar-display'
                                ]
                            },
                           items: [
                               {
                                    itemId: 'active',
                                    bodyAlign: 'center',
                                    label: 'Active',
                                    bind: { value: '{counts.active}' }
                               },
                               {
                                   itemId: 'terminated',
                                   bodyAlign: 'center',
                                   label: 'Terminated',
                                   bind: { value: '{counts.terminated}' }
                               },
                               {
                                   itemId: 'deleted',
                                   bodyAlign: 'center',
                                   label: 'Deleted',
                                   bind: { value: '{counts.deleted}' }
                               },
                               { xtype: 'spacer' },
                               {
                                   xtype: 'button', 
                                   itemId: 'new', text: '',
                                   ui: 'plain wtr-button',
                                   iconCls: 'x-fas fa-plus',
                                   bind: {
                                       hidden: '{!permissions.canAdd}'
                                   },
                                   handler: 'onNewEmployeeButton'
                               },
                               {
                                   xtype: 'button', 
                                   itemId: 'remove', text: '',
                                   ui: 'plain wtr-button',
                                   iconCls: 'x-fas fa-minus', 
                                   bind: {
                                       hidden: '{!permissions.canRemove}',
                                   },
                                   disabled: true
                               }
                           ]
                        },
                        {
                            xtype: 'tree',
                            userCls: 'employees-panel-tree',
                            flex: 1,
                            reference: 'employeesEmployeeTree',
                            rootVisible: false,
                            bind: {
                                // store: '{employeesTree}'
                                store: '{employeesList}'
                            },
                            listeners: {
                                select: 'onEmployeesTreeSelect'
                            }
                        }
                    ]
                },
                // ===[Departments Tab]===
                {
                    xtype: 'container',
                    title: 'Depts',
                    itemId: 'depts',
                    items: [
                        {
                            xtype: 'toolbar',
                            itemId: 'searchToolbar',
                            ui: 'employees-toolbar',
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'searchfield',
                                    reference: 'departmentsSearch',
                                    // ui: 'dark-textfield',
                                    ui: 'alt',
                                    flex: 1,
                                    placeholder: 'Search',
                                    listeners: {
                                        action: 'doDepartmentsSearch',
                                        clearicontap: 'doDepartmentsSearch'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            ui: 'employees-toolbar', docked: 'top',
                            reference: 'employeesDepartmentToolbar',
                            defaults: {
                                xtype: 'displayfield',
                                ui: [
                                    'dark-textfield', 'dark-textfield-sm',
                                    'employees-toolbar-display'
                                ]
                            },
                            items: [
                                {
                                    itemId: 'active',
                                    bodyAlign: 'center',
                                    label: 'Active',
                                    bind: { value: '{counts.active}' }
                               },
                               {
                                   itemId: 'terminated',
                                   bodyAlign: 'center',
                                   label: 'Terminated',
                                   bind: { value: '{counts.terminated}' }
                               },
                               {
                                   itemId: 'deleted',
                                   bodyAlign: 'center',
                                   label: 'Deleted',
                                   bind: { value: '{counts.deleted}' }
                               },
                               { xtype: 'spacer' },
                               {
                                   xtype: 'button', 
                                   itemId: 'new', text: '',
                                   ui: 'plain wtr-button',
                                   iconCls: 'x-fas fa-plus',
                                   bind: {
                                       hidden: '{!permissions.canAdd}'
                                   },
                                   handler: 'onNewEmployeeButton'
                               },
                               {
                                   xtype: 'button', 
                                   itemId: 'remove', text: '',
                                   ui: 'plain wtr-button',
                                   iconCls: 'x-fas fa-minus', 
                                   bind: {
                                       hidden: '{!permissions.canRemove}',
                                   },
                                   disabled: true
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
                                store: '{departmentsList}'
                            },
                            listeners: {
                                select: 'onDepartmentsTreeSelect'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'toolbar',
            ui: 'employees-toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'breeze-checkbox',
                    ui: 'employees-panel-checkbox',
                    boxLabel: 'Exclude Terminated',
                    name: 'exclude_terminated',
                    bind: {
                        checked: '{excludeTerminated}'
                    },
                    listeners: {
                        change: 'onExcludeTerminatedChange'
                    }

                }
            ]
        }
    ]
});