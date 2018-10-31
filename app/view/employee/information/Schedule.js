Ext.define('Breeze.view.employee.information.Schedule', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.schedule',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],

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
            // userCls: 'employee-info-fieldset',
            userCls: 'ei-schedule-top-padding',
            layout: 'hbox',
            // title: 'Name',
            defaults: {
                flex: 1,
                xtype: 'textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    xtype: 'panel',
                    // userCls: 'employee-info-fieldset',
                    ui: 'employee-info-shift-grid employee-info-grid-panel',
                    userCls: 'employee-info-grid',
                    title: 'Shift Information',
                    // Tools
                    tools: {
                        add: {
                            iconCls: 'x-fas fa-plus',
                            data: {
                                sheet: 'addShiftActionSheet',
                                // checkHandler: 'canAddShift'
                            },
                            bind: {
                                // Dynamically disable based on readonly and shift count
                                disabled: '{!canAddShift}'
                            }
                        }
                    },
                    items: [
                        {
                            xtype: 'grid',
                            height: '100pt',
                            ui: 'employeeinfo-shift-grid employee-info-shift-grid-sized',
                            reference: 'shiftSegmentGrid',
                            userCls: 'employee-info-grid',
                            striped: true,
                            sortable: false,
                            columnResize: false,
                            columnMenu: null,
                            hideHeaders: true,
                            layout: 'hbox',
                            bind: {
                                store: '{shift.segments}'
                            },
                            // Plugin allowing editability
                            plugins: {
                                gridcellediting: true
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    itemId: 'start',
                                    ui: 'employeeinfo-shift-grid', menuDisabled: true, 
                                    align: 'center', flex: 1,
                                    dataIndex: 'StartMin', tpl: '{StartTime}',
                                    bind: {
                                        editable: '{!readOnly}'
                                    },
                                    // editor: {
                                    //     xtype: 'selectfield',
                                    //     bind: {
                                    //         store: '{shiftChoices}'
                                    //     },
                                    //     displayField: 'time',
                                    //     valueField: 'value',
                                    //     listeners: {
                                    //         // change: 'onShiftTimeChange',
                                    //         select: 'onShiftTimeSelect'
                                    //     }
                                    // }
                                    editor: {
                                        xtype: 'combobox',
                                        bind: {
                                            store: '{shiftChoices}'
                                        },
                                        displayField: 'time', valueField: 'value',
                                        inputMask: '[0-9]{1,2}:[0-9]{2}(AM/PM)',
                                        listeners: {
                                            // change: 'onShiftTimeChange',
                                            select: 'onShiftTimeSelect'
                                        }
                                    }
                                },
                                {
                                    xtype: 'templatecolumn',
                                    tpl: ['-'],
                                    align: 'center',
                                    width: '2em',
                                    menuDisabled: true
                                },
                                {
                                    xtype: 'gridcolumn',
                                    itemId: 'stop',
                                    ui: 'employeeinfo-shift-grid', menuDisabled: true,
                                    align: 'center', flex: 1,
                                    dataIndex: 'StopMin', tpl: '{StopTime}',
                                    ind: {
                                        editable: '{!readOnly}'
                                    },
                                    editor: {
                                        xtype: 'selectfield',
                                        bind: {
                                            store: '{shiftChoices}'
                                        },
                                        displayField: 'time',
                                        valueField: 'value',
                                        listeners: {
                                            select: 'onShiftTimeSelect'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    flex: 1,
                    defaults: {
                        xtype: 'selectfield',
                        userCls: 'employee-info-general-field',
                        ui: 'employeeinfo-textfield'
                    },
                    items: [
                        {
                            name: 'startup_settings',
                            label: 'Accrual Policy',
                            bind: { value: '{info.StartUpSettings}' },
                            reference: 'accrualPolicy',
                            displayField: 'Name',
                            valueField: 'ID',
                            required: true
                        },
                        {
                            name: 'default_project',
                            label: 'Default Project',
                            bind: { value: '{info.DefaultProject}' },
                            reference: 'defaultProject',
                            displayField: 'Name',
                            valueField: 'ID'
                        }
                    ]
                }
            ]
        },

        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    flex: 1,
                    xtype: 'fieldset',
                    userCls: 'employee-info-fieldset',
                    title: 'Exempt Status',
                    reference: 'exemptStatus',
                    defaults: { 
                        xtype: 'radiofield',
                        ui: 'employeeinfo-radio',
                        bodyAlign:'stretch',
                    },
                    items: [
                        {
                            boxLabel: 'Exempt',
                            name: 'exempt_status',
                            value: 138,
                            bind: {
                                groupValue: '{info.ExemptStatus}'
                            }
                        },{
                            boxLabel: 'Non-Exempt',
                            name: 'exempt_status',
                            value: 139,
                            bind: {
                                groupValue: '{info.ExemptStatus}'
                            }
                        }
                    ]
                },
                {
                    flex: 1,
                    xtype: 'fieldset',
                    userCls: 'employee-info-fieldset',
                    title: 'Recording Mode',
                    reference: 'recordingMode',
                    defaults: { 
                        xtype: 'radiofield',
                        ui: 'employeeinfo-radio',
                        bodyAlign:'stretch'
                    },
                    items: [
                        {
                            boxLabel: 'Days',
                            name: 'recording_mode',
                            value: 20,
                            bind: {
                                groupValue: '{info.RecordingMode}'
                            }
                        },{
                            boxLabel: 'Hours',
                            name: 'recording_mode',
                            value: 21,
                            bind: {
                                groupValue: '{info.RecordingMode}'
                            }
                        }
                    ]
                }
            ]
        },
        // Add Shift action sheet
        {
            xtype: 'actionsheet',
            reference: 'addShiftActionSheet',
            title: 'Add Shift Segment',
            items: [
                {
                    xtype: 'selectfield',
                    itemId: 'start',
                    label: 'Start',
                    displayField: 'time',
                    valueField: 'value',
                    bind: { 
                        store: '{shiftChoices}'
                    },
                    required: true
                },
                {
                    xtype: 'selectfield',
                    itemId: 'stop',
                    label: 'S',
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
    ]
});