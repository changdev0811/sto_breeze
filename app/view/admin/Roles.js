/**
 * Roles Admin view
 * @class Roles
 * @namespace Breeze.view.admin.Roles
 * @alias widget.admin.roles
 */
Ext.define('Breeze.view.admin.Roles', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.roles',

    // View Model
    viewModel: {
        type: 'admin.roles'
    },

    // Controller
    controller: 'admin.roles',
    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',
    title: 'Supervisor Roles',

    // Action buttons shown at bottom of panel
    buttonAlign: 'right',
    buttons: {
        save: { text: 'Save', handler: 'onSavePolicy', ui: 'confirm alt', style: 'width:200pt' },
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
            // +++ Allow h scroll when panel is too small +++
            scrollable:'x',
            items: [

                // Column 1
                {
                    xtype: 'fieldset',
                    userCls:'admin-fieldset no-padding',
                    flex: 1,

                    // +++ fixed width +++
                    minWidth:'200pt',
                    maxWidth:'200pt',

                    layout: {
                        type: 'vbox',
                        alignment: 'stretch'
                    },
                    items:[
                        {
                            xtype: 'toolbar',
                            ui:'admin-tree',
                            shadow: false,
                            items:[
                                { 
                                    xtype: 'component', 
                                    html: 'Roles',
                                    userCls:'admin-title-toolbar', 
                                },
                                {
                                    xtype:'spacer',
                                    flex:1,
                                },
                                {
                                    xtype: 'button',
                                    iconCls:'x-fas fa-plus',
                                    ui: 'plain wtr-button',                   
                                },
                                {
                                    xtype: 'button',
                                    iconCls:'x-fas fa-minus',
                                    ui: 'plain wtr-button',                   
                                },
                            ]
                        },
                        

                        {
                            xtype: 'breeze-categories-list',
                            ui: 'admin-shift-grid',
                            flex: 1,
                            reference: 'departments',
                            userCls: 'admin-fieldset no-background no-margin no-border',
                            itemId: 'selectList',
                            fieldMode: 'none',
                            itemConfig: {
                                ui: 'admin-list-item-select',
                                templates: {
                                    radioValue: '{record.id}',
                                    /* record has a record.text value. */
                                    /* If record.text has a value it auto populates title before icon */
                                    /* I manually added record.name and removed record.text */
                                    //itemData: { name: '{record.text}' },
                                    itemData: { name: '{record.name}' },
                                    itemTpl: [
                                        '<div class="breeze-dataview-select-item-label">',
                                        '<div class="admin-roles-icon"></div>',
                                        '{name}</div>'
                                    ]
                                },
                            },
                            bind: {
                                store: '{roles}',
                            },
                            listeners: {
                                select: 'onRolesSelect'
                            },
                            viewModel: true
                        },                        
                    ]
                },
                // Column 2
                {
                    xtype: 'panel',
                    ui: 'admin-sub',
                    userCls:'admin-fieldset no-border no-margin',
                    flex: 2,

                    // +++ fixed width +++
                    minWidth:'200pt',
                    maxWidth:'400pt',

                    layout: 'vbox',

                    items:[
                       
                        {
                            xtype:'fieldset',
                            ui: 'admin admin-text',
                            userCls:'admin-fieldset ',
                            layout:'vbox',
                            items:[
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Role Name',
                                    name: 'project_name',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset no-border no-side-margin',
                                    bind: {
                                        value: '{selectedRole.Role_Name}',
                                    },
                                },
                            ]
                        },

                        {
                            xtype:'fieldset',
                            userCls:'admin-fieldset',
                            title:'Supervisor Rights',
                            layout: 'vbox',
                            scrollable:'y',
                            flex:1,
                            defaults:{
                                userCls:'admin-fieldset no-border no-padding',
                            },
                            items:[
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isWorktime',
                                    value: '20',
                                    boxLabel: 'Check All',
                                    bodyAlign: 'stretch',
                                },

                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Add Employee',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Add_Employee}'

                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    value: '20',
                                    boxLabel: 'Delete Employee',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Delete_Employee}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Edit Employee',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Edit_Employee}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'View SSN',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.View_SSN}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'View Compensation',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.View_Compensation}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Employee Category Adjust',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Employee_Category_Adjust}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Adjustments',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Adjustments}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Leave Approvial',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Leave_Approval}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Modify Recorded Time',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Modify_Recorded_Time}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Manage Points',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Manage_Points}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Add Notes',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Add_Notes}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Employee Reports',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Employee_Reports}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Department Reports',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Department_Reports}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Project Maintenance',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Project_Maintenance}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Deduction Maintenance',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Deduction_Maintenance}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Export Payroll',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Export_Payroll}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Payroll Template Maintenance',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Payroll_Template_Maintenance}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Worktime Maintenance',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Worktime_Maintenance}'
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    value: '20',
                                    boxLabel: 'Worktime Approvial',
                                    bodyAlign: 'stretch',
                                    bind: '{selectedRole.Worktime_Approvial}'
                                },
                            ]
                        }
                    ]
                },
            ]
        }
    ]
});