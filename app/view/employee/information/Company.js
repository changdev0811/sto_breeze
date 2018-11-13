/**
 * Employee Info Company subview
 * @class Company
 * @namespace Breeze.view.employee.information.Company
 * @alias widget.employee.information.company
 * @extends Ext.Container
 */
Ext.define('Breeze.view.employee.information.Company', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.company',

    layout: 'vbox',
    reference: 'employeeInfoCompanyView',
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
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    xtype: 'datefield',
                    name: 'date_of_hire',
                    label: 'Hire Date',
                    bind: { value: '{info.HireDate}' },
                    picker: {
                        xtype: 'datepicker',
                        title: 'Select Hire Date'
                    },
                },
                {
                    xtype: 'datefield',
                    name: 'date_of_termination',
                    label: 'Termination Date',
                    bind: { value: '{info.TerminationDate}' },
                    picker: {
                        xtype: 'datepicker',
                        title: 'Select Termination Date'
                    },
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
                    required: true,
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
                    bind: '{info.LayoffStatus}',
                    bind: {
                        hidden: '{!readOnly}'
                    }
                },
                {
                    xtype: 'containerfield',
                    label: 'Layoff Status',
                    bind: {
                        hidden: '{readOnly}'
                    },
                    items: [
                        // {
                        //     xtype: 'togglefield',
                        //     ui: 'employeeinfo-displayfield employeeinfo-togglefield',
                        //     activeLabel: 'Laid Off',
                        //     inactiveLabel: 'Active',
                        //     labelAlign: 'right'
                        // }
                        {
                            xtype: 'datefield',
                            reference: 'companyLayoffDate',
                            label: 'Layoff Date',
                            hidden: true,
                            // bind: { value: '{info.LayoffDate}' },
                            picker: {
                                xtype: 'datepicker',
                                title: 'Select Layoff Effective Date',
                                listeners: {
                                    cancel: function(comp){
                                        console.info('cancel picker');
                                        comp.hide();
                                    },
                                    change: 'onLayoffEffectivePicked'
                                    // change: function(ref, val){
                                    //     console.info('Layoff date picked');
                                    // }
                                }
                            },
                        },
                        {
                            xtype: 'button',
                            bind: {
                                text: '{layoffButtonText}',
                                pressed: '{isLaidOff}'
                            },
                            handler: 'onLayoffButtonTap',
                            ui: 'action'
                        }
                    ]

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
                                {
                                    xtype: 'panel',
                                    ui: 'employee-info-shift-grid employee-info-grid-panel employee-info-tab-panel',
                                    userCls: 'employee-info-grid',
                                    title: 'Supervisors',
                                    // Grid title tool buttons
                                    tools: {
                                        // Add tool
                                        add: {
                                            iconCls: 'x-fas fa-plus',
                                            bind: {
                                                hidden: '{readOnly}',
                                                disabled: '{readOnly}'
                                            },
                                            data: {
                                                // reference to actionsheet button shows
                                                sheet: 'supervisorAddActionSheet',
                                                // Name of function used to make sure its ok to add
                                                checkHandler: 'canAddCompanySupervisor'

                                            },
                                            handler: 'onGridAddButton'
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
                                                    // text: 'Name',
                                                    dataIndex: 'personId',
                                                    tpl: '{displayName}',
                                                    menuDisabled: true,
                                                    ui: 'employeeinfo-shift-grid',
                                                    bind: {
                                                        editable: '{!readOnly}'
                                                    },
                                                    editor: {
                                                        xtype: 'selectfield',
                                                        bind: {
                                                            store: '{choices.supervising}'
                                                        },
                                                        displayField: 'displayName',
                                                        valueField: 'personId',
                                                        listeners: {
                                                            select: 'onEditSupervisorSelect'
                                                        }
                                                    },
                                                    // Remove icon
                                                    cell: {
                                                        toolDefaults: {
                                                            ui: 'employeeinfo-grid-tool',
                                                            zone: 'end',
                                                            bind: {
                                                                // Hide when readOnly
                                                                hidden: '{readOnly}'
                                                            }
                                                        },
                                                        tools: [
                                                            {
                                                                iconCls: 'x-fas fa-times',
                                                                handler: 'onCompanyRemoveSupervisorTool',
                                                                binding: {
                                                                    hidden: '{readOnly}',
                                                                    disabled: '{readOnly}'
                                                                },
                                                            }
                                                        ]
                                                    }
                                                },
                                            ],
                                            // bind: '{companySupervisorsList}'
                                            bind: {
                                                store: '{companySupervisors}'
                                                // store: '{companySupervisorsAuto}'
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
                                    ui: 'employee-info-shift-grid employee-info-grid-panel employee-info-tab-panel',
                                    userCls: 'employee-info-grid',
                                    title: 'Supervised Employees',
                                    tools: {
                                        add: {
                                            iconCls: 'x-fas fa-plus',
                                            bind: {
                                                hidden: '{readOnly}',
                                                disabled: '{readOnly}'
                                            },
                                            data: {
                                                sheet: 'employeeAddActionSheet',
                                                // Name of function used to make sure its ok to add
                                                checkHandler: 'canAddCompanyEmployee'
                                            },
                                            handler: 'onGridAddButton'
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
                                                    // text: 'Name',
                                                    dataIndex: 'personId',
                                                    tpl: '{displayName}',
                                                    menuDisabled: true,
                                                    ui: 'employeeinfo-shift-grid',
                                                    binding: {
                                                        editable: '{!readOnly}'
                                                    },
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
                                                    },
                                                    // Remove icon
                                                    cell: {
                                                        toolDefaults: {
                                                            ui: 'employeeinfo-grid-tool',
                                                            zone: 'end',
                                                            bind: {
                                                                // Hide when readOnly
                                                                hidden: '{readOnly}'
                                                            }
                                                        },
                                                        tools: [
                                                            {
                                                                iconCls: 'x-fas fa-times',
                                                                handler: 'onCompanyRemoveSupervisedEmployeeTool',
                                                                binding: {
                                                                    hidden: '{readOnly}',
                                                                    disabled: '{readOnly}'
                                                                },
                                                            }
                                                        ]
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
                                    ui: 'employee-info-shift-grid employee-info-grid-panel employee-info-tab-panel',
                                    userCls: 'employee-info-grid',
                                    title: 'Supervised Departments',
                                    // Grid title tool buttons
                                    tools: {
                                        // Add tool
                                        add: {
                                            iconCls: 'x-fas fa-plus',
                                            bind: {
                                                hidden: '{readOnly}',
                                                disabled: '{readOnly}'
                                            },
                                            data: {
                                                // reference to actionsheet button shows
                                                sheet: 'departmentAddActionSheet',
                                                // Name of function used to make sure its ok to add
                                                checkHandler: null
                                            },
                                            handler: 'onGridAddButton'
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
                                                    // text: 'Department Name',
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
                                                    // text: 'Role',
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
                                                            select: 'onEditDepartmentsRoleSelect'
                                                        }
                                                    },
                                                    cell: {
                                                        toolDefaults: {
                                                            ui: 'employeeinfo-grid-tool',
                                                            zone: 'end',
                                                            bind: {
                                                                // Hide when readOnly
                                                                hidden: '{readOnly}'
                                                            }
                                                        },
                                                        tools: [
                                                            {
                                                                iconCls: 'x-fas fa-times',
                                                                handler: 'onCompanyRemoveDepartmentTool'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ],
                                            bind: '{companyDepartments}'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        //===[Action Sheets for adding grid items]===
        // Add to Supervisors action sheet
        {
            xtype: 'actionsheet',
            reference: 'supervisorAddActionSheet',
            title: 'Add Supervisor',
            items: [
                {
                    xtype: 'selectfield',
                    label: 'Supervisor',
                    itemId: 'supervisor',
                    displayField: 'displayName',
                    valueField: 'personId',
                    bind: {
                        store: '{choices.supervising}'
                    },
                    required: true
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    style: 'padding-top: 6pt',
                    items: [
                        {
                            xtype: 'button',
                            ui: 'confirm alt',
                            text: 'Add',
                            handler: 'onCompanyAddSupervisor'
                        },
                        { xtype: 'spacer', width: 8 },
                        {
                            xtype: 'button',
                            ui: 'decline alt',
                            text: 'Cancel',
                            handler: 'onActionSheetCancel'
                        }
                    ]
                }
            ]
        },
        // Add to Supervised Employees action sheet
        {
            xtype: 'actionsheet',
            reference: 'employeeAddActionSheet',
            title: 'Add Supervised Employee',
            items: [
                {
                    xtype: 'selectfield',
                    label: 'Employee Name',
                    itemId: 'employee',
                    displayField: 'displayName',
                    valueField: 'personId',
                    bind: { 
                        store: '{choices.supervisedEmployees}'
                    },
                    required: true
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    style: 'padding-top: 6pt',
                    items: [
                        {
                            xtype: 'button',
                            ui: 'confirm alt',
                            text: 'Add',
                            handler: 'onCompanyAddEmployee'
                        },
                        { xtype: 'spacer', width: 8 },
                        {
                            xtype: 'button',
                            ui: 'decline alt',
                            text: 'Cancel',
                            handler: 'onActionSheetCancel'
                        }
                    ]
                }
            ]
        },
        // Add to Supervised Departments action sheet
        {
            xtype: 'actionsheet',
            reference: 'departmentAddActionSheet',
            title: 'Add Department',
            items: [
                {
                    xtype: 'selectfield',
                    itemId: 'department',
                    label: 'Department',
                    displayField: 'departmentName',
                    valueField: 'departmentId',
                    bind: { 
                        store: '{choices.supervisedDepartments}'
                    },
                    required: true
                },
                {
                    xtype: 'selectfield',
                    itemId: 'role',
                    label: 'Role',
                    displayField: 'Role_Name',
                    valueField: 'Role_Id',
                    bind: { 
                        store: '{securityRoles}'
                    },
                    required: true
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    style: 'padding-top: 6pt',
                    items: [
                        {
                            xtype: 'button',
                            ui: 'confirm alt',
                            text: 'Add',
                            handler: 'onCompanyAddDepartment'
                        },
                        { xtype: 'spacer', width: 8 },
                        {
                            xtype: 'button',
                            ui: 'decline alt',
                            text: 'Cancel',
                            handler: 'onActionSheetCancel'
                        }
                    ]
                }
            ]
        },
          
        // Layoff effective date picker
        // {
        //     xtype: 'datepicker',
        //     reference: 'layoffEffectivePicker',
        //     title: 'Select Layoff Effective Date',
        //     value: (new Date()),

        //     listeners: {
        //         cancel: function(comp){
        //             console.info('cancel picker');
        //             comp.hide();
        //         },
        //         // change: 'onLayoffEffectivePicked'
        //         change: function(ref, val){
        //             console.info('Layoff date picked');
        //         }
        //     }
        // }
    ]
});