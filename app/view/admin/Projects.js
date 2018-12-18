/**
 * Projects Admin view
 * @class Projects
 * @namespace Breeze.view.admin.Projects
 * @alias widget.admin.Projects
 */
Ext.define('Breeze.view.admin.Projects', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.projects',

    config: {
        crumbTitle: 'Projects'
    },

    // View Model
    viewModel: {
        type: 'admin.projects'
    },

    // Controller
    controller: 'admin.projects',
    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',
    title: 'Projects',

    // Body contents
    items: [
        // Main horizontal arranging container
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            // +++ Allow h scroll when panel is too small +++
            scrollable: 'x',
            items: [
                // Column 1
                {
                    xtype: 'fieldset',
                    userCls: 'admin-fieldset no-padding',
                    flex: 1,

                    // +++ fixed width +++
                    minWidth: '150pt',
                    maxWidth: '200pt',

                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'toolbar',
                            ui: 'admin-tree',
                            shadow: false,
                            items: [
                                {
                                    xtype: 'component',
                                    html: 'Projects',
                                    userCls: 'admin-title-toolbar',
                                },
                                {
                                    xtype: 'spacer',
                                    flex: 1,
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-plus',
                                    ui: 'plain wtr-button',
                                    handler: 'onProjectAdd'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-minus',
                                    ui: 'plain wtr-button',
                                    handler: 'onProjectRemove',
                                    reference: 'removeProjectButton',
                                    bind: {
                                        disabled: '{allProjects}'
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'tree',
                            // == Item ID to make finding tree in panel easier
                            reference: 'projectsTree',
                            ui: 'projects-grid',
                            userCls: 'projects-grid no-border ',
                            flex: 1,
                            layout: 'hbox',
                            hideHeaders: true,
                            rootVisible: false,

                            bind: '{projects}',
                            listeners: {
                                select: 'onProjectSelect',
                                deselect: 'onProjectDeselect'
                            }
                        },
                    ]
                },
                // Column 2
                {
                    xtype: 'panel',
                    ui: 'admin-sub',
                    userCls: 'admin-fieldset',
                    flex: 2,

                    // +++ fixed width +++
                    minWidth: '500pt',
                    maxWidth: '500pt',

                    layout: 'vbox',
                    buttons: {
                        apply: { 
                            text: 'Save', handler: 'onSave', 
                            ui: 'confirm alt', style: 'width:125pt;',
                            bind: {
                                disabled: '{allProjects}'
                            }
                        },
                    },
                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-margin',
                            layout: 'vbox',
                            bind: {
                                hidden: '{allProjects}'
                            },
                            items: [
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Name',
                                    // name: 'project_name',
                                    ui: 'admin admin-text',
                                    userCls: 'admin-fieldset-no-border',
                                    bind: '{projectData.Name}'
                                },
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Description',
                                    // name: 'description',
                                    ui: 'admin admin-text',
                                    userCls: 'admin-fieldset-no-border',
                                    bind: '{projectData.Description}'
                                },
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Code',
                                    // name: 'project_code', 
                                    ui: 'admin admin-text',
                                    userCls: 'admin-fieldset-no-border',
                                    bind: '{projectData.Code}'
                                },
                                {
                                    xtype: 'checkbox',
                                    ui: 'admin',
                                    // name: 'isWorktime',
                                    id: 'radio1',
                                    value: '20',
                                    boxLabel: 'Counts as Time Worked',
                                    bodyAlign: 'stretch',
                                    bind: {
                                        checked: '{projectData.IsWorktime}'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    ui: 'admin',
                                    name: 'isOT',
                                    id: 'radio2',
                                    value: '20',
                                    boxLabel: 'Counts as Overtime',
                                    bodyAlign: 'stretch',
                                    bind: {
                                        checked: '{projectData.IsOT}'
                                    }
                                },
                            ]
                        }
                    ]
                },
            ]
        }
    ]
});