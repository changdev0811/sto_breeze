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

    padding:'8pt',


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
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset no-margin no-padding no-border',
            //xtype: 'container',
            //userCls: 'employee-info-container',
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
                    itemId: 'date_of_hire',
                    label: 'Hire Date',
                    // bind: { value: '{info.HireDate}' },
                    bind: { value: '{hireDate}' },
                    // edgePicker: {},
                    picker: 'auto'
                    // picker: {
                    //     xtype: 'datepicker',
                    //     title: 'Select Hire Date'
                    // },
                },
                {
                    xtype: 'datefield',
                    itemId: 'date_of_termination',
                    label: 'Termination Date',
                    bind: { value: '{info.TerminationDate}' },
                    // edgePicker: {},
                    picker: 'auto'
                    // picker: {
                    //     xtype: 'datepicker',
                    //     title: 'Select Termination Date'
                    // },
                },
                {
                    itemId: 'customer_employee_id',
                    label: 'Employee #',
                    bind: { value: '{info.EmployeeNumber}' }
                }
            ]
        },
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset no-margin no-padding no-border',
            //xtype: 'container',
            //userCls: 'employee-info-container',
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
                    itemId: 'department',
                    label: 'Department',
                    displayField: 'Name',
                    valueField: 'Id',
                    reference: 'departmentsSelect',
                    store: 'departments',
                    required: true,
                    bind: { value: '{info.Department}' },
                    validators: {
                        type: 'method',
                        fn: function(value){
                            if(value === 0){
                                return 'Required';
                            } else {
                                return true;
                            }
                        }
                    },
                    listeners: {
                        change: 'onDepartmentChange'
                    }
                },
                {
                    itemId: 'badge_id',
                    label: 'Badge #',
                    bind: { value: '{info.Badge}' }
                },
                {
                    itemId: 'payroll',
                    label: 'Payroll #',
                    bind: { value: '{info.Payroll}' }
                }
            ]
        },
        {
            
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset no-margin no-padding no-border',
            //xtype: 'container',
            //userCls: 'employee-info-container',
            layout: 'hbox',
            defaults: {
                flex: 1,
                xtype: 'breeze-textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield',
            },
            items: [
                {
                    itemId: 'comp_rate',
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
                    itemId: 'comp_per',
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
                                    cancel: function (comp) {
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
            
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset no-margin no-padding no-border',
            //xtype: 'container',
            flex: 1,
            layout: 'vbox',
            items: [
                // List tab panel
                {
                    xtype: 'tabpanel',

                    ui: 'wtr-tabbar',
                    userCls: 'no-border no-margin no-padding',


                    layout: {
                        animation: 'fade'
                    },
                    //tabBarPosition: 'bottom',
                    tabBarPosition: 'top',
                    //ui: 'employeeinfo-small-tabs',
                    tabBar: {
                        defaultTabUI: 'employeeinfo-small-tabs',
                        shadow: false
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
                                    
                                    ui: 'employee-info-grid-panel',
                                    userCls: 'employee-info-fieldset no-padding no-margin',


                                    //ui: 'employee-info-shift-grid employee-info-grid-panel employee-info-tab-panel',
                                    //userCls: 'employee-info-grid',
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
                                                // Mode for filtering what is shown in multi actionsheet
                                                // sheetMode: 'supervisor',
                                                dialog: 'addSupervisorDialog',
                                                // Name of function used to make sure its ok to add
                                                checkHandler: 'canAddCompanySupervisor',
                                                // xtype/alias of multisheet component
                                                componentType: 'employee.information.sheets'

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

                                            ui: 'employeeinfo-shift-grid employee-info-grid',
                                            userCls: 'no-background',


                                            //ui: 'employeeinfo-shift-grid',
                                            //userCls: 'employee-info-grid',
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
                                    //ui: 'employee-info-shift-grid employee-info-grid-panel employee-info-tab-panel',
                                    //userCls: 'employee-info-grid',

                                    
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
                                                // Mode for filtering what is shown in multi actionsheet
                                                // sheetMode: 'supervisedEmployee',
                                                dialog: 'addSupervisedEmployeeDialog',
                                                // Name of function used to make sure its ok to add
                                                checkHandler: 'canAddCompanyEmployee',
                                                // xtype/alias of multisheet component
                                                componentType: 'employee.information.sheets'
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
                                            
                                            ui: 'employee-info-grid',


                                            ui: 'employeeinfo-shift-grid employee-info-grid',
                                            userCls: 'no-background',


                                            //ui: 'employeeinfo-shift-grid',
                                            //userCls: 'employee-info-grid',
                                            
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
                                                // Mode for filtering what is shown in multi actionsheet
                                                dialog: 'addDepartmentDialog',
                                                // Name of function used to make sure its ok to add
                                                checkHandler: null,
                                                // xtype/alias of multisheet component
                                                componentType: 'employee.information.sheets',
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

                                            ui: 'employeeinfo-shift-grid employee-info-grid',
                                            userCls: 'no-background',

                                            //ui: 'employeeinfo-shift-grid',
                                            //userCls: 'employee-info-grid',
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