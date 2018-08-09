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
        {
            xtype: 'container',
            userCls: 'employee-info-outer-container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'tabpanel',
                    layout: {
                        animation: 'fade'
                    },
                    flex: 3,
                    ui: 'employeeinfo-small-tabs',
                    tabBar: {
                        defaultTabUI: 'employeeinfo-small-tabs',
                        shadow: false
                    },
                    defaults: {
                        userCls: 'employee-info-roletab-container'
                    },
                    items: [
                        {
                            xtype: 'container',
                            title: 'Supervisors',
                            reference: 'supervisorsTab',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'container',
                                    height: '300px',
                                    items: [
                                        {
                                            reference: 'supervisorsGrid',
                                            xtype: 'grid',
                                            infinite: true,
                                            ui: 'employeeinfo-shift-grid',
                                            layout: 'hbox',
                                            striped: false,
                                            sortable: false,
                                            columnResize: false,
                                            columnMenu: null,
                                            height: '300px',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    ui: 'employeeinfo-shift-grid',
                                                    dataIndex: 'DisplayName',
                                                    menuDisabled: true,
                                                    flex: 1
                                                },
                                                // {
                                                //     ui: 'employeeinfo-shift-grid',
                                                //     cell: {
                                                //         tools: [{
                                                //             type: 'close',
                                                //             ui: 'employeeinfo-tool-delete',
                                                //             zone: 'end'
                                                            
                                                //         }]
                                                //     }
                                                // }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        // // == Role listing tabbar set ==
        // {
        //     xtype: 'tabpanel',
        //     flex: 1,
        //     // tabBarPosition: 'bottom',
        //     layout: {
        //         animation: 'fade'
        //     },
        //     ui: 'employeeinfo-small-tabs',
        //     tabBar: {
        //         defaultTabUI: 'employeeinfo-small-tabs ',
        //         shadow: false
        //     },
        //     defaults: {
        //         userCls: 'employee-info-roletab-container',
        //         xtype: 'container'
        //     },
        //     items: [
        //         {
        //             title: 'Supervisors',
        //             reference: 'supervisorsTab',
        //             height: '200px',
        //             items: [
        //                 {   
        //                     flex: 1,
        //                     title: 'Supervisors',
        //                     reference: 'supervisorsGrid',
        //                     xtype: 'grid',
        //                     // infinite: true,
        //                     ui: 'employeeinfo-shift-grid',
        //                     layout: 'fit',
        //                     striped: false,
        //                     sortable: false,
        //                     columnResize: false,
        //                     columnMenu: null,
        //                     height: '150px',
        //                     columns: [
        //                         {
        //                             xtype: 'gridcolumn',
        //                             ui: 'employeeinfo-shift-grid',
        //                             dataIndex: 'DisplayName',
        //                             menuDisabled: true,
        //                             flex: 1
        //                         },
        //                         // {
        //                         //     ui: 'employeeinfo-shift-grid',
        //                         //     cell: {
        //                         //         tools: [{
        //                         //             type: 'close',
        //                         //             ui: 'employeeinfo-tool-delete',
        //                         //             zone: 'end'
                                            
        //                         //         }]
        //                         //     }
        //                         // }
        //                     ]
        //                 }
                        
                
        //             ]
        //         },
        //         {
        //             title: "Employees",
        //             reference: 'employeesTab',
        //             items: [
        //                 {
        //                     xtype: 'component',
        //                     html: "BLAH"
        //                 }
        //             ]
        //         },
        //         {
        //             title: 'Departments',
        //             reference: 'departmentsTab'
        //         }
        //     ]
        // }
         
    ]
});