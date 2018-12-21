/**
 * Departments Admin view
 * @class Departments
 * @namespace Breeze.view.admin.Departments
 * @alias widget.admin.departments
 */
Ext.define('Breeze.view.admin.Departments', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.departments',

    config: {
        crumbTitle: 'Departments'
    },

    // View Model
    viewModel: {
        type: 'admin.departments'
    },

    // Controller
    controller: 'admin.departments',
    listeners: {
        initialize: 'onInit'
    },


    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',

    title: 'Departments',

    // +++ Allow h scroll when panel is too small +++
    scrollable: 'y',

    addSupervisorDialog: {
        xtype: 'dialog',
        title: 'Add Supervisor',
        ui: 'light-themed-dialog employeeinfo-dialog',

        layout: 'vbox',

        maxHeight: '400pt',
        scrollable: 'y',

        items: [
            {
                xtype: 'selectfield',
                // ui: 'reporting reporting-text reporting-date',
                // width:'200pt',
                label: 'Supervisor',
                // labelAlign: 'left',
                labelWidth: 'auto',
                itemId: 'supervisorSelector',
                value: null,
                autoSelect: true,
                displayField: 'name', valueField: 'id',
                required: true
            },
            {
                xtype: 'selectfield',
                // ui: 'reporting reporting-text reporting-date',
                // width:'200pt',
                label: 'Role',
                // labelAlign: 'left',
                labelWidth: 'auto',
                itemId: 'roleSelector',
                value: null,
                autoSelect: true,
                displayField: 'Role_Name', valueField: 'Role_Id',
                required: true,
                bind: {
                    store: '{roles}'
                }
            }
        ],

        buttons: [
            {
                text: 'Add',
                ui: 'confirm alt',
                handler: 'onAddSupervisor'
            },
            {
                xtype: 'spacer',
                width: '8pt'
            },
            {
                text: 'Cancel',
                ui: 'action alt',
                handler: 'onAddSupervisorDialogCancel'
            }
        ]
    },

    // Action buttons shown at bottom of panel
    buttonAlign: 'right',
    buttons: {
        apply: { text: 'Save', handler: 'onSave', ui: 'confirm alt', style: 'width:125pt' },
    },



    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [

        // Main horizontal arranging container
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            minHeight: '420pt',

            // +++ Allow h scroll when panel is too small +++
            scrollable: 'x',

            items: [

                // Column 1
                {
                    xtype: 'fieldset',
                    //title:'Departments',
                    userCls: 'admin-fieldset no-padding',
                    layout: {
                        type: 'vbox',
                        alignment: 'stretch'
                    },
                    flex: 1,
                    // +++ fixed width +++
                    minWidth: '200pt',
                    maxWidth: '250pt',

                    items: [
                        {
                            xtype: 'toolbar',
                            ui: 'admin-tree',
                            //userCls:'no-background',
                            shadow: false,
                            items: [
                                {
                                    xtype: "searchfield",
                                    flex: 1,
                                    ui: "solo",
                                    //userCls:'admin-fieldset no-border no-margin no-padding',
                                    placeholder: "Search",
                                    listeners: {
                                        action: 'onSearch',
                                        clearicontap: 'onSearch'
                                    }
                                },
                                {
                                    xtype: 'spacer',
                                    width: '10pt',
                                },
                                {
                                    xtype: 'button',
                                    //text: 'Save for Future Use',
                                    iconCls: 'x-fas fa-plus',
                                    ui: 'plain wtr-button',
                                },
                                {
                                    xtype: 'button',
                                    //text: 'Save for Future Use',
                                    iconCls: 'x-fas fa-minus',
                                    ui: 'plain wtr-button',
                                    handler: 'onRemoveDepartment'
                                },
                            ]
                        },

                        {
                            xtype: 'breeze-categories-list',
                            ui: 'admin-shift-grid',
                            flex: 1,
                            reference: 'departmentsList',
                            userCls: 'admin-fieldset no-background no-margin no-border',
                            itemId: 'selectList',
                            fieldMode: 'none',
                            selectMode: 'single',
                            preventDeselect: true,
                            itemConfig: {
                                ui: 'admin-list-item-select',
                                templates: {
                                    radioValue: '{record.Id}',
                                    itemData: { name: '{record.Name}' },
                                    itemTpl: [
                                        '<div class="breeze-dataview-select-item-label">',
                                        '<div class="admin-department-icon"></div>',
                                        '{name}</div>'
                                    ]
                                }
                            },
                            bind: {
                                store: '{departmentList}',
                            },
                            listeners: {
                                select: 'onDepartmentSelect'
                            },
                            viewModel: true
                        }

                    ]
                },

                // Column 2
                {
                    xtype: 'container',
                    ui: 'admin-sub',
                    flex: 1,
                    // +++ fixed width +++
                    minWidth: '200pt',
                    maxWidth: '250pt',
                    layout: 'vbox',
                    items: [
                        //===[Fields]===
                        {
                            xtype: 'fieldset',
                            ui: 'admin admin-text',
                            userCls: 'admin-fieldset ',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Department Name',
                                    ui: 'admin admin-text',
                                    userCls: 'admin-fieldset no-border no-margin',
                                    name: 'DeptName',
                                    bind: {
                                        value: '{departmentData.Name}'
                                    }
                                },
                                {
                                    xtype: 'spinnerfield',
                                    ui: 'admin admin-text',
                                    userCls: 'admin-fieldset no-border no-margin',
                                    decimals: 0,
                                    minValue: 0,
                                    labelAlign: 'left',
                                    labelWidth: 'auto',
                                    label: 'Leave Request Conflect Limit',
                                    bind: {
                                        value: '{conflictLimit}'
                                    }
                                },
                            ]
                        },
                        //===[Supervisors]===
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    //userCls:'no-background',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: "component",
                                            flex: 1, userCls: 'admin-title-toolbar',
                                            html: 'Supervisors'
                                        },
                                        {
                                            xtype: 'spacer',
                                            width: '10pt',
                                        },
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls: 'x-fas fa-plus',
                                            ui: 'plain wtr-button',
                                            handler: 'showAddSupervisorDialog'
                                        },
                                        // {
                                        //     xtype: 'button',
                                        //     //text: 'Save for Future Use',
                                        //     iconCls: 'x-fas fa-minus',
                                        //     ui: 'plain wtr-button'
                                        // },

                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    ui: 'admin-grid',
                                    reference: 'supervisorsGrid',
                                    layout: 'hbox',
                                    flex: 1,
                                    sortable: false, columnResize: false,
                                    columnMenu: false, hideHeaders: false,
                                    bind: {
                                        store: '{supervisors}'
                                    },
                                    defaults: {
                                        xtype: 'gridcolumn',
                                    },
                                    // Plugin for editable grid
                                    plugins: {
                                        gridcellediting: true
                                    },
                                    selectable: {
                                        mode: 'single'
                                    },
                                    columns: [
                                        {
                                            text: 'Name',
                                            itemId: 'name',
                                            flex: 1,
                                            dataIndex: 'supervisorId',
                                            tpl: '{Name}',
                                            menuDisabled: true,
                                        },
                                        {
                                            text: 'Role',
                                            itemId: 'role',
                                            flex: 1,
                                            tpl: '{Role_Name}',
                                            dataIndex: 'roleId',
                                            menuDisabled: true,
                                            // align:'center',
                                            editor: {
                                                xtype: 'selectfield',
                                                valueField: 'Role_Id',
                                                displayField: 'Role_Name',
                                                bind: {
                                                    store: '{roles}'
                                                },
                                                listeners: {
                                                    select: 'onEditSupervisorRoleSelect'
                                                }
                                            },
                                            cell: {
                                                toolDefaults: {
                                                    ui: 'employeeinfo-grid-tool',
                                                    zone: 'end'
                                                },
                                                tools: [
                                                    {
                                                        iconCls: 'x-fas fa-times',
                                                        handler: 'onRemoveSupervisor',
                                                    }
                                                ]
                                            }
                                        },
                                    ],
                                    listeners: {
                                        // beforeedit: 'onSupervisorBeforeEdit',
                                        // edit: 'onSupervisorPostEdit'
                                    }
                                }

                            ]

                        },
                        //===[Employees]
                        {
                            xtype: 'fieldset',
                            title: 'Employees',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'fit',
                            items: [

                                {
                                    xtype: 'breeze-categories-list',
                                    ui: 'admin-shift-grid',
                                    flex: 1,
                                    userCls: 'admin-fieldset no-background no-margin no-border',
                                    fieldMode: 'none',
                                    selectMode: 'single',
                                    preventDeselect: false,
                                    itemConfig: {
                                        ui: 'admin-list-item-select',
                                        templates: {
                                            itemData: { name: '{record.text}' },
                                            itemTpl: [
                                                '<div class="breeze-dataview-select-item-label">',
                                                '{name}</div>'
                                            ]
                                        }
                                    },
                                    bind: {
                                        store: '{employees}',
                                    },
                                    viewModel: true
                                }

                            ]
                        },
                    ]
                },

            ]
        }
    ]
});