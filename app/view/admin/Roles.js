/**
 * Roles Admin view
 * @class Roles
 * @namespace Breeze.view.admin.Roles
 * @alias widget.admin.roles
 */
Ext.define('Breeze.view.admin.Roles', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.roles',

    config: {
        crumbTitle: 'Supervisor Roles'
    },

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
        save: { text: 'Save', handler: 'onSave', ui: 'confirm alt', style: 'width:200pt' },
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
                                    handler: 'onRoleAdd'
                                },
                                {
                                    xtype: 'button',
                                    iconCls:'x-fas fa-minus',
                                    ui: 'plain wtr-button',
                                    handler: 'onRoleRemove'
                                },
                            ]
                        },
                        

                        {
                            xtype: 'breeze-select-list',
                            ui: 'admin-shift-grid',
                            flex: 1,
                            reference: 'rolesList',
                            userCls: 'admin-fieldset no-background no-margin no-border',
                            itemId: 'roleList',
                            fieldMode: 'none',
                            itemConfig: {
                                ui: 'admin-list-item-select',
                                templates: {
                                    radioValue: '{record.data}',
                                    itemData: { name: '{record.text}' },
                                    itemTpl: '{name}'
                                },
                            },
                            bind: {
                                store: '{roles}',
                            },
                            listeners: {
                                select: 'onRolesSelect',
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
                                        value: '{roleName}',
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
                            items: [
                                {
                                    xtype: 'breeze-select-list',
                                    ui: 'admin-shift-grid',
                                    flex: 1,
                                    reference: 'rightsList',
                                    userCls: 'admin-fieldset no-background no-margin no-border',
                                    fieldMode: 'check',
                                    itemConfig: {
                                        ui: 'admin-list-item-select',
                                        templates: {
                                            radioValue: '{record.data}',
                                            itemData: { name: '{record.text}' },
                                            itemTpl: '{name}',
                                            checkedBind: '{record.checked}'
                                        },
                                    },
                                    bind: {
                                        store: '{rights}',
                                    },
                                    // listeners: {
                                    //     select: 'onRolesSelect',
                                    // },
                                    viewModel: true
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    ],

    dialog: {
        xtype: 'dialog',
        // width: '400pt', height: '400pt',
        ui: 'light-themed-dialog employeeinfo-dialog',
        title: 'Supervisor Role Conflict',

        items: [
            {
                xtype: 'component',
                html: [
                    'The role you are trying to delete is currently ',
                    'in use. <br> Select a role to replace the role you are deleting:'
                ]
            },
            {
                xtype: 'selectfield',
                bind: {
                    options: '{replacementRoles}',
                    value: '{replacementRole}'
                },
                ui: 'employeeinfo-dialog-field',
                value: null,
                autoSelect: true,
                valueField: 'role',
                displayField: 'name',
                itemId: 'replacementSelect'
            }
        ],

        buttons: [
            {
                text: 'Confirm',
                ui: 'action alt',
                handler: 'onReplaceDialogConfirm'
            },
            {
                xtype: 'spacer', width: '8pt'
            },
            {
                text: 'Cancel',
                ui: 'decline alt',
                handler: 'onReplaceDialogCancel'
            }
        ]
    }
});