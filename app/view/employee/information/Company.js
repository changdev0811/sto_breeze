Ext.define('Breeze.view.employee.information.Company', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.company',

    layout: 'vbox',

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
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    xtype: 'datefield',
                    name: 'date_of_hire',
                    label: 'Hire Date',
                    bind: '{hireDate}'
                },
                {
                    xtype: 'datefield',
                    name: 'date_of_termination',
                    label: 'Termination Date',
                    bind: '{info.TerminationDate}'
                },
                {
                    name: 'customer_employee_id',
                    label: 'Employee #',
                    bind: '{info.EmployeeNumber}'
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
                    bind: '{info.Department}',
                },
                {
                    name: 'badge_id',
                    label: 'Badge #',
                    bind: '{info.Badge}'
                },
                {
                    name: 'payroll',
                    label: 'Payroll #',
                    bind: '{info.Payroll}'
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
                    name: 'comp_rate',
                    xtype: 'numberfield',
                    minValue: 0, decimals: 2,
                    label: 'Compensation',
                    bind: '{info.CompRate}'
                },
                {
                    xtype: 'selectfield',
                    label: 'Compensation Frequency',
                    name: 'comp_per',
                    store: 'CompensationOptions',
                    bind: '{info.CompPer}',
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
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    xtype: 'displayfield',
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
                    ui: 'employeeinfo-small-tabs',
                    // tabBar: {
                    //     defaultTabUI: 'employeeinfo-small-tabs',
                    //     shadow: 'false'
                    // },
                    flex: 1,
                    items: [
                        // ===[Supervisors tab]==
                        {
                            xtype: 'container',
                            title: 'Supervisors',
                            layout: 'vbox',
                            bind: {
                                // Hide tab when not enabled
                                hidden: '{!lists.supervisors.enabled}'
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
                                    // hideHeaders: true,
                                    sortable: false,
                                    columnMenu: null,
                                    reference: 'supervisorsListGrid',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            flex: 1,
                                            text: 'Name',
                                            dataIndex: 'displayName',
                                            menuDisabled: true
                                        }
                                    ]
                                }
                            ]
                        },
                        // ===[Employees tab]==
                        {
                            xtype: 'container',
                            title: 'Employees',
                            layout: 'vbox',
                            bind: {
                                // Hide tab when not enabled
                                hidden: '{!lists.employees.enabled}'
                            },
                            items: [
                                // ===[Employees list grid]==
                                {
                                    xtype: 'grid',
                                    height: '100%',
                                    width: '100%',
                                    layout: 'hbox',
                                    columnResize: false,
                                    hideHeaders: true,
                                    sortable: false,
                                    columnMenu: null,
                                    reference: 'employeesListGrid',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            flex: 1,
                                            text: 'Name',
                                            dataIndex: 'displayName',
                                            menuDisabled: true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});