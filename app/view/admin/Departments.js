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
        apply: { text: 'Save', /* handler: 'onPrintExcel',*/ ui: 'confirm alt', style: 'width:125pt' },
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
            scrollable: 'x',
            items: [

                // Column 1
                {
                    xtype: 'fieldset',
                    //title:'Departments',
                    userCls: 'admin-fieldset no-padding',
                    layout: {
                        type: 'vbox',
                        alignment: 'stretch'
                    },
                    flex: 1,
                    // +++ fixed width +++
                    minWidth: '200pt',
                    maxWidth: '250pt',

                    items: [
                        {
                            xtype: 'toolbar',
                            ui: 'admin-tree',
                            //userCls:'no-background',
                            shadow: false,
                            items: [
                                {
                                    xtype: "searchfield",
                                    flex: 1,
                                    ui: "solo",
                                    //userCls:'admin-fieldset no-border no-margin no-padding',
                                    placeholder: "Search"
                                },
                                {
                                    xtype: 'spacer',
                                    width: '10pt',
                                },
                                {
                                    xtype: 'button',
                                    //text: 'Save for Future Use',
                                    iconCls: 'x-fas fa-plus',
                                    ui: 'plain wtr-button',
                                },
                                {
                                    xtype: 'button',
                                    //text: 'Save for Future Use',
                                    iconCls: 'x-fas fa-minus',
                                    ui: 'plain wtr-button'
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
                                    radioValue: '{record.Id}',
                                    itemData: { name: '{record.Name}' },
                                    itemTpl: [
                                        '<div class="breeze-dataview-select-item-label">',
                                        '<div class="admin-department-icon"></div>',
                                        '{name}</div>'
                                    ]
                                }
                            },
                            bind: {
                                store: '{departmentList}',
                            },
                            listeners: {
                                select: 'onDepartmentSelect'
                            },
                            viewModel: true
                        }

                    ]
                },

                // Column 2
                {
                    xtype: 'container',
                    ui: 'admin-sub',
                    flex: 1,
                    // +++ fixed width +++
                    minWidth: '200pt',
                    maxWidth: '250pt',
                    layout: 'vbox',
                    items: [
                        //===[Fields]===
                        {
                            xtype: 'fieldset',
                            ui: 'admin admin-text',
                            userCls: 'admin-fieldset ',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Department Name',
                                    ui: 'admin admin-text',
                                    userCls: 'admin-fieldset no-border no-margin',
                                    name: 'DeptName',
                                    bind: {
                                        value: '{selectedDepartment.Name}'
                                    }
                                },
                                {
                                    xtype: 'spinnerfield',
                                    ui: 'admin admin-text',
                                    userCls: 'admin-fieldset no-border no-margin',
                                    name: 'numConflictLimit',
                                    decimals: 0,
                                    minValue: 0,
                                    labelAlign: 'left',
                                    labelWidth: 'auto',
                                    label: 'Leave Request Conflect Limit',
                                    bind: {
                                        value: '{conflictLimit}'
                                    }
                                },
                            ]
                        },
                        //===[Supervisors]===
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    //userCls:'no-background',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: "component",
                                            flex: 1, userCls: 'admin-title-toolbar',
                                            html: 'Supervisors'
                                        },
                                        {
                                            xtype: 'spacer',
                                            width: '10pt',
                                        },
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls: 'x-fas fa-plus',
                                            ui: 'plain wtr-button',
                                        },
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls: 'x-fas fa-minus',
                                            ui: 'plain wtr-button'
                                        },
        
                                    ]
                                },
                                // TODO: add supervisors grid

                            ]
                        },
                        //===[Employees]
                        {
                            xtype: 'fieldset',
                            title: 'Employees',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'fit',
                            items: [

                                //TODO: Add Employees Grid

                            ]
                        },
                    ]
                },

            ]
        }
    ]
});