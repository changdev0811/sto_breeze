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
                    xtype: 'fieldset',
                    userCls: 'employee-info-fieldset',
                    title: 'Shift Information',
                    items: [
                        {
                            xtype: 'grid',
                            height: '200px',
                            ui: 'employeeinfo-shift-grid',
                            reference: 'shiftSegmentGrid',
                            userCls: 'employee-info-grid',
                            striped: true,
                            sortable: false,
                            columnResize: false,
                            columnMenu: null,
                            layout: 'hbox',
                            // Plugin allowing editability
                            plugins: [
                                {
                                    pluginId: 'shiftEdit',
                                    type: 'gridcellediting'
                                }
                            ],
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    ui: 'employeeinfo-shift-grid',
                                    align: 'center',
                                    text: 'Start',
                                    dataIndex: 'StartTime',
                                    menuDisabled: true,
                                    flex: 1,
                                    /*
                                    bind: { editable: '{!readOnly}' }
                                    */
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
                                    ui: 'employeeinfo-shift-grid',
                                    align: 'center',
                                    text: 'Stop',
                                    dataIndex: 'StopTime',
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
                            value: 138
                        },{
                            boxLabel: 'Non-Exempt',
                            name: 'exempt_status',
                            value: 139
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
                            value: 20
                        },{
                            boxLabel: 'Hours',
                            name: 'recording_mode',
                            value: 21
                        }
                    ]
                }
            ]
        }
    ]
});