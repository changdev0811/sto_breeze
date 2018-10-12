/**
 * Departments Report form
 * @class Departments
 * @namespace Breeze.view.admin.Departments
 * @alias widget.admin.departments
 */
Ext.define('Breeze.view.admin.Departments', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.departments',

    // View Model

    viewModel: {
        type: 'reporting.department.absence'
    },

    // Layout and base styles
    layout: 'hbox',
    ui: 'wtr-panel',

    title: 'Departments',

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [
        {    
            xtype: 'container',
            flex: 1,
            layout: 'vbox',
            items:[
                {
                    xtype: 'breeze-textfield',
                    label: 'Search:',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset-no-border',

                },

                {
                    xtype: 'tree',
                    ui: 'employee-worktime-records-grid',
                    userCls: 'admin-fieldset employee-worktime-records-grid',
                    layout: 'hbox',
                    hideHeaders: true,
                    rootVisible: false,
                    flex:1,
                    columns: [
                        //{
                        //    xtype: 'treecolumn',
                        //    /* +++ New cel:{} +++ */
                        //    cell:{
                        //        ui:'admin-tree-column',
                        //    },
                        //
                        //    dataIndex: 'text',
                        //    flex: 1,
                        //    layout: {
                        //        alignment: 'stretch'
                        //    }
                        //}
                    ],
                    //reference: 'departmentTree',
                    //bind: '{departmentsTree}'
                }



            ]
        },
        {    
            xtype: 'container',
            flex: 1,
            layout: 'vbox',
            items:[
                {
                    xtype: 'breeze-textfield',
                    label: 'Department Name:',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset-no-border',
                    name: 'DeptName',
                },

                {
                    xtype: 'spinnerfield',
                    ui: 'reporting reporting-text',
                    userCls:'admin-fieldset-no-border',
                    name: 'numConflictLimit',
                    allowDecimals: false,
                    minValue: 0,
                    labelAlign:'left',
                    labelWidth:'auto',
                    label:'Leave Request Conflect Limit',
                },

                {    
                    xtype: 'panel',
                    title: 'Supervisors',
                    ui: 'admin-sub' ,
                    flex: 1,
                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'container',
                            userCls:'admin-fieldset',
                            flex: 1,
                            layout: 'vbox',
                        }
                    ]
                },
                {    
                    xtype: 'panel',
                    title: 'Employees',
                    ui: 'admin-sub' ,
                    flex: 1,
                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'container',
                            userCls:'admin-fieldset',
                            flex: 1,
                            layout: 'vbox',
                        }
                    ]
                },
            ]
        },


    ]

});