Ext.define('Breeze.view.employee.information.Company', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.company',

    layout: 'vbox',

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
                    name: 'department',
                    label: 'Department',
                    displayField: 'Name',
                    valueField: 'Id',
                    reference: 'departments',
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
                    bind: { value: '{info.CompRate}' }
                },
                {
                    xtype: 'selectfield',
                    label: 'Compensation Frequency',
                    name: 'comp_per',
                    store: 'CompensationOptions',
                    bind: { value: '{info.CompPer}' },
                    displayField: 'Description',
                    valueField: 'ID'
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
                ui: 'employeeinfo-displayfield'
            },
            items: [
                {
                    xtype: 'displayfield',
                    ui: 'employeeinfo-displayfield',
                    label: 'Layoff Status',
                    bind: '{info.LayoffStatus}'
                }
            ]
        },
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
                                    title: 'Supervisors',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            flex: 1,
                                            text: 'Name',
                                            dataIndex: 'displayName',
                                            menuDisabled: true,
                                            ui: 'employeeinfo-shift-grid'
                                        }
                                    ],
                                    bind: '{companySupervisorsList}'
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
                                    title: 'Supervised Employees',
                                    ui: 'employeeinfo-shift-grid',
                                    userCls: 'employee-info-grid',
                                    reference: 'employeesListGrid',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            flex: 1,
                                            text: 'Name',
                                            dataIndex: 'displayName',
                                            menuDisabled: true,
                                            ui: 'employeeinfo-shift-grid'
                                        }
                                    ],
                                    bind: '{companyEmployeesList}'
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
                                    title: 'Supervised Departments',
                                    ui: 'employeeinfo-shift-grid',
                                    userCls: 'employee-info-grid',
                                    reference: 'departmentsListGrid',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            flex: 1,
                                            text: 'Department Name',
                                            dataIndex: 'displayName',
                                            menuDisabled: true,
                                            ui: 'employeeinfo-shift-grid'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            flex: 1,
                                            text: 'Role',
                                            dataIndex: 'role',
                                            menuDisabled: true,
                                            ui: 'employeeinfo-shift-grid'
                                        }
                                    ],
                                    bind: '{companyDepartmentsList}'
                                }
                            ]
                               
                        },
                    ]
                }
            ]
        }
    ]
});