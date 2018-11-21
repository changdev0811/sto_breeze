/**
 * Projects Admin view
 * @class Projects
 * @namespace Breeze.view.admin.Projects
 * @alias widget.admin.Projects
 */
Ext.define('Breeze.view.admin.Projects', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.projects',

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
            scrollable:'x',
            items: [
                // Column 1
                {
                    xtype: 'fieldset',
                    userCls:'admin-fieldset no-padding',
                    flex: 1,

                    // +++ fixed width +++
                    minWidth:'150pt',
                    maxWidth:'200pt',

                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'toolbar',
                            ui:'admin-tree',
                            shadow: false,
                            items:[
                                { 
                                    xtype: 'component', 
                                    html: 'Projects',
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
                            xtype: 'tree',
                            // == Item ID to make finding tree in panel easier
                            itemId: 'tree',
                            ui: 'employeeinfo-shift-grid',
                            userCls: 'employeeinfo-shift-grid no-border no-background',
                            flex:1,
                            layout: 'hbox',
                            hideHeaders: true,
                            rootVisible: false,
                            columns: [
                                {
                                    xtype: 'checkcolumn',
                                    cell: {
                                        ui: 'admin-tree-column admin-tree-item',
                                    },
                                    dataIndex: 'checked',
                                    minWidth: '2em',
                                    width: 'auto',
                                    padding: 0,
                                    //listeners: {
                                    //    checkChange: 'onTreeGridChecked'
                                    //}
                                },
                                {
                                    xtype: 'treecolumn',
                                    cell: {
                                        ui: 'admin-tree-column admin-tree-item',
                                    },
                                    dataIndex: 'text',
                                    flex: 1,
                                    layout: {
                                        alignment: 'stretch'
                                    }
                                }
                            ],
                            bind: '{departmentsTree}'
                        }, 
                    ]
                },
                // Column 2
                {
                    xtype: 'panel',
                    ui: 'admin-sub',
                    userCls:'admin-fieldset',
                    flex: 2,

                    // +++ fixed width +++
                    minWidth:'500pt',
                    maxWidth:'500pt',

                    layout: 'vbox',
                    buttons: {
                        apply: { text: 'Apply', /*handler: 'onPrintPDF',*/ ui: 'action', style:'width:125pt;' },
                    },
                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false
                    },
                    items:[
                        {
                            xtype:'fieldset',
                            userCls:'admin-fieldset no-margin',
                            layout: 'vbox',
                            items:[
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Name',
                                    name: 'project_name',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset-no-border',
                                },
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Description',
                                    name: 'description',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset-no-border',
                                },
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Code',
                                    name: 'project_code',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset-no-border',
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isWorktime',
                                    id: 'radio1',
                                    value: '20',
                                    boxLabel: 'Counts as Time Worked',
                                    bodyAlign: 'stretch',
                                },
                                {
                                    xtype:'checkbox',
                                    ui:'admin',
                                    name: 'isOT',
                                    id: 'radio2',
                                    value: '20',
                                    boxLabel: 'Counts as Overtime',
                                    bodyAlign: 'stretch',
                                },
                            ]
                        }
                    ]
                },
            ]
        }
    ]
});