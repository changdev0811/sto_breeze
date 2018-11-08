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
                    body:{
                        style:'background:red!important;',
                    },
                    // Tools
                    tools: {
                        add: {
                            iconCls: 'x-fas fa-plus',
                            // data: {
                            //     sheet: 'addShiftSegmentActionSheet',
                            //     // checkHandler: 'canAddShift'
                            // },
                            bind: {
                                // Dynamically disable based on readonly and shift count
                                disabled: '{!canAddShift}',
                                hidden: '{readOnly}'
                            },
                            // handler: 'onGridAddButton'
                            handler: 'onAddShiftSegmentDirect'
                        }
                    },
                    items: [
                        // TODO: Figure out how to make combo boxes work as input fields
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
                                    editor: {
                                        xtype: 'selectfield',
                                        bind: {
                                            store: '{shiftChoices}'
                                        },
                                        displayField: 'time',
                                        valueField: 'value',
                                        listeners: {
                                            // change: 'onShiftTimeChange',
                                            select: 'onShiftTimeSelect'
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
                                        xtype: 'selectfield',
                                        bind: {
                                            store: '{shiftChoices}'
                                        },
                                        displayField: 'time',
                                        valueField: 'value',
                                        listeners: {
                                            select: 'onShiftTimeSelect'
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
                            bind: { value: '{info.StartUpSettings}', store: '{scheduleList}' },
                            reference: 'accrualPolicy',
                            displayField: 'Name',
                            valueField: 'ID',
                            required: true
                        },
                        {
                            name: 'default_project',
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
        // This should be in schedule.js, but it refuses to work there
        // {
        //     xtype: 'actionsheet',
        //     reference: 'addShiftSegmentActionSheet',
        //     title: 'Add Shift Segment',
        //     closable: false,
        //     closeAction: 'hide',
        //     des
        //     listeners: {
        //         beforeshow: function () {
        //             console.info('before shoing');
        //         }
        //     },
        //     // layout: {
        //     //     type: 'hbox',
        //     //     // align: 'stretch'
        //     // },
        //     items: [
        //         {
        //             xtype: 'selectfield',
        //             itemId: 'startTime',
        //             label: 'Start',
        //             // displayField: 'time',
        //             displayField: 'time',
        //             valueField: 'value',
        //             value: '0',
        //             bind: {
        //                 store: '{shiftChoices}'
        //             },
        //             ignoreReadOnly: true,
        //             readOnly: false,
        //             required: true,
        //             // flex: 1
        //         },
        //         {
        //             xtype: 'selectfield',
        //             itemId: 'stopTime',
        //             label: 'Stop Time',
        //             displayField: 'time',
        //             valueField: 'value',
        //             readOnly: false,
        //             ignoreReadOnly: true,
        //             bind: {
        //                 store: '{shiftChoicesFormula}'
        //             },
        //             required: true,
        //             // flex: 1
        //         },
        //         {
        //             xtype: 'container',
        //             itemId: 'buttons',
        //             layout: {
        //                 type: 'hbox',
        //                 pack: 'end'
        //             },
        //             style: 'padding-top: 6pt',
        //             items: [
        //                 {
        //                     itemId: 'add',
        //                     xtype: 'button',
        //                     ui: 'confirm alt',
        //                     text: 'Add',
        //                     handler: 'onAddShiftSegment'
        //                 },
        //                 { xtype: 'spacer', width: 8 },
        //                 {
        //                     itemId: 'cancel',
        //                     xtype: 'button',
        //                     ui: 'decline alt',
        //                     text: 'Cancel',
        //                     handler: function(comp){
        //                         comp.getParent().getParent().hide();
        //                     }
        //                 }
        //             ]
        //         }
        //     ],
        //     // buttonToolbar: {
        //     //     ui: 'actionsheet-toolbar',
        //     //     defaults: {
        //     //         minWidth: '90pt'
        //     //     }
        //     // },
        //     // buttons: {
        //     //     add: {
        //     //         ui: 'confirm alt',
        //     //         text: 'Add',
        //     //         handler: 'onAddShiftSegment'
        //     //     },
        //     //     cancel: {
        //     //         ui: 'decline alt',
        //     //         text: 'Cancel',
        //     //         controller: 'employee.information',
        //     //         handler: 'onActionSheetCancel'
        //     //     }
        //     // }
        // },
    ]
});