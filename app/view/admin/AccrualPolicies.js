/**
 * AccrualPolicies Admin view
 * @class AccrualPolicies
 * @namespace Breeze.view.admin.AccrualPolicies
 * @alias widget.admin.AccrualPolicies
 */
Ext.define('Breeze.view.admin.AccrualPolicies', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.accrualpolicies',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.layout.Card',
        'Ext.plugin.Responsive'
    ],

    config: {
        crumbTitle: 'Accrual Policies'
    },

    // No header for outer container
    header: false,

    // Controller
    controller: 'admin.accrualpolicies',
    listeners: {
        initialize: 'onInit'
    },

    // View Model
    viewModel: {
        type: 'admin.accrualpolicies'
    },

    // Using card layout to swap between regular form and apply to employees form
    layout: 'card',

    items: [
        // Primary form
        {
            xtype: 'panel',

            itemId: 'form',

            // Layout and base styles
            layout: 'hbox',
            ui: 'admin-base',

            title: 'Accrual Policies',

            // Action buttons shown at bottom of panel
            buttonAlign: 'center',
            buttons: {
                save: { 
                    text: 'Save', 
                    handler: 'onSavePolicy', 
                    ui: 'confirm alt', 
                    style: 'width:200pt' 
                },
                apply: { 
                    text: 'Save and Apply to Employees', 
                    handler: 'onSavePolicyAndApply',
                    ui: 'action', 
                    style: 'width:200pt' 
                },
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
                                // Policies
                                {
                                    xtype: 'panel',
                                    ui: 'admin-fs-panel',
                                    userCls: 'admin-fieldset no-padding',
                                    title: 'Policies',
                                    flex: 1,
                                    layout: 'vbox',
                                    tools: [
                                        {
                                            xtype: 'tool',
                                            iconCls: 'x-fas fa-plus',
                                            handler: 'showCreatePolicyDialog',
                                        },
                                        {
                                            xtype: 'tool',
                                            iconCls: 'x-fas fa-minus',
                                            handler: 'onDeletePolicy',
                                            bind: {
                                                disabled: '{disabled.deletePolicy}'
                                            }
                                        }
                                    ],
                                    items: [

                                        {
                                            xtype: 'breeze-categories-list',
                                            ui: 'admin-shift-grid',
                                            userCls: 'admin-fieldset no-background no-margin no-border',
                                            reference: 'policyList',
                                            fieldMode: 'none',
                                            selectMode: 'single',
                                            preventDeselect: true,
                                            itemConfig: {
                                                ui: 'admin-list-item-select',
                                                templates: {
                                                    radioValue: '{record.data}',
                                                    itemData: { name: '{record.text} ' },
                                                    itemTpl: '{name}'
                                                }
                                            },
                                            bind: {
                                                store: '{policiesList}',
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
                                    // name: 'setting_name_label',
                                    ui: 'admin admin-text',
                                    userCls: 'admin-fieldset no-border',
                                    bind: '{policyData.Name}'
                                },
                                {
                                    xtype: 'fieldset',
                                    // name: 'recording_mode',
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
                                    xtype: 'panel',
                                    ui: 'admin-fs-panel',
                                    userCls: 'admin-fieldset no-padding',
                                    flex: 1,
                                    title: {
                                        text: 'Shift Information',
                                        ui: 'admin-fs-panel'
                                    },
                                    tools: [
                                        {
                                            xtype: 'tool',
                                            iconCls: 'x-fas fa-plus',
                                            handler: 'showCreateShiftSegmentDialog'
                                        }
                                    ],
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            ui: 'admin-grid',
                                            reference: 'shiftGrid',
                                            height: '100%',
                                            sortable: false, columnResize: false,
                                            columnMenu: false, hideHeaders: false,
                                            bind: {
                                                store: '{policySegments}'
                                            },
                                            plugins: {
                                                gridcellediting: true
                                            },
                                            defaults: {
                                                xtype: 'gridcolumn',
                                                menuDisabled: true,
                                                userCls: 'no-border',
                                            },
                                            layout: 'vbox',
                                            columns: [
                                                {
                                                    tpl: '{StartTime}',
                                                    text: 'Start',
                                                    dataIndex: 'StartSegment',
                                                    flex: 1,
                                                    editable: true,
                                                    editor: {
                                                        xtype: 'combobox',
                                                        itemId: 'start',
                                                        label: 'Start',
                                                        store: 'accrualShiftChoices',
                                                        displayField: 'time',
                                                        valueField: 'value',
                                                        forceSelection: false,
                                                        queryMode: 'local',
                                                        required: true,
                                                        validators: {
                                                            type: 'controller',
                                                            fn: 'validateShiftTime'
                                                        },
                                                        listeners: {
                                                            change: 'onShiftTimeChange'
                                                        }
                                                    },
                                                    groupable: false, menu: null,
                                                    menuDisabled: true, resizable: false
                                                },
                                                // {
                                                //     xtype: 'templatecolumn',
                                                //     tpl: ['-'],
                                                //     width: '2em'
                                                // },
                                                {
                                                    tpl: '{StopTime}',
                                                    text: 'Stop',
                                                    dataIndex: 'StopSegment',
                                                    flex: 1,
                                                    cell: {
                                                        toolDefaults: {
                                                            ui: 'employeeinfo-grid-tool',
                                                            zone: 'end'
                                                        },
                                                        tools: [
                                                            {
                                                                iconCls: 'x-fas fa-times',
                                                                handler: 'onDeleteShiftSegment'
                                                            }
                                                        ]
                                                    },
                                                    editable: true,
                                                    editor: {
                                                        xtype: 'combobox',
                                                        itemId: 'stop',
                                                        label: 'Stop',
                                                        store: 'accrualShiftChoices',
                                                        displayField: 'time',
                                                        valueField: 'value',
                                                        forceSelection: false,
                                                        queryMode: 'local',
                                                        required: true,
                                                        validators: {
                                                            type: 'controller',
                                                            fn: 'validateShiftTime'
                                                        },
                                                        listeners: {
                                                            change: 'onShiftTimeChange'
                                                        }
                                                    },
                                                    groupable: false, menu: null,
                                                    menuDisabled: true, resizable: false
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
                                    selectMode: 'single',
                                    preventDeselect: true,
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
                                            // name: 'category_recording_year_type',
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
                                                        xtype: 'radio',
                                                        style: 'padding-right: 8pt'
                                                    },
                                                    bind: {
                                                        values: {
                                                            yearType: '{selectedCategory.calendarType}'
                                                        }
                                                    },
                                                    items: [
                                                        {
                                                            name: 'yearType',
                                                            boxLabel: 'Anniversary',
                                                            value: 45,
                                                            bind: {
                                                                groupValue: '{recordingYear.yearType}'
                                                            }
                                                        },
                                                        {
                                                            name: 'yearType',
                                                            boxLabel: 'Calendar',
                                                            value: 46,
                                                            bind: {
                                                                groupValue: '{recordingYear.yearType}'
                                                            }
                                                        },
                                                        {
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
                                            // name: 'category_waiting_period_data',
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
                                                    // name: 'category_new_time',
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
                                                    // name: 'category_new_rate',
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
                                            // name: 'category_accrual_cap_data',
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
                                                    // name: 'category_accrual_cap_amount',
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
                                                    // name: 'category_accrual_cap_unit',
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
                                            // name: 'category_balance_cap_data',
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
                                                    // name: 'category_balance_cap_amount',
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
                                                    // name: 'category_balance_cap_unit',
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
                                                        boxLabel: '{selectedCategory.categoryName} Accrual Rules',
                                                        checked: '{selectedCategory.allowAccrual}'
                                                    },
                                                    //listeners: {
                                                    //    change: 'onCategoriesCheckAllChange'
                                                    //}
                                                },

                                                { xtype: 'spacer', flex: 1 },

                                                {
                                                    // Add accrual rule
                                                    xtype: 'button',
                                                    iconCls: 'x-fas fa-plus',
                                                    ui: 'plain wtr-button',
                                                    bind: {
                                                        // disabled: '{!selectedCategory.allowAccrual}'
                                                        disabled: '{disableCreateAccrualRule}'
                                                    },
                                                    handler: 'showCreateAccrualRuleDialog'
                                                },

                                                {
                                                    // Add accrual interval
                                                    xtype: 'button',
                                                    iconCls: 'x-fas fa-clock',
                                                    ui: 'plain wtr-button',
                                                    bind: {
                                                        // disabled: '{!selectedCategory.allowAccrual}'
                                                        disabled: '{disableCreateAccrualInterval}'
                                                    },
                                                    handler: 'showCreateAccrualIntervalDialog'
                                                },
                                            ]
                                        },

                                        {
                                            xtype: 'grid',
                                            flex: 1,
                                            sortable: false, striped: false,
                                            columnMenu: null, grouped: true,
                                            hideHeaders: true,
                                            ui: 'admin-grid', userCls: 'admin-grid',
                                            reference: 'accrualRuleGrid',
                                            hidden: true,
                                            bind: {
                                                // store: '{selectedCategory.accrualRules}'
                                                // store: '{selectedCategoryAccrualRules}'
                                                store: '{groupedCategoryAccrualRules}',
                                                hidden: '{!selectedCategory.allowAccrual}'
                                            },
                                            listeners: {
                                                // storechange: (grid, newStore)=>{
                                                //     if(!Object.isUnvalued(newStore)){
                                                //         newStore.setGroupField('ruleName');
                                                //     }
                                                // }
                                            },
                                            defaults: {
                                                cell: {
                                                    ui: 'admin-grid admin-tree-item',
                                                },
                                                userCls: 'no-border',

                                            },
                                            defaultType: 'gridcolumn',
                                            columns: [
                                                {
                                                    itemId: 'from',
                                                    text: 'From',
                                                    dataIndex: 'svcFrom',
                                                    menuDisabled: true,
                                                    flex: 1,
                                                    tpl: [
                                                        '<tpl if="svcFrom==0">Hire</tpl>',
                                                        '<tpl if="svcFrom!=0">',
                                                        '{svcFrom} Year<tpl if="svcFrom!=1">s</tpl>',
                                                        '</tpl>'
                                                    ],
                                                    editable: true,
                                                    editor: {
                                                        xtype: 'spinnerfield',
                                                        itemId: 'fromField',
                                                        decimals: 0,
                                                        minValue: 0
                                                    }
                                                },
                                                {
                                                    itemId: 'through',
                                                    text: 'Through',
                                                    dataIndex: 'svcTo',
                                                    flex: 1,
                                                    cell: {
                                                        encodeHtml: false
                                                    },
                                                    tpl: [
                                                        '<tpl if="svcTo==0">&infin;</tpl>',
                                                        '<tpl if="svcTo!=0">{svcTo} Year',
                                                        '<tpl if="svcTo!=1">s</tpl></tpl>'
                                                    ],
                                                    editable: true,
                                                    editor: {
                                                        xtype: 'spinnerfield',
                                                        itemId: 'throughField',
                                                        decimals: 0,
                                                        required: true,
                                                        minValue: 0
                                                    }
                                                },
                                                {
                                                    itemId: 'info',
                                                    text: 'Accrual Information',
                                                    flex: 4,
                                                    dataIndex: 'accrualChanged',
                                                    tpl: [
                                                        '<tpl if="accformInc!=0">',
                                                        '<tpl if="accformPer==56||accformPer==119">Monthly Special: </tpl>',
                                                        '{accformInc} ',
                                                        '<tpl if="accformUnit==48">Day</tpl>',
                                                        '<tpl if="accformUnit==49">Hour</tpl>',
                                                        '<tpl if="accformUnit==50">Minute</tpl>',
                                                        '<tpl if="accformInc!=1">s</tpl> ',
                                                        '<tpl if="accformPer &lt; 115">',
                                                        '<tpl if="accformPer==51">Weekly on ',
                                                        '<tpl if="accformDay==1">Sunday</tpl>',
                                                        '<tpl if="accformDay==2">Monday</tpl>',
                                                        '<tpl if="accformDay==3">Tuesday</tpl>',
                                                        '<tpl if="accformDay==4">Wednesday</tpl>',
                                                        '<tpl if="accformDay==5">Thursday</tpl>',
                                                        '<tpl if="accformDay==6">Friday</tpl>',
                                                        '<tpl if="accformDay==7">Saturday</tpl>',
                                                        '</tpl>',
                                                        '<tpl if="accformPer==52">BiWeekly on the ',
                                                        '<tpl if="accformDay &lt; 8"> first </tpl>',
                                                        '<tpl if="accformDay &gt; 7"> second </tpl>',
                                                        '<tpl if="accformDay==1||accformDay==8">Sunday</tpl>',
                                                        '<tpl if="accformDay==2||accformDay==9">Monday</tpl>',
                                                        '<tpl if="accformDay==3||accformDay==10">Tuesday</tpl>',
                                                        '<tpl if="accformDay==4||accformDay==11">Wednesday</tpl>',
                                                        '<tpl if="accformDay==5||accformDay==12">Thursday</tpl>',
                                                        '<tpl if="accformDay==6||accformDay==13">Friday</tpl>',
                                                        '<tpl if="accformDay==7||accformDay==14">Saturday</tpl>',
                                                        '</tpl>',
                                                        '<tpl if="accformPer==53">Monthly on ',
                                                        '<tpl if="accformDay!=\'ANNIVERSARY\'">the </tpl>',
                                                        '{accformDay}',
                                                        '<tpl if="accformDay==1 ||accformDay==21||accformDay==31">st</tpl>',
                                                        '<tpl if="accformDay==2 ||accformDay==22">nd</tpl>',
                                                        '<tpl if="accformDay==3 ||accformDay==23">rd</tpl>',
                                                        '<tpl if="accformDay!=1 &&accformDay!=2 &&accformDay!=3 &&accformDay!=21&&accformDay!=22&&accformDay!=23&&accformDay!=31&&accformDay!=\'ANNIVERSARY\'">th</tpl>',
                                                        '</tpl>',
                                                        '<tpl if="accformPer==54">Quarterly</tpl>',
                                                        '<tpl if="accformPer==55">Semi-Annually</tpl>',
                                                        '<tpl if="accformPer==56"> on ',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==1">January</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==2">February</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==3">March</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==4">April</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==5">May</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==6">June</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==7">July</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==8">August</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==9">September</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==10">October</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==11">November</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==12">December</tpl>',
                                                        ' {msDay}',
                                                        '<tpl if="eval(accformDay.split(\'-\')[1])==1 ||eval(accformDay.split(\'-\')[1])==21||eval(accformDay.split(\'-\')[1])==31">st</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[1])==2 ||eval(accformDay.split(\'-\')[1])==22">nd</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[1])==3 ||eval(accformDay.split(\'-\')[1])==23">rd</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[1])!=1 &&eval(accformDay.split(\'-\')[1])!=2 &&eval(accformDay.split(\'-\')[1])!=3 ',
                                                        '&&eval(accformDay.split(\'-\')[1])!=21&&eval(accformDay.split(\'-\')[1])!=22&&eval(accformDay.split(\'-\')[1])!=23',
                                                        '&&eval(accformDay.split(\'-\')[1])!=31&&eval(accformDay.split(\'-\')[1])!=\'ANNIVERSARY\'">th</tpl>',
                                                        '</tpl>',
                                                        '<tpl if="accformPer==114">Annually on {accformDay}</tpl>',
                                                        '</tpl>',
                                                        '<tpl if="accformPer &gt; 114"> per ',
                                                        '<tpl if="accformPer!=119">',
                                                        '<tpl if="this.parseInt(accformDay) &gt; 1">{accformDay} </tpl>',
                                                        '<tpl if="accformPer==115">Day</tpl>',
                                                        '<tpl if="accformPer===116">Week</tpl>',
                                                        '<tpl if="accformPer==117">Month</tpl>',
                                                        '<tpl if="accformPer==118">Year</tpl>',
                                                        '<tpl if="accformPer==140">Worked Hour</tpl>',
                                                        '<tpl if="accformPer==141">Worked Day</tpl>',
                                                        '<tpl if="accformDay &gt; 1">s</tpl>',
                                                        '</tpl>',
                                                        '<tpl if="accformPer==119">',
                                                        '{msMonth}',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==1">st</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==2">nd</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])==3">rd</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[0])!=1 &&eval(accformDay.split(\'-\')[0])!=2 &&eval(accformDay.split(\'-\')[0])!=3">th</tpl>',
                                                        ' Month on ',
                                                        '<tpl if="eval(accformDay.split(\'-\')[1])!=\'ANNIVERSARY\'">the </tpl>',
                                                        '{msDay}',
                                                        '<tpl if="eval(accformDay.split(\'-\')[1])==1 ||eval(accformDay.split(\'-\')[1])==21||eval(accformDay.split(\'-\')[1])==31">st</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[1])==2 ||eval(accformDay.split(\'-\')[1])==22">nd</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[1])==3 ||eval(accformDay.split(\'-\')[1])==23">rd</tpl>',
                                                        '<tpl if="eval(accformDay.split(\'-\')[1])!=1 &&eval(accformDay.split(\'-\')[1])!=2 &&eval(accformDay.split(\'-\')[1])!=3 ',
                                                        '&&eval(accformDay.split(\'-\')[1])!=21&&eval(accformDay.split(\'-\')[1])!=22&&eval(accformDay.split(\'-\')[1])!=23',
                                                        '&&eval(accformDay.split(\'-\')[1])!=31&&eval(accformDay.split(\'-\')[1])!=\'ANNIVERSARY\'">th</tpl>',
                                                        '</tpl>',
                                                        '</tpl>',
                                                        '</tpl>',
                                                        '<tpl if="accformInc==0">No Accrual</tpl>',
                                                        {
                                                            parseInt: function (v) {
                                                                return parseInt(v);
                                                            }
                                                        }
                                                    ],
                                                    editable: true,
                                                    // Multi-field editor for accrual rule info column
                                                    editor: {
                                                        xtype: 'containerfield',
                                                        itemId: 'infoField',
                                                        label: '', layout: 'hbox',
                                                        items: [
                                                            {
                                                                xtype: 'spinnerfield',
                                                                itemId: 'accformInc',
                                                                // flex: 1,
                                                                decimals: 4,
                                                                style: 'width: 3.5em',
                                                                textAlign: 'center',
                                                                // listeners: {
                                                                //     change: 'onAccrualRuleInfoChange'
                                                                // }
                                                            },
                                                            {
                                                                xtype: 'selectfield',
                                                                itemId: 'accformUnit',
                                                                // flex: 2,
                                                                style: 'width: 6em',
                                                                store: 'MinimumUseUnits',
                                                                displayField: 'Description', valueField: 'ID',
                                                                value: 48,
                                                                // margin: 'inherit inherit inherit 4pt',
                                                                ui: 'admin-ap-small-input',
                                                                // TODO: Adjust picker so tool component doens't take up space to increase available space
                                                            },
                                                            {
                                                                xtype: 'selectfield',
                                                                itemId: 'accformOn',
                                                                bind: {
                                                                    store: '{accrualRateOn}'
                                                                },
                                                                displayField: 'Description', valueField: 'ID',
                                                                value: 53,
                                                                style: 'width: 7.5em',
                                                                hidden: true,
                                                                listeners: {
                                                                    change: 'onAccrualRuleInfoChange'
                                                                }
                                                            }, {
                                                                xtype: 'selectfield',
                                                                itemId: 'onPer',
                                                                displayField: 'Description', valueField: 'ID',
                                                                bind: { store: '{onPerTypes}' },
                                                                // value: 1,
                                                                style: 'width: 4.5em',
                                                                ui: 'admin-ap-small-input',
                                                                listeners: {
                                                                    change: 'onAccrualRuleInfoChange'
                                                                }
                                                                // flex: 1
                                                            }, {
                                                                xtype: 'selectfield',
                                                                itemId: 'monthlySpecialOn',
                                                                hidden: true,
                                                                bind: { store: '{monthlySpecialOnOpt}' },
                                                                displayField: 'Description', valueField: 'ID',
                                                                value: 1,
                                                                listeners: {
                                                                    change: 'onAccrualRuleInfoChange'
                                                                }
                                                            }, {
                                                                xtype: 'spinnerfield',
                                                                itemId: 'perX',
                                                                minValue: 1, decimals: 0,
                                                                style: 'width: 3.5em',
                                                                textAlign: 'center',
                                                                value: 1,
                                                                hidden: true,
                                                                // listeners: {
                                                                //     change: 'onAccrualRuleInfoChange'
                                                                // }
                                                            }, {
                                                                xtype: 'selectfield',
                                                                itemId: 'accformPer',
                                                                bind: { store: '{accrualRatePer}' },
                                                                displayField: 'Description', valueField: 'ID',
                                                                flex: 1,
                                                                hidden: true,
                                                                listeners: {
                                                                    select: 'onAccrualRuleInfoChange'
                                                                }
                                                            }, {
                                                                xtype: 'selectfield',
                                                                itemId: 'monthlySpecialPer',
                                                                bind: { store: '{monthlySpecialPerOpt}' },
                                                                displayField: 'Description', valueField: 'ID',
                                                                // flex: 1,
                                                                value: '1',
                                                                hidden: true,
                                                                // listeners: {
                                                                //     change: 'onAccrualRuleInfoChange'
                                                                // }
                                                            }, {
                                                                xtype: 'selectfield',
                                                                itemId: 'onWeekly',
                                                                bind: { store: '{onWeekly}' },
                                                                displayField: 'Description', valueField: 'ID',
                                                                value: '6',
                                                                flex: 1,
                                                                hidden: true,
                                                                // listeners: {
                                                                //     change: 'onAccrualRuleInfoChange'
                                                                // }
                                                            }, {
                                                                xtype: 'selectfield',
                                                                itemId: 'onBiWeekly',
                                                                bind: { store: '{onBiWeekly}' },
                                                                displayField: 'Description', valueField: 'ID',
                                                                value: '13',
                                                                flex: 1,
                                                                hidden: true,
                                                                // listeners: {
                                                                //     change: 'onAccrualRuleInfoChange'
                                                                // }
                                                            }, {
                                                                xtype: 'displayfield',
                                                                itemId: 'msOn',
                                                                label: '',
                                                                value: 'on the',
                                                                hidden: true
                                                            }, {
                                                                xtype: 'selectfield',
                                                                itemId: 'monthly31',
                                                                bind: { store: '{monthly31}' },
                                                                displayField: 'Description', valueField: 'ID',
                                                                value: '1',
                                                                // width: 48,
                                                                flex: 1,
                                                                textAlign: 'center',
                                                                hidden: true,
                                                                // listeners: {
                                                                //     change: 'onAccrualRuleInfoChange'
                                                                // }
                                                            }, {
                                                                xtype: 'selectfield',
                                                                itemId: 'monthly30',
                                                                bind: { store: '{monthly30}' },
                                                                displayField: 'Description', valueField: 'ID',
                                                                value: '1',
                                                                // width: 48,
                                                                flex: 1,
                                                                textAlign: 'center',
                                                                hidden: true,
                                                                // listeners: {
                                                                //     change: 'onAccrualRuleInfoChange'
                                                                // }
                                                            }, {
                                                                xtype: 'selectfield',
                                                                itemId: 'monthly28',
                                                                bind: { store: '{monthly28}' },
                                                                displayField: 'Description', valueField: 'ID',
                                                                value: '1',
                                                                // width: 48,
                                                                flex: 1,
                                                                textAlign: 'center',
                                                                hidden: true,
                                                                // listeners: {
                                                                //     change: 'onAccrualRuleInfoChange'
                                                                // }
                                                            }, {
                                                                xtype: 'datefield',
                                                                itemId: 'onAnnually',
                                                                dateFormat: 'm/d',
                                                                value: '1/1',
                                                                hidden: true,
                                                                // listeners: {
                                                                //     change: 'onAccrualRuleInfoChange'
                                                                // }
                                                            }, {
                                                                xtype: 'displayfield',
                                                                itemId: 'onAnniversary',
                                                                value: 'Anniversary',
                                                                label: '',
                                                                hidden: true
                                                            }
                                                        ]
                                                    },
                                                    // Delete interval tool
                                                    cell: {
                                                        toolDefaults: {
                                                            ui: 'employeeinfo-grid-tool',
                                                            zone: 'end'
                                                        },
                                                        tools: [
                                                            {
                                                                iconCls: 'x-fas fa-times',
                                                                handler: 'onDeleteAccrualInterval'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ],
                                            plugins: {
                                                gridcellediting: true
                                            },
                                            listeners: {
                                                beforecompleteedit: 'onAccrualRuleBeforeEditComplete',
                                                beforeedit: 'onAccrualRuleBeforeEdit'
                                            }
                                        },
                                    ]
                                },

                                // Carry over rules panel
                                {
                                    xtype: 'panel',
                                    ui: 'admin-fs-panel', userCls: 'admin-fieldset no-padding',
                                    flex: 1, layout: 'vbox',
                                    bind: {
                                        title: '{selectedCategory.categoryName} Carry Over Rules'
                                    },
                                    tools: [
                                        // Add rule tool button
                                        {
                                            xtype: 'tool',
                                            iconCls: 'x-fas fa-plus',
                                            handler: 'onCreateCarryOverRule'
                                        }
                                    ],
                                    items: [
                                        {
                                            xtype: 'grid',
                                            flex: 1,
                                            sortable: false, striped: false,
                                            columnMenu: null,
                                            ui: 'admin-grid', userCls: 'admin-grid',
                                            reference: 'carryOverGrid',
                                            bind: {
                                                store: '{selectedCategoryCarryOverRules}',
                                            },
                                            listeners: {
                                                // storechange: (grid, newStore)=>{
                                                //     if(!Object.isUnvalued(newStore)){
                                                //         newStore.setGroupField('ruleName');
                                                //     }
                                                // }
                                            },
                                            defaults: {
                                                cell: {
                                                    ui: 'admin-grid admin-tree-item'
                                                },
                                                draggable: false,
                                                userCls: 'no-border',
                                            },
                                            defaultType: 'gridcolumn',
                                            plugins: {
                                                gridcellediting: true
                                            },
                                            columns: [
                                                {
                                                    itemId: 'from',
                                                    text: 'From',
                                                    dataIndex: 'svcFrom',
                                                    flex: 1,
                                                    menuDisabled: true,
                                                    tpl: [
                                                        '<tpl if="svcFrom==0">Hire</tpl>',
                                                        '<tpl if="svcFrom!=0">Year {svcFrom}</tpl>',
                                                    ],
                                                    editable: true,
                                                    editor: {
                                                        xtype: 'spinnerfield',
                                                        itemId: 'fromField',
                                                        decimals: 0,
                                                        required: true,
                                                        minValue: 0
                                                    }
                                                },
                                                {
                                                    itemId: 'through',
                                                    text: 'Through',
                                                    dataIndex: 'svcTo',
                                                    flex: 1,
                                                    cell: {
                                                        encodeHtml: false
                                                    },
                                                    tpl: [
                                                        '<tpl if="svcTo==0">&infin;</tpl>',
                                                        '<tpl if="svcTo!=0">Year {svcTo}</tpl>'
                                                    ],
                                                    editable: true,
                                                    editor: {
                                                        xtype: 'spinnerfield',
                                                        itemId: 'throughField',
                                                        decimals: 0,
                                                        required: true,
                                                        minValue: 0
                                                    }
                                                },
                                                {
                                                    itemId: 'allow',
                                                    xtype: 'checkcolumn',
                                                    flex: 1.25,
                                                    headerCheckbox: false,
                                                    text: 'Carry Over',
                                                    dataIndex: 'allowCarry'
                                                },
                                                {
                                                    itemId: 'max',
                                                    flex: 1.25,
                                                    text: 'Carry Max',
                                                    dataIndex: 'carryOver',
                                                    tpl: [
                                                        '<tpl if="allowCarry==false">--</tpl>',
                                                        '<tpl if="allowCarry==true">',
                                                        '<tpl if="carryOver==0">No Max</tpl>',
                                                        '<tpl if="carryOver &gt; 0">{carryOver}</tpl>',
                                                        '</tpl>'
                                                    ],
                                                    editable: true,
                                                    editor: {
                                                        xtype: 'spinnerfield',
                                                        itemId: 'maxField',
                                                        decimals: 4,
                                                        minValue: 0
                                                    }
                                                },
                                                {
                                                    itemId: 'expiration',
                                                    text: 'Carry Over Expiration',
                                                    flex: 2.5,
                                                    dataIndex: 'expChanged',
                                                    tpl: [
                                                        '<tpl if="allowCarry==false">--</tpl>',
                                                        '<tpl if="allowCarry==true">',
                                                        '<tpl if="perAmount==0">No expiration</tpl>',
                                                        '<tpl if="perAmount!=0">Expires after {perAmount} ',
                                                        '<tpl if="perUnit==57">day</tpl>',
                                                        '<tpl if="perUnit==58">week</tpl>',
                                                        '<tpl if="perUnit==59">month</tpl>',
                                                        '<tpl if="perUnit==60">year</tpl>',
                                                        '<tpl if="perAmount!=1">s</tpl>',
                                                        '</tpl>',
                                                        '</tpl>'
                                                    ],
                                                    /*
                                                        Editor for Carry Over Expiration Column
                                                        Has multiple fields, so editor is a containerfield
                                                    */
                                                    editor: {
                                                        xtype: 'containerfield',
                                                        itemId: 'expirationField',
                                                        label: '', layout: 'hbox',
                                                        items: [
                                                            {
                                                                xtype: 'spinnerfield',
                                                                flex: 1,
                                                                itemId: 'amount',
                                                                /* TODO: Decide if labels are needed, 
                                                                    or if placeholder is sufficient */
                                                                // label: 'Amount',
                                                                placeholder: 'Amount',
                                                                // Default to 0, min value 0
                                                                value: 0, minValue: 0,
                                                                listeners: {
                                                                    change: 'onCarryOverExpirationAmountChange'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'selectfield',
                                                                // Flex scale, Add spacing to left of field
                                                                flex: 1, margin: 'inherit inherit inherit 4pt',
                                                                itemId: 'unit',
                                                                /* TODO: Decide if labels are needed, 
                                                                    or if placeholder is sufficient */
                                                                // label: 'Unit',
                                                                placeholder: 'Unit',
                                                                autoSelect: true,
                                                                displayField: 'Description', valueField: 'ID',
                                                                store: 'DurationTypes'
                                                            }
                                                        ]
                                                    },
                                                    // Delete rule tool
                                                    cell: {
                                                        toolDefaults: {
                                                            ui: 'employeeinfo-grid-tool',
                                                            zone: 'end'
                                                        },
                                                        tools: [
                                                            {
                                                                iconCls: 'x-fas fa-times',
                                                                handler: 'onDeleteCarryOverRule'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ],
                                            listeners: {
                                                beforecompleteedit: 'onCarryOverBeforeEditComplete',
                                                beforeedit: 'onCarryOverBeforeEdit'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },

                    ]
                },

            ],
        },
        // Apply to Employees form
        {
            xtype: 'panel',
            itemId: 'applyForm',

            layout: 'hbox',

            // ui: 'dark-themed-dialog',
            ui: 'admin-base',

            bind: {
                title: 'Apply {policyData.Name}'
            },

            items: [
                {
                    xtype: 'container',
                    reference: 'applyLists',
                    flex: 1,
                    // Responsively change listing layout from side by side to top/bottom
                    // based on screen width
                    plugins: {
                        responsive: true
                    },
                    // TODO: Determine responsive width at which to change layout
                    responsiveConfig: {
                        'width > 960': {
                            layout: 'hbox'
                        },
                        'width <= 960': {
                            layout: 'vbox'
                        }
                    },

                    items: [
                        // Employees Checkbox list
                        {
                            xtype: 'panel',
                            itemId: 'employeesList',
                            scrollable: 'y',
                            ui: 'admin-fs-panel', flex: 1,
                            userCls: 'admin-fieldset no-padding',
                            title: 'Employees',
                            items: [
                                {
                                    xtype: 'breeze-categories-list',
                                    ui: 'admin-shift-grid',
                                    userCls: 'admin-fieldset no-background no-margin no-border',
                                    fieldMode: 'check',
                                    selectMode: 'multi',
                                    preventDeselect: false,
                                    itemConfig: {
                                        ui: 'admin-list-item-select',
                                        templates: {
                                            radioValue: '{record.id}',
                                            itemData: { name: '{record.displayName} ' },
                                            itemWrappedTpl: '{name}'
                                        }
                                    },
                                    bind: {
                                        store: '{applyEmployeeTargets}',
                                    },
                                    viewModel: true,
                                    // listeners: {
                                    //     select: 'onPolicySelect'
                                    // }
                                }
                            ]
                        },
                        // Categories checkbox list
                        {
                            xtype: 'panel',
                            itemId: 'categoriesList',
                            scrollable: 'y',
                            ui: 'admin-fs-panel', flex: 1,
                            userCls: 'admin-fieldset no-padding',
                            title: 'Categories',
                            items: [
                                {
                                    xtype: 'breeze-categories-list',
                                    ui: 'admin-shift-grid',
                                    userCls: 'admin-fieldset no-background no-margin no-border',
                                    fieldMode: 'check',
                                    selectMode: 'multi',
                                    preventDeselect: false,
                                    itemConfig: {
                                        ui: 'admin-list-item-select',
                                        templates: {
                                            radioValue: '{record.data}',
                                            itemData: { name: '{record.text} ' },
                                            itemWrappedTpl: '{name}'
                                        }
                                    },
                                    bind: {
                                        store: '{applyCategoryTargets}',
                                    },
                                    viewModel: true,
                                    // listeners: {
                                    //     select: 'onPolicySelect'
                                    // }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'containerfield',
                    reference: 'applyOptions',
                    height: '120pt',
                    plugins: {
                        responsive: true
                    },
                    // TODO: Determine responsive width at which to change layout
                    responsiveConfig: {
                        'width > 960': {
                            layout: 'hbox'
                        },
                        'width <= 960': {
                            layout: 'vbox'
                        }
                    },
                    defaults: {
                        xtype: 'checkbox',
                        ui: 'admin'
                    },
                    items: [
                        {
                            name: 'applyPast',
                            boxLabel: 'Apply changes to past records'
                        },
                        {
                            name: 'changeUserShifts',
                            boxLabel: 'Change user-modified shifts'
                        },
                        {
                            name: 'changeUserCats',
                            boxLabel: 'Change user-modified categories'
                        }
                    ]
                }
            ]

        }
    ],
    //====[Dialogs]=====
    /* Create Accrual Policy Dialog */
    createPolicyDialog: {
        xtype: 'dialog',
        ui: 'dark-themed-dialog',
        reference: 'createPolicyDialog',
        title: 'Create New Accrual Policy',
        layout: 'vbox',
        buttons: [
            {
                xtype: 'button',
                text: 'Save',
                ui: 'confirm alt',
                handler: 'onCreatePolicy'
            },
            {
                xtype: 'spacer', width: '8pt'
            },
            {
                xtype: 'button',
                text: 'Cancel',
                ui: 'decline alt',
                handler: 'onCreatePolicyDialogCancel'
            }
        ],
        items: [
            {
                xtype: 'breeze-textfield',
                ui: 'dark-themed-dialog-field',
                itemId: 'policyName',
                label: 'Policy Name',
                required: true
            },
            {
                xtype: 'containerfield',
                itemId: 'createOption',
                layout: 'vbox',
                defaults: {
                    bodyAlign: 'stretch',
                    xtype: 'radio',
                    ui: 'dark-themed-dialog-field'
                },
                items: [
                    {
                        name: 'option',
                        boxLabel: 'Create from scratch using default values',
                        value: 1, checked: true
                    },
                    {
                        name: 'option',
                        boxLabel: 'Copy an existing Accrual Policy',
                        reference: 'createDlgCopyExisting',
                        value: 2
                    }
                ]
            },
            {
                xtype: 'selectfield',
                label: 'Copy From',
                itemId: 'policySource',
                // TODO: Update default copied accrual to match selection before show
                value: null,
                bind: {
                    hidden: '{!createDlgCopyExisting.checked}',
                    store: '{policiesList}'
                },
                autoSelect: true,
                displayField: 'text',
                valueField: 'data'
            }
        ]
    },
    /* Add Shift Segment Dialog */
    addShiftSegmentDialog: {
        xtype: 'dialog',
        ui: 'dark-themed-dialog',
        title: 'Add Shift Segment',
        layout: 'hbox',
        items: [
            {
                xtype: 'combobox',
                itemId: 'start',
                label: 'Start',
                store: 'accrualShiftChoices',
                displayField: 'time',
                valueField: 'value',
                forceSelection: false,
                queryMode: 'local',
                required: true,
                validators: {
                    type: 'controller',
                    fn: 'validateShiftTime'
                }
            },
            {
                xtype: 'spacer',
                width: '8pt'
            },
            {
                xtype: 'combobox',
                itemId: 'stop',
                label: 'Stop',
                store: 'accrualShiftChoices',
                displayField: 'time',
                valueField: 'value',
                forceSelection: false,
                queryMode: 'local',
                required: true,
                validators: {
                    type: 'controller',
                    fn: 'validateShiftTime'
                }
            }
        ],
        buttons: [
            {
                xtype: 'button',
                text: 'Save',
                ui: 'confirm alt',
                handler: 'onCreateShiftSegmentDialogSave'
            },
            {
                xtype: 'spacer', width: '8pt'
            },
            {
                xtype: 'button',
                text: 'Cancel',
                ui: 'decline alt',
                handler: 'onDialogCancel',
                data: {
                    // cleanup function after closing dialog
                    cancelableAction: 'onCreateShiftSegmentDialogCancel'
                }
            }
        ]
    },

    addAccrualRuleDialog: {
        xtype: 'dialog',
        title: 'Add Accrual Rule',
        ui: 'dark-themed-dialog',

        layout: 'vbox',

        maxHeight: '400pt',
        scrollable: 'y',

        items: [
            {
                xtype: 'textfield',
                ui: 'dark-themed-dialog-field',
                // ui: 'reporting reporting-text reporting-date',
                // width:'200pt',
                label: 'New Accrual Rule Name',
                // labelAlign: 'left',
                labelWidth: 'auto',
                itemId: 'ruleName',
                value: null,
                required: true
            }
        ],

        buttons: [
            {
                text: 'Add',
                ui: 'confirm alt',
                handler: 'onCreateAccrualRule'
            },
            {
                xtype: 'spacer',
                width: '8pt'
            },
            {
                text: 'Cancel',
                ui: 'decline alt',
                handler: 'onCreateAccrualRuleDialogCancel'
            }
        ]

    },

    addAccrualIntervalDialog: {
        xtype: 'dialog',
        title: 'Add Accrual Interval',
        ui: 'dark-themed-dialog employeeinfo-dialog dark-dlg',

        layout: 'vbox',

        maxHeight: '400pt',
        scrollable: 'y',

        items: [
            {
                xtype: 'selectfield',
                // ui: 'reporting reporting-text reporting-date',
                // width:'200pt',
                label: 'Accrual Rule to Add Interval to',
                // labelAlign: 'left',
                labelWidth: 'auto',
                itemId: 'ruleName',
                value: null,
                required: true,
                autoSelect: true,
                valueField: 'value',
                displayField: 'name'
            }
        ],

        buttons: [
            {
                text: 'Add',
                ui: 'confirm alt',
                handler: 'onCreateAccrualInterval'
            },
            {
                xtype: 'spacer',
                width: '8pt'
            },
            {
                text: 'Cancel',
                ui: 'decline alt',
                handler: 'onCreateAccrualIntervalDialogCancel'
            }
        ]

    }
});