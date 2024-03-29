/**
 * Employee Information View
 * @class Information
 * @alias Breeze.view.employee.Information
 */
Ext.define('Breeze.view.employee.Information', {
    extend: 'Ext.Panel',
    alias: 'widget.employee.information',

    config: {
        crumbTitle: 'Employee Info',
    },

    requires: [
        'Ext.tab.Panel',
        'Breeze.view.employee.InformationController',
        'Breeze.view.employee.InformationModel',
        // 'Breeze.widget.actionsheet.MultipleMode',
        'Breeze.view.employee.information.dialog.ChangeAccrualPolicy',
        'Breeze.view.employee.information.dialog.AddShiftSegment',
        'Breeze.view.employee.information.dialog.AddSupervisedEmployee',
        'Breeze.view.employee.information.dialog.AddSupervisor',
        'Breeze.view.employee.information.dialog.AddDepartment',
        'Breeze.plugin.field.AsyncValidation'
    ],
    
    //==[Start of Panel Setup/Styling]====
    tools: [
        {
            iconCls: 'x-fa fa-sync',
            handler: 'onRefreshTool'  
        },
        {
            iconCls: 'x-fa fa-print',
            handler: 'onPrintTool'
        }
    ],

    title: 'Employee Information',
    ui: 'employee-info-panel',
    //====[End of Panel Setup/Styling]==

    layout: 'hbox',

    viewModel: {
        type: 'employee.information'
    },

    controller: 'employee.information',
    listeners: {
        initialize: 'onInit'
    },

    //==[Form Action Buttons]==
    /* Toolbar configuration */
    buttonToolbar: {
        ui: 'employee-info-panel-toolbar',
        bind: {
            // Hide toolbar when readOnly mode
            hidden: '{readOnly}'
        },
        defaults: {
            minWidth: '90pt'
        }
    },
    /* Buttons */
    buttons: [
        // Validation Message
        {
            xtype: 'component', itemId: 'validationMessage',
            tpl: '{message}',
            weight: 1, userCls: 'employee-info-toolbar-message',
            bind: {
                data: {
                    message: '{form.validationMessage}'
                }
            }
        },
        { xtype: 'spacer', weight: 2 },
        // Save Changes button
        {
            itemId: 'saveButton', text: 'Save',
            ui: 'confirm raised alt', weight: 3,
            bind: {},
            handler: 'onSaveButtonTap'
        },
        // Discard changes button
        // {
        //     itemId: 'revertButton', text: 'Revert',
        //     // ui: 'decline alt',
        //     ui: 'decline raised alt', weight: 5,
        //     bind: {
        //         disabled: '{!form.canRevert}'
        //     },
        //     handler: 'onRevertButtonTap'
        // }
    ],

    items: [
        {
            xtype: 'employee.information.sidebar',
            userCls: 'employee-info-sidebar'
        },        
        {
            flex: 3,
            xtype: 'tabpanel',
            layout: {
                animation: 'fade'
            },
            // TODO: Create Themer UI Override and reference here
            ui: 'employeeInfoTabs',
            tabBar: {
                defaultTabUI: 'employeeInfoTabs',
                shadow: false
            },
            // flex: 1,
            defaults: {
                userCls: 'employee-info-tab-container'
            },
            items: [
                // containers with title and items containing body
                
                {
                    xtype: 'container',
                    reference: 'employeeTab',
                    title: 'Employee',
                    items: [
                        {
                            xtype: 'employee.information.general',
                            userCls: 'employee-info-tab-form'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    reference: 'companyTab',
                    title: 'Company',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'employee.information.company',
                            userCls: 'employee-info-tab-form'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    reference: 'scheduleTab',
                    title: 'Schedule',
                    items: [
                        {
                            xtype: 'employee.information.schedule',
                            userCls: 'employee-info-tab-form'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    reference: 'securityTab',
                    title: 'Security',
                    items: [
                        {
                            xtype: 'employee.information.security',
                            userCls: 'employee-info-tab-form'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    reference: 'punchTab',
                    title: 'Punch Policy',
                    layout: 'vbox',
                    // xtype: 'employee.information.punchpolicy',
                    items: [
                        {
                            xtype: 'selectfield',
                            name: 'punch_policy',
                            reference: 'punchPolicy',
                            displayField: 'Name',
                            label: 'Punch Policy',
                            valueField: 'ID',
                            userCls: 'employee-info-general-field',
                            ui: 'employeeinfo-textfield',
                            required: true,
                            bind: {
                                value: '{info.punchPolicy.policy_id}',
                                // manual binding since readonly plugin isn't applied here
                                editable: '{!readOnly}',
                                readOnly: '{readOnly}',
                                disabled: '{readOnly}',
                                store: '{punchPolicies}'
                            }
                        },
                        {
                            xtype: 'employee.information.punchpolicy',
                            flex: 1
                        }
                    ]
                }
            ]
        }
    ],

    // === [Dialogs] ===

    policyChangeDialog: {
        xtype: 'employee.information.dialog.changeaccrualpolicy'
    }, 
    /* Add Shift Segment Dialog */
    addShiftSegmentDialog: {
        xtype: 'employee.information.dialog.addshiftsegment'
    },
    addSupervisedEmployeeDialog: {
        xtype: 'employee.information.dialog.addsupervisedemployee'
    },
    addDepartmentDialog: {
        xtype: 'employee.information.dialog.adddepartment'
    },
    addSupervisorDialog: {
        xtype: 'employee.information.dialog.addsupervisor'
    }

});