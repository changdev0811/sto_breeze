/**
 * Departments Admin view
 * @class Departments
 * @namespace Breeze.view.admin.Departments
 * @alias widget.admin.departments
 */
Ext.define('Breeze.view.admin.Departments', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.departments',

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


    // Action buttons shown at bottom of panel
    buttonAlign: 'right',
    buttons: {
        apply: { name: 'apply_button_container', text: 'Apply', /* handler: 'onPrintExcel',*/ ui: 'action', style:'width:125pt' },
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
                    //title:'Departments',
                    userCls:'admin-fieldset no-padding',
                    layout: {
                        type: 'vbox',
                        alignment: 'stretch'
                    },
                    flex: 1,
                    // +++ fixed width +++
                    minWidth:'200pt',
                    maxWidth:'250pt',


                    items:[
                        
                        {
                            xtype: 'toolbar',
                            ui: 'admin-tree',
                            //userCls:'no-background',
                            shadow: false,
                            items: [
                                {
                                   xtype: "searchfield",
                                   flex:1,
                                   ui: "alt",
                                   //userCls:'admin-fieldset no-border no-margin no-padding',
                                   placeholder: "Search"
                                },
                                {
                                    xtype:'spacer',
                                    width:'10pt',

                                },
            
                                {
                                    xtype: 'button',
                                    //text: 'Save for Future Use',
                                    iconCls:'x-fas fa-plus',
                                    ui: 'plain wtr-button',                   
                                },

                                {
                                    xtype: 'button',
                                    //text: 'Save for Future Use',
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
                            userCls: 'employeeinfo-shift-grid no-border',
                            flex:1,
                            layout: 'hbox',
                            hideHeaders: true,
                            rootVisible: false,
                            columns: [
                                {
                                    xtype: 'checkcolumn',
                                    cell: {
                                        ui: 'report-tree-column reporting-tree-item',
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
                                        ui: 'report-tree-column reporting-tree-item',
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
                    xtype: 'container',
                    ui: 'admin-sub',
                    flex: 1,
                    // +++ fixed width +++
                    minWidth:'200pt',
                    maxWidth:'250pt',
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
                                    label: 'Department Name:',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset no-border no-margin',
                                    name: 'DeptName',
                                },
                                {
                                    xtype: 'spinnerfield',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset no-border no-margin',
                                    name: 'numConflictLimit',
                                    allowDecimals: false,
                                    minValue: 0,
                                    labelAlign:'left',
                                    labelWidth:'auto',
                                    label:'Leave Request Conflect Limit',
                                },
                            ]
                        },
                        {    
                            xtype: 'fieldset',
                            title: 'Supervisors',
                            userCls:'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'fit',
                            items:[

                                // Employees selector tree
                                {
                                    xtype: 'tree',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'tree',

                                    ui: 'employeeinfo-shift-grid',
                                    userCls: 'employeeinfo-shift-grid no-border',
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    expanderFirst: false,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'checkcolumn',
                                            cell: {
                                                ui: 'report-tree-column reporting-tree-item',
                                            },
                                            dataIndex: 'checked',
                                            minWidth: '2em',
                                            width: 'auto',
                                            padding: 0
                                        },
                                        {
                                            xtype: 'treecolumn',
                                            cell: {
                                                ui: 'report-tree-column reporting-tree-item',
                                            },
                                            dataIndex: 'text',
                                            flex: 1,
                                            layout: {
                                                alignment: 'stretch'
                                            }
                                        }
                                    ],
                                    reference: 'employeeTree',
                                    bind: '{employeesTree}'
                                }

                            ]
                        },





                        {    
                            xtype: 'fieldset',
                            title:'Employees',
                            userCls:'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'fit',
                            items:[

                                // Employees selector tree
                                {
                                    xtype: 'tree',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'tree',

                                    ui: 'employeeinfo-shift-grid',
                                    userCls: 'employeeinfo-shift-grid no-border',
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    expanderFirst: false,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'checkcolumn',
                                            cell: {
                                                ui: 'report-tree-column reporting-tree-item',
                                            },
                                            dataIndex: 'checked',
                                            minWidth: '2em',
                                            width: 'auto',
                                            padding: 0
                                        },
                                        {
                                            xtype: 'treecolumn',
                                            cell: {
                                                ui: 'report-tree-column reporting-tree-item',
                                            },
                                            dataIndex: 'text',
                                            flex: 1,
                                            layout: {
                                                alignment: 'stretch'
                                            }
                                        }
                                    ],
                                    reference: 'employeeTree',
                                    bind: '{employeesTree}'
                                }

                            ]
                        },






                    ]
                },

            ]
        }


    ]

});