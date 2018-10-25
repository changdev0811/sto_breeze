Ext.define('Breeze.view.employee.information.Company', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.company',

    layout: 'vbox',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.plugin.Editable'
    ],

    plugins: {
        readOnlyPlug: {
            type: 'breeze.form.readonly',
            recursive: true,
            expression: 'readOnly'
        }
    },

    items: [
        {
            xtype: 'container',
            userCls: 'employee-info-container',
            layout: 'hbox',
            // title: 'Name',
            defaults: {
                flex: 1,
                xtype: 'breeze-textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield',
                // bind: {
                //     // make fields readonly when view model has readOnly set to true 
                //     editable: '{!readOnly}',
                //     readOnly: '{readOnly}'
                // }
            },
            items: [
                {
                    xtype: 'datefield',
                    name: 'date_of_hire',
                    label: 'Hire Date',
                    bind: { value: '{hireDate}' }
                },
                {
                    xtype: 'datefield',
                    name: 'date_of_termination',
                    label: 'Termination Date',
                    bind: { value: '{info.TerminationDate}' }
                },
                {
                    name: 'customer_employee_id',
                    label: 'Employee #',
                    bind: { value: '{info.EmployeeNumber}' }
                }
            ]
        },
        {
            xtype: 'container',
            userCls: 'employee-info-container',
            layout: 'hbox',
            defaults: {
                flex: 1,
                xtype: 'breeze-textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    xtype: 'selectfield',
                    editable: false,
                    name: 'department',
                    label: 'Department',
                    displayField: 'Name',
                    valueField: 'Id',
                    reference: 'departments',
                    store: 'departments',
                    bind: { value: '{info.Department}' },
                },
                {
                    name: 'badge_id',
                    label: 'Badge #',
                    bind: { value: '{info.Badge}' }
                },
                {
                    name: 'payroll',
                    label: 'Payroll #',
                    bind: { value: '{info.Payroll}' }
                }
            ]
        },
        {
            xtype: 'container',
            userCls: 'employee-info-container',
            layout: 'hbox',
            defaults: {
                flex: 1,
                xtype: 'breeze-textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield',
            },
            items: [
                {
                    name: 'comp_rate',
                    xtype: 'numberfield',
                    minValue: 0, decimals: 2,
                    label: 'Compensation',
                    reference: 'compensationPlain',
                    bind: {
                        value: '{info.CompRate}',
                        hidden: '{!perms.compensation}'
                    }
                },
                {
                    xtype: 'breeze-textfield',
                    label: 'Compensation',
                    value: '(Hidden)',
                    readOnly: true,
                    ignoreReadOnly: true,
                    // ignoreReadOnly: true, // tell ReadOnly plugin to bypass this field
                    reference: 'compensationHidden',
                    bind: {
                        hidden: '{perms.compensation}'
                    }
                },
                {
                    xtype: 'selectfield',
                    editable: false,
                    label: 'Compensation Frequency',
                    name: 'comp_per',
                    store: 'CompensationOptions',
                    bind: { value: '{info.CompPer}' },
                    displayField: 'Description',
                    valueField: 'ID'
                },
                {
                    xtype: 'displayfield',
                    ui: 'employeeinfo-displayfield',
                    label: 'Layoff Status',
                    bind: '{info.LayoffStatus}'
                }
            ]
        },
        // {
        //     xtype: 'container',
        //     userCls: 'employee-info-container',
        //     layout: 'hbox',
        //     defaults: {
        //         flex: 1,
        //         xtype: 'breeze-textfield',
        //         userCls: 'employee-info-general-field',
        //         ui: 'employeeinfo-displayfield'
        //     },
        //     items: [
        //         {
        //             xtype: 'displayfield',
        //             ui: 'employeeinfo-displayfield',
        //             label: 'Layoff Status',
        //             bind: '{info.LayoffStatus}'
        //         }
        //     ]
        // },
        // Container for list tabs
        {
            xtype: 'container',
            flex: 1,
            layout: 'vbox',
            items: [
                // List tab panel
                {
                    xtype: 'tabpanel',
                    layout: {
                        animation: 'fade'
                    },
                    tabBarPosition: 'bottom',
                    ui: 'employeeinfo-small-tabs',
                    tabBar: {
                        defaultTabUI: 'employeeinfo-small-tabs',
                        shadow: 'false'
                    },
                    reference: 'companyListTabs',
                    flex: 1,
                    items: [
                        // ===[Supervisors tab]==
                        {
                            xtype: 'container',
                            title: 'Supervisors',
                            layout: 'fit',
                            bind: {
                                // Hide tab when not enabled
                                hidden: '{!lists.supervisors.enabled}'
                            },
                            userCls: 'employee-info-roletab-container',
                            itemId: 'supervisorsTab',
                            items: [
                                {
                                    xtype: 'panel',
                                    ui: 'employee-info-shift-grid employee-info-grid-panel',
                                    userCls: 'employee-info-grid',
                                    title: 'Supervisors',
                                    tools: {
                                        add: {
                                            iconCls: 'x-fas fa-plus'
                                        }
                                    },
                                    items: [
                                        // ===[Supervisor list grid]==
                                        {
                                            flex: 1,
                                            xtype: 'grid',
                                            height: '100%',
                                            minHeight: '5em',
                                            width: '100%',
                                            layout: 'hbox',
                                            columnResize: false,
                                            hideHeaders: true,
                                            sortable: false,
                                            columnMenu: null,
                                            ui: 'employeeinfo-shift-grid',
                                            userCls: 'employee-info-grid',
                                            reference: 'supervisorsListGrid',
                                            plugins: {
                                                gridcellediting: true,
                                            },
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    flex: 1,
                                                    text: 'Name',
                                                    dataIndex: 'displayName',
                                                    menuDisabled: true,
                                                    ui: 'employeeinfo-shift-grid',
                                                    editable: true,
                                                    // editor: {
                                                    //     xtype: 'selectfield',
                                                    //     store: 'supervisors',
                                                    //     displayField: 'displayName',
                                                    //     valueField: 'id'
                                                    // }
                                                }
                                            ],
                                            // bind: '{companySupervisorsList}'
                                            bind: {
                                                store: '{companySupervisors}'
                                            }
                                        }
                                    ]
                                }
                            ]

                        },
                        // ===[Employees tab]==
                        {
                            xtype: 'container',
                            title: 'Employees',
                            layout: 'fit',
                            itemId: 'employeesTab',
                            bind: {
                                // Hide tab when not enabled
                                hidden: '{!lists.employees.enabled}'
                            },
                            userCls: 'employee-info-roletab-container',
                            items: [
                                {
                                    xtype: 'panel',
                                    ui: 'employee-info-shift-grid employee-info-grid-panel',
                                    userCls: 'employee-info-grid',
                                    title: 'Supervised Employees',
                                    tools: {
                                        add: {
                                            iconCls: 'x-fas fa-plus'
                                        }
                                    },
                                    items: [
                                        // ===[Employee list grid]==
                                        {
                                            flex: 1,
                                            xtype: 'grid',
                                            height: '100%',
                                            minHeight: '5em',
                                            width: '100%',
                                            layout: 'hbox',
                                            columnResize: false,
                                            hideHeaders: true,
                                            sortable: false,
                                            columnMenu: null,
                                            ui: 'employeeinfo-shift-grid',
                                            userCls: 'employee-info-grid',
                                            reference: 'employeesListGrid',
                                            plugins: {
                                                
                                                gridcellediting: true
                                            },
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    flex: 1,
                                                    text: 'Name',
                                                    dataIndex: 'personId',
                                                    tpl: '{displayName}',
                                                    menuDisabled: true,
                                                    ui: 'employeeinfo-shift-grid',
                                                    editable: true,
                                                    editor: {
                                                        xtype: 'selectfield',
                                                        bind: {
                                                            store: '{choices.supervisedEmployees}'
                                                        },
                                                        displayField: 'displayName',
                                                        valueField: 'personId',
                                                        listeners: {
                                                            // change: 'onChangeSupervisedEmployeeEdit',
                                                            select: 'onEditSupervisedEmployeeSelect'
                                                        }
                                                    }
                                                },
                                            ],
                                            bind: {
                                                store: '{companySupervisedEmployees}'
                                            }
                                        }
                                    ]
                                }
                            ]

                        },
                        // ===[Departments tab]==
                        {
                            xtype: 'container',
                            title: 'Departments',
                            layout: 'fit',
                            itemId: 'departmentsTab',
                            bind: {
                                // Hide tab when not enabled
                                hidden: '{!lists.departments.enabled}'
                            },
                            userCls: 'employee-info-roletab-container',
                            items: [
                                {
                                    xtype: 'panel',
                                    ui: 'employee-info-shift-grid employee-info-grid-panel',
                                    userCls: 'employee-info-grid',
                                    title: 'Supervised Departments',
                                    tools: {
                                        add: {
                                            iconCls: 'x-fas fa-plus'
                                        }
                                    },
                                    items: [
                                        // ===[Departments list grid]==
                                        {
                                            flex: 1,
                                            xtype: 'grid',
                                            height: '100%',
                                            minHeight: '5em',
                                            width: '100%',
                                            layout: 'hbox',
                                            columnResize: false,
                                            hideHeaders: true,
                                            sortable: false,
                                            columnMenu: null,
                                            ui: 'employeeinfo-shift-grid',
                                            userCls: 'employee-info-grid',
                                            reference: 'departmentsListGrid',
                                            plugins: {
                                                gridcellediting: true
                                            },
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    flex: 1,
                                                    text: 'Department Name',
                                                    dataIndex: 'departmentId',
                                                    tpl: '{departmentName}',
                                                    menuDisabled: true,
                                                    ui: 'employeeinfo-shift-grid',
                                                    editable: true,
                                                    editor: {
                                                        xtype: 'selectfield',
                                                        bind: {
                                                            store: '{choices.supervisedDepartments}'
                                                        },
                                                        placeholder: 'Department',
                                                        displayField: 'departmentName',
                                                        valueField: 'departmentId',
                                                        listeners: {
                                                            select: 'onEditDepartmentsDeptSelect'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    flex: 1,
                                                    text: 'Role',
                                                    dataIndex: 'roleId',
                                                    tpl: '{roleName}',
                                                    menuDisabled: true,
                                                    ui: 'employeeinfo-shift-grid',
                                                    editable: true,
                                                    editor: {
                                                        xtype: 'selectfield',
                                                        bind: {
                                                            store: '{securityRoles}'
                                                        },
                                                        placeholder: 'Role',
                                                        displayField: 'Role_Name',
                                                        valueField: 'Role_Id',
                                                        listeners: {
                                                            select: 'onEditDepartmentsDeptSelect'
                                                        }
                                                    }
                                                }
                                            ],
                                            bind: '{companyDepartments}'
                                        }
                                    ]
                                }
                            ]

                        },
                    ]
                }
            ]
        }
    ]
});