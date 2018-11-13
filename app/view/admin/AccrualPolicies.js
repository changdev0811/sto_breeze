/**
 * AccrualPolicies Admin view
 * @class AccrualPolicies
 * @namespace Breeze.view.admin.AccrualPolicies
 * @alias widget.admin.AccrualPolicies
 */
Ext.define('Breeze.view.admin.AccrualPolicies', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.accrualpolicies',

    // View Model
    viewModel: {
        type: 'admin.accrualpolicies'
    },

    // Controller
    controller: 'admin.accrualpolicies',
    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',

    title: 'Accrual Policies',

    // Action buttons shown at bottom of panel
    buttonAlign: 'center',
    buttons: {
        save: { name: 'save_button', text: 'Save Accrual Policy', /* handler: 'onPrintPDF',*/ ui: 'action', style: 'width:200pt' },
        apply: { name: 'apply_button_container', text: 'Save and Apply to Employees', /* handler: 'onPrintExcel',*/ ui: 'action', style: 'width:200pt' },
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
                    xtype: 'container',
                    flex: 1,

                    // +++ fixed width +++
                    minWidth: '150pt',
                    maxWidth: '200pt',

                    layout: 'vbox',
                    items: [
                        // Accrual Policies List
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'component',
                                            html: 'Policies',
                                            userCls: 'admin-title-toolbar',
                                        },
                                        {
                                            xtype: 'spacer',
                                            flex: 1
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
                                            ui: 'plain wtr-button',
                                        },
                                    ]
                                },
                                {
                                    xtype: 'breeze-categories-list',
                                    ui: 'admin-shift-grid',
                                    userCls: 'admin-fieldset no-background no-margin no-border',
                                    reference: 'policyList',
                                    fieldMode: 'none',
                                    itemConfig: {
                                        ui: 'admin-list-item-select',
                                        templates: {
                                            radioValue: '{record.ID}',
                                            itemData: { name: '{record.Name} '},
                                            itemTpl: '{name}'
                                        }
                                    },
                                    bind: {
                                        store: '{scheduleList}',
                                    },
                                    viewModel: true,
                                    listeners: {
                                        select: 'onPolicySelect'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'breeze-textfield',
                            label: 'Setting Name',
                            name: 'setting_name_label',
                            ui: 'admin admin-text',
                            userCls: 'admin-fieldset no-border',

                        },
                        {
                            xtype: 'fieldset',
                            name: 'recording_mode',
                            userCls: 'admin-fieldset',
                            title: 'Recording Mode',
                            height: '45pt',
                            layout: 'vbox',
                            flex: 1,
                            minHeight: '55pt',
                            maxHeight: '55pt',


                            items: [
                                {
                                    xtype: 'containerfield',
                                    reference: 'recordingMode',
                                    layout: 'hbox',
                                    defaults: {
                                        bodyAlign: 'stretch',
                                        ui: 'admin',
                                        xtype: 'radio'
                                    },
                                    bind: {
                                        values: {
                                            recMode: '{policyData.recordingMode}'
                                        }
                                    },
                                    items: [
                                        {
                                            flex: 1,
                                            name: 'recMode',
                                            boxLabel: 'Days',
                                            value: 20,
                                            bind: {
                                                groupValue: '{recordingMode.recMode}'
                                            }
                                        },
                                        {
                                            flex: 1,
                                            name: 'recMode',
                                            boxLabel: 'Hours',
                                            value: 21,
                                            bind: {
                                                groupValue: '{recordingMode.recMode}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'component',
                                            html: 'Shift Information',
                                            userCls: 'admin-title-toolbar',
                                        },
                                        {
                                            xtype: 'spacer',
                                            flex: 1,
                                        },
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls: 'x-fas fa-plus',
                                            ui: 'plain wtr-button',
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    height: '100%',
                                    sortable: false, columnResize: false,
                                    columnMenu: false, hideHeaders: true,
                                    bind: {
                                        store: '{policySegments}'
                                    },
                                    defaults: {
                                        xtype: 'gridcolumn',
                                        menuDisabled: true
                                    },
                                    columns: [
                                        {
                                            tpl: '{StartTime}',
                                            dataIndex: 'StartSegment'
                                        },
                                        {
                                            xtype: 'templatecolumn',
                                            tpl: ['-'],
                                            width: '2em'
                                        },
                                        {
                                            tpl: '{StopTime}',
                                            dataIndex: 'StopSegment'
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                // Column 2
                {
                    xtype: 'fieldset',
                    title: 'List of Categories',
                    userCls: 'admin-fieldset no-padding',

                    flex: 1,
                    // +++ fixed width +++
                    minWidth: '150pt',
                    maxWidth: '200pt',


                    layout: {
                        type: 'fit',
                        alignment: 'stretch'
                    },
                    items: [
                        // User defined category selector
                        // === Replacement category selector
                        {
                            xtype: 'breeze-categories-list',
                            ui: 'admin-shift-grid',
                            userCls: 'admin-fieldset no-background no-margin no-border',
                            reference: 'categoryList',
                            fieldMode: 'none',
                            itemConfig: {
                                ui: 'admin-list-item-select'
                            },
                            bind: {
                                store: '{categoriesList}',
                            },
                            listeners: {
                                select: 'onCategorySelect'
                            },
                            viewModel: true
                        }
                    ]
                },
                // Column 3
                {
                    xtype: 'panel',
                    bind: {
                        title: '{selectedCategory.categoryName} Information',
                    },
                    ui: 'admin-sub',
                    flex: 2,
                    // +++ fixed width +++
                    minWidth: '400pt',
                    maxWidth: '400pt',

                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            userCls: 'admin-fieldset no-border',
                            layout: 'hbox',
                            flex: 1,
                            maxHeight: '55pt',
                            minHeight: '55pt',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    name: 'category_recording_year_type',
                                    userCls: 'admin-fieldset no-margin',
                                    title: 'Recording Year Type',
                                    layout: 'hbox',
                                    flex: 3,

                                    items: [
                                        {
                                            xtype: 'containerfield',
                                            reference: 'recordingYear',
                                            defaults: {
                                                bodyAlign: 'stretch',
                                                ui: 'admin',
                                                xtype: 'radio'
                                            },
                                            bind: {
                                                values: {
                                                    yearType: '{categoryYearType}'
                                                }
                                            },
                                            items: [
                                                {
                                                    flex: 1.25,
                                                    name: 'yearType',
                                                    boxLabel: 'Anniversary',
                                                    value: 45,
                                                    bind: {
                                                        groupValue: '{recordingYear.yearType}'
                                                    }
                                                },
                                                {
                                                    flex: 1,
                                                    name: 'yearType',
                                                    boxLabel: 'Calendar',
                                                    value: 46,
                                                    bind: {
                                                        groupValue: '{recordingYear.yearType}'
                                                    }
                                                },
                                                {
                                                    flex: 1,
                                                    name: 'yearType',
                                                    boxLabel: 'Fiscal',
                                                    value: 45,
                                                    bind: {
                                                        groupValue: '{recordingYear.yearType}'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    name: 'category_waiting_period_data',
                                    ui: 'admin-base',
                                    userCls: 'admin-fieldset',
                                    title: 'Start Accruing After',
                                    layout: 'hbox',
                                    flex: 2,
                                    minHeight: '55pt',
                                    maxHeight: '55pt',
                                    defaults: {
                                        ui: 'admin admin-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'spinnerfield',
                                            flex: 1,
                                            style: 'padding-left: 4pt',
                                            name: 'category_new_time',
                                            decimals: 0,
                                            minValue: 0,
                                            bind: {
                                                value: '{selectedCategory.newTime}'
                                            }
                                        },
                                        {
                                            xtype: 'spacer',
                                            width: '10pt'
                                        },
                                        {
                                            xtype: 'selectfield',
                                            flex: 2,
                                            name: 'category_new_rate',
                                            displayField: 'Description',
                                            valueField: 'ID',
                                            store: 'NewRates',
                                            bind: {
                                                value: '{selectedCategory.newRate}'
                                            }
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            userCls: 'admin-fieldset no-border',
                            layout: 'hbox',
                            flex: 1,
                            maxHeight: '55pt',
                            minHeight: '55pt',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    name: 'category_accrual_cap_data',
                                    ui: 'admin-base',
                                    userCls: 'admin-fieldset no-margin',
                                    title: 'Cap Accruals At',
                                    layout: 'hbox',
                                    flex: 3,
                                    minHeight: '55pt',
                                    maxHeight: '55pt',
                                    defaults: {
                                        ui: 'admin admin-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'spinnerfield',
                                            flex: 1,
                                            style: 'padding-left: 4pt',
                                            name: 'category_accrual_cap_amount',
                                            decimals: 0,
                                            minValue: 0,
                                            bind: {
                                                value: '{selectedCategory.accrualCapAmount}'
                                            }
                                        },
                                        {
                                            xtype: 'spacer',
                                            width: '10pt'
                                        },
                                        {
                                            xtype: 'selectfield',
                                            flex: 2,
                                            name: 'category_accrual_cap_unit',
                                            // allowBlank: false,
                                            // editable: false,
                                            displayField: 'description',
                                            valueField: 'code',
                                            bind: {
                                                store: '{accrualCapUnit}',
                                                value: '{selectedCategory.accrualCapUnit}'
                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    name: 'category_balance_cap_data',
                                    ui: 'admin-base',
                                    userCls: 'admin-fieldset',
                                    title: 'Cap Balance At',
                                    layout: 'hbox',
                                    flex: 2,
                                    minHeight: '55pt',
                                    maxHeight: '55pt',
                                    defaults: {
                                        ui: 'admin admin-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'category_balance_cap_amount',
                                            flex: 1,
                                            style: 'padding-left: 4pt',
                                            decimals: 2,
                                            bind: {
                                                value: '{selectedCategory.balanceCapAmount}'
                                            }
                                        },
                                        {
                                            xtype: 'spacer',
                                            width: '10pt'
                                        },
                                        {
                                            xtype: 'selectfield',
                                            flex: 2,
                                            name: 'category_balance_cap_unit',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['code', 'description'],
                                                data: [
                                                    { "code": 48, "description": "Days" },
                                                    { "code": 49, "description": "Hours" },
                                                    { "code": 50, "description": "Minutes" }
                                                ]
                                            }),
                                            valueField: 'code',
                                            displayField: 'description',
                                            bind: {
                                                value: '{selectedCategory.balanceCapUnit}'
                                            }
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            ui: 'reporting',
                                            bind: {
                                                boxLabel: '{selectedCategory.categoryName} Accrual Rules'
                                            },
                                            //listeners: {
                                            //    change: 'onCategoriesCheckAllChange'
                                            //}
                                        },

                                        {
                                            xtype: 'spacer',
                                            flex: 1,

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
                                            iconCls: 'x-fas fa-clock',
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
                                    flex: 1,
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


                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'component',
                                            bind: {
                                                html: '{selectedCategory.categoryName} Carry Over Rules'
                                            },
                                            userCls: 'admin-title-toolbar',
                                        },
                                        {
                                            xtype: 'spacer',
                                            flex: 1,

                                        },
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls: 'x-fas fa-plus',
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
                                    flex: 1,
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





                    ]
                },

            ]
        }
    ]
});