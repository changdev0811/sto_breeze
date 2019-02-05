Ext.define('Breeze.view.employee.information.Schedule', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.schedule',
    
    padding:'8pt',

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
            //userCls: 'ei-schedule-top-padding',
            layout: 'hbox',
            // title: 'Name',
            defaults: {
                //flex: 1,
                //xtype: 'textfield',
                //userCls: 'employee-info-general-field',
                //ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    flex: 1,
                    xtype: 'panel',
                    
                    // userCls: 'employee-info-fieldset',
                    //ui: 'employee-info-shift-grid employee-info-grid-panel employee-info-tab-panel',
                    //userCls: 'employee-info-grid',
                    
                    ui: 'employee-info-shift-grid employee-info-grid-panel employee-info-tab-panel',
                    userCls: 'employee-info-grid',



                    title: 'Shift Information',
                    body:{
                        style:'background:red!important;',
                    },
                    // Tools
                    tools: {
                        add: {
                            iconCls: 'x-fas fa-plus',
                            // data: {
                            //     // Mode for filtering what is shown in multi actionsheet
                            //     sheetMode: 'shiftSegment',
                            //     // Name of function used to make sure its ok to add
                            //     // checkHandler: 'canAddShift',
                            //     // xtype/alias of multisheet component
                            //     componentType: 'employee.information.sheets'
                            // },
                            bind: {
                                // Dynamically disable based on readonly and shift count
                                // disabled: '{!canAddShift}',
                                hidden: '{readOnly}'
                            },
                            // handler: 'onGridAddButton'
                            handler: 'onAddShiftSegment'
                            // handler: 'onAddShiftSegmentDirect'
                        }
                    },
                    items: [
                        // TODO: Figure out how to make combo boxes work as input fields
                        {
                            xtype: 'grid',
                            //ui: 'employeeinfo-shift-grid employee-info-shift-grid-sized',
                            //userCls: 'employee-info-grid',

                            ui: 'employeeinfo-shift-grid employee-info-grid',
                            userCls: 'no-background',

                            height: '100pt',
                            reference: 'shiftSegmentGrid',
                            striped: false,
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
                                    editor: {
                                        // xtype: 'selectfield',
                                        // store: 'accrualShiftChoices',
                                        // displayField: 'time',
                                        // valueField: 'value',
                                        // listeners: {
                                        //     // change: 'onShiftTimeChange',
                                        //     select: 'onShiftTimeSelect'
                                        // }
                                        xtype: 'combobox',
                                        itemId: 'start',
                                        label: 'Start',
                                        store: 'accrualShiftChoices',
                                        displayField: 'time',
                                        displayTpl: [
                                            '{[this.time(values)]}',
                                            {
                                                time: function (values) {
                                                    if (typeof values.time == "string") {
                                                        return values.time;
                                                    } else {
                                                        return BreezeTime.fromMinutes(values.value).asTime();
                                                    }
                                                }
                                            }
                                        ],
                                        valueField: 'value',
                                        forceSelection: false,
                                        queryMode: 'local',
                                        required: true,
                                        validators: {
                                            type: 'controller',
                                            fn: 'validateShiftTime'
                                        },
                                        listeners: {
                                            change: 'onShiftTimeChange'
                                        }
                                    }
                                    // editor: {
                                    //     xtype: 'combobox',
                                    //     bind: {
                                    //         store: '{shiftChoices}'
                                    //     },
                                    //     displayField: 'time', valueField: 'value',
                                    //     listeners: {
                                    //         // change: 'onShiftTimeChange',
                                    //         select: 'onShiftTimeSelect'
                                    //     }
                                    // }
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
                                    bind: {
                                        editable: '{!readOnly}'
                                    },
                                    editor: {
                                        // xtype: 'selectfield',
                                        // store: 'accrualShiftChoices',
                                        // displayField: 'time',
                                        // valueField: 'value',
                                        // listeners: {
                                        //     select: 'onShiftTimeSelect'
                                        // }
                                        xtype: 'combobox',
                                        itemId: 'stop',
                                        label: 'Stop',
                                        store: 'accrualShiftChoices',
                                        displayField: 'time',
                                        displayTpl: [
                                            '{[this.time(values)]}',
                                            {
                                                time: function (values) {
                                                    if (typeof values.time == "string") {
                                                        return values.time;
                                                    } else {
                                                        return BreezeTime.fromMinutes(values.value).asTime();
                                                    }
                                                }
                                            }
                                        ],
                                        valueField: 'value',
                                        forceSelection: false,
                                        queryMode: 'local',
                                        required: true,
                                        validators: {
                                            type: 'controller',
                                            fn: 'validateShiftTime'
                                        },
                                        listeners: {
                                            change: 'onShiftTimeChange'
                                        }
                                    },
                                    cell: {
                                        toolDefaults: {
                                            ui: 'employeeinfo-grid-tool',
                                            zone: 'end',
                                            bind: {
                                                hidden: '{readOnly}'
                                            }
                                        },
                                        tools: [
                                            {
                                                iconCls: 'x-fas fa-times',
                                                handler: 'onRemoveShiftSegment'
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    //xtype: 'container',

                    xtype: 'fieldset',
                    userCls: 'employee-info-fieldset no-padding no-border',


                    layout: 'vbox',
                    flex: 1,
                    defaults: {
                        xtype: 'selectfield',
                        //userCls: 'employee-info-fieldset no-border',
                        ui: 'employeeinfo-textfield',
                    },
                    items: [
                        {
                            // name: 'startup_settings',
                            label: 'Accrual Policy',
                            bind: { value: '{info.StartUpSettings}', store: '{scheduleList}' },
                            reference: 'accrualPolicy',
                            displayField: 'Name',
                            valueField: 'ID',
                            required: true,
                            listeners: {
                                change: 'onAccrualPolicyChange'
                            }
                        },
                        {
                            // name: 'default_project',
                            label: 'Default Project',
                            bind: { value: '{info.DefaultProject}', store: '{projectList}' },
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
            padding: '8pt 0pt 0pt 0pt',
            layout: 'hbox',
            items: [
                {
                    flex: 1,
                    xtype: 'fieldset',
                    userCls: 'employee-info-fieldset no-side-margin',
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
                    userCls: 'employee-info-fieldset ',
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
        }       
    ]
});