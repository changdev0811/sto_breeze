/**
 * Employees panel view
 * @class Panel
 * @namespace Breeze.view.main.employees.Panel
 * @alias widget.main.employees.panel
 */
Ext.define('Breeze.view.main.employees.Panel', {
    extend: 'Ext.Panel',
    alias: 'widget.main.employees.panel',
    xtype: 'breeze-employees-panel',

    requires: [
        'Ext.Panel',
        'Ext.tab.Panel',
        'Ext.grid.Tree',
        'Ext.tab.Tab',
        'Ext.field.Search',
        'Ext.field.Checkbox',
        'Ext.field.Display',
        'Ext.Container',
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Breeze.plugin.grid.ExpandSelect',
        'Breeze.view.main.employees.PanelController',
        'Breeze.view.main.employees.PanelModel'
    ],

    controller: 'main.employees.panel',
    viewModel: {
        type: 'main.employees.panel'
    },

    listeners: {
        initialize: 'onInit'
    },

    width: '225pt',

    layout: 'vbox',
    ui: 'employees-side-bar-panel',
    // padding: '16pt',
    
    title: 'Employees',

    tools: {
        close: {
            iconCls: 'x-fas fa-times',
            handler: 'onCloseTool'
        }
    },

    items: [
        {
            xtype: 'tabpanel',
            reference: 'employeesPanelTabs',
            flex: 1,
            ui: 'wtr-tabbar',
            tabBar: {
                defaultTabUI: 'wtr-tabbar',
                shadow: false,
                padding: '0pt'
            },
            layout: {
                animation: 'fade'
            },
            defaults: {
                userCls: 'employees-panel',
                layout: 'vbox',
            },
            items: [
                // ===[Employees Tab]===
                {
                    xtype: 'container',
                    title: 'Employees',
                    itemId: 'employees',


                    defaults: {
                        padding: '0pt',
                    },

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
                            ui: 'employees-toolbar', docked: 'bottom',
                            shadow: false,
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
                                   disabled: true,
                                   handler: 'onDeleteEmployeeButton'
                               }
                           ]
                        },
                        {
                            xtype: 'tree',
                            itemId: 'tree',
                            userCls: 'employees-panel-tree',
                            flex: 1,
                            reference: 'employeesEmployeeTree',
                            singleExpand: true,
                            rootVisible: false,
                            bind: {
                                // store: '{employeesTree}'
                                store: '{employeesList}'
                            },
                            listeners: {
                                select: 'onEmployeesTreeSelect'
                            },
                            plugins: {
                                expandSelect2: {
                                    type: 'breeze.grid.expandselect'
                                }
                            }
                        }
                    ]
                },
                // ===[Departments Tab]===
                {
                    xtype: 'container',
                    title: 'Depts',
                    itemId: 'depts',
                    
                    defaults: {
                        padding: '0pt',
                    },

                    items: [
                        {
                            xtype: 'toolbar',
                            itemId: 'searchToolbar',
                            shadow: false,
                            ui: 'employees-toolbar',
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'searchfield',
                                    reference: 'departmentsSearch',
                                    // ui: 'dark-textfield',
                                    ui: 'solo',
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
                            ui: 'employees-toolbar', docked: 'bottom',
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
                                   disabled: true,
                                   handler: 'onDeleteEmployeeButton'
                               }
                            ]
                        },
                        {
                            xtype: 'tree',
                            itemId: 'tree',
                            userCls: 'employees-panel-tree',
                            flex: 1,
                            // expanderOnly: false,
                            reference: 'employeesDepartmentTree',
                            rootVisible: false,
                            singleExpand: true,
                            bind: {
                                store: '{departmentsList}'
                            },
                            listeners: {
                                select: 'onDepartmentsTreeSelect'
                            },
                            plugins: {
                                expandSelect: {
                                    type: 'breeze.grid.expandselect'
                                }
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
            shadow: false,
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